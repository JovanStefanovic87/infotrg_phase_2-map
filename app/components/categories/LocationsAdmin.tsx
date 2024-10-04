'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import LocationList from '@/app/components/lists/LocationList';
import { Location, Language, Icon, CurrentIcon, Country, City } from '@/utils/helpers/types';
import PageContainer from '@/app/components/containers/PageContainer';
import NewLocationForm from '../forms/NewLocationForm';
import ImagePickerForm from '../forms/ImagePickerForm';
import H1 from '@/app/components/text/H1';

// Import the API hooks from TanStack
import { useFetchLocations, useCreateLocation } from '@/app/helpers/api/location';
import { useFetchLanguages } from '@/app/helpers/api/language';
import { useFetchIcons, useUploadIcon } from '@/app/helpers/api/icon';

interface Props {
	prefix: string;
	title: string;
}

const LocationsAdmin: React.FC<Props> = ({ prefix, title }) => {
	// Keep the useState hooks unchanged
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
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});
	const [currentIcon, setCurrentIcon] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [expandedLocations, setExpandedLocations] = useState<Set<number>>(new Set());
	const [manuallyExpandedLocations, setManuallyExpandedLocations] = useState<Set<number>>(
		new Set()
	);
	const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
	const [initialExpandedLocations, setInitialExpandedLocations] = useState<Set<number>>(new Set());

	// Use TanStack Query for fetching data
	const { data: locationsData, refetch: refetchLocations } = useFetchLocations({
		prefix,
		languageId,
	});
	const { data: languagesData } = useFetchLanguages();
	const { data: iconsData } = useFetchIcons({ directory: 'locations' });

	// Use TanStack Mutation hooks for creating locations and uploading icons
	const createLocationMutation = useCreateLocation();
	const uploadIconMutation = useUploadIcon();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			let iconId = currentIcon.iconId;

			// If new icon is selected, upload it using the TanStack Mutation
			if (icon) {
				const iconResponse = await uploadIconMutation.mutateAsync({
					icon: icon,
					directory: 'locations',
				});
				console.log(iconResponse); // This should show the correct structure

				if (iconResponse.data.iconId) {
					// Access iconId directly
					iconId = iconResponse.data.iconId;
				} else {
					throw new Error('Icon upload failed, iconId is missing.');
				}
			}

			// Ensure the Label exists and get its numeric ID
			const { data: labelResponse } = await axios.post('/api/labels', {
				name,
				prefix,
			});
			const labelId = labelResponse.id; // Make sure `labelId` is now a number

			// Prepare location data for the API request
			const locationData: Record<string, any> = {
				labelId, // Pass the numeric labelId here
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

			// Prepare and send translations
			const translations = languages.map(language => ({
				labelId,
				languageId: language.id,
				translation: name,
			}));

			console.log('Translations in Locations:', translations);

			await axios.post('/api/translation', { translations });

			// Reset the form and show success message
			resetForm();
			setSuccessMessage('Location successfully saved.');
			if (fileUploadButtonRef.current.resetFileName) fileUploadButtonRef.current.resetFileName();
			refetchLocations(); // Refetch locations after successful creation
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

	// Ensure states are updated after the data is fetched
	useEffect(() => {
		if (locationsData) setLocations(locationsData);
		if (languagesData) setLanguages(languagesData);
		if (iconsData) setIcons(iconsData);
	}, [locationsData, languagesData, iconsData]);

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
				countries={countries || []}
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
					refetchLocations={async () => {
						await refetchLocations();
					}}
					onDeleteLocation={async id => {
						try {
							await axios.delete(`/api/locations/${id}`);
							refetchLocations();
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
