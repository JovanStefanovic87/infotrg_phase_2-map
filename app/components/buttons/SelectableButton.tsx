import React from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

interface SelectableButtonProps {
	label: string;
	selectedItem?: { id: number; name: string };
	icon: React.ReactNode;
	placeholder: string;
	onClick: () => void;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
	label,
	selectedItem,
	icon,
	placeholder,
	onClick,
}) => {
	console.log('selectedItem', selectedItem);
	return (
		<div className='flex flex-col'>
			<div className='text-gray-700 font-medium mb-1'>{label}</div>
			<button
				onClick={onClick}
				className='w-full flex items-center justify-between py-4 px-6 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors'>
				<div className='flex items-center gap-3'>
					{icon}
					<span className='truncate text-blueDarker font-semibold'>
						{selectedItem ? selectedItem.name : placeholder}
					</span>
				</div>
				<PencilIcon className='w-6 h-6 text-black' />
			</button>
		</div>
	);
};

export default SelectableButton;
