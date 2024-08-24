'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Category, Icon, Translation, Language } from '@/utils/helpers/types';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Import icons

interface CategoryListProps {
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
	languages: Language[]; // Add languages to props
	languageId: number;
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	translations,
	icons,
	languages, // Destructure languages
	languageId,
}) => {
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());

	const toggleCategory = (id: number) => {
		setOpenCategories(prev => {
			const newOpenCategories = new Set(prev);
			if (newOpenCategories.has(id)) {
				newOpenCategories.delete(id);
			} else {
				newOpenCategories.add(id);
			}
			return newOpenCategories;
		});
	};

	const getCategoryName = (labelId: number, languageId: number) => {
		const translation = translations.find(
			t => t.labelId === labelId && t.languageId === languageId
		);
		return translation ? translation.translation : 'Unknown';
	};

	const getLanguageName = (languageId: number) => {
		const language = languages.find(l => l.id === languageId);
		return language ? language.name : 'Unknown';
	};

	const getParentCategoryName = (parentId: number | null, languageId: number): string => {
		if (parentId === null) return 'Ovo je glavna nadkategorija';

		const findCategory = (categories: Category[], parentId: number): Category | undefined => {
			for (const category of categories) {
				if (category.id === parentId) {
					return category;
				}
				const foundInSubcategories = findCategory(category.subcategories || [], parentId);
				if (foundInSubcategories) {
					return foundInSubcategories;
				}
			}
			return undefined;
		};

		const parentCategory = findCategory(categories, parentId);
		return parentCategory ? getCategoryName(parentCategory.labelId, languageId) : 'Unknown';
	};

	const getCategoryIconUrl = (iconId: number | null) => {
		const icon = icons.find(icon => icon.id === iconId);
		return icon ? icon.url : '';
	};

	const getCategoryTranslations = (labelId: number) => {
		return translations.filter(t => t.labelId === labelId);
	};

	const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
		const iconUrl = getCategoryIconUrl(category.iconId);
		const isOpen = openCategories.has(category.id);

		const categoryTranslations = getCategoryTranslations(category.labelId);
		const languagesList = categoryTranslations.map(t => getLanguageName(t.languageId)).join(', ');

		return (
			<div key={category.id} className='border p-4 mb-4 rounded-lg shadow-md'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold'>{getCategoryName(category.labelId, languageId)}</h3>
					{category.subcategories && category.subcategories.length > 0 && (
						<button
							className='text-blue-500 hover:text-blue-700 focus:outline-none flex items-center'
							onClick={() => toggleCategory(category.id)}>
							{isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
							<span className='ml-2'>Potkategorije</span>
						</button>
					)}
				</div>
				<p className='mt-2 text-gray-400'>
					<strong>Nadkategorija:</strong> {getParentCategoryName(category.parentId, languageId)}
				</p>
				<div className='mt-2'>
					{category.iconId ? (
						iconUrl ? (
							<Image src={iconUrl} alt='Category Icon' width={50} height={50} />
						) : (
							<p>Icon not available</p>
						)
					) : (
						<p>No icon</p>
					)}
				</div>
				<div className='mt-2'>
					<strong>Languages:</strong> {languagesList}
				</div>
			</div>
		);
	};

	const renderCategories = (categories: Category[], parentId: number | null) => {
		const subcategories = categories.filter(c => c.parentId === parentId);

		if (subcategories.length === 0) return null;

		return (
			<div className='ml-4'>
				{subcategories.map(category => (
					<div key={category.id}>
						<CategoryItem category={category} />
						{openCategories.has(category.id) &&
							renderCategories(category.subcategories || [], category.id)}
					</div>
				))}
			</div>
		);
	};

	return <div className='space-y-4'>{renderCategories(categories, null)}</div>;
};

export default CategoryList;
