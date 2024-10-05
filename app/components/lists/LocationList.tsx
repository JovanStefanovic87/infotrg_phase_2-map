import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
	Location,
	City,
	CityPart,
	Language,
	Icon,
	CurrentIcon,
	Translation,
} from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import LocationItem from './LocationItem';
import EditLocationForm from '../forms/EditLocationForm';
import { handleError } from '@/utils/helpers/universalFunctions';
import axios from 'axios';

interface LocationListProps {
	locations: Location[];
	currentIcon: CurrentIcon;
	setCurrentIcon: React.Dispatch<React.SetStateAction<CurrentIcon>>;
	languages: Language[];
	languageId: number;
	refetchLocations: () => Promise<void>;
	expandedLocations: Set<number>;
	setExpandedLocations: React.Dispatch<React.SetStateAction<Set<number>>>;
	manuallyExpandedLocations: Set<number>;
	setManuallyExpandedLocations: React.Dispatch<React.SetStateAction<Set<number>>>;
	setFilteredLocations: React.Dispatch<React.SetStateAction<Location[]>>;
	initialExpandedLocations: Set<number>;
	setInitialExpandedLocations: React.Dispatch<React.SetStateAction<Set<number>>>;
	newIcon: File | null;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	postCode: string;
	setPostCode: React.Dispatch<React.SetStateAction<string>>;
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
}

