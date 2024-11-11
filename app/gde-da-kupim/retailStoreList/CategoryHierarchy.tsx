import React from 'react';
import Image from 'next/image';
import { Category } from '@/utils/helpers/types';

interface CategoryHierarchyProps {
	categories: Category[];
}

const CategoryHierarchy: React.FC<CategoryHierarchyProps> = ({ categories }) => {
	return (
		<ul className='space-y-1 sm:space-y-2 sm:ml-4 border-gray-200 overflow-x-auto'>
			{categories.map(category => (
				<div
					key={category.id}
					className='text-gray-700 hover:text-indigo-600 transition-colors duration-200'>
					<div className='flex items-center gap-2 sm:gap-3 py-1 sm:py-2'>
						<Image
							src={category.icon?.url || '/icons/default-icon.png'}
							alt={category.name}
							width={20}
							height={20}
							className='rounded-full'
						/>
						<span className='text-sm sm:text-base font-medium'>{category.name}</span>
					</div>
					{category.children && category.children.length > 0 && (
						<div className='ml-3 sm:ml-5 border-l border-gray-200 pl-2 sm:pl-3 mt-1'>
							<CategoryHierarchy categories={category.children} />
						</div>
					)}
				</div>
			))}
		</ul>
	);
};

export default CategoryHierarchy;
