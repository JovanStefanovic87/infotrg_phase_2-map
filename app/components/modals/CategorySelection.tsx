import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import DefaultButton from '../buttons/DefaultButton';
import Image from 'next/image';

type Category = {
	id: number;
	name: string;
	icon?: {
		id: number;
		name: string;
		url: string;
		createdAt: string;
	};
	children?: Category[];
};

type Location = {
	id: number;
	name: string;
	icon?: {
		id: number;
		name: string;
		url: string;
		createdAt: string;
	} | null;
	type: 'state' | 'county' | 'city' | 'suburb';
	children?: Location[];
};

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (item: { id: number; name: string }) => void;
	categories: Category[] | Location[];
}

const CategorySelection: React.FC<Props> = ({ isOpen, onClose, onSelect, categories }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedItems, setExpandedItems] = useState<number[]>([]);

	const isCategory = (item: Category | Location): item is Category => {
		return (item as Category).id !== undefined && (item as Category).name !== undefined;
	};

	useEffect(() => {
		if (searchQuery) {
			const matchedItems = filterItems(categories, searchQuery);
			const expandedIds = getExpandedIds(matchedItems);
			setExpandedItems(expandedIds);
		} else {
			setExpandedItems([]);
		}
	}, [searchQuery, categories]);

	const toggleItem = (itemId: number) => {
		setExpandedItems(prev =>
			prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
		);
	};

	const filterItems = (items: (Category | Location)[], query: string): (Category | Location)[] => {
		return items
			.map(item => {
				const hasMatchingChildren = item.children && filterItems(item.children, query).length > 0;
				const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());

				if (matchesQuery || hasMatchingChildren) {
					return {
						...item,
						children: hasMatchingChildren ? filterItems(item.children || [], query) : item.children,
					};
				}
				return null;
			})
			.filter(Boolean) as (Category | Location)[];
	};

	const getExpandedIds = (items: (Category | Location)[]): number[] => {
		let ids: number[] = [];
		items.forEach(item => {
			ids.push(item.id);
			if (item.children && item.children.length > 0) {
				ids = ids.concat(getExpandedIds(item.children));
			}
		});
		return ids;
	};

	const handleSelectItem = (item: { id: number; name: string }) => {
		onSelect(item);
		onClose(); // Zatvara modal nakon odabira
	};

	const renderItemOptions = (items: (Category | Location)[], isChild = false) => {
		return items.map(item => (
			<div key={`${item.id}-${item.name}`} className={`${isChild ? 'ml-4' : ''} mb-2`}>
				<div className='flex items-center'>
					{/* Ikonica stavke */}
					{item.icon && (
						<Image
							src={item.icon.url}
							alt={item.icon.name}
							width={20}
							height={20}
							className='mr-2'
						/>
					)}
					{/* Naziv stavke i tip (ako je lokacija) */}
					<button
						onClick={() => handleSelectItem({ id: item.id, name: item.name })}
						className={`text-left text-lg font-medium transition-colors hover:text-blue-500 ${
							isChild ? 'text-gray-600' : 'text-gray-800'
						} px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}>
						{item.name} {isCategory(item)}
					</button>
					{/* Strelica skroz desno */}
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
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
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
		));
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className='fixed inset-0 z-50 overflow-y-auto'>
			<DialogBackdrop onClick={onClose} className='fixed inset-0 bg-black bg-opacity-85' />
			<div className='flex items-center justify-center min-h-screen px-4'>
				<div className='relative bg-white rounded-lg shadow-lg w-full max-h-[90vh] md:max-w-2xl md:h-auto md:rounded-md mx-2 md:mx-auto overflow-hidden'>
					<div className='p-4 text-black'>
						<input
							type='text'
							placeholder='Pretraga stavki...'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className='w-full px-4 py-2 mb-4 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 placeholder-gray-400'
						/>

						<div className='overflow-y-auto max-h-[65vh] md:max-h-96'>
							{renderItemOptions(filterItems(categories, searchQuery))}
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
