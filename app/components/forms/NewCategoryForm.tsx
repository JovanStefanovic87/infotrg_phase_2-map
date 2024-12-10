import React from 'react';
import ImageUploadButton from '../../components/buttons/ImageUploadButton';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import Custom2Combobox from '@/app/components/input/Custom2Combobox';
import {
	Translation,
	TranslationSimple,
	Icon,
	Language,
	CategoryWithTranslations,
} from '@/utils/helpers/types';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import Label from '../../components/text/Label';
import LabelInputDefault from '../input/LabelInputDefault';

interface CategoryFormProps {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	parentIds: number[];
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	categories: CategoryWithTranslations[];
	languages: Language[];
	translationOptions: TranslationSimple[];
	translationValues: { [key: number]: string };
	setTranslationValues: (
		values:
			| { [key: number]: string }
			| ((prev: { [key: number]: string }) => { [key: number]: string })
	) => void;
	onFileChange: (file: File | null) => void;
	onSubmit: (event: React.FormEvent) => Promise<void>;
	setIsIconPickerOpen: (isOpen: boolean) => void;
	handleCategorySelection: (selectedCategoryIds: number[]) => void;
}

const NewCategoryForm: React.FC<CategoryFormProps> = ({
	name,
	setName,
	parentIds,
	setParentIds,
	categories,
	languages,
	translationValues,
	translationOptions,
	setTranslationValues,
	onFileChange,
	onSubmit,
	setIsIconPickerOpen,
	handleCategorySelection,
}) => {
	const selectedParents = translationOptions.filter(t => parentIds.includes(t.labelId));

	const adjustedTranslationOptions = translationOptions.map(option => ({
		name: option.name || '',
		languageId: option.languageId,
		labelId: option.labelId,
	}));

	const adjustedSelectedParents = selectedParents.map(parent => ({
		categoryId: parent.categoryId,
		name: parent.name,
		languageId: parent.languageId,
		labelId: parent.labelId,
	}));

	const handleSelectParents = (newSelectedOptions: { labelId: number }[]) => {
		const newParentIds = newSelectedOptions.map(option => option.labelId);
		handleCategorySelection(newParentIds);
	};

	const handleRemoveParent = (labelId: number) => {
		setParentIds(prev => prev.filter(id => id !== labelId));
	};

	const handleTranslationChange = (languageId: number, value: string) => {
		setTranslationValues((prev: { [key: number]: string }) => ({
			...prev,
			[languageId]: value,
		}));
	};

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div>
				<LabelInputDefault
					label='Naziv kategorije (srpski)'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Unesite naziv'
				/>
			</div>

			{/* Input fields for translations (languageId !== 1) */}
			{languages?.length ? (
				languages
					.filter(language => language.id !== 1)
					.map(language => (
						<div key={language.id} className='mt-4'>
							<LabelInputDefault
								value={translationValues[language.id] || ''}
								onChange={e => handleTranslationChange(language.id, e.target.value)}
								placeholder={`Unesite naziv na ${language.name}`}
								label={`Naziv kategrorije (${language.name})`}
							/>
						</div>
					))
			) : (
				<p>Loading languages...</p> // Show a loading message or a spinner if the data is still being fetched.
			)}

			<div>
				<Label htmlFor='parentId' color='black'>
					Izbor natkategorije (opciono):
				</Label>
				<Custom2Combobox
					options={adjustedTranslationOptions}
					selectedOptions={adjustedSelectedParents}
					onSelect={handleSelectParents}
					placeholder='Izaberite natkategoriju'
				/>
			</div>

			{selectedParents.length > 0 && (
				<div className='mt-2'>
					<Label htmlFor='selectedParents' color='black'>
						Izabrane natkategorije:
					</Label>
					<div className='flex flex-wrap gap-2 mt-1'>
						{selectedParents.map((parent, index) => (
							<div
								key={`${parent.labelId}-${index}`}
								className='flex items-center bg-gray-200 text-blueDarker font-semibold rounded-full px-3 py-1 text-base shadow-sm hover:bg-red-950 transition-all duration-200 ease-in-out cursor-pointer'
								onClick={() => handleRemoveParent(parent.labelId)}>
								<span className='mr-2'>{parent.name}</span>
								<button
									type='button'
									className='text-red-600 focus:outline-none'
									aria-label={`Ukloni ${parent.name}`}>
									&times;
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			<div className='flex w-full space-x-4 mt-4'>
				<ImageUploadButton
					id='iconUpload'
					label='Nova ikonica (PNG)'
					onChange={e => onFileChange(e.target.files ? e.target.files[0] : null)}
				/>
				<ChooseImageButton onClick={() => setIsIconPickerOpen(true)} label='Izbor ikonice' />
			</div>
			<div>
				<SubmitButton>Sačuvaj</SubmitButton>
			</div>
		</form>
	);
};

export default NewCategoryForm;
