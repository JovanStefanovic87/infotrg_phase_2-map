'use client';
import React, { useState, ChangeEvent } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface Props {
	accept?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	label?: string;
}

const ButtonUploadXlsx: React.FC<Props> = ({
	accept = '.xlsx',
	onChange,
	label = 'Izaberite fajl',
}) => {
	const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setIsFileUploaded(true);
		}
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<div className='flex justify-center'>
			<label className='flex text-nowrap items-center border-2 border-grayLight px-4 py-2 bg-white-600 text-black font-semibold text-sm rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer'>
				{isFileUploaded ? <AiOutlineCheckCircle className='text-green-500 text-lg' /> : label}
				<input type='file' accept={accept} onChange={handleFileChange} className='hidden' />
			</label>
		</div>
	);
};

export default ButtonUploadXlsx;
