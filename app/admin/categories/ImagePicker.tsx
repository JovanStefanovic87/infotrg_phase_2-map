'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from '../../../utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal'; // Adjust the import path as needed

interface ImagePickerProps {
	icons: Icon[];
	isOpen: boolean;
	onSelect: (icon: { iconId: number; iconUrl: string }) => void;
	onClose: () => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ icons, isOpen, onSelect, onClose }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	// Filter icons based on the search term
	const filteredIcons = icons.filter(icon =>
		icon.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<CustomModal isOpen={isOpen} onRequestClose={onClose}>
			<div className='mt-2 h-1/2 w-screen'>
				{/* Search Input */}
				<input
					type='text'
					placeholder='Search icons...'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					className='border p-2 rounded mb-4 w-full text-black'
				/>

				{/* Display filtered icons */}
				<div className='mt-2'>
					{filteredIcons.map(icon => (
						<div key={icon.id} className='inline-block p-2'>
							<Image
								src={icon.url}
								alt={icon.name || 'Icon'}
								width={50}
								height={50}
								onClick={() => {
									onSelect({ iconId: icon.id, iconUrl: icon.url });
									onClose();
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</CustomModal>
	);
};

export default ImagePicker;
