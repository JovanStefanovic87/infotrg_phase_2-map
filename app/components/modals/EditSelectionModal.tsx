import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import { useCategories } from '@/app/helpers/api/category';
import DefaultButton from '@/app/components/buttons/DefaultButton';
import { useFetchAllLocationsWithTranslations } from '@/app/helpers/api/location';
import { prefixAticleCategory, location } from '@/app/api/prefix';
import CategorySelection from './CategorySelection';
import { TagIcon } from '@heroicons/react/24/outline';
import CloseButton from '../buttons/CloseButton';
import SelectableButton from '../buttons/SelectableButton';

type Location = {
	id: number;
	name: string;
	icon?: string | null;
	type: 'state' | 'county' | 'city' | 'suburb';
	children?: Location[];
};

type Category = {
	id: number;
	name: string;
	icon?: string | null;
	children?: Category[];
};

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSave: (selectedCategory: string, selectedLocation: string) => void;
	location: Location;
	initialCategory?: Category | null;
	initialLocation?: Location | null;
}

const EditSelectionModal: React.FC<Props> = ({
	isOpen,
	onClose,
	onSave,
	initialCategory,
	initialLocation,
}) => {
	const { data: categories = [] } = useCategories(prefixAticleCategory);
	const { data: locations = [] } = useFetchAllLocationsWithTranslations({
		prefix: location,
		languageId: 1,
	});
	const [categoryModalOpen, setCategoryModalOpen] = useState(false);
	const [locationModalOpen, setLocationModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<{ id: number; name: string } | null>(
		initialCategory || null
	);
	const [selectedLocation, setSelectedLocation] = useState<{ id: number; name: string } | null>(
		initialLocation || null
	);

	useEffect(() => {
		if (initialCategory)
			setSelectedCategory({ id: initialCategory.id, name: initialCategory.name });
		if (initialLocation)
			setSelectedLocation({ id: initialLocation.id, name: initialLocation.name });
	}, [initialCategory, initialLocation]);

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className='fixed z-50 inset-0 flex items-center justify-center'>
			<DialogBackdrop className='fixed inset-0 bg-gray-900 opacity-85' />
			<div className='relative bg-white rounded-2xl max-w-lg w-full p-8 shadow-xl transform transition-all'>
				{/* <DialogTitle className='text-3xl font-bold italic text-center text-black mb-8 tracking-wide'>
					
				</DialogTitle> */}

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
							label='Izaberite kategoriju proizvoda'
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
							if (selectedCategory && selectedLocation) {
								onSave(selectedCategory.name, selectedLocation.name);
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
				/>
				<CategorySelection
					isOpen={locationModalOpen}
					onClose={() => setLocationModalOpen(false)}
					onSelect={location => setSelectedLocation(location)}
					categories={locations}
				/>
			</div>
		</Dialog>
	);
};

export default EditSelectionModal;
