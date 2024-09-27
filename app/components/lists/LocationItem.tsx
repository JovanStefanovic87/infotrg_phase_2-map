'use client';
import React, { useCallback } from 'react';
import { Country, City, CityPart } from '../../../utils/helpers/types';
import H4 from '../text/H4';
import TextNormal from '../text/TextNormal';
import ArrowToggleButton from '../buttons/ArrowToggleButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import ToggleButtonContainer from '../buttons/ToggleButtonContainer';

interface LocationItemProps {
	location: Country | City | CityPart;
	languageId: number;
	handleDelete: (id: number) => Promise<void>;
	setCurrentEditLocation: React.Dispatch<React.SetStateAction<Country | City | CityPart | null>>;
	setParentId: React.Dispatch<React.SetStateAction<number | null>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	toggleLocation: (id: number) => void;
	expandedLocations: Set<number>;
	locations: (Country | City | CityPart)[];
}

const LocationItem: React.FC<LocationItemProps> = ({
	location,
	setCurrentEditLocation,
	setParentId,
	setIsModalOpen,
	handleDelete,
	expandedLocations,
	toggleLocation,
	languageId,
	locations,
}) => {
	let city: City | undefined;
	let country: Country | undefined;
	const isLocationExpanded = useCallback(
		(id: number) => expandedLocations.has(id),
		[expandedLocations]
	);

	const getLocationName = (location: Country | City | CityPart): string => {
		return location.label.name.charAt(0).toUpperCase() + location.label.name.slice(1);
	};

	const handleOpenEditModal = (location: Country | City | CityPart) => {
		setCurrentEditLocation(location);
		if ('cityId' in location && typeof location.cityId === 'number') {
			setParentId(location.cityId); // CityPart has a city parent
		} else if ('countryId' in location && typeof location.countryId === 'number') {
			setParentId(location.countryId); // City has a country parent
		} else {
			setParentId(null); // Country has no parent
		}
		setIsModalOpen(true);
	};

	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<TextNormal text={getLocationName(location)} weight='bold' />

			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={() => handleOpenEditModal(location)} />
				<DeleteButton onClick={() => handleDelete(location.id)} />
			</div>

			{/* Toggle Sub-locations (Cities or parts) */}
			{('cities' in location && location.cities.length > 0) ||
			('parts' in location && location.parts.length > 0) ? (
				<ToggleButtonContainer
					data={{ id: location.id.toString() }}
					toggleFunction={(id: string) => toggleLocation(parseInt(id))}>
					<ArrowToggleButton isOpen={isLocationExpanded(location.id)} onClick={() => {}} />
				</ToggleButtonContainer>
			) : null}

			{/* Sub-location List (Cities or parts) */}
			{isLocationExpanded(location.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{'cities' in location &&
						location.cities.map(subLocation => (
							<LocationItem
								key={subLocation.id}
								location={subLocation}
								setCurrentEditLocation={setCurrentEditLocation}
								setParentId={setParentId}
								setIsModalOpen={setIsModalOpen}
								handleDelete={handleDelete}
								expandedLocations={expandedLocations}
								toggleLocation={toggleLocation}
								languageId={languageId}
								locations={locations}
							/>
						))}

					{'parts' in location &&
						location.parts.map(subLocation => (
							<LocationItem
								key={subLocation.id}
								location={subLocation}
								setCurrentEditLocation={setCurrentEditLocation}
								setParentId={setParentId}
								setIsModalOpen={setIsModalOpen}
								handleDelete={handleDelete}
								expandedLocations={expandedLocations}
								toggleLocation={toggleLocation}
								languageId={languageId}
								locations={locations}
							/>
						))}
				</div>
			)}
		</div>
	);
};

export default LocationItem;
