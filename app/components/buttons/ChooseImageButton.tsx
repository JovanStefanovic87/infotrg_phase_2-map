// components/ChooseImageButton.tsx
'use client';
import React from 'react';
import { FiImage } from 'react-icons/fi';

interface ChooseImageButtonProps {
	onClick: () => void;
	label?: string;
	icon?: React.ReactNode; // Allows passing any icon component
}

const ChooseImageButton: React.FC<ChooseImageButtonProps> = ({
	onClick,
	label = 'Choose an image from the library', // Default label if none is provided
	icon = <FiImage className='text-sky-500' size={24} />, // Default icon if none is provided
}) => {
	return (
		<div className='mb-4'>
			<button
				type='button'
				className='flex items-center justify-center gap-2 text-black border border-sky-500 p-4 rounded-md w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 hover:bg-sky-100 hover:border-sky-700 transition duration-200'
				onClick={onClick}>
				{icon}
				<span className='font-semibold'>{label}</span>
			</button>
		</div>
	);
};

export default ChooseImageButton;
