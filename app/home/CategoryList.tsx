import React, { useState } from 'react';
import { fetchedCategories } from '@/utils/helpers/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CategoryListProps {
	categories: fetchedCategories[] | undefined;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
	const router = useRouter();
	const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({});
	const [activeIndex, setActiveIndex] = useState<{ [key: number]: number }>({});

	const handleNavigation = (categoryId: number) => {
		router.push(
			`/gde-da-kupim?categoryId=${categoryId}&countryId=1&cityId=1&cityPartId=1&marketplaceId=0`
		);
	};

	const toggleExpand = (categoryId: number) => {
		setExpandedCategories(prev => ({
			...prev,
			[categoryId]: !prev[categoryId],
		}));
	};

	const handleSlide = (categoryId: number, direction: 'next' | 'prev') => {
		setActiveIndex(prevIndex => {
			const currentIndex = prevIndex[categoryId] || 0;
			const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
			const category = categories?.find(cat => cat.id === categoryId);
			const maxIndex = category ? Math.ceil(category.children.length / 3) - 1 : 0;
			return {
				...prevIndex,
				[categoryId]: Math.max(0, Math.min(newIndex, maxIndex)),
			};
		});
	};

	if (!categories || categories.length === 0) {
		return <p className='text-center text-gray-500'>No categories available</p>;
	}

	return (
		<div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			{categories.map(category => (
				<div key={category.id} className='relative border-b p-4 rounded-lg shadow-sm bg-white'>
					<div
						className='flex flex-col items-center cursor-pointer space-y-2 mb-4'
						onClick={() => handleNavigation(category.id)}>
						{category.icon && (
							<div className='relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md'>
								<Image
									src={category.icon.url}
									alt={category.icon.name}
									layout='fill'
									objectFit='cover'
									className='transform transition-transform duration-300 ease-in-out hover:scale-105'
								/>
							</div>
						)}
						<span className='text-center text-lg font-semibold text-gray-800 hover:text-orange-500 tracking-wide'>
							{category.name}
						</span>
					</div>

					{category.children && category.children.length > 0 && (
						<div className='relative'>
							<div className='flex overflow-x-auto space-x-2 px-1 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300'>
								{category.children.map(subCategory => (
									<div
										key={subCategory.id}
										className='flex flex-col items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md transition w-20 flex-shrink-0'>
										<div className='relative w-12 h-12 bg-white rounded-lg overflow-hidden shadow'>
											{subCategory.icon && (
												<Image
													src={subCategory.icon.url}
													alt={subCategory.icon.name}
													layout='fill'
													objectFit='contain'
													className='transition transform hover:scale-105'
												/>
											)}
										</div>
										<span className='text-xs text-gray-700 mt-1 text-center'>
											{subCategory.name}
										</span>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default CategoryList;
