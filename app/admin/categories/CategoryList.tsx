import React, { useEffect } from 'react';
import Image from 'next/image';

interface Category {
	id: number;
	labelId: number;
	parentId: number | null;
	iconId: number | null;
	subcategories: Category[];
}

interface Icon {
	id: number;
	url: string; // Path to the icon image
}

interface Translation {
	id: number;
	labelId: number;
	languageId: number;
	translation: string;
}

interface CategoryListProps {
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, translations, icons }) => {
	useEffect(() => {
		console.log('Categories:', categories);
	}, [categories]);

	const getCategoryName = (labelId: number, languageId: number) => {
		const translation = translations.find(
			t => t.labelId === labelId && t.languageId === languageId
		);
		return translation ? translation.translation : 'Unknown';
	};

	const getParentCategoryName = (parentId: number | null, languageId: number) => {
		if (parentId === null) return 'None';
		const parentCategory = categories.find(c => c.id === parentId);
		return parentCategory ? getCategoryName(parentCategory.labelId, languageId) : 'Unknown';
	};

	const getCategoryIconUrl = (iconId: number | null) => {
		const icon = icons.find(icon => icon.id === iconId);
		return icon ? icon.url : '';
	};

	const renderCategory = (category: Category) => (
		<div key={category.id} className='border p-4 mb-4'>
			<h3 className='text-lg font-semibold'>{getCategoryName(category.labelId, 1)}</h3>
			<p>Parent Category: {getParentCategoryName(category.parentId, 1)}</p>
			<div>
				{category.iconId ? (
					getCategoryIconUrl(category.iconId) ? (
						<Image
							src={getCategoryIconUrl(category.iconId)}
							alt='Category Icon'
							width={50}
							height={50}
						/>
					) : (
						<p>Icon not available</p>
					)
				) : (
					<p>No icon</p>
				)}
			</div>
		</div>
	);

	const renderCategories = (categories: Category[], parentId: number | null) => {
		const subcategories = categories.filter(c => c.parentId === parentId);

		if (subcategories.length === 0) return null;

		return (
			<div className='ml-4'>
				{subcategories.map(category => (
					<div key={category.id}>
						{renderCategory(category)}
						{renderCategories(category.subcategories, category.id)} {/* Recursive call */}
					</div>
				))}
			</div>
		);
	};

	return <div>{renderCategories(categories, null)}</div>; // Start with top-level categories
};

export default CategoryList;
