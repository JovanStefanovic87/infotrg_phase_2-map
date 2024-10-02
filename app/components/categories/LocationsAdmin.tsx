'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import LocationList from '@/app/components/lists/LocationList';
import { Location, Language, Icon, CurrentIcon, Country, City } from '@/utils/helpers/types';
import PageContainer from '@/app/components/containers/PageContainer';
import NewLocationForm from '../forms/NewLocationForm';
import apiClient from '@/utils/helpers/apiClient';
import ImagePickerForm from '../forms/ImagePickerForm';
import H1 from '@/app/components/text/H1';

interface Props {
	prefix: string;
	title: string;
}

const LocationsAdmin: React.FC<Props> = ({ prefix, title }) => {
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [postCode, setPostCode] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [locations, setLocations] = useState<Location[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);
	const [type, setType] = useState<'country' | 'city' | 'cityPart' | 'marketplace'>('country');
	const [countries, setCountries] = useState<Country[]>([]);
	const [countryId, setCountryId] = useState<number | null>(null);
	const [cities, setCities] = useState<City[]>([]);
	const [cityId, setCityId] = useState<number | null>(null);
	const [cityPartId, setCityPartId] = useState<number | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});
	const [currentIcon, setCurrentIcon] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [expandedLocations, setExpandedLocations] = useState<Set<number>>(new Set());
	const [manuallyExpandedLocations, setManuallyExpandedLocations] = useState<Set<number>>(
		new Set()
	);
	const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
	const [initialExpandedLocations, setInitialExpandedLocations] = useState<Set<number>>(new Set());

	const fetchLocations = async () => {
		try {
			const response = await apiClient<Location[]>({
				method: 'GET',
				url: `/api/locations?prefix=${prefix}&languageId=${languageId}`,
			});
			return response;
		} catch (error) {
			console.error('Error fetching locations:', error);
			throw error;
		}
	};

	const fetchLanguages = () => apiClient<Language[]>({ method: 'GET', url: '/api/languages' });
	const fetchIcons = () =>
		apiClient<Icon[]>({ method: 'GET', url: '/api/icons?directory=locations' });

	const refetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [locationsData, iconsData] = await Promise.all([fetchLocations(), fetchIcons()]);
			setLocations(locationsData);
			setIcons(iconsData);
		} catch (error) {
			console.error('Failed to refetch data', error);
		} finally {
			setLoading(false);
		}
	}, [languageId, prefix]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	useEffect(() => {
		const fetchLanguagesData = async () => {
			setLoading(true);
			try {
				const data = await fetchLanguages();
				setLanguages(data);
			} catch (err) {
				console.error('Failed to fetch languages', err);
			} finally {
				setLoading(false);
			}
		};
		fetchLanguagesData();
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			let iconId = currentIcon.iconId;

			if (icon) {
				const formData = new FormData();
				formData.append('icon', icon);
				formData.append('directory', 'locations');
				const { data } = await axios.post('/api/icons', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
				iconId = data.iconId;
			}

			const { data: labelData } = await axios.post('/api/labels', { name, prefix });
			const newLabelId = labelData.id;
			if (!newLabelId) throw new Error('Failed to create label');

			const locationData: Record<string, any> = {
				labelId: newLabelId,
				iconId,
				name,
				type,
			};
			if (type === 'city' && countryId) {
				locationData.countryId = countryId;
				locationData.postCode = postCode;
			} else if (type === 'cityPart' && cityId) {
				locationData.cityId = cityId;
				locationData.postCode = postCode;
			} else if (type === 'marketplace' && cityPartId) {
				locationData.cityPartId = cityPartId;
				locationData.address = address;
			}

			const { data: newLocationData } = await axios.post('/api/locations', locationData);
			if (!newLocationData) throw new Error('Failed to create location');

			const translations = languages.map(language => ({
				labelId: newLabelId,
				languageId: language.id,
				translation: name,
			}));

			await axios.post('/api/translation', { translations });

			resetForm();
			setSuccessMessage('Location successfully saved.');
			if (fileUploadButtonRef.current.resetFileName) fileUploadButtonRef.current.resetFileName();
			await refetchData();
		} catch (err) {
			console.error('Submission Error:', err);
			setError(
				`Submission Error: ${err instanceof Error ? err.message : 'An unexpected error occurred.'}`
			);
			setSuccessMessage(null);
		}
	};

	const resetForm = () => {
		setName('');
		setAddress('');
		setPostCode('');
		setCountryId(null);
		setCityId(null);
		setCityPartId(null);
		setType('country');
		setIcon(null);
		setCurrentIcon({ iconId: null, iconUrl: null });
		setError('');
		setNewIcon(null);
		setIsIconPickerOpen(false);
	};

	return (
		<PageContainer>
			<H1 title={title} />
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			{successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}

			<NewLocationForm
				languageId={languageId}
				onSubmit={handleSubmit}
				name={name}
				setName={setName}
				countryId={countryId}
				setCountryId={setCountryId}
				type={type}
				setType={setType}
				countries={countries}
				cityId={cityId}
				setCityId={setCityId}
				cityPartId={cityPartId}
				setCityPartId={setCityPartId}
				setIcon={setIcon}
				setIsIconPickerOpen={setIsIconPickerOpen}
				postCode={postCode}
				setPostCode={setPostCode}
				address={address}
				setAddress={setAddress}
				cities={cities}
				locations={locations}
			/>
			<div className='mt-8'>
				<LocationList
					locations={locations}
					icons={icons}
					currentIcon={currentIcon}
					setCurrentIcon={setCurrentIcon}
					languages={languages}
					languageId={languageId}
					refetchLocations={refetchData}
					onDeleteLocation={async id => {
						try {
							await axios.delete(`/api/locations/${id}`);
							await refetchData();
						} catch (err) {
							console.error('Failed to delete location', err);
						}
					}}
					expandedLocations={expandedLocations}
					setExpandedLocations={setExpandedLocations}
					manuallyExpandedLocations={manuallyExpandedLocations}
					setManuallyExpandedLocations={setManuallyExpandedLocations}
					filteredLocations={filteredLocations}
					setFilteredLocations={setFilteredLocations}
					initialExpandedLocations={initialExpandedLocations}
					setInitialExpandedLocations={setInitialExpandedLocations}
					newIcon={newIcon}
					setNewIcon={setNewIcon}
					setIsIconPickerOpen={setIsIconPickerOpen}
					postCode={postCode}
					setPostCode={setPostCode}
					address={address}
					setAddress={setAddress}
				/>
			</div>
			<ImagePickerForm
				icons={icons}
				isOpen={isIconPickerOpen}
				onSelect={setCurrentIcon}
				onClose={() => setIsIconPickerOpen(false)}
			/>
		</PageContainer>
	);
};

export default LocationsAdmin;
