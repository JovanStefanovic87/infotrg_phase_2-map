// components/ImageUploadButton.tsx
'use client';
import React from 'react';
import { FiUpload } from 'react-icons/fi';

interface ImageUploadButtonProps {
	id: string;
	label: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	accept?: string;
	icon?: React.ReactNode; // Allows passing any icon component
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
	id,
	label,
	onChange,
	accept = 'image/*',
	icon = <FiUpload className='text-sky-500' size={24} />, // Default icon if none is provided
}) => {
	return (
		<div className='mb-4'>
			<input type='file' id={id} className='hidden' name={id} accept={accept} onChange={onChange} />
			<label
				htmlFor={id}
				className='flex items-center justify-center gap-2 bg-white text-black border border-sky-500 p-4 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-sky-100 hover:border-sky-700 transition duration-200'>
				{icon}
				<span className='font-semibold'>{label}</span>
			</label>
		</div>
	);
};

export default ImageUploadButton;
