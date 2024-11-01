import React, { useState } from 'react';
import { fetchedCategories } from '@/utils/helpers/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CategoryListProps {
	categories: fetchedCategories[] | undefined;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
	const router = useRouter();
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const handleNavigation = (categoryId: number) => {
		router.push(
			`/gde-da-kupim?categoryId=${categoryId}&countryId=1&cityId=1&cityPartId=1&marketplaceId=0`
		);
	};

	const startDragging = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const slider = e.currentTarget;
		setIsDragging(true);
		setStartX(e.pageX - slider.offsetLeft);
		setScrollLeft(slider.scrollLeft);
	};

	const stopDragging = () => {
		setIsDragging(false);
	};

	const handleDragging = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!isDragging) return;
		e.preventDefault();
		const slider = e.currentTarget;
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startX) * 1.5; // Adjust scrolling speed
		slider.scrollLeft = scrollLeft - walk;
	};

	return (
		<div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white'>
			{categories && categories.length > 0 ? (
				categories.map(category => (
					<div
						key={category.id}
						className='relative p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'>
						<div
							className='flex flex-col items-center cursor-pointer space-y-3 mb-3'
							onClick={() => handleNavigation(category.id)}>
							{category.icon && (
								<div className='overflow-hidden mr-4 rounded-full p-3 hover:overflow-visible hover:rotate-3 flex-shrink-0 relative w-[80px] h-[80px] transition-all duration-200'>
									<Image
										src={category.icon.url}
										alt={category.icon.name}
										layout='fill'
										objectFit='cover'
										className='transition-transform duration-200 ease-in-out hover:scale-105'
									/>
								</div>
							)}
							<span className='text-center text-lg font-medium text-gray-900 tracking-wide'>
								{category.name}
							</span>
						</div>

						{category.children && category.children.length > 0 && (
							<div
								className='relative flex overflow-x-auto space-x-3 px-1 custom-scrollbar scrollbar-thin'
								onMouseDown={startDragging}
								onMouseLeave={stopDragging}
								onMouseUp={stopDragging}
								onMouseMove={handleDragging}
								style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
								{category.children.map(subCategory => (
									<div
										key={subCategory.id}
										className='flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all w-20 flex-shrink-0 outline-none select-none'>
										<div className='mb-1 rounded-md  p-1 overflow-visible flex-shrink-0 relative w-[50px] h-[50px] transition-all duration-200 hover:overflow-visible hover:rotate-3'>
											{subCategory.icon && (
												<Image
													src={subCategory.icon.url}
													alt={subCategory.icon.name}
													layout='fill'
													objectFit='contain'
													className='transition-transform duration-200 hover:scale-105'
												/>
											)}
										</div>
										<span className='text-xs text-gray-700 mt-1 text-center'>
											{subCategory.name}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
				))
			) : (
				<p className='text-center text-gray-500'>No categories available</p>
			)}
		</div>
	);
};

export default CategoryList;
