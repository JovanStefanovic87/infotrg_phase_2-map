'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import LocationList from '@/app/components/lists/LocationList';
import {
	Location,
	Language,
	Translation,
	Icon,
	CurrentIcon,
	City,
	Country,
} from '@/utils/helpers/types';
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
	const [parentId, setParentId] = useState<number | null>(null); // Changed from parentIds (single parent for locations)
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [locations, setLocations] = useState<Location[]>([]); // Now handling locations
	const [languages, setLanguages] = useState<Language[]>([]);
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);
	const [type, setType] = useState<'country' | 'city' | 'cityPart'>('country');
	const [countries, setCountries] = useState<Country[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [cityId, setCityId] = useState<number | null>(null);
	const [iconId, setIconId] = useState<number | null>(null);
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

	const fetchLocations = () =>
		apiClient<Location[]>({
			method: 'GET',
			url: `/api/locations?prefix=${prefix}`,
		});

	const fetchLanguages = () => apiClient<Language[]>({ method: 'GET', url: '/api/languages' });
	const fetchIcons = () =>
		apiClient<Icon[]>({ method: 'GET', url: '/api/icons?directory=locations' });

	const fetchTranslations = async (languageId: number): Promise<Translation[]> => {
		const labels = await apiClient<{ id: number }[]>({
			method: 'GET',
			url: `/api/labels?languageId=${languageId}&prefix=${prefix}`,
		});

		const translationsPromises = labels.map(({ id }) =>
			apiClient<Translation>({
				method: 'GET',
				url: `/api/translation?languageId=${languageId}&labelId=${id}`,
			})
		);

		return (await Promise.all(translationsPromises)).map(res => res);
	};

	const refetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [locationsData, translationsData, iconsData] = await Promise.all([
				fetchLocations(),
				fetchTranslations(languageId),
				fetchIcons(),
			]);
			setLocations(locationsData);
			setTranslations(translationsData);
			setIcons(iconsData);

			// Filter fetched locations and retain expanded locations
			setFilteredLocations(locationsData);
		} catch (error) {
			console.error('Failed to refetch data', error);
		} finally {
			setLoading(false);
		}
	}, [languageId]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	// Fetch languages when component is mounted
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

	useEffect(() => {
		if (languageId) {
			const fetchTranslationsData = async () => {
				setLoading(true);
				try {
					const data = await fetchTranslations(languageId);
					setTranslations(data);
				} catch (err) {
					console.error('Failed to fetch translations', err);
				} finally {
					setLoading(false);
				}
			};
			fetchTranslationsData();
		}
	}, [languageId]);

	useEffect(() => {
		const fetchLocationsAndIcons = async () => {
			try {
				const [fetchedCountries, fetchedIcons] = await Promise.all([
					axios.get(`/api/countries?prefix=location_`),
					axios.get('/api/icons?directory=locations'),
				]);

				setCountries(fetchedCountries.data);
				setIcons(fetchedIcons.data);

				const translatedCountriesData = await Promise.all(
					fetchedCountries.data.map(async (country: Country) => {
						const translationResponse = await axios.get(
							`/api/translation?labelId=${country.label.id}&languageId=${languageId}`
						);
						const translation = translationResponse.data.translation || country.label.name;
						return {
							...country,
							label: { ...country.label, name: translation },
						};
					})
				);
				setCountries(translatedCountriesData);
			} catch (error) {
				console.error('Failed to fetch data', error);
			}
		};

		fetchLocationsAndIcons();
	}, [type]);

	useEffect(() => {
		const fetchCities = async () => {
			if (parentId) {
				try {
					const response = await axios.get(`/api/cities?countryId=${parentId}`);
					setCities(response.data);

					const translatedCitiesData = await Promise.all(
						response.data.map(async (city: City) => {
							const translationResponse = await axios.get(
								`/api/translation?labelId=${city.label.id}&languageId=${languageId}`
							);
							const translation = translationResponse.data.translation || city.label.name;
							return { ...city, label: { ...city.label, name: translation } };
						})
					);
					setCities(translatedCitiesData);
				} catch (error) {
					console.error('Failed to fetch cities', error);
				}
			} else {
				setCities([]);
			}
		};

		if (type === 'cityPart' || type === 'city') {
			fetchCities();
		}
	}, [parentId, type]);

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

			const { data: locationData } = await axios.post('/api/locations', {
				parentId,
				labelId: newLabelId,
				iconId,
				name,
				type,
			});

			if (!locationData) throw new Error('Failed to create location');

			const translationsArray = [
				{
					labelId: newLabelId,
					languageId: languageId,
					translation: name,
				},
				...languages
					.filter(lang => lang.id !== languageId)
					.map(lang => ({
						labelId: newLabelId,
						languageId: lang.id,
						translation: null,
					})),
			];

			if (translationsArray.length) {
				await axios.post('/api/translation', { translations: translationsArray });
			}

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

	const handleFileChange = (file: File | null) => setIcon(file);
	const handleResetFileName = () =>
		fileUploadButtonRef.current.resetFileName && fileUploadButtonRef.current.resetFileName();
	const resetForm = () => {
		setName('');
		setParentId(null);
		setLanguageId(1);
		setIcon(null);
		setError('');
	};

	const handleEditLocation = useCallback(
		async (
			id: number,
			data: {
				translations: { translationId: number | null; languageId: number; translation: string }[];
				icon?: File | null;
				parentId: number | null;
			}
		) => {
			const { translations, icon: newIcon, parentId } = data;

			try {
				let iconId: number | null = currentIcon.iconId;

				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					formData.append('directory', 'locations');
					const { data } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = data.iconId;
				}

				const translationsArray = translations.map(translation => ({
					translationId: translation.translationId,
					languageId: translation.languageId,
					translation: translation.translation ?? '',
				}));

				await axios.put(`/api/locations/${id}`, {
					iconId,
					parentId, // Now handling single parent location
					translations: translationsArray,
					labelId: id,
					name,
				});

				setSuccessMessage('Location updated successfully.');
				await refetchData();
			} catch (err) {
				console.error('Failed to update location', err);
				setError(
					`Update Error: ${err instanceof Error ? err.message : 'An unexpected error occurred.'}`
				);
				setSuccessMessage(null);
			}
		},
		[currentIcon, refetchData]
	);

	return (
		<PageContainer>
			<H1 title={title} />
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			{successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}

			<NewLocationForm
				onSubmit={handleSubmit}
				languageId={languageId}
				name={name}
				setName={setName}
				parentId={parentId}
				setParentId={setParentId}
				type={type}
				setType={setType}
				countries={countries}
				cities={cities}
				setCities={setCities}
				cityId={cityId}
				setCityId={setCityId}
				icons={icons}
				icon={icon}
				setIcon={setIcon}
				iconId={iconId}
				setIconId={setIconId}
				isIconPickerOpen={isIconPickerOpen}
				setIsIconPickerOpen={setIsIconPickerOpen}
			/>
			<div className='mt-8'>
				<LocationList
					locations={locations}
					translations={translations}
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
