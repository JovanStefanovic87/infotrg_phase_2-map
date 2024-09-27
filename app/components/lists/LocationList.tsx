'use client';
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
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditLocation, setCurrentEditLocation] = useState<Country | City | CityPart | null>(
		null
	);
	const [searchQuery, setSearchQuery] = useState<string>('');

	// Definisanje top-level lokacija (samo države)
	const topLevelLocations = useMemo(() => {
		return locations.filter(location => 'cities' in location || 'parts' in location);
	}, [locations]);

	// Logika za pretragu lokacija
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

					// Ako je lokacija država, pretraži gradove unutar države
					if ('cities' in location) {
						childMatches = recursiveSearch(location.cities); // Pretraži gradove unutar države
					}

					// Ako je lokacija grad, pretraži delove gradova unutar tog grada
					if ('parts' in location) {
						childMatches = recursiveSearch(location.parts); // Pretraži delove gradova unutar grada
					}

					// Ako postoji poklapanje ili podlokacija koja se poklapa, dodaj tu lokaciju
					if (matches || childMatches.length > 0) {
						expandedIds.add(location.id); // Proširi ID lokacije
						return {
							...location,
							...(childMatches.length > 0 ? { parts: childMatches, cities: childMatches } : {}),
						};
					}
					return null;
				})
				.filter(Boolean) as (Country | City | CityPart)[];
		};

		const filteredLocations = recursiveSearch(locations);
		return { filteredLocations, expandedIds };
	};

	// Proširi top-level lokacije ako imaju podlokacije (gradove ili delove gradova) kada se prvi put učitaju
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

	// Pretraga i resetovanje stanja
	useEffect(() => {
		if (!searchQuery.trim()) {
			setFilteredLocations(topLevelLocations); // Prikaz top-level lokacija kada je pretraga prazna
			setExpandedLocations(new Set(initialExpandedLocations));
		} else {
			const { filteredLocations: filtered, expandedIds } = searchLocations(locations, searchQuery);
			setFilteredLocations(filtered);
			setExpandedLocations(expandedIds); // Proširi odgovarajuće lokacije
		}
	}, [searchQuery, locations, initialExpandedLocations]);

	// Toggler funkcija za ručno proširivanje
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
			{/* Input za pretragu */}
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Brza pretraga lokacija'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border p-2 w-full text-black'
				/>
			</div>

			{/* Render lokacija */}
			{filteredLocations.map(location => (
				<LocationItem
					key={location.id}
					location={location}
					languageId={languageId}
					handleDelete={onDeleteLocation}
					setCurrentEditLocation={setCurrentEditLocation}
					setParentId={() => {}}
					setIsModalOpen={setIsModalOpen}
					toggleLocation={toggleLocation}
					expandedLocations={expandedLocations}
					locations={locations}
				/>
			))}

			{/* Modal za uređivanje */}
			{isModalOpen && currentEditLocation && (
				<CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} mt='10'>
					<EditLocationForm
						locations={locations}
						currentLocation={currentEditLocation}
						handleSubmitEdit={() => {}}
						languages={languages}
						newTranslations={[]}
						parentId={null}
						setNewTranslations={() => {}}
						setParentId={() => {}}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default LocationList;
