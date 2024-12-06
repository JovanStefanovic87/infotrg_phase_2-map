import React, { useState, useMemo } from 'react';
import { fetchedCategories, Synonym, ComboboxOption } from '@/utils/helpers/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import QuickSearch from '../components/input/QuickSearch';
import H1 from '../components/text/H1';
import H4 from '../components/text/H4';
import H2 from '../components/text/H2';
import homeImage from '@/public/images/home_infotrg.webp';
import { pageContentTranslations, PageContentTranslations } from '@/utils/translations';

interface CategoryListProps {
	categories: any;
	languageCode: string;
}

interface Category {
	id: number;
	name: string;
	iconId?: number;
	parents: Category[];
	children: Category[];
	synonyms: Synonym[];
	slug: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, languageCode }) => {
	const translations: PageContentTranslations = pageContentTranslations;
	const router = useRouter();
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(null);

	const defaultLocationSlugs: { [key: string]: string[] } = {
		rs: ['county-srbija-rs', 'city-subotica-rs', 'suburb-buvljak-subotica-rs'],
		hu: ['county-szerbia-hu', 'city-szabadka-hu', 'suburb-szabadkai-bolhapiac-hu'],
	};

	const getParentSlugs = (
		category: fetchedCategories,
		categories: fetchedCategories[]
	): string[] => {
		const parent = categories.find(cat => cat.id === category.parents[0]?.id);

		const currentSlug = category.slug;

		if (!parent) return [currentSlug];

		return [...getParentSlugs(parent, categories), currentSlug];
	};

	const findCategoryById = (id: number, categories: any[]): any | undefined => {
		for (const category of categories) {
			if (category.id === id) {
				return category;
			}
			if (category.children && category.children.length > 0) {
				const found = findCategoryById(id, category.children);
				if (found) return found;
			}
		}
		return undefined;
	};

	const handleNavigation = (category: fetchedCategories) => {
		if (!categories) return;

		// Prikupljanje slugova svih nadkategorija i podkategorije
		const slugs = getParentSlugs(category, categories);

		// Dohvatanje podrazumevanih slugova za trenutni jezik
		const locationSlugs = defaultLocationSlugs[languageCode] || defaultLocationSlugs.rs;
		const lastLocationSlug = locationSlugs[locationSlugs.length - 1] || '';

		const urlPath = [...[lastLocationSlug], ...slugs].join('/');

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

	const transformCategoriesToOptions = (categories: Category[]): ComboboxOption[] => {
		const options: ComboboxOption[] = [];

		const traverse = (category: Category, parentName: string | null = null) => {
			options.push({
				value: category.id.toString(),
				label: category.name,
				id: category.id,
				slug: category.slug,
				parent: parentName || undefined,
				synonyms: category.synonyms ? category.synonyms.map(s => s.synonym) : [],
			});

			category.children.forEach(child => traverse(child, category.name));
		};

		categories.forEach(category => traverse(category));
		return options;
	};

	const categoryOptions = useMemo(() => {
		return categories ? transformCategoriesToOptions(categories) : [];
	}, [categories]);

	return (
		<div className='pt-2'>
			<Image
				src={homeImage}
				alt='Infotrg Naslovna'
				width={1200}
				height={600}
				className='object-cover rounded-lg shadow-lg'
			/>
			<div className='flex flex-col items-center p-6 mx-auto w-full'>
				<H1
					title={translations[languageCode].homePageTitle}
					color='black'
					size='text-lg md:text-xl'
					pb={0}
				/>
			</div>
			<QuickSearch
				options={categoryOptions}
				onSelect={selectedOption => {
					if (selectedOption) {
						const selectedCategory = findCategoryById(
							parseInt(selectedOption.value, 10),
							categories
						);
						if (selectedCategory) {
							handleNavigation(selectedCategory);
						}
					}
				}}
				placeholder={translations[languageCode].search}
				selectedOption={selectedOption}
				setSelectedOption={setSelectedOption}
			/>
			<div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white'>
				{categories && categories.length > 0 ? (
					categories
						.slice()
						.sort((a: { name: string }, b: { name: any }) => a.name.localeCompare(b.name))
						.map((category: fetchedCategories) => (
							<div
								key={category.id}
								className='flex flex-col justify-between relative p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 bg-white shadow-md'>
								<div
									className='flex flex-col items-center cursor-pointer space-y-3 mb-3'
									onClick={() => handleNavigation(category)}>
									{category.icon && (
										<div className='p-3 relative w-[80px] h-[80px] transition-all duration-200'>
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
									<H2 text={category.name} color='black' size='lg' align='center' />
								</div>

								{category.children.length > 0 && (
									<div className='mt-4'>
										<div
											className='flex space-x-4 overflow-x-auto scrollbar-hide'
											onMouseDown={startDragging}
											onMouseMove={handleDragging}
											onMouseUp={stopDragging}
											onMouseLeave={stopDragging}>
											{category.children.map((subCategory: fetchedCategories) => (
												<div
													key={subCategory.id}
													className='flex flex-col items-center cursor-pointer p-3 rounded-lg transition-all border border-gray-200 hover:border-gray-400 hover:shadow-md bg-gray-50 flex-shrink-0'
													onClick={() => handleNavigation(subCategory)}>
													{subCategory.icon && (
														<div className='mb-2 rounded-md p-2 overflow-hidden flex-shrink-0 relative w-[60px] h-[60px] transition-all duration-200'>
															<Image
																src={subCategory.icon.url}
																alt={subCategory.icon.name}
																fill
																sizes='60px'
																className='object-contain transition-transform duration-200 hover:scale-110'
															/>
														</div>
													)}
													<H4
														text={subCategory.name}
														color='grayDarkest'
														weight='normal'
														align='center'
													/>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						))
				) : (
					<p className='text-center text-gray-500'>No categories available</p>
				)}
			</div>
		</div>
	);
};

export default CategoryList;
