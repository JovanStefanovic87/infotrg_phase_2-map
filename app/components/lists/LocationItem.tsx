import React, { useCallback } from 'react';
import {
	State,
	County,
	City,
	Language,
	Translation,
	Suburb,
	Location,
} from '../../../utils/helpers/types';
import TextNormal from '../text/TextNormal';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import ArrowToggleButton from '../buttons/ArrowToggleButton';
import ToggleButtonContainer from '../buttons/ToggleButtonContainer';
import Image from 'next/image';

interface LocationItemProps {
	location: Location;
	languageId: number;
	handleDelete: (id: number, type: string) => Promise<void>;
	setCurrentEditLocation: React.Dispatch<
		React.SetStateAction<State | County | City | Suburb | null>
	>;
	setParentId: React.Dispatch<React.SetStateAction<number | null>>;
	toggleLocation: (id: number) => void;
	expandedLocations: Set<number>;
	locations: (State | County | City | Suburb)[];
	handleOpenTranslationModal: (location: State | County | City | Suburb) => void;
	languages: Language[];
}

const getLocationTranslations = (translations: Translation[], languages: Language[]): string => {
	return languages
		.map(language => {
			const translation = translations.find(t => t.languageId === language.id);
			return `${language.name}: ${translation?.translation || 'No translation available'}`;
		})
		.join(', ');
};

const LocationItem: React.FC<LocationItemProps> = ({
	location,
	setCurrentEditLocation,
	setParentId,
	handleDelete,
	expandedLocations,
	toggleLocation,
	languageId,
	locations,
	handleOpenTranslationModal,
	languages,
}) => {
	const isLocationExpanded = useCallback(
		(id: number) => expandedLocations.has(id),
		[expandedLocations]
	);

	console.log('location', location);

	const getLocationName = (location: State | County | City | Suburb): string => {
		const translations = Array.isArray(location.label.translations)
			? (location.label.translations as unknown as Translation[])
			: [];

		const primaryTranslation = translations.find(
			(translation: Translation) => translation.languageId === 1
		);

		return primaryTranslation?.translation
			? primaryTranslation.translation.charAt(0).toUpperCase() +
					primaryTranslation.translation.slice(1)
			: location.label.name;
	};

	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<div className='flex items-center space-x-2'>
				{location.icon?.url && (
					<Image
						src={location.icon.url}
						alt='Location Icon'
						width={50}
						height={50}
						priority={false}
						style={{ width: '50px', height: '50px' }}
					/>
				)}

				<TextNormal text={getLocationName(location)} weight='bold' />
			</div>

			<TextNormal
				text={getLocationTranslations(
					location.label.translations as unknown as Translation[],
					languages
				)}
				weight='normal'
			/>

			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={() => handleOpenTranslationModal(location)} />
				<DeleteButton
					onClick={() => {
						handleDelete(location.id, location.type);
					}}
				/>
			</div>

			{('counties' in location && location.counties.length > 0) ||
			('cities' in location && location.cities.length > 0) ||
			('suburbs' in location && location.suburbs.length > 0) ? (
				<ToggleButtonContainer
					data={{ id: location.id.toString() }}
					toggleFunction={(id: string) => toggleLocation(parseInt(id))}>
					<ArrowToggleButton isOpen={isLocationExpanded(location.id)} onClick={() => {}} />
				</ToggleButtonContainer>
			) : null}

			{isLocationExpanded(location.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{'counties' in location &&
						location.counties.map(county => (
							<LocationItem
								key={county.id}
								location={county}
								setCurrentEditLocation={setCurrentEditLocation}
								setParentId={setParentId}
								handleDelete={handleDelete}
								expandedLocations={expandedLocations}
								toggleLocation={toggleLocation}
								languageId={languageId}
								locations={locations}
								handleOpenTranslationModal={handleOpenTranslationModal}
								languages={languages}
							/>
						))}

					{'cities' in location &&
						location.cities.map(city => (
							<div key={city.id}>
								<LocationItem
									location={city}
									setCurrentEditLocation={setCurrentEditLocation}
									setParentId={setParentId}
									handleDelete={handleDelete}
									expandedLocations={expandedLocations}
									toggleLocation={toggleLocation}
									languageId={languageId}
									locations={locations}
									handleOpenTranslationModal={handleOpenTranslationModal}
									languages={languages}
								/>

								{isLocationExpanded(city.id) && (
									<div className='mt-2 pl-4 border-l-2 border-gray-300'>
										{city.suburbs.map(suburb => (
											<LocationItem
												key={suburb.id}
												location={suburb}
												setCurrentEditLocation={setCurrentEditLocation}
												setParentId={setParentId}
												handleDelete={handleDelete}
												expandedLocations={expandedLocations}
												toggleLocation={toggleLocation}
												languageId={languageId}
												locations={locations}
												handleOpenTranslationModal={handleOpenTranslationModal}
												languages={languages}
											/>
										))}
									</div>
								)}
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default LocationItem;
