import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
	Country,
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
	locations: (Country | City | CityPart)[];
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
	filteredLocations: (Country | City | CityPart)[];
	setFilteredLocations: React.Dispatch<React.SetStateAction<(Country | City | CityPart)[]>>;
	initialExpandedLocations: Set<number>;
	setInitialExpandedLocations: React.Dispatch<React.SetStateAction<Set<number>>>;
	handleSubmitEdit: (updatedLocation: any) => void;
	newIcon: File | null;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
	handleSubmitEdit,
	newIcon,
	setNewIcon,
	setIsIconPickerOpen,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditLocation, setCurrentEditLocation] = useState<Country | City | CityPart | null>(
		null
	);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isTranslationModalOpen, setIsTranslationModalOpen] = useState<boolean>(false);
	const [currentTranslations, setCurrentTranslations] = useState<Translation[]>([]);

	// Function to handle opening the translation form modal
	const handleOpenTranslationModal = (location: Country | City | CityPart) => {
		setCurrentEditLocation(location); // Set the current location to edit
		const locationTranslations = translations.filter(t => t.labelId === location.label.id);
		setCurrentTranslations(locationTranslations);
		setIsTranslationModalOpen(true);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setNewIcon(event.target.files[0]);
		}
	};

	// Function to handle the submission of updated translations
	const handleSubmitTranslations = async (
		updatedTranslations: Translation[],
		newIcon: File | null,
		currentIconId: number | null, // This will contain the existing iconId if no new icon is uploaded
		locationId: number,
		type: string
	) => {
		try {
			// Step 1: Start with the existing icon ID or null if none
			let iconId = currentIconId;

			// Step 2: If a new icon is uploaded, upload it and get its ID
			if (newIcon) {
				const formData = new FormData();
				formData.append('icon', newIcon); // Add the new icon to FormData
				formData.append('directory', 'locations'); // Define the directory for storing the icon

				// Step 3: Post the new icon to the API and retrieve its ID
				const { data: iconData } = await axios.post('/api/icons', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});

				// Update the iconId with the newly uploaded icon's ID
				iconId = iconData?.iconId;
			}

			// Step 4: Update the translations first, since this is handled by a separate API
			await axios.put('/api/translation/locations', {
				translations: updatedTranslations,
			});

			// Step 5: Update the location with the new/existing icon ID
			if (iconId) {
				await axios.put(`/api/locations/${locationId}?type=${type}`, {
					iconId, // Send the iconId (new or existing) to the location update API
				});
			}
			// Step 6: Close the modal and refresh the locations to reflect the updates
			setIsTranslationModalOpen(false);
			await refetchLocations();
		} catch (error) {
			// Handle any errors that occur during the process
			console.error('Failed to update translations and icon', error);
		}
	};

	const handleDeleteLocation = async (id: number, type: string) => {
		const confirmed = window.confirm('Da li ste sigurni da želite da obrišete ovu lokaciju?');
		if (!confirmed) return;

		try {
			await axios.delete(`/api/locations/${id}?type=${type}`);
			await refetchLocations(); // Osvježavanje podataka nakon brisanja
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

	const searchLocations = (locations: (Country | City | CityPart)[], query: string) => {
		const lowercasedQuery = query.toLowerCase();
		const expandedIds = new Set<number>();

		const recursiveSearch = (
			locations: (Country | City | CityPart)[]
		): (Country | City | CityPart)[] => {
			return locations
				.map(location => {
					// Get the name for languageId = 1
					const primaryTranslation = Array.isArray(location.label.translations)
						? (location.label.translations as unknown as Translation[]).find(
								(translation: Translation) => translation.languageId === 1
						  )
						: undefined;

					const locationName = primaryTranslation?.translation.toLowerCase() || '';

					// Check if the location matches the query
					const matches = locationName.includes(lowercasedQuery);
					let matchingCities: (Country | City | CityPart)[] = [];
					let matchingParts: (Country | City | CityPart)[] = [];

					// Recursively search in cities
					if ('cities' in location) {
						matchingCities = recursiveSearch(location.cities);
					}

					// Recursively search in parts
					if ('parts' in location) {
						matchingParts = recursiveSearch(location.parts);
					}

					// If the location matches or there are matching children, return the location
					if (matches || matchingCities.length > 0 || matchingParts.length > 0) {
						expandedIds.add(location.id);

						// Return the location with its matching cities and parts
						return {
							...location,
							cities: matchingCities.length > 0 ? matchingCities : [],
							parts: matchingParts.length > 0 ? matchingParts : [],
						};
					}

					return null;
				})
				.filter(Boolean) as (Country | City | CityPart)[];
		};

		const filteredLocations = recursiveSearch(locations);
		return { filteredLocations, expandedIds };
	};

	// Set expanded locations when component loads
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

	// Search logic
	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredLocations(topLevelLocations); // Reset the search when query is cleared
			setExpandedLocations(new Set(initialExpandedLocations));
		} else {
			const { filteredLocations: filtered, expandedIds } = searchLocations(locations, searchQuery);
			setFilteredLocations(filtered);
			setExpandedLocations(expandedIds);
		}
	}, [searchQuery, locations, initialExpandedLocations]);

	// Toggle specific locations
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

			{filteredLocations.map(location => (
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

			{/* Translation Modal */}
			{isTranslationModalOpen && (
				<CustomModal isOpen={isTranslationModalOpen} onRequestClose={handleCloseModal}>
					<EditLocationForm
						currentTranslations={currentTranslations}
						languages={languages}
						handleSubmit={handleSubmitTranslations}
						currentIcon={currentIcon?.iconUrl || null}
						currentIconId={currentIcon?.iconId || null} // Pass the currentIconId
						newIcon={newIcon}
						setNewIcon={setNewIcon}
						availableIcons={icons}
						setCurrentIcon={handleSetCurrentIcon}
						setIsIconPickerOpen={setIsIconPickerOpen}
						locationId={currentEditLocation?.id || null}
						type={currentEditLocation?.type || ''}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default LocationList;
