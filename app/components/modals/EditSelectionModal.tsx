'use client';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import DefaultButton from '@/app/components/buttons/DefaultButton';
import CategorySelection from './CategorySelection';
import LocationSelection from './LocationSelection';
import { TagIcon } from '@heroicons/react/24/outline';
import CloseButton from '../buttons/CloseButton';
import SelectableButton from '../buttons/SelectableButton';
import { LocationDataForMap, CategoryDataForMap, Category } from '@/utils/helpers/types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	handleClose: () => void;
	location: LocationDataForMap | null;
	selectedCategory: CategoryDataForMap | null;
	selectedLocation: LocationDataForMap | null;
	setSelectedCategory: Dispatch<SetStateAction<CategoryDataForMap | null>>;
	setSelectedLocation: Dispatch<SetStateAction<LocationDataForMap | null>>;
	categories: Category[];
	locations: LocationDataForMap[];
}

const EditSelectionModal: React.FC<Props> = ({
	isOpen,
	onClose,
	handleClose,
	selectedCategory,
	selectedLocation,
	setSelectedCategory,
	setSelectedLocation,
	categories,
	locations,
}) => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [locationModalOpen, setLocationModalOpen] = useState(false);
	const segments = pathname.split('/').filter(Boolean);

	const categorySlug = selectedCategory?.slug || '';
	const parentSlug = selectedCategory?.parents?.[0]?.slug;
	const categoryFullPath = `${parentSlug ? parentSlug + '/' : ''}${categorySlug}`;
	const currentPage = segments[0] || 'gde-da-kupim';
	const currentLanguage = segments[1] || 'rs';
	const languageId = currentLanguage === 'rs' ? 1 : 2;

	const findCategoryIdBySlug = (slug: string, categories: Category[]): number | null => {
		for (const category of categories) {
			// Ako je slug kategorije isti kao traženi slug, vraćamo ID
			if (category.slug === slug) {
				return category.id;
			}

			// Ako kategorija ima podkategorije (children), pozivamo rekurzivno funkciju za podkategorije
			if (category.children && category.children.length > 0) {
				const foundCategory = findCategoryIdBySlug(slug, category.children);
				if (foundCategory) {
					return foundCategory; // Vraćamo ID podkategorije ako je pronađena
				}
			}
		}
		return null; // Ako nije pronađena kategorija
	};

	const locationSlug = selectedLocation?.slug || '';

	const findLocationBySlug = (
		slug: string,
		locations: LocationDataForMap[]
	): { id: number; type: string } | null => {
		if (!slug) {
			return null;
		}

		for (const location of locations) {
			if (location.slug === slug) {
				return { id: location.id, type: location.type };
			}

			if (location.children && location.children.length > 0) {
				const foundLocation = findLocationBySlug(slug, location.children);
				if (foundLocation) {
					return foundLocation;
				}
			}
		}
		return null;
	};

	const selectedLocationData = findLocationBySlug(locationSlug, locations);
	const selectedLocationParams = `${selectedLocationData?.type}Id=${selectedLocationData?.id}`;

	const findParentLocationByIdAndType = (
		id: number,
		type: string,
		locations: LocationDataForMap[]
	): LocationDataForMap | null => {
		for (const location of locations) {
			// Ako se ID i tip podudaraju, vraćamo ovu lokaciju (to je roditelj)
			if (location.id === id && location.type === type) {
				return location;
			}

			// Ako lokacija ima podlokacije (children), pozivamo rekurzivno funkciju za podlokacije
			if (location.children && location.children.length > 0) {
				for (const child of location.children) {
					if (child.id === id && child.type === type) {
						return location; // Ovo je roditelj
					}
				}

				// Rekurzivno proveravamo podlokacije
				const foundParent = findParentLocationByIdAndType(id, type, location.children);
				if (foundParent) {
					return foundParent;
				}
			}
		}

		return null; // Ako roditelj nije pronađen
	};

	const selectedLocationParent = selectedLocationData
		? findParentLocationByIdAndType(selectedLocationData.id, selectedLocationData.type, locations)
		: null;

	const locationFullPath = `${
		selectedLocationParent?.slug ? selectedLocationParent?.slug + '/' : ''
	}${locationSlug}`;

	const flattenLocations = (locations: LocationDataForMap[]): LocationDataForMap[] => {
		const flatList: LocationDataForMap[] = [];

		const flatten = (items: LocationDataForMap[]) => {
			items.forEach(item => {
				const { children, ...rest } = item;
				flatList.push({ ...rest, children: undefined }); // Dodaj lokaciju bez children
				if (children && children.length > 0) {
					flatten(children); // Rekurzivno dodaj decu
				}
			});
		};

		flatten(locations);
		return flatList;
	};

	const flatLocations = flattenLocations(locations);

	const findLocationIdBySlug = (
		slug: string,
		locations: LocationDataForMap[]
	): LocationDataForMap | null => {
		return locations.find(location => location.slug === slug) || null;
	};
	const splitLocationPath = locationFullPath.split('/');
	const newPath = findLocationIdBySlug(locationFullPath, flatLocations);

	const getLocationParamsFromPath = (
		locationPath: string[],
		flatLocations: LocationDataForMap[]
	): string => {
		const params: string[] = [];

		locationPath.forEach(slug => {
			const location = flatLocations.find(loc => loc.slug === slug);
			if (location) {
				params.push(`${location.type}Id=${location.id}`);
			}
		});

		return params.join('&');
	};

	const locationParams = getLocationParamsFromPath(splitLocationPath, flatLocations);

	const onSave = async () => {
		if (selectedCategory || selectedLocation) {
			const newCategorySlug = selectedCategory?.slug || categorySlug;
			const newLocationSlug = selectedLocation?.slug || locationSlug;
			const newLocationFullPath = selectedLocationParent?.slug
				? `${selectedLocationParent.slug}/${newLocationSlug}`
				: newLocationSlug;
			const newCategoryFullPath = parentSlug ? `${parentSlug}/${newCategorySlug}` : newCategorySlug;

			const locationParams = getLocationParamsFromPath(
				newLocationFullPath.split('/'),
				flatLocations
			);

			// Generisanje API URL-a
			const apiUrl = `${baseUrl}/api/filteredRetailStores?languageId=${languageId}&${locationParams}&categoryId=${findCategoryIdBySlug(
				newCategorySlug,
				categories
			)}`;

			try {
				const response = await fetch(apiUrl);

				if (response.ok) {
					console.log('Data saved successfully!');
				} else {
					console.error('Error saving data:', response.statusText);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}

			// Navigacija na novu URL adresu
			const newUrl = `${baseUrl}/${currentPage}/${currentLanguage}/${newLocationSlug}/${newCategoryFullPath}`;
			router.push(newUrl);

			// Zatvaranje modalnog prozora
			onClose();
		}
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			className='fixed z-50 inset-0 flex items-center justify-center'>
			<DialogBackdrop className='fixed inset-0 bg-gray-900 opacity-85' />
			<div className='relative bg-white rounded-2xl max-w-lg w-full p-8 shadow-xl transform transition-all'>
				<div className='space-y-6 mb-8'>
					<div className='flex flex-col'>
						<SelectableButton
							label='Izaberite kategoriju proizvoda'
							selectedItem={selectedCategory || undefined}
							icon={<TagIcon className='w-6 h-6 text-black' />}
							placeholder='Izaberite kategoriju'
							onClick={() => setCategoryModalOpen(true)}
						/>
					</div>
					<div className='flex flex-col'>
						<SelectableButton
							label='Izaberite lokaciju pretrage'
							selectedItem={selectedLocation || undefined}
							icon={<TagIcon className='w-6 h-6 text-black' />}
							placeholder='Izaberite lokaciju'
							onClick={() => setLocationModalOpen(true)}
						/>
					</div>
				</div>

				<div className='flex justify-end gap-4'>
					<CloseButton onClose={onClose} />
					<DefaultButton
						onClick={onSave}
						className='px-6 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors'>
						Sačuvaj
					</DefaultButton>
				</div>

				<CategorySelection
					isOpen={categoryModalOpen}
					onClose={() => setCategoryModalOpen(false)}
					onSelect={category => setSelectedCategory(category)}
					categories={categories}
					selectedItem={selectedCategory}
				/>

				<LocationSelection
					isOpen={locationModalOpen}
					onClose={() => setLocationModalOpen(false)}
					onSelect={location =>
						setSelectedLocation({
							...location,
							slug: location.slug,
							type: location.type as 'county' | 'city' | 'suburb',
						})
					}
					locations={locations}
					selectedLocation={selectedLocation}
				/>
			</div>
		</Dialog>
	);
};

export default EditSelectionModal;
