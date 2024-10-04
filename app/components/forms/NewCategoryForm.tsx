import React from 'react';
import ImageUploadButton from '../../components/buttons/ImageUploadButton';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import Combobox from '@/app/components/input/CustomCombobox';
import { CategoryByLanguageAndPrefix, Translation } from '@/utils/helpers/types';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import Label from '../../components/text/Label';

interface CategoryFormProps {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	parentIds: number[];
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	categories: CategoryByLanguageAndPrefix[]; // Now using categories instead of translations
	onFileChange: (file: File | null) => void;
	onFileReset: () => void;
	onSubmit: (event: React.FormEvent) => Promise<void>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: (isOpen: boolean) => void;
}

const NewCategoryForm: React.FC<CategoryFormProps> = ({
	name,
	setName,
	parentIds,
	setParentIds,
	categories,
	onFileChange,
	onFileReset,
	onSubmit,
	isIconPickerOpen,
	setIsIconPickerOpen,
}) => {
	const translations: Translation[] = categories.map(category => ({
		translationId: null, // Defaulting to null since you may not have this in the category object
		id: category.id,
		labelId: category.labelId,
		languageId: 1, // Set a default languageId if necessary
		translation: category.name, // Using category name as translation
		description: category.description || '', // If the category has a description
		createdAt: new Date(), // Add current date as fallback, or you can use category.createdAt if available
		synonyms: [], // Add empty synonyms if necessary, or map category.synonyms if available
	}));
	// Convert parentIds to selected categories for Combobox
	// Filter categories by parentIds and map them to Translation[]
	const selectedParents: Translation[] = categories
		.filter(c => parentIds.includes(c.id)) // First filter to get only selected parent categories
		.map(c => ({
			translationId: null, // Assuming there's no translationId in the category data
			id: c.id,
			labelId: c.labelId,
			languageId: 1, // Assuming a default languageId or adjust it if available
			translation: c.name, // Using the category name for the translation field
			description: c.description || '', // If the category has a description
			createdAt: new Date(), // You can replace this with c.createdAt if available in the category
			synonyms: [], // Defaulting to an empty array for synonyms or map if available
		}));

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
					selectedOptions={selectedParents}
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

export default NewCategoryForm;
