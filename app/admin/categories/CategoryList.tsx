'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Category, Icon, Translation, Language } from '@/utils/helpers/types';
import { FiChevronDown, FiChevronUp, FiEdit, FiTrash } from 'react-icons/fi';

interface CategoryListProps {
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
	languages: Language[];
	languageId: number;
	refetchCategories: () => Promise<void>;
	onEditCategory: (id: number, newName: string) => Promise<void>;
	onDeleteCategory: (id: number) => Promise<void>;
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	translations,
	icons,
	languages,
	languageId,
	refetchCategories,
	onEditCategory,
	onDeleteCategory,
}) => {
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());

	useEffect(() => {
		// This ensures the component updates correctly when categories or translations change
		setOpenCategories(new Set());
	}, [categories, translations]);

	const toggleCategory = useCallback((id: number) => {
		setOpenCategories(prev => {
			const newOpenCategories = new Set(prev);
			if (newOpenCategories.has(id)) {
				newOpenCategories.delete(id);
			} else {
				newOpenCategories.add(id);
			}
			return newOpenCategories;
		});
	}, []);

	const getCategoryName = useCallback(
		(labelId: number, languageId: number) => {
			const translation = translations.find(
				t => t.labelId === labelId && t.languageId === languageId
			);
			return translation ? translation.translation : 'Unknown';
		},
		[translations, languageId]
	);

	const getLanguageName = useCallback(
		(languageId: number) => {
			const language = languages.find(l => l.id === languageId);
			return language ? language.name : 'Unknown';
		},
		[languages]
	);

	const getParentCategoryName = useCallback(
		(parentId: number | null, languageId: number): string => {
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
		},
		[categories, getCategoryName]
	);

	const getCategoryIconUrl = useCallback(
		(iconId: number | null) => {
			const icon = icons.find(icon => icon.id === iconId);
			return icon ? icon.url : '';
		},
		[icons]
	);

	const getCategoryTranslations = useCallback(
		(labelId: number) => {
			return translations.filter(t => t.labelId === labelId);
		},
		[translations]
	);

	const handleEdit = useCallback(
		async (id: number) => {
			const newName = prompt('Enter new category name:');
			if (newName === null) return;
			try {
				await onEditCategory(id, newName);
				await refetchCategories(); // Refetch categories after editing
			} catch (err) {
				console.error('Failed to edit category', err);
			}
		},
		[onEditCategory, refetchCategories]
	);

	const handleDelete = useCallback(
		async (id: number) => {
			if (confirm('Are you sure you want to delete this category?')) {
				try {
					await onDeleteCategory(id);
					await refetchCategories(); // Refetch categories after deleting
				} catch (err) {
					console.error('Failed to delete category', err);
				}
			}
		},
		[onDeleteCategory, refetchCategories]
	);

	const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
		const iconUrl = getCategoryIconUrl(category.iconId);
		const isOpen = openCategories.has(category.id);

		const categoryTranslations = getCategoryTranslations(category.labelId);
		const languagesList = categoryTranslations.map(t => getLanguageName(t.languageId)).join(', ');

		return (
			<div className='border p-4 mb-4 rounded-lg shadow-md'>
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

				<div className='mt-2'>
					{category.iconId ? (
						iconUrl ? (
							<Image src={iconUrl} alt='Category Icon' width={50} height={50} />
						) : (
							<p>Slika nije izabrana</p>
						)
					) : (
						<p>Ne postoji slika</p>
					)}
				</div>
				<p className='mt-2 text-gray-400'>
					<strong>Nadkategorija:</strong> {getParentCategoryName(category.parentId, languageId)}
				</p>
				<div className='mt-2'>
					<strong>Languages:</strong> {languagesList}
				</div>
				<div className='flex gap-4 mt-2 justify-end'>
					<button
						className='text-blue-500 hover:text-blue-700 flex items-center'
						onClick={() => handleEdit(category.id)}>
						<FiEdit size={20} />
						<span className='ml-1'>Izmeni</span>
					</button>
					<button
						className='text-red-500 hover:text-red-700 flex items-center'
						onClick={() => handleDelete(category.id)}>
						<FiTrash size={20} />
						<span className='ml-1'>Obriši</span>
					</button>
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
