'use client';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import DefaultButton from '@/app/components/buttons/DefaultButton';
import CategorySelection from './CategorySelection';
import LocationSelection from './LocationSelection';
import { TagIcon } from '@heroicons/react/24/outline';
import CloseButton from '../buttons/CloseButton';
import SelectableButton from '../buttons/SelectableButton';
import { LocationDataForMap, CategoryDataForMap, Category } from '@/utils/helpers/types';
import { useRouter, usePathname } from 'next/navigation';
import { pageContentTranslations, PageContentTranslations } from '@/utils/translations';

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
	languageCode: string;
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
	languageCode,
}) => {
	const translations: PageContentTranslations = pageContentTranslations;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const router = useRouter();
	const pathname = usePathname();
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [locationModalOpen, setLocationModalOpen] = useState(false);
	const segments = pathname.split('/').filter(Boolean);
	const categorySlug = selectedCategory?.slug || '';
	const parentSlug = selectedCategory?.parents?.[0]?.slug;
	const currentPage = segments[0] || 'gde-da-kupim';
	const currentLanguage = segments[1] || 'rs';
	const languageId = currentLanguage === 'rs' ? 1 : 2;
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const findCategoryIdBySlug = (slug: string, categories: Category[]): number | null => {
		for (const category of categories) {
			if (category.slug === slug) {
				return category.id;
			}

			if (category.children && category.children.length > 0) {
				const foundCategory = findCategoryIdBySlug(slug, category.children);
				if (foundCategory) {
					return foundCategory;
				}
			}
		}
		return null;
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

	const findParentLocationByIdAndType = (
		id: number,
		type: string,
		locations: LocationDataForMap[]
	): LocationDataForMap | null => {
		for (const location of locations) {
			if (location.id === id && location.type === type) {
				return location;
			}

			if (location.children && location.children.length > 0) {
				for (const child of location.children) {
					if (child.id === id && child.type === type) {
						return location;
					}
				}

				const foundParent = findParentLocationByIdAndType(id, type, location.children);
				if (foundParent) {
					return foundParent;
				}
			}
		}

		return null;
	};

	const selectedLocationParent = selectedLocationData
		? findParentLocationByIdAndType(selectedLocationData.id, selectedLocationData.type, locations)
		: null;

	const flattenLocations = (locations: LocationDataForMap[]): LocationDataForMap[] => {
		const flatList: LocationDataForMap[] = [];

		const flatten = (items: LocationDataForMap[]) => {
			items.forEach(item => {
				const { children, ...rest } = item;
				flatList.push({ ...rest, children: undefined });
				if (children && children.length > 0) {
					flatten(children);
				}
			});
		};

		flatten(locations);
		return flatList;
	};

	const flatLocations = flattenLocations(locations);

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

	const onSave = async () => {
		if (!selectedCategory || !selectedLocation) {
			setErrorMessage(translations[languageCode].searchParamsFormError);
			return;
		}
		setErrorMessage(null);

		const newCategorySlug = selectedCategory?.slug || categorySlug;
		const newLocationSlug = selectedLocation?.slug || locationSlug;
		const newLocationFullPath = selectedLocationParent?.slug
			? `${selectedLocationParent.slug}/${newLocationSlug}`
			: newLocationSlug;
		const newCategoryFullPath = parentSlug ? `${parentSlug}/${newCategorySlug}` : newCategorySlug;

		const locationParams = getLocationParamsFromPath(newLocationFullPath.split('/'), flatLocations);

		const apiUrl = `${baseUrl}/api/filteredRetailStores?languageId=${languageId}&${locationParams}&categoryId=${findCategoryIdBySlug(
			newCategorySlug,
			categories
		)}`;

		try {
			const response = await fetch(apiUrl);
			if (response.ok) {
				const newUrl = `${baseUrl}/${currentPage}/${currentLanguage}/${newLocationSlug}/${newCategoryFullPath}`;
				router.push(newUrl);
				onClose();
			} else {
				console.error('Error saving data:', response.statusText);
				setErrorMessage('Došlo je do greške prilikom čuvanja podataka.');
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			setErrorMessage('Došlo je do greške prilikom komunikacije sa serverom.');
		}
	};

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			className='fixed z-50 inset-0 flex items-center justify-center'>
			<DialogBackdrop className='fixed inset-0 bg-gray-900 opacity-85' onClick={handleClose} />
			<div className='relative bg-white rounded-2xl max-w-lg w-full p-8 shadow-xl transform transition-all'>
				<div className='space-y-6 mb-8'>
					{errorMessage && (
						<div className='bg-red-100 text-red-700 p-4 rounded-lg'>{errorMessage}</div>
					)}
					<div className='flex flex-col'>
						<SelectableButton
							label={translations[languageCode].selectCategory}
							selectedItem={selectedCategory || undefined}
							icon={<TagIcon className='w-6 h-6 text-black' />}
							placeholder={translations[languageCode].select}
							onClick={() => setCategoryModalOpen(true)}
						/>
					</div>
					<div className='flex flex-col'>
						<SelectableButton
							label={translations[languageCode].selectLocation}
							selectedItem={selectedLocation || undefined}
							icon={<TagIcon className='w-6 h-6 text-black' />}
							placeholder={translations[languageCode].select}
							onClick={() => setLocationModalOpen(true)}
						/>
					</div>
				</div>

				<div className='flex justify-end gap-4'>
					<CloseButton onClose={handleClose} label={translations[languageCode].cancel} />
					<DefaultButton
						onClick={onSave}
						className='px-6 py-3 text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors'>
						{translations[languageCode].save}
					</DefaultButton>
				</div>

				<CategorySelection
					isOpen={categoryModalOpen}
					onClose={() => setCategoryModalOpen(false)}
					onSelect={category => setSelectedCategory(category)}
					categories={categories}
					selectedItem={selectedCategory}
					languageCode={languageCode}
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
					languageCode={languageCode}
				/>
			</div>
		</Dialog>
	);
};

export default EditSelectionModal;
