'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import LocationList from '@/app/components/lists/LocationList';
import { Location, Language, Icon, CurrentIcon } from '@/utils/helpers/types';
import NewLocationForm from '../forms/NewLocationForm';
import ImagePickerForm from '../forms/ImagePickerForm';
import DynamicPageContainer from '../containers/DynamicPageContainer';
import { handleError } from '@/utils/helpers/universalFunctions';
import { useFetchLocations, useCreateLocation } from '@/app/helpers/api/location';
import { useFetchLanguages } from '@/app/helpers/api/language';

interface Props {
	prefix: string;
	title: string;
}

const LocationsAdmin: React.FC<Props> = ({ prefix, title }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [languageId, setLanguageId] = useState<number>(1);
	const [locations, setLocations] = useState<Location[]>([]);
	const [name, setName] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [postCode, setPostCode] = useState<string>('');
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [currentIcon, setCurrentIcon] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [type, setType] = useState<'state' | 'county' | 'city' | 'suburb'>('state');
	const [stateId, setStateId] = useState<number | null>(null);
	const [countyId, setCountyId] = useState<number | null>(null);
	const [cityId, setCityId] = useState<number | null>(null);
	const [expandedLocations, setExpandedLocations] = useState<Set<number>>(new Set());
	const [manuallyExpandedLocations, setManuallyExpandedLocations] = useState<Set<number>>(
		new Set()
	);
	const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
	const [initialExpandedLocations, setInitialExpandedLocations] = useState<Set<number>>(new Set());
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	const {
		data: locationsData,
		isLoading: isLoadingLocations,
		refetch: refetchLocations,
	} = useFetchLocations({
		prefix,
		languageId,
	});
	const { data: languagesData, isLoading: isLoadingLanguages } = useFetchLanguages();

	// API poziv za dohvat ikona direktno u useEffect
	useEffect(() => {
		const fetchIcons = async () => {
			try {
				const response = await axios.get('/api/icons', {
					params: { directory: 'locations' },
				});
				setIcons(response.data);
			} catch (error) {
				console.error('Error fetching icons:', error);
				setError('Neuspešno preuzimanje ikona');
			}
		};

		fetchIcons();
	}, []);

	// Use TanStack Mutation hook za kreiranje lokacije
	const createLocationMutation = useCreateLocation();

	useEffect(() => {
		setLoading(isLoadingLocations || isLoadingLanguages);
	}, [isLoadingLocations, isLoadingLanguages]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			let iconId = currentIcon.iconId;

			if (icon) {
				const formData = new FormData();
				formData.append('icon', icon);
				formData.append('directory', 'locations');

				const iconResponse = await axios.post('/api/icons', formData);

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

			if (type === 'county' && stateId) {
				locationData.stateId = stateId;
				locationData.postCode = postCode;
			} else if (type === 'city' && countyId) {
				locationData.countyId = countyId;
				locationData.postCode = postCode;
			} else if (type === 'suburb' && cityId) {
				locationData.cityId = cityId;
				locationData.address = address;
			}

			await createLocationMutation.mutateAsync(locationData);

			const translations = languages.map(language => ({
				labelId,
				languageId: language.id,
				translation: name,
				type,
			}));

			await axios.post('/api/translation', { translations });

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
		setStateId(null);
		setCountyId(null);
		setCityId(null);
		setType('state');
		setIcon(null);
		setCurrentIcon({ iconId: null, iconUrl: null });
		setError('');
		setNewIcon(null);
		setIsIconPickerOpen(false);
	};

	useEffect(() => {
		if (locationsData) setLocations(locationsData);
		if (languagesData) setLanguages(languagesData);
	}, [locationsData, languagesData]);

	const memoizedRefetchLocations = useCallback(async () => {
		await refetchLocations();
	}, [refetchLocations]);

	const memoizedSetInitialExpandedLocations = useCallback(
		(newSet: React.SetStateAction<Set<number>>) => {
			setInitialExpandedLocations(newSet);
		},
		[]
	);

	const memoizedSetExpandedLocations = useCallback((newSet: React.SetStateAction<Set<number>>) => {
		setExpandedLocations(newSet);
	}, []);

	const memoizedSetFilteredLocations = useCallback(
		(locations: React.SetStateAction<Location[]>) => {
			setFilteredLocations(locations);
		},
		[]
	);

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
				stateId={stateId}
				setStateId={setStateId}
				type={type}
				setType={setType}
				countyId={countyId}
				setCountyId={setCountyId}
				cityId={cityId}
				setCityId={setCityId}
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
					refetchLocations={memoizedRefetchLocations}
					expandedLocations={expandedLocations}
					setExpandedLocations={memoizedSetExpandedLocations}
					manuallyExpandedLocations={manuallyExpandedLocations}
					setManuallyExpandedLocations={setManuallyExpandedLocations}
					setFilteredLocations={memoizedSetFilteredLocations}
					initialExpandedLocations={initialExpandedLocations}
					setInitialExpandedLocations={memoizedSetInitialExpandedLocations}
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
