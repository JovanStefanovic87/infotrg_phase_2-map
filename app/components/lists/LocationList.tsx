import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
	Location,
	County,
	City,
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
import InputDefault from '../input/InputDefault';

interface Props {
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

const LocationList: React.FC<Props> = ({
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

			if (type === 'county' || type === 'city') {
				if (postCode && postCode.trim() !== '') {
					updateData.postCode = postCode;
				}
			}

			if (type === 'suburb') {
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
				// Sort counties
				if ('counties' in location && Array.isArray(location.counties)) {
					location.counties = recursiveSort(location.counties as County[]) as County[];
				}

				// Sort cities
				if ('cities' in location && Array.isArray(location.cities)) {
					location.cities = recursiveSort(location.cities as City[]) as City[];
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
					let matchingCounties: Location[] = [];
					let matchingCities: Location[] = [];
					let matchingSuburbs: Location[] = [];

					if ('counties' in location) {
						matchingCounties = recursiveSearch(location.counties);
					}

					if ('cities' in location) {
						matchingCities = recursiveSearch(location.cities);
					}

					if ('suburbs' in location) {
						matchingSuburbs = recursiveSearch(location.suburbs);
					}

					if (
						matches ||
						matchingCounties.length > 0 ||
						matchingCities.length > 0 ||
						matchingSuburbs.length > 0
					) {
						expandedIds.add(location.id);

						return {
							...location,
							counties: matchingCounties.length > 0 ? matchingCounties : [],
							cities: matchingCities.length > 0 ? matchingCities : [],
							suburbs: matchingSuburbs.length > 0 ? matchingSuburbs : [],
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
			if (
				'counties' in location &&
				Array.isArray(location.counties) &&
				location.counties.length > 0
			) {
				expandedIds.add(location.id);
			} else if (
				'cities' in location &&
				Array.isArray(location.cities) &&
				location.cities.length > 0
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

	const handleSetPostCode: React.Dispatch<React.SetStateAction<string>> = useCallback(
		value => {
			setPostCode(value);
		},
		[setPostCode]
	);

	const handleSetAddress: React.Dispatch<React.SetStateAction<string>> = useCallback(
		value => {
			setAddress(value);
		},
		[setAddress]
	);

	return (
		<div>
			<div className='mb-4'>
				<InputDefault
					placeholder='Brza pretraga lokacija'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
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
						currentTranslations={currentEditLocation.label.translations}
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
						setPostCode={handleSetPostCode}
						address={address}
						setAddress={handleSetAddress}
						setError={setError}
						setSuccessMessage={setSuccessMessage}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default LocationList;
