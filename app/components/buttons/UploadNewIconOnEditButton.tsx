'use client';
import React from 'react';
import { FiUpload } from 'react-icons/fi';

interface Props {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	accept?: string;
	label?: string;
}

const UploadNewIconOnEditButton: React.FC<Props> = ({
	onChange,
	accept = 'image/*',
	label = 'Upload Icon',
}) => {
	return (
		<div className='mb-4'>
			<input
				type='file'
				accept={accept}
				onChange={onChange}
				className='hidden' // Hide the default file input
				id='custom-file-upload'
			/>
			<label
				htmlFor='custom-file-upload'
				className='flex items-center justify-center gap-2 bg-white text-black border border-sky-500 p-4 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-sky-100 hover:border-sky-700 transition duration-200'>
				<FiUpload className='text-sky-500' size={24} /> {/* Upload icon */}
				<span className='font-semibold'>{label}</span>
			</label>
		</div>
	);
};

export default UploadNewIconOnEditButton;