const LocationList: React.FC<LocationListProps> = ({
	locations,
	currentIcon,
	setCurrentIcon,
	languages,
	languageId,
	refetchLocations,
	expandedLocations,
	setExpandedLocations,
	manuallyExpandedLocations,
	setManuallyExpandedLocations,
	setFilteredLocations,
	initialExpandedLocations,
	setInitialExpandedLocations,
	newIcon,
	setNewIcon,
	setIsIconPickerOpen,
	postCode,
	setPostCode,
	address,
	setAddress,
	setSuccessMessage,
	setError,
}) => {
	const [currentEditLocation, setCurrentEditLocation] = useState<Location | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isTranslationModalOpen, setIsTranslationModalOpen] = useState<boolean>(false);

	const handleOpenTranslationModal = (location: Location) => {
		setCurrentEditLocation(location);
		setIsTranslationModalOpen(true);
		setCurrentIcon({
			iconId: location.icon?.id || null,
			iconUrl: location.icon?.url || null,
		});
	};

	const handleSubmitEdit = async (
		updatedTranslations: Translation[],
		newIcon: File | null,
		currentIconId: number | null,
		locationId: number,
		type: string,
		postCode: string = '',
		address: string = ''
	) => {
		try {
			let iconId = currentIconId;

			if (newIcon) {
				const formData = new FormData();
				formData.append('icon', newIcon);
				formData.append('directory', 'locations');

				const { data: iconData } = await axios.post('/api/icons', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});

				iconId = iconData?.iconId;
			}

			await axios.put('/api/translation/locations', {
				translations: updatedTranslations,
			});

			const updateData: Record<string, any> = {
				iconId,
			};

			if (type === 'city' || type === 'cityPart') {
				if (postCode && postCode.trim() !== '') {
					updateData.postCode = postCode;
				}
			}

			if (type === 'marketplace') {
				if (address && address.trim() !== '') {
					updateData.address = address;
				}
			}

			if (iconId || updateData.postCode) {
				await axios.put(`/api/locations/${locationId}?type=${type}`, updateData);
			}

			setIsTranslationModalOpen(false);
			await refetchLocations();
			setSuccessMessage('Lokacija uspešno ažurirana.');
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
		}
	};

	const handleDeleteLocation = async (id: number, type: string) => {
		const confirmed = window.confirm('Da li ste sigurni da želite da obrišete ovu lokaciju?');
		if (!confirmed) return;

		try {
			await axios.delete(`/api/locations/${id}?type=${type}`);
			await refetchLocations();
			setSuccessMessage('Lokacija uspešno obrisana.');
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
		}
	};

	const handleCloseModal = () => {
		setIsTranslationModalOpen(false);
		setCurrentIcon({ iconId: null, iconUrl: null });
		setNewIcon(null);
		setCurrentEditLocation(null);
	};

	// Logika za sortiranje po abecedi
	const sortedLocations = useMemo(() => {
		const getTranslation = (location: Location): string => {
			const translationForLang = location.label.translations.find(
				translation => translation.languageId === languageId
			);
			return translationForLang?.translation?.toLowerCase() || location.label.name.toLowerCase();
		};

		const recursiveSort = (locations: Location[]): Location[] => {
			const sortedLocations = locations.sort((a, b) => {
				const nameA = getTranslation(a);
				const nameB = getTranslation(b);
				return nameA.localeCompare(nameB);
			});

			return sortedLocations.map(location => {
				// Sort cities
				if ('cities' in location && Array.isArray(location.cities)) {
					location.cities = recursiveSort(location.cities as City[]) as City[];
				}

				// Sort cityParts
				if ('cityParts' in location && Array.isArray(location.cityParts)) {
					location.cityParts = recursiveSort(location.cityParts as CityPart[]) as CityPart[];
				}

				return location;
			});
		};

		return recursiveSort(locations);
	}, [locations, languageId]);

	const searchLocations = useCallback((locations: Location[], query: string) => {
		const lowercasedQuery = query.toLowerCase();
		const expandedIds = new Set<number>();

		const recursiveSearch = (locations: Location[]): Location[] => {
			return locations
				.map(location => {
					const locationName = location.label.name.toLowerCase();

					const matches = locationName.includes(lowercasedQuery);
					let matchingCities: Location[] = [];
					let matchingCityParts: Location[] = [];
					let matchingMarketplaces: Location[] = [];

					if ('cities' in location) {
						matchingCities = recursiveSearch(location.cities);
					}

					if ('cityParts' in location) {
						matchingCityParts = recursiveSearch(location.cityParts);
					}

					if ('marketplaces' in location) {
						matchingMarketplaces = recursiveSearch(location.marketplaces as Location[]);
					}

					if (
						matches ||
						matchingCities.length > 0 ||
						matchingCityParts.length > 0 ||
						matchingMarketplaces.length > 0
					) {
						expandedIds.add(location.id);

						return {
							...location,
							cities: matchingCities.length > 0 ? matchingCities : [],
							cityParts: matchingCityParts.length > 0 ? matchingCityParts : [],
							marketplaces: matchingMarketplaces.length > 0 ? matchingMarketplaces : [],
						};
					}

					return null;
				})
				.filter(Boolean) as Location[];
		};

		const filteredLocations = recursiveSearch(locations);
		return { filteredLocations, expandedIds };
	}, []);

	useEffect(() => {
		const expandedIds = new Set<number>();
		locations.forEach(location => {
			if ('cities' in location && Array.isArray(location.cities) && location.cities.length > 0) {
				expandedIds.add(location.id);
			} else if (
				'cityParts' in location &&
				Array.isArray(location.cityParts) &&
				location.cityParts.length > 0
			) {
				expandedIds.add(location.id);
			}
		});

		setExpandedLocations(expandedIds);
		setFilteredLocations(locations);
	}, [locations, setExpandedLocations, setFilteredLocations]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredLocations(locations);
			setExpandedLocations(new Set(initialExpandedLocations));
		} else {
			const { filteredLocations: filtered, expandedIds } = searchLocations(locations, searchQuery);
			setFilteredLocations(filtered);
			setExpandedLocations(expandedIds);
		}
	}, [searchQuery, locations]);

	const toggleLocation = (id: number) => {
		setManuallyExpandedLocations(prev => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});

		setExpandedLocations(prev => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	useEffect(() => {
		setInitialExpandedLocations(new Set(manuallyExpandedLocations));
	}, [manuallyExpandedLocations]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setExpandedLocations(new Set(initialExpandedLocations));
		}
	}, [searchQuery, initialExpandedLocations]);

	const handleSetCurrentIcon = (icon: Icon | null) => {
		if (icon) {
			setCurrentIcon({
				iconId: icon.id,
				iconUrl: icon.url,
			});
		} else {
			setCurrentIcon({
				iconId: null,
				iconUrl: null,
			});
		}
	};

	return (
		<div>
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Search locations'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border p-2 w-full text-black'
				/>
			</div>

			{sortedLocations.map(location => (
				<LocationItem
					key={location.id}
					location={location}
					languageId={languageId}
					handleDelete={handleDeleteLocation}
					setCurrentEditLocation={setCurrentEditLocation}
					setParentId={() => {}}
					toggleLocation={toggleLocation}
					expandedLocations={expandedLocations}
					locations={locations}
					handleOpenTranslationModal={handleOpenTranslationModal}
					languages={languages}
				/>
			))}

			{isTranslationModalOpen && currentEditLocation && (
				<CustomModal isOpen={isTranslationModalOpen} onRequestClose={handleCloseModal}>
					<EditLocationForm
						currentLocation={currentEditLocation}
						currentTranslations={currentEditLocation.label.translations} // Pass the translations
						languages={languages}
						handleSubmitEdit={handleSubmitEdit}
						currentIcon={currentIcon?.iconUrl || null}
						currentIconId={currentIcon?.iconId || null}
						newIcon={newIcon}
						setNewIcon={setNewIcon}
						setCurrentIcon={handleSetCurrentIcon}
						setIsIconPickerOpen={setIsIconPickerOpen}
						locationId={currentEditLocation?.id || null}
						type={currentEditLocation?.type || ''}
						postCode={postCode}
						setPostCode={setPostCode}
						address={address}
						setAddress={setAddress}
						setError={setError}
						setSuccessMessage={setSuccessMessage}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default LocationList;
