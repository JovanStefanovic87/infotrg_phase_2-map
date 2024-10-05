'use client';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import LocationList from '@/app/components/lists/LocationList';
import { Location, Language, Icon, CurrentIcon } from '@/utils/helpers/types';
import NewLocationForm from '../forms/NewLocationForm';
import ImagePickerForm from '../forms/ImagePickerForm';
import DynamicPageContainer from '../containers/DynamicPageContainer.';
import { handleError } from '@/utils/helpers/universalFunctions';

// Import the API hooks from TanStack
import { useFetchLocations, useCreateLocation } from '@/app/helpers/api/location';
import { useFetchLanguages } from '@/app/helpers/api/language';
import { useFetchIcons, useUploadIcon } from '@/app/helpers/api/icon';

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
	const [loading, setLoading] = useState<boolean>(true);
	const [locations, setLocations] = useState<Location[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);
	const [type, setType] = useState<'country' | 'city' | 'cityPart' | 'marketplace'>('country');
	const [countryId, setCountryId] = useState<number | null>(null);
	const [cityId, setCityId] = useState<number | null>(null);
	const [cityPartId, setCityPartId] = useState<number | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});
	const [currentIcon, setCurrentIcon] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [expandedLocations, setExpandedLocations] = useState<Set<number>>(new Set());
	const [manuallyExpandedLocations, setManuallyExpandedLocations] = useState<Set<number>>(
		new Set()
	);
	const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
	const [initialExpandedLocations, setInitialExpandedLocations] = useState<Set<number>>(new Set());

	// Use TanStack Query for fetching data
	const {
		data: locationsData,
		isLoading: isLoadingLocations,
		refetch: refetchLocations,
	} = useFetchLocations({
		prefix,
		languageId,
	});
	const { data: languagesData, isLoading: isLoadingLanguages } = useFetchLanguages();
	const { data: iconsData, isLoading: isLoadingIcons } = useFetchIcons({ directory: 'locations' });

	// Use TanStack Mutation hooks for creating locations and uploading icons
	const createLocationMutation = useCreateLocation();
	const uploadIconMutation = useUploadIcon();

	const handleDeleteLocation = async (id: number) => {
		try {
			await axios.delete(`/api/locations/${id}`);
			await refetchLocations();
			setSuccessMessage('Lokacija uspešno obrisana.');
			setError('');
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
		}
	};

	useEffect(() => {
		setLoading(isLoadingLocations || isLoadingLanguages || isLoadingIcons);
	}, [isLoadingLocations, isLoadingLanguages, isLoadingIcons]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			let iconId = currentIcon.iconId;

			if (icon) {
				const iconResponse = await uploadIconMutation.mutateAsync({
					icon: icon,
					directory: 'locations',
				});

				if (iconResponse.data.iconId) {
					iconId = iconResponse.data.iconId;
				} else {
					throw new Error('Icon upload failed, iconId is missing.');
				}
			}

			const { data: labelResponse } = await axios.post('/api/labels', {
				name,
				prefix,
			});
			const labelId = labelResponse.id;

			const locationData: Record<string, any> = {
				labelId,
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

			// Create location using TanStack Mutation
			await createLocationMutation.mutateAsync(locationData);

			const translations = languages.map(language => ({
				labelId,
				languageId: language.id,
				translation: name,
			}));

			await axios.post('/api/translation', { translations });

			// Reset the form and show success message
			resetForm();
			setSuccessMessage('Lokacija uspešno sačuvana.');
			if (fileUploadButtonRef.current.resetFileName) fileUploadButtonRef.current.resetFileName();
			refetchLocations();
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
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

	// Ensure states are updated after the data is fetched
	useEffect(() => {
		if (locationsData) setLocations(locationsData);
		if (languagesData) setLanguages(languagesData);
		if (iconsData) setIcons(iconsData);
	}, [locationsData, languagesData, iconsData]);

	return (
		<DynamicPageContainer
			clearSuccess={() => setSuccessMessage(null)}
			successMessage={successMessage}
			error={error}
			clearError={() => setError('')}
			loading={loading}
			title={title}>
			<NewLocationForm
				languageId={languageId}
				onSubmit={handleSubmit}
				name={name}
				setName={setName}
				countryId={countryId}
				setCountryId={setCountryId}
				type={type}
				setType={setType}
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
				locations={locations}
			/>

			<div className='mt-8'>
				<LocationList
					locations={locations}
					currentIcon={currentIcon}
					setCurrentIcon={setCurrentIcon}
					languages={languages}
					languageId={languageId}
					refetchLocations={async () => {
						await refetchLocations();
					}}
					expandedLocations={expandedLocations}
					setExpandedLocations={setExpandedLocations}
					manuallyExpandedLocations={manuallyExpandedLocations}
					setManuallyExpandedLocations={setManuallyExpandedLocations}
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
					setSuccessMessage={setSuccessMessage}
					setError={setError}
				/>
			</div>

			<ImagePickerForm
				icons={icons}
				isOpen={isIconPickerOpen}
				onSelect={setCurrentIcon}
				onClose={() => setIsIconPickerOpen(false)}
			/>
		</DynamicPageContainer>
	);
};

export default LocationsAdmin;
