import React from 'react';
import ImageUploadButton from '../../components/buttons/ImageUploadButton';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import Combobox from '@/app/components/input/CustomCombobox';
import { Translation, Icon, Language } from '@/utils/helpers/types';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import Label from '../../components/text/Label';
import LabelInputDefault from '../input/LabelInputDefault';

interface CategoryFormProps {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	parentIds: number[];
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	translations: Translation[];
	languages: Language[];
	translationValues: { [key: number]: string };
	setTranslationValues: (
		values:
			| { [key: number]: string }
			| ((prev: { [key: number]: string }) => { [key: number]: string })
	) => void;
	onFileChange: (file: File | null) => void;
	onSubmit: (event: React.FormEvent) => Promise<void>;
	setIsIconPickerOpen: (isOpen: boolean) => void;
}

const NewCategoryForm: React.FC<CategoryFormProps> = ({
	name,
	setName,
	parentIds,
	setParentIds,
	translations,
	languages,
	translationValues,
	setTranslationValues,
	onFileChange,
	onSubmit,
	setIsIconPickerOpen,
}) => {
	const selectedParents = translations.filter(t => parentIds.includes(t.labelId));

	const handleSelectParents = (newSelectedOptions: { labelId: number }[]) => {
		const newParentIds = newSelectedOptions.map(option => option.labelId);
		setParentIds(newParentIds);
	};

	const handleRemoveParent = (labelId: number) => {
		setParentIds(prev => prev.filter(id => id !== labelId));
	};

	// Handler for updating translations based on language ID
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
			{languages
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
				))}

			<div>
				<Label htmlFor='parentId' color='black'>
					Izbor natkategorije (opciono):
				</Label>
				<Combobox
					options={translations}
					selectedOptions={selectedParents}
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
						{selectedParents.map(parent => (
							<div
								key={parent.labelId}
								className='flex items-center bg-gray-200 text-blueDarker font-semibold rounded-full px-3 py-1 text-base shadow-sm hover:bg-red-950 transition-all duration-200 ease-in-out cursor-pointer'
								onClick={() => handleRemoveParent(parent.labelId)}>
								<span className='mr-2'>{parent.translation}</span>
								<button
									type='button'
									className='text-red-600 focus:outline-none'
									aria-label={`Ukloni ${parent.translation}`}>
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
