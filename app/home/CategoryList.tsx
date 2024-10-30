import React, { useState } from 'react';
import { fetchedCategories } from '@/utils/helpers/types';
import Image from 'next/image';

interface CategoryListProps {
	categories: fetchedCategories[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
	const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: number }>({});

	const toggleExpand = (categoryId: number) => {
		setExpandedCategories(prev => {
			const currentCount = prev[categoryId] || 6;
			const category = categories.find(cat => cat.id === categoryId);
			const newCount = category && currentCount >= category.children.length ? 6 : currentCount + 6;
			return { ...prev, [categoryId]: newCount };
		});
	};

	const sortedCategories = categories
		? [...categories].sort((a, b) => a.name.localeCompare(b.name))
		: [];

	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2'>
			{sortedCategories.map(category => (
				<div
					key={category.id}
					className='bg-mainWhite rounded-lg shadow-md p-4 text-bgMain w-full text-left transition-colors duration-500 hover:bg-gradient-white relative overflow-hidden'>
					<div className='flex items-center pb-4 hover:text-blueLightest transition-colors duration-500 ease-in-out'>
						{category.icon && (
							<div className='overflow-hidden mr-4 rounded-full border border-grayLighter p-3 bg-iconBgWhite hover:overflow-visible flex-shrink-0 relative w-[80px] h-[80px]'>
								<Image
									src={category.icon.url}
									alt={category.icon.name}
									fill
									sizes='80px'
									className='object-contain transform transition-all duration-500 ease-in-out scale-90 hover:scale-110 hover:-rotate-6 hover:translate-y-[-20%]'
								/>
							</div>
						)}
						<a
							href={`/categories/${category.id}`}
							className='text-lg sm:text-xl font-bold text-blueDark hover:text-bgMain underline transition-colors duration-500 ease-in-out break-words hover:underline-offset-4'>
							{category.name}
						</a>
					</div>

					<div className='p-4 border shadow-lg shadow-grayLight rounded-md h-max min-h-[270px] bg-subcategoriesGradient flex flex-col justify-between'>
						<div
							className='flex flex-wrap gap-2 justify-center overflow-hidden transition-max-height duration-75 ease-linear'
							style={{
								maxHeight: `${expandedCategories[category.id] * 40 || 240}px`,
							}}>
							{category.children
								.sort((a, b) => a.name.localeCompare(b.name))
								.slice(0, expandedCategories[category.id] || 6)
								.map(subcategory => (
									<div
										key={subcategory.id}
										className='group flex flex-col items-center p-1 bg-white rounded-md shadow-md w-[80px] max-w-full cursor-pointer hover:bg-blue-200 transition-all duration-300 ease-in-out'>
										{subcategory.icon && (
											<div className='mb-1 rounded-md border border-gray-300 bg-yellow-100 p-1 overflow-visible flex-shrink-0 relative w-[50px] h-[50px]'>
												<Image
													src={subcategory.icon.url}
													alt={subcategory.icon.name}
													fill
													sizes='80px'
													className='rounded-md p-1 object-contain transform transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:-rotate-6 group-hover:translate-y-[-10%]'
												/>
											</div>
										)}
										<span className='font-medium text-xs text-center break-words w-full leading-tight mt-1 line-clamp-2 text-gray-700 group-hover:text-blue-800'>
											{subcategory.name}
										</span>
									</div>
								))}
						</div>
						<div className='flex justify-center mt-4 space-x-4'>
							{category.children.length > (expandedCategories[category.id] || 6) && (
								<div
									className='text-xs text-blue-600 bg-white rounded-full py-1 px-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-200 shadow-md'
									onClick={() => toggleExpand(category.id)}>
									+ prikaži više
								</div>
							)}
							{(expandedCategories[category.id] || 6) > 6 && (
								<div
									className='text-xs text-red-600 bg-white rounded-full py-1 px-4 cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-200 shadow-md'
									onClick={() => setExpandedCategories(prev => ({ ...prev, [category.id]: 6 }))}>
									- prikaži manje
								</div>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default CategoryList;
