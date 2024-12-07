import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import DefaultButton from '../buttons/DefaultButton';
import Image from 'next/image';
import { LocationDataForMap } from '@/utils/helpers/types';
import { pageContentTranslations, PageContentTranslations } from '@/utils/translations';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (item: {
		slug: string;
		id: number;
		name: string;
		type: 'county' | 'city' | 'suburb';
	}) => void;
	locations: Array<{
		id: number;
		name: string;
		type: 'county' | 'city' | 'suburb';
		children?: any[];
	}>;
	selectedLocation: LocationDataForMap | null;
	languageCode: string;
}

const LocationSelection: React.FC<Props> = ({
	isOpen,
	onClose,
	onSelect,
	locations,
	selectedLocation,
	languageCode,
}) => {
	const translations: PageContentTranslations = pageContentTranslations;
	const [expandedItems, setExpandedItems] = useState<{ id: number; type: string }[]>([]);

	const getParentIds = (
		items: any[],
		itemId: number,
		itemType: string,
		path: any[] = []
	): any[] => {
		for (const item of items) {
			if (item.id === itemId && item.type === itemType) return path;
			if (item.children) {
				const result = getParentIds(item.children, itemId, itemType, [
					...path,
					{ id: item.id, type: item.type },
				]);
				if (result.length) return result;
			}
		}
		return [];
	};

	useEffect(() => {
		if (selectedLocation) {
			const parentIds = getParentIds(locations, selectedLocation.id, selectedLocation.type);
			setExpandedItems([...parentIds, { id: selectedLocation.id, type: selectedLocation.type }]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedLocation, locations]);

	const toggleItem = (itemId: number, itemType: string) => {
		setExpandedItems(prev => {
			const isExpanded = prev.some(item => item.id === itemId && item.type === itemType);
			if (isExpanded) {
				return prev.filter(item => !(item.id === itemId && item.type === itemType));
			} else {
				return [...prev, { id: itemId, type: itemType }];
			}
		});
	};

	const handleSelectLocation = (item: {
		id: number;
		name: string;
		type: 'county' | 'city' | 'suburb';
		slug: string;
	}) => {
		onSelect(item);
		onClose();
	};

	const renderLocationOptions = (items: any[], isChild = false) => {
		return items.map(item => {
			const isSelected = selectedLocation?.id === item.id && selectedLocation?.type === item.type;
			const isExpanded = expandedItems.some(
				expandedItem => expandedItem.id === item.id && expandedItem.type === item.type
			);
			if (item.type === 'state' && !isChild) {
				/* State is hidden */
				return (
					<div key={item.id}>
						{item.children && item.children.length > 0 && (
							<div className='pl-6 border-l border-gray-200'>
								{renderLocationOptions(item.children, true)}
							</div>
						)}
					</div>
				);
			}
			return (
				<div key={`${item.id}-${item.type}`} className={`${isChild ? 'ml-4' : ''} mb-2 pl-2`}>
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
							onClick={() => handleSelectLocation(item)}
							className={`text-left text-lg transition-colors hover:text-blueDarker ${
								isChild ? 'text-gray-600' : 'text-gray-800'
							} focus:outline-none focus:ring-2 focus:ring-blueDarker ${
								isSelected ? 'text-blueDarker font-semibold' : ''
							}`}>
							{item.name}
						</button>
						{item.children && item.children.length > 0 && (
							<button
								onClick={() => toggleItem(item.id, item.type)}
								className={`ml-auto transform transition-transform duration-300 ${
									isExpanded ? '-rotate-90' : 'rotate-90'
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
					<div
						className={`overflow-hidden transition-all duration-300 ease-in-out ${
							isExpanded ? 'max-h-screen' : 'max-h-0'
						}`}>
						{item.children && item.children.length > 0 && (
							<div className='pl-6 border-l border-gray-200'>
								{renderLocationOptions(item.children, true)}
							</div>
						)}
					</div>
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
							{renderLocationOptions(locations)}
						</div>
					</div>
					<div className='flex justify-end p-4 border-t border-gray-200'>
						<DefaultButton
							onClick={onClose}
							className='px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors'>
							{translations[languageCode].cancel}
						</DefaultButton>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default LocationSelection;
