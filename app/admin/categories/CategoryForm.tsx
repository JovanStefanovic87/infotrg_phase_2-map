'use client';
import React, { useState, useRef, useEffect } from 'react';
import FileUploadButton from '@/app/components/buttons/FileUploadButton';
import { Category, Icon, Translation } from '@/utils/helpers/types';

interface Props {
	parentId: number | null;
	setParentId: React.Dispatch<React.SetStateAction<number | null>>;
	languageId: number;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
	setError: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	onSubmit: () => void;
	visible: boolean;
}

const CategoryForm: React.FC<Props> = ({
	parentId,
	setParentId,
	languageId,
	name,
	setName,
	translations,
	setError,
	setSuccessMessage,
	onSubmit,
	visible,
}) => {
	const [icon, setIcon] = useState<File | null>(null);
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	useEffect(() => {
		if (!visible) {
			setName('');
			setParentId(null);
			setIcon(null);
			setError('');
			setSuccessMessage(null);
			if (fileUploadButtonRef.current.resetFileName) {
				fileUploadButtonRef.current.resetFileName();
			}
		}
	}, [visible, setName, setParentId, setError, setSuccessMessage]);

	const handleFileChange = (file: File | null) => {
		setIcon(file);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit();
	};

	if (!visible) return null;

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label htmlFor='name' className='block mb-2'>
					Category Name:
				</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={e => setName(e.target.value)}
					className='border p-2 w-full text-black'
				/>
			</div>
			<div>
				<label htmlFor='parentId' className='block mb-2'>
					Parent Category (optional):
				</label>
				<select
					id='parentId'
					value={parentId !== null ? parentId : ''}
					onChange={e => setParentId(e.target.value ? +e.target.value : null)}
					className='border p-2 w-full text-black'>
					<option value=''>None</option>
					{translations.map(translation => (
						<option key={translation.id} value={translation.id} className='text-black'>
							{translation.translation}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor='icon' className='block mb-2'>
					Icon:
				</label>
				<FileUploadButton
					onFileChange={handleFileChange}
					resetFileName={fileUploadButtonRef.current.resetFileName}
					ref={fileUploadButtonRef}
				/>
			</div>
			<div>
				<button type='submit' className='bg-blue-500 text-white px-4 py-2'>
					Save
				</button>
			</div>
		</form>
	);
};

export default CategoryForm;
