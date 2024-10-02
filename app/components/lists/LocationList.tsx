import React, { useState, useEffect, useMemo, use } from 'react';
import {
	Location,
	City,
	CityPart,
	Language,
	Translation,
	Icon,
	CurrentIcon,
} from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import LocationItem from './LocationItem';
import EditLocationForm from '../forms/EditLocationForm';
import axios from 'axios';

interface LocationListProps {
	locations: Location[];
	translations: Translation[];
	icons: Icon[];
	currentIcon: CurrentIcon;
	setCurrentIcon: React.Dispatch<React.SetStateAction<CurrentIcon>>;
	languages: Language[];
	languageId: number;
	refetchLocations: () => Promise<void>;
	onDeleteLocation: (id: number) => Promise<void>;
	expandedLocations: Set<number>;
	setExpandedLocations: React.Dispatch<React.SetStateAction<Set<number>>>;
	manuallyExpandedLocations: Set<number>;
	setManuallyExpandedLocations: React.Dispatch<React.SetStateAction<Set<number>>>;
	filteredLocations: Location[];
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
}

const LocationList: React.FC<LocationListProps> = ({
	locations,
	translations,
	icons,
	currentIcon,
	setCurrentIcon,
	languages,
	languageId,
	refetchLocations,
	onDeleteLocation,
	expandedLocations,
	setExpandedLocations,
	manuallyExpandedLocations,
	setManuallyExpandedLocations,
	filteredLocations,
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
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditLocation, setCurrentEditLocation] = useState<Location | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isTranslationModalOpen, setIsTranslationModalOpen] = useState<boolean>(false);
	const [currentTranslations, setCurrentTranslations] = useState<Translation[]>([]);

	console.log('address:', address);

	const handleOpenTranslationModal = (location: Location) => {
		setCurrentEditLocation(location);
		const locationTranslations = translations.filter(t => t.labelId === location.label.id);
		setCurrentTranslations(locationTranslations);
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
		} catch (error) {
			console.error('Failed to update translations and icon', error);
		}
	};

	const handleDeleteLocation = async (id: number, type: string) => {
		const confirmed = window.confirm('Da li ste sigurni da želite da obrišete ovu lokaciju?');
		if (!confirmed) return;

		try {
			await axios.delete(`/api/locations/${id}?type=${type}`);
			await refetchLocations();
		} catch (error) {
			console.error('Greška prilikom brisanja lokacije:', error);
		}
	};

	const handleCloseModal = () => {
		setIsTranslationModalOpen(false);
		setCurrentIcon({ iconId: null, iconUrl: null });
		setNewIcon(null);
		setCurrentEditLocation(null);
		setCurrentTranslations([]);
	};

	const topLevelLocations = useMemo(() => {
		return locations.filter(location => 'cities' in location || 'parts' in location);
	}, [locations]);

	const sortLocationsAlphabetically = (locations: Location[]) => {
		const getTranslation = (location: Location): string => {
			const translationForLang1 = (location.label.translations as unknown as Translation[]).find(
				(translation: Translation) => translation.languageId === 1
			);
			return translationForLang1?.translation?.toLowerCase() || '';
		};

		const recursiveSort = (locations: Location[]): Location[] => {
			const sortedLocations = locations.sort((a, b) => {
				const nameA = getTranslation(a);
				const nameB = getTranslation(b);
				return nameA.localeCompare(nameB);
			});

			return sortedLocations.map(location => {
				if ('cities' in location && Array.isArray(location.cities)) {
					location.cities = recursiveSort(
						location.cities.filter((loc): loc is City => 'postCode' in loc && 'countryId' in loc)
					) as City[];
				}
				if ('parts' in location && Array.isArray(location.parts)) {
					location.parts = recursiveSort(
						location.parts.filter((loc): loc is CityPart => 'postCode' in loc && 'cityId' in loc)
					) as CityPart[];
				}
				return location;
			});
		};

		return recursiveSort(locations);
	};

	const sortedLocations = sortLocationsAlphabetically(locations);

	const searchLocations = (locations: Location[], query: string) => {
		const lowercasedQuery = query.toLowerCase();
		const expandedIds = new Set<number>();

		const recursiveSearch = (locations: Location[]): Location[] => {
			return locations
				.map(location => {
					const primaryTranslation = Array.isArray(location.label.translations)
						? (location.label.translations as unknown as Translation[]).find(
								(translation: Translation) => translation.languageId === 1
						  )
						: undefined;

					const locationName = primaryTranslation?.translation.toLowerCase() || '';

					const matches = locationName.includes(lowercasedQuery);
					let matchingCities: Location[] = [];
					let matchingCityParts: Location[] = [];
					let matchingMarketplaces: Location[] = [];

					if ('cities' in location) {
						matchingCities = recursiveSearch(location.cities);
					}

					if ('cityParts' in location) {
						matchingCityParts = recursiveSearch(location.cityParts as Location[]);
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
	};

	useEffect(() => {
		const expandedIds = new Set<number>();
		topLevelLocations.forEach(location => {
			if ('cities' in location && Array.isArray(location.cities) && location.cities.length > 0) {
				expandedIds.add(location.id);
			} else if (
				'parts' in location &&
				Array.isArray(location.parts) &&
				location.parts.length > 0
			) {
				expandedIds.add(location.id);
			}
		});

		setExpandedLocations(expandedIds);
		setFilteredLocations(topLevelLocations);
	}, [topLevelLocations]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredLocations(topLevelLocations);
			setExpandedLocations(new Set(initialExpandedLocations));
		} else {
			const { filteredLocations: filtered, expandedIds } = searchLocations(locations, searchQuery);
			setFilteredLocations(filtered);
			setExpandedLocations(expandedIds);
		}
	}, [searchQuery, locations, topLevelLocations]);

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

			{isTranslationModalOpen && (
				<CustomModal isOpen={isTranslationModalOpen} onRequestClose={handleCloseModal}>
					<EditLocationForm
						currentTranslations={currentTranslations}
						currentLocation={currentEditLocation}
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
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default LocationList;
