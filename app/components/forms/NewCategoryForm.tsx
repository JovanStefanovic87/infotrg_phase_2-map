import React from 'react';
import ImageUploadButton from '../../components/buttons/ImageUploadButton';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import Combobox from '@/app/components/input/CustomCombobox';
import { Translation, Icon } from '@/utils/helpers/types';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import Label from '../../components/text/Label';
import LabelInputDefault from '../input/LabelInputDefault';

interface CategoryFormProps {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	parentIds: number[];
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	translations: Translation[];
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
	onFileChange,
	onSubmit,
	setIsIconPickerOpen,
}) => {
	const selectedParents = translations.filter(t => parentIds.includes(t.labelId));

	const handleSelectParents = (newSelectedOptions: { labelId: number }[]) => {
		const newParentIds = newSelectedOptions.map(option => option.labelId);
		setParentIds(newParentIds);
	};

	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div>
				<LabelInputDefault
					label='Naziv kategorije'
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder='Unesite naziv'
				/>
			</div>
			<div>
				<Label htmlFor='parentId'>Naziv natkategorije (opciono):</Label>
				<Combobox
					options={translations}
					selectedOptions={selectedParents}
					onSelect={handleSelectParents}
					placeholder='Izaberite natkategoriju'
				/>
			</div>
			<div className='flex w-full space-x-4'>
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
