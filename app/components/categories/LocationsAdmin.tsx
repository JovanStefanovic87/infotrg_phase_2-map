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
	CityPart,
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
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [address, setAddress] = useState<string>(''); // New state for marketplace address
	const [postCode, setPostCode] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [locations, setLocations] = useState<Location[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);
	const [type, setType] = useState<'country' | 'city' | 'cityPart' | 'marketplace'>('country');
	const [countries, setCountries] = useState<Country[]>([]);
	const [countryId, setCountryId] = useState<number | null>(null);
	const [cities, setCities] = useState<City[]>([]);
	const [cityId, setCityId] = useState<number | null>(null);
	const [cityParts, setCityParts] = useState<CityPart[]>([]);
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
				url: `/api/locations?prefix=${prefix}`,
			});
			return response;
		} catch (error) {
			console.error('Error fetching locations:', error); // Catch any errors
			throw error; // Rethrow to handle later
		}
	};

	const fetchLanguages = () => apiClient<Language[]>({ method: 'GET', url: '/api/languages' });
	const fetchIcons = () =>
		apiClient<Icon[]>({ method: 'GET', url: '/api/icons?directory=locations' });

	const fetchTranslations = async (): Promise<Translation[]> => {
		const labels = await apiClient<{ id: number }[]>({
			method: 'GET',
			url: `/api/labels?prefix=${prefix}&languageId=${languageId}`,
		});

		const languages = await apiClient<Language[]>({
			method: 'GET',
			url: '/api/languages',
		});

		const translationsPromises = labels.flatMap(({ id }) =>
			languages.map(({ id: languageId }) =>
				apiClient<Translation>({
					method: 'GET',
					url: `/api/translation?languageId=${languageId}&labelId=${id}`,
				})
			)
		);

		const translationsResults = await Promise.all(translationsPromises);
		return translationsResults.map(res => res);
	};

	const refetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [locationsData, translationsData, iconsData] = await Promise.all([
				fetchLocations(),
				fetchTranslations(),
				fetchIcons(),
			]);
			setLocations(locationsData);
			setTranslations(translationsData);
			setIcons(iconsData);
		} catch (error) {
			console.error('Failed to refetch data', error);
		} finally {
			setLoading(false);
		}
	}, []);

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

	useEffect(() => {
		if (languageId) {
			const fetchTranslationsData = async () => {
				setLoading(true);
				try {
					const data = await fetchTranslations();
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
			if (countryId) {
				try {
					const response = await axios.get(`/api/locations?countryId=${countryId}`);
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
			}
		};

		if (type === 'cityPart' || type === 'city' || type === 'marketplace') {
			fetchCities();
		}
	}, [countryId, type]);

	useEffect(() => {
		if (cityId) {
			const fetchCityParts = async () => {
				const response = await fetch(`/api/locations?cityId=${cityId}`);
				const data = await response.json();
				setCityParts(data);
			};
			fetchCityParts();
		} else {
			setCityParts([]);
		}
	}, [cityId, setCityParts]);

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

			const translationsArray = [
				{
					labelId: newLabelId,
					languageId,
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

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setNewIcon(event.target.files[0]);
		}
	};

	const handleResetFileName = () =>
		fileUploadButtonRef.current.resetFileName && fileUploadButtonRef.current.resetFileName();
	const resetForm = () => {
		setName('');
		setCountryId(null);
		setLanguageId(1);
		setIcon(null);
		setAddress(''); // Reset address for marketplace
		setError('');
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
				cityPartId={cityPartId} // Pass the cityPartId state to the form
				setCityPartId={setCityPartId} // Pass the setter function to the form
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
