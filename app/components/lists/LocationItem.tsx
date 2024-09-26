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
	setParentId: React.Dispatch<React.SetStateAction<number | null>>; // Single parent ID now
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	toggleLocation: (id: number) => void;
	expandedLocations: Set<number>;
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
}) => {
	// Check if the location is expanded based on expandedLocations
	const isLocationExpanded = useCallback(
		(id: number) => expandedLocations.has(id),
		[expandedLocations]
	);

	const getLocationName = (location: Country | City | CityPart): string => {
		return location.label.name.charAt(0).toUpperCase() + location.label.name.slice(1);
	};

	// Handle opening the edit modal
	const handleOpenEditModal = (location: Country | City | CityPart) => {
		setCurrentEditLocation(location);

		// Set parent ID based on the location type
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
			<H4 text={getLocationName(location)} color='black' shouldBreak />

			{/* Display Parent Locations */}
			{/* Display Parent Locations */}
			{'cityId' in location ? (
				<TextNormal text='Grad:' weight='bold' />
			) : 'countryId' in location ? (
				<TextNormal text='Država:' weight='bold' />
			) : (
				<TextNormal text='Ovo je glavna država' weight='bold' />
			)}

			{/* Edit and Delete Buttons */}
			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={() => handleOpenEditModal(location)} />
				<DeleteButton onClick={() => handleDelete(location.id)} />
			</div>

			{/* Toggle Sub-locations (Gradovi ili delovi gradova) */}
			{'parts' in location && location.parts.length > 0 && (
				<ToggleButtonContainer
					data={{ id: location.id.toString() }} // Convert id to string
					toggleFunction={(id: string) => toggleLocation(parseInt(id))} // Convert back to number
				>
					<ArrowToggleButton isOpen={isLocationExpanded(location.id)} onClick={() => {}} />
				</ToggleButtonContainer>
			)}

			{/* Sub-location List (Gradovi ili delovi gradova) */}
			{'parts' in location && isLocationExpanded(location.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{location.parts.map(subLocation => (
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
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default LocationItem;
