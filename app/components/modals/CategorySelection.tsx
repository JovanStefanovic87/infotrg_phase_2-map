import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle } from '@headlessui/react';
import DefaultButton from '../buttons/DefaultButton';
import { useCategories } from '@/app/helpers/api/category';
import { prefixAticleCategory } from '@/app/api/prefix';

type Category = {
	id: number;
	name: string;
	children?: Category[];
};

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (category: { id: number; name: string }) => void;
}

const CategorySelection: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
	const { data: categories } = useCategories(prefixAticleCategory);

	useEffect(() => {
		if (searchQuery) {
			const matchedCategories = filterCategories(categories || [], searchQuery);
			const expandedIds = getExpandedIds(matchedCategories);
			setExpandedCategories(expandedIds);
		} else {
			setExpandedCategories([]);
		}
	}, [searchQuery, categories]);

	const toggleCategory = (categoryId: number) => {
		setExpandedCategories(prev =>
			prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
		);
	};

	const filterCategories = (categories: Category[], query: string): Category[] => {
		return categories
			.map(category => {
				const hasMatchingChildren =
					category.children && filterCategories(category.children, query).length > 0;
				const matchesQuery = category.name.toLowerCase().includes(query.toLowerCase());

				if (matchesQuery || hasMatchingChildren) {
					return {
						...category,
						children: hasMatchingChildren
							? filterCategories(category.children || [], query)
							: category.children,
					};
				}
				return null;
			})
			.filter(Boolean) as Category[];
	};

	const getExpandedIds = (categories: Category[]): number[] => {
		let ids: number[] = [];
		categories.forEach(category => {
			ids.push(category.id);
			if (category.children && category.children.length > 0) {
				ids = ids.concat(getExpandedIds(category.children));
			}
		});
		return ids;
	};

	const renderCategoryOptions = (categories: Category[], isChild = false) => {
		return categories.map(category => (
			<div key={category.id} className={`${isChild ? 'ml-4' : ''} mb-1`}>
				<div className='flex items-center'>
					{category.children && category.children.length > 0 && (
						<button
							onClick={() => toggleCategory(category.id)}
							className={`mr-2 transform transition-transform duration-300 ${
								expandedCategories.includes(category.id) ? 'rotate-90' : 'rotate-0'
							}`}>
							{/* Chevron strelica */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={2}
								stroke='currentColor'
								className='w-4 h-4 text-gray-500'>
								<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
							</svg>
						</button>
					)}
					{/* Klik na naziv selektuje kategoriju */}
					<button
						onClick={() => onSelect({ id: category.id, name: category.name })}
						className={`text-left text-base font-medium ${
							isChild ? 'text-gray-500' : 'text-gray-800'
						} hover:text-blue-600 transition-colors`}>
						{category.name}
					</button>
				</div>
				{expandedCategories.includes(category.id) && category.children && (
					<div className='pl-4 border-l border-gray-200'>
						{renderCategoryOptions(category.children, true)}
					</div>
				)}
			</div>
		));
	};

	return (
		<Dialog open={isOpen} onClose={onClose} className='fixed z-50 inset-0 overflow-y-auto'>
			<div className='flex items-center justify-center min-h-screen px-4 text-gray-800'>
				<div className='bg-white rounded-lg p-6 max-w-md w-full mx-auto relative z-10 shadow-2xl'>
					<DialogTitle className='text-2xl font-semibold mb-4 text-center text-gray-900'>
						Izaberite Kategoriju
					</DialogTitle>

					<input
						type='text'
						placeholder='Pretraga kategorija...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500 text-sm border-gray-300 placeholder-gray-400 focus:outline-none'
					/>

					<div className='overflow-y-auto max-h-80 border-t border-gray-100 pt-2'>
						{renderCategoryOptions(filterCategories(categories || [], searchQuery))}
					</div>

					<div className='flex justify-end gap-2 mt-4'>
						<DefaultButton
							onClick={onClose}
							className='px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded shadow-md'>
							Otkaži
						</DefaultButton>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default CategorySelection;
