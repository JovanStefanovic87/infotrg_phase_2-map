import React, { useState, useEffect } from 'react';
import { fetchedCategories } from '@/utils/helpers/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface CategoryListProps {
	categories: any;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
	const router = useRouter();
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [languageCode, setLanguageCode] = useState('rs');

	useEffect(() => {
		const cookieLanguage = Cookies.get('languageCode') || 'rs';
		setLanguageCode(cookieLanguage);
	}, []);

	const defaultLocationSlugs: { [key: string]: string[] } = {
		rs: ['county-srbija-rs', 'city-subotica-rs', 'suburb-buvljak-subotica-rs'],
		hu: ['county-szerbia-hu', 'city-szabadka-hu', 'suburb-szabadkai-bolhapiac-hu'],
	};

	const getParentSlugs = (
		category: fetchedCategories,
		categories: fetchedCategories[]
	): string[] => {
		const parent = categories.find(cat => cat.id === category.parents[0]?.id);

		// Koristimo slug direktno iz kategorije
		const currentSlug = category.slug;

		if (!parent) return [currentSlug];

		return [...getParentSlugs(parent, categories), currentSlug];
	};

	const handleNavigation = (category: fetchedCategories) => {
		if (!categories) return;

		// Prikupljanje slugova svih nadkategorija i podkategorije
		const slugs = getParentSlugs(category, categories);

		// Dohvatanje podrazumevanih slugova za trenutni jezik
		const locationSlugs = defaultLocationSlugs[languageCode] || defaultLocationSlugs.rs;

		// Generisanje URL-a
		const urlPath = [...locationSlugs, ...slugs].join('/');

		router.push(`/gde-da-kupim/${languageCode}/${urlPath}`);
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
				categories
					.slice()
					.sort((a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name))
					.map((category: fetchedCategories) => (
						<div
							key={category.id}
							className='relative p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white shadow-sm'>
							<div
								className='flex flex-col items-center cursor-pointer space-y-3 mb-3'
								onClick={() => handleNavigation(category)}>
								{category.icon && (
									<div className='shadow-inner shadow-gray-300 overflow-hidden mr-4 rounded-full p-3 hover:overflow-visible hover:rotate-3 flex-shrink-0 relative w-[80px] h-[80px] transition-all duration-200'>
										<Image
											src={category.icon.url}
											alt={category.icon.name}
											fill
											sizes='100px'
											quality={100}
											className='transition-transform duration-200 ease-in-out hover:scale-105 object-contain'
										/>
									</div>
								)}
								<span className='text-center text-lg font-medium text-gray-900 tracking-wide'>
									{category.name}
								</span>
							</div>

							{category.children.map((subCategory: fetchedCategories) => (
								<div
									key={subCategory.id}
									className='flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all w-20 flex-shrink-0 outline-none select-none'
									onClick={() => handleNavigation(subCategory)}>
									<div className='mb-1 rounded-md p-1 overflow-visible flex-shrink-0 relative w-[50px] h-[50px] transition-all duration-200 hover:overflow-visible hover:rotate-3'>
										{subCategory.icon && (
											<Image
												src={subCategory.icon.url}
												alt={subCategory.icon.name}
												fill
												sizes='50px'
												className='transition-transform duration-200 hover:scale-105 ovject-contain'
											/>
										)}
									</div>
									<span className='text-xs text-gray-700 mt-1 text-center'>{subCategory.name}</span>
								</div>
							))}
						</div>
					))
			) : (
				<p className='text-center text-gray-500'>No categories available</p>
			)}
		</div>
	);
};

export default CategoryList;
