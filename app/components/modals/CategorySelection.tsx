import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import DefaultButton from '../buttons/DefaultButton';
import Image from 'next/image';
import { CategoryDataForMap } from '@/utils/helpers/types';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (item: { id: number; name: string; type?: string }) => void;
	categories: Array<{ id: number; name: string; type?: string; children?: any[] }>;
	selectedItem: CategoryDataForMap | null;
}

const CategorySelection: React.FC<Props> = ({
	isOpen,
	onClose,
	onSelect,
	categories,
	selectedItem,
}) => {
	const [expandedItems, setExpandedItems] = useState<number[]>([]);

	// Expand path to selected item if provided
	useEffect(() => {
		if (selectedItem) {
			const parentIds = getParentIds(categories, selectedItem.id);
			setExpandedItems([...parentIds, selectedItem.id]);
		}
	}, [selectedItem, categories]);

	const getParentIds = (items: any[], itemId: number, path: number[] = []): number[] => {
		for (const item of items) {
			if (item.id === itemId) return path;
			if (item.children) {
				const result = getParentIds(item.children, itemId, [...path, item.id]);
				if (result.length) return result;
			}
		}
		return [];
	};

	const toggleItem = (itemId: number) => {
		setExpandedItems(prev =>
			prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
		);
	};

	const handleSelectItem = (item: { id: number; name: string; type?: string }) => {
		onSelect(item);
		onClose();
	};

	const renderItemOptions = (items: any[], isChild = false) => {
		return items.map(item => {
			// Check if this exact item is selected
			const isSelected = selectedItem?.id === item.id;

			return (
				<div key={`${item.id}-${item.name}`} className={`${isChild ? 'ml-4' : ''} mb-2 pl-2`}>
					<div
						className={`flex items-center px-2 py-1 rounded-lg ${
							isSelected ? 'bg-yellow-300 border-yellow-500 text-black font-semibold shadow-md' : ''
						}`}>
						{item.icon && (
							<Image
								src={item.icon.url}
								alt={item.icon.name}
								width={20}
								height={20}
								className='mr-2'
							/>
						)}
						<button
							onClick={() => handleSelectItem(item)}
							className={`text-left text-lg transition-colors hover:text-blueDarker ${
								isChild ? 'text-gray-600' : 'text-gray-800'
							} focus:outline-none focus:ring-2 focus:ring-blueDarker ${
								isSelected ? 'text-blueDarker font-semibold' : ''
							}`}>
							{item.name}
						</button>
						{item.children && item.children.length > 0 && (
							<button
								onClick={() => toggleItem(item.id)}
								className={`ml-auto transform transition-transform duration-300 ${
									expandedItems.includes(item.id) ? 'rotate-90' : '-rotate-90'
								}`}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={2}
									stroke='currentColor'
									className='w-5 h-5 text-gray-500'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M8.25 4.5l7.5 7.5-7.5 7.5'
									/>
								</svg>
							</button>
						)}
					</div>
					{expandedItems.includes(item.id) && item.children && (
						<div className='pl-6 border-l border-gray-200'>
							{renderItemOptions(item.children, true)}
						</div>
					)}
				</div>
			);
		});
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className='fixed inset-0 z-50 overflow-y-auto'>
			<DialogBackdrop onClick={onClose} className='fixed inset-0 bg-black bg-opacity-85' />
			<div className='flex items-center justify-center min-h-screen px-4'>
				<div className='relative bg-white rounded-lg shadow-lg w-full max-h-[90vh] md:max-w-2xl md:h-auto md:rounded-md mx-2 md:mx-auto overflow-hidden'>
					<div className='p-4 text-black'>
						<div className='overflow-y-auto max-h-[65vh] md:max-h-96'>
							{renderItemOptions(categories)}
						</div>
					</div>
					<div className='flex justify-end p-4 border-t border-gray-200'>
						<DefaultButton
							onClick={onClose}
							className='px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'>
							Otkaži
						</DefaultButton>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default CategorySelection;