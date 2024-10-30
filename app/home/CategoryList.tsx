import React, { useState } from 'react';
import { fetchedCategories } from '@/utils/helpers/types';
import Image from 'next/image';

interface CategoryListProps {
	categories: fetchedCategories[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
	const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({});

	const toggleExpand = (categoryId: number) => {
		setExpandedCategories(prev => ({
			...prev,
			[categoryId]: !prev[categoryId],
		}));
	};

	// Sortiramo glavne kategorije po abecednom redu
	const sortedCategories = categories
		? [...categories].sort((a, b) => a.name.localeCompare(b.name))
		: [];

	return (
		<div className='grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
			{sortedCategories.map(category => (
				<div
					key={category.id}
					className='bg-mainWhite rounded-lg shadow-md p-4 text-main w-full text-left transition-colors duration-500 hover:bg-gradient-white'>
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
							className='text-lg sm:text-xl font-bold text-blueDark hover:text-hyperlink underline transition-colors duration-500 ease-in-out break-words hover:underline-offset-4'>
							{category.name}
						</a>
					</div>

					<div className='p-4 bg-blueDark rounded-md'>
						<ul className='flex flex-wrap gap-2 justify-center'>
							{(expandedCategories[category.id]
								? category.children.sort((a, b) => a.name.localeCompare(b.name)) // Sortiramo potkategorije abecedno
								: category.children.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 6)
							).map(subcategory => (
								<li
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
								</li>
							))}
							{category.children.length > 6 && !expandedCategories[category.id] && (
								<li
									className='text-xs text-white mt-2 text-center cursor-pointer'
									onClick={() => toggleExpand(category.id)}>
									+{category.children.length - 6} kategorija
								</li>
							)}
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};

export default CategoryList;
