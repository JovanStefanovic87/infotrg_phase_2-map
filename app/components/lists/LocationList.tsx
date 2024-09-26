'use client';
import React, { useState, useCallback, useEffect } from 'react';
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

interface LocationListProps {
	locations: (Country | City | CityPart)[];
	translations: Translation[]; // Add this to the props interface
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
}

const LocationList: React.FC<LocationListProps> = ({
	locations,
	languages,
	languageId,
	refetchLocations,
	onDeleteLocation,
	filteredLocations,
	setFilteredLocations,
	initialExpandedLocations,
	setInitialExpandedLocations,
	manuallyExpandedLocations,
	setManuallyExpandedLocations,
	expandedLocations,
	setExpandedLocations,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditLocation, setCurrentEditLocation] = useState<Country | City | CityPart | null>(
		null
	);
	const [newTranslations, setNewTranslations] = useState<any[]>([]);
	const [parentId, setParentId] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const topLevelLocations = locations.filter(
		location => 'cities' in location || 'parts' in location
	);

	const searchLocations = (locations: (Country | City | CityPart)[], query: string) => {
		const lowercasedQuery = query.toLowerCase();
		const expandedIds = new Set<number>();

		const recursiveSearch = (
			locations: (Country | City | CityPart)[]
		): (Country | City | CityPart)[] => {
			return locations
				.map(location => {
					const locationName = location.label.name.toLowerCase();
					const matches = locationName.includes(lowercasedQuery);

					let childMatches: (Country | City | CityPart)[] = [];

					if ('cities' in location) {
						childMatches = recursiveSearch(location.cities); // If it's a Country, search cities
					} else if ('parts' in location) {
						childMatches = recursiveSearch(location.parts); // If it's a City, search parts
					}

					if (matches || childMatches.length > 0) {
						expandedIds.add(location.id);
						return {
							...location,
							...(childMatches.length > 0 && 'parts' in location ? { parts: childMatches } : {}), // Ensure child matches are handled
						};
					}
					return null;
				})
				.filter(Boolean) as (Country | City | CityPart)[];
		};

		const filteredLocations = recursiveSearch(locations);
		return { filteredLocations, expandedIds };
	};

	useEffect(() => {
		if (!searchQuery.trim()) {
			setInitialExpandedLocations(new Set(manuallyExpandedLocations));
		}
	}, [manuallyExpandedLocations]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredLocations(topLevelLocations);
			setExpandedLocations(new Set(initialExpandedLocations));
		} else {
			const { filteredLocations: filtered, expandedIds } = searchLocations(locations, searchQuery);
			setFilteredLocations(filtered);
			setExpandedLocations(expandedIds);
		}
	}, [searchQuery, locations, initialExpandedLocations]);

	const handleDelete = useCallback(
		async (id: number) => {
			if (confirm('Da li ste sigurni da želite da obrišete ovu lokaciju?')) {
				try {
					await onDeleteLocation(id);
					await refetchLocations();
				} catch (err) {
					console.error('Failed to delete location', err);
				}
			}
		},
		[onDeleteLocation, refetchLocations]
	);

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

	return (
		<div>
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Brza pretraga lokacija'
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
					handleDelete={handleDelete}
					setCurrentEditLocation={setCurrentEditLocation}
					setParentId={setParentId}
					setIsModalOpen={setIsModalOpen}
					toggleLocation={toggleLocation}
					expandedLocations={expandedLocations}
				/>
			))}

			{isModalOpen && currentEditLocation && (
				<CustomModal
					isOpen={isModalOpen}
					onRequestClose={() => {
						setIsModalOpen(false);
						setParentId(null);
					}}
					mt='10'>
					<EditLocationForm
						locations={locations}
						currentLocation={currentEditLocation}
						handleSubmitEdit={() => {}}
						languages={languages}
						newTranslations={newTranslations}
						parentId={parentId}
						setNewTranslations={setNewTranslations}
						setParentId={setParentId}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default LocationList;
