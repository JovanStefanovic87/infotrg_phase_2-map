import React from 'react';
import FileUploadButton from '@/app/components/buttons/FileUploadButton';
import Combobox from '@/app/components/input/CustomCombobox';
import { Translation } from '@/utils/helpers/types';

interface CategoryFormProps {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	parentId: number | null;
	setParentId: React.Dispatch<React.SetStateAction<number | null>>;
	translations: Translation[];
	icon: File | null;
	onFileChange: (file: File | null) => void;
	onFileReset: () => void;
	onSubmit: (event: React.FormEvent) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
	name,
	setName,
	parentId,
	setParentId,
	translations,
	icon,
	onFileChange,
	onFileReset,
	onSubmit,
}) => (
	<form onSubmit={onSubmit} className='space-y-4'>
		<div>
			<label htmlFor='name' className='block mb-2'>
				Naziv kategrorije:
			</label>
			<input
				type='text'
				id='name'
				value={name}
				onChange={e => setName(e.target.value)}
				className='border p-2 w-full text-black'
				placeholder='Unesite naziv'
			/>
		</div>
		<div>
			<label htmlFor='parentId' className='block mb-2'>
				Naziv natkategorije (opciono):
			</label>
			<Combobox
				options={translations}
				onSelect={selectedOption => setParentId(selectedOption ? selectedOption.labelId : null)}
				placeholder='Izaberite natkategoriju'
			/>
		</div>
		<div>
			<label htmlFor='icon' className='block mb-2'>
				Icon:
			</label>
			<FileUploadButton onFileChange={onFileChange} resetFileName={onFileReset} />
		</div>
		<div>
			<button type='submit' className='bg-blue-500 text-white px-4 py-2'>
				Save
			</button>
		</div>
	</form>
);

export default CategoryForm;
