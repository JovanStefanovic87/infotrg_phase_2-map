import React from 'react';
import Image from 'next/image';
import { Category, Icon, Translation } from '@/utils/helpers/types';

interface CategoryListProps {
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
	languageId: number;
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	translations,
	icons,
	languageId,
}) => {
	const getCategoryName = (labelId: number, languageId: number) => {
		const translation = translations.find(
			t => t.labelId === labelId && t.languageId === languageId
		);
		return translation ? translation.translation : 'Unknown';
	};

	const getParentCategoryName = (parentId: number | null, languageId: number): string => {
		if (parentId === null) return 'None';

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

	const renderCategory = (category: Category) => {
		const iconUrl = getCategoryIconUrl(category.iconId);
		return (
			<div key={category.id} className='border p-4 mb-4'>
				<h3 className='text-lg font-semibold'>{getCategoryName(category.labelId, languageId)}</h3>
				<p>Parent Category: {getParentCategoryName(category.parentId, languageId)}</p>
				<div>
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
						{renderCategory(category)}
						{renderCategories(category.subcategories || [], category.id)}
					</div>
				))}
			</div>
		);
	};

	return <div>{renderCategories(categories, null)}</div>;
};

export default CategoryList;
