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

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSave: () => void;
	location: Location;
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
	onSave,
	selectedCategory,
	selectedLocation,
	setSelectedCategory,
	setSelectedLocation,
	categories,
	locations,
}) => {
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [locationModalOpen, setLocationModalOpen] = useState(false);

	// Function to update URL parameters
	const updateUrlParams = (categoryId: number | null, location: LocationDataForMap | null) => {
		const url = new URL(window.location.href);

		// Postavljanje categoryId
		if (categoryId) {
			url.searchParams.set('categoryId', categoryId.toString());
		} else {
			url.searchParams.delete('categoryId');
		}

		// Postavljanje lokacija prema tipu
		if (location?.type === 'suburb') {
			url.searchParams.set('suburbId', location.id.toString());
			if (location.cityId) {
				url.searchParams.set('cityId', location.cityId.toString());
			}
			if (location.countyId) {
				url.searchParams.set('countyId', location.countyId.toString());
			}
		} else if (location?.type === 'city') {
			url.searchParams.set('cityId', location.id.toString());
			if (location.countyId) {
				url.searchParams.set('countyId', location.countyId.toString());
			}
			url.searchParams.delete('suburbId'); // Uklanja suburb ako prelazimo na city
		} else if (location?.type === 'county') {
			url.searchParams.set('countyId', location.id.toString());
			url.searchParams.delete('cityId');
			url.searchParams.delete('suburbId');
		} else {
			// Brisanje svih lokacijskih parametara ako nema validne lokacije
			url.searchParams.delete('countyId');
			url.searchParams.delete('cityId');
			url.searchParams.delete('suburbId');
		}

		// Ažuriranje URL-a
		history.pushState({}, '', url.toString());
	};

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
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
						onClick={() => {
							if (selectedCategory || selectedLocation) {
								updateUrlParams(selectedCategory?.id || null, selectedLocation || null);
								onClose();
							}
						}}
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
