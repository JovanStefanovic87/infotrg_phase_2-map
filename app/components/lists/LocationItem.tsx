import React, { useCallback } from 'react';
import {
	Country,
	City,
	CityPart,
	Language,
	Translation,
	Marketplace,
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
		React.SetStateAction<Country | City | CityPart | Marketplace | null>
	>;
	setParentId: React.Dispatch<React.SetStateAction<number | null>>;
	toggleLocation: (id: number) => void;
	expandedLocations: Set<number>;
	locations: (Country | City | CityPart | Marketplace)[];
	handleOpenTranslationModal: (location: Country | City | CityPart | Marketplace) => void;
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

	const getLocationName = (location: Country | City | CityPart | Marketplace): string => {
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

			{('cities' in location && location.cities.length > 0) ||
			('cityParts' in location && location.cityParts.length > 0) ||
			('marketplaces' in location && location.marketplaces.length > 0) ? (
				<ToggleButtonContainer
					data={{ id: location.id.toString() }}
					toggleFunction={(id: string) => toggleLocation(parseInt(id))}>
					<ArrowToggleButton isOpen={isLocationExpanded(location.id)} onClick={() => {}} />
				</ToggleButtonContainer>
			) : null}

			{isLocationExpanded(location.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{'cities' in location &&
						location.cities.map(city => (
							<LocationItem
								key={city.id}
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
						))}

					{'cityParts' in location &&
						location.cityParts.map(cityPart => (
							<div key={cityPart.id}>
								<LocationItem
									location={cityPart}
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

								{isLocationExpanded(cityPart.id) && (
									<div className='mt-2 pl-4 border-l-2 border-gray-300'>
										{cityPart.marketplaces.map(marketplace => (
											<LocationItem
												key={marketplace.id}
												location={marketplace}
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
