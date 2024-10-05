'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Icon } from '../../../utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import InputDefault from '../input/InputDefault';

interface ImagePickerProps {
	icons: Icon[];
	isOpen: boolean;
	onSelect: (icon: { iconId: number; iconUrl: string }) => void;
	onClose: () => void;
}

const ImagePickerForm: React.FC<ImagePickerProps> = ({ icons, isOpen, onSelect, onClose }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const filteredIcons = icons.filter(icon =>
		icon.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleClose = () => {
		setSearchTerm('');
		onClose();
	};

	return (
		<CustomModal isOpen={isOpen} onRequestClose={handleClose}>
			<div className='flex flex-col'>
				<div className='m-2 h-1/2'>
					<InputDefault
						placeholder='Brza pretraga...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className='mt-2 w-full'>
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

export default ImagePickerForm;
