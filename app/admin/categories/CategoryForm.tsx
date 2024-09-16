import React from 'react';
import ImageUploadButton from '../../components/buttons/ImageUploadButton';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import Combobox from '@/app/components/input/CustomCombobox';
import { Translation, Icon } from '@/utils/helpers/types';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import Label from '../../components/text/Label';

interface CategoryFormProps {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	parentIds: number[];
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	translations: Translation[];
	icons: Icon[];
	onFileChange: (file: File | null) => void;
	onFileReset: () => void;
	onSubmit: (event: React.FormEvent) => Promise<void>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: (isOpen: boolean) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
	name,
	setName,
	parentIds,
	setParentIds,
	translations,
	icons,
	onFileChange,
	onFileReset,
	onSubmit,
	isIconPickerOpen,
	setIsIconPickerOpen,
}) => {
	// Convert parentIds to selected translations for Combobox
	const selectedParents = translations.filter(t => parentIds.includes(t.labelId));

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div>
				<Label htmlFor='name'>Naziv kategrorije:</Label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={e => setName(e.target.value)}
					className='block w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Unesite naziv'
				/>
			</div>
			<div>
				<Label htmlFor='parentId'>Naziv natkategorije (opciono):</Label>
				<Combobox
					options={translations}
					selectedOptions={selectedParents} // Pass selected parent translations
					onSelect={newSelectedOptions => {
						const newParentIds = newSelectedOptions.map(option => option.labelId);
						setParentIds(newParentIds);
					}}
					placeholder='Izaberite natkategoriju'
				/>
			</div>
			<div className='flex w-full space-x-4'>
				<ImageUploadButton
					id='iconUpload'
					label='Nova ikonica (PNG)'
					onChange={e => onFileChange(e.target.files ? e.target.files[0] : null)}
				/>

				{/* Use ChooseImageButton for selecting images from the library */}
				<ChooseImageButton
					onClick={() => setIsIconPickerOpen(true)}
					label='Izbor ikonice' // Custom label
				/>
			</div>
			<div>
				<SubmitButton>Sačuvaj</SubmitButton>
			</div>
		</form>
	);
};

export default CategoryForm;
