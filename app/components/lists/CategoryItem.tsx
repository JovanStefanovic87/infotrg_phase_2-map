'use client';
import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
	Category,
	Icon,
	Language,
	Translation,
	TranslationUpdate,
} from '../../../utils/helpers/types';
import { getCategoryIconUrl } from '../../../utils/helpers/universalFunctions';
import H4 from '../text/H4';
import TextNormal from '../text/TextNormal';
import TextWrapped from '../text/TextWrapped';
import ArrowToggleButton from '../buttons/ArrowToggleButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';

interface CategoryItemProps {
	category: Category;
	icons: Icon[];
	translations: Translation[];
	languages: Language[];
	languageId: number;
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	setCurrentEditCategory: React.Dispatch<React.SetStateAction<Category | null>>;
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	setNewTranslations: React.Dispatch<React.SetStateAction<TranslationUpdate[]>>;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleDelete: (categoryId: number) => void;
	setRelatedIds: (relatedIds: number[]) => void;
	expandedCategories: Set<number>; // Expanded categories
	toggleCategory: (id: number) => void; // Function to toggle category expand/collapse
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	icons,
	translations,
	languages,
	languageId,
	setCurrentIcon,
	setCurrentEditCategory,
	setParentIds,
	setNewTranslations,
	setNewIcon,
	setIsModalOpen,
	handleDelete,
	setRelatedIds,
	expandedCategories, // Use expandedCategories instead of manuallyExpandedCategories or expandedCategoriesForSearch
	toggleCategory, // Function to toggle category
}) => {
	// State for displaying related categories
	const [displayRelatedCategories, setDisplayRelatedCategories] = useState<Category[]>([]);

	// State for editing related categories
	const [relatedCategories, setRelatedCategories] = useState<Category[]>([]);

	const iconUrl = getCategoryIconUrl(category.iconId, icons);

	// Check if the category is expanded based on expandedCategories
	const isCategoryExpanded = useCallback(
		(id: number) => {
			return expandedCategories.has(id);
		},
		[expandedCategories]
	);

	// Function to fetch related categories for display
	const fetchRelatedCategoriesForDisplay = useCallback(async (relatedIds: number[]) => {
		try {
			const promises = relatedIds.map(id => axios.get<Category>(`/api/categories/${id}`));
			const relatedData = await Promise.all(promises);

			const categories = relatedData.map(response => response.data);
			setDisplayRelatedCategories(categories);
		} catch (error) {
			console.error('Failed to fetch related categories for display', error);
			setDisplayRelatedCategories([]);
		}
	}, []);

	// Automatically fetch related categories on component mount
	useEffect(() => {
		if (category.relatedIds && category.relatedIds.length > 0) {
			fetchRelatedCategoriesForDisplay(category.relatedIds);
		} else {
			setDisplayRelatedCategories([]);
		}
	}, [category.relatedIds, fetchRelatedCategoriesForDisplay]);

	// Function to fetch and set related categories for editing
	const fetchRelatedCategoriesForEdit = useCallback(
		async (relatedIds: number[]) => {
			try {
				const promises = relatedIds.map(id => axios.get<Category>(`/api/categories/${id}`));
				const relatedData = await Promise.all(promises);

				const categories = relatedData.map(response => response.data);
				setRelatedCategories(categories);
				setRelatedIds(relatedIds);
			} catch (error) {
				console.error('Failed to fetch related categories for edit', error);
				setRelatedCategories([]);
				setRelatedIds([]);
			}
		},
		[setRelatedIds]
	);

	const getCategoryName = useCallback(
		(labelId: number, languageId: number) => {
			const translation = translations.find(
				t => t.labelId === labelId && t.languageId === languageId
			);
			if (translation && translation.translation) {
				return translation.translation.charAt(0).toUpperCase() + translation.translation.slice(1);
			}
			return 'Unknown';
		},
		[translations]
	);

	const getParentCategoryNames = useCallback(
		(parents: Category[], languageId: number): string => {
			if (parents.length === 0) return 'Ovo je glavna kategorija';
			return parents.map(parent => getCategoryName(parent.labelId, languageId)).join(', ');
		},
		[getCategoryName]
	);

	// Handle opening the edit modal
	const handleOpenEditModal = useCallback(
		async (category: Category) => {
			setCurrentEditCategory(category);
			setParentIds(category.parents.map(parent => parent.id));

			// Fetch translations for editing
			const { data: categoryTranslations } = await axios.get<Translation[]>(
				`/api/translation/labels/${category.labelId}`
			);

			const existingTranslations = categoryTranslations.map(t => ({
				translationId: t.id,
				languageId: t.languageId,
				translation: t.translation,
				description: t.description || '',
				synonyms: t.synonyms.map(s => s.synonym),
			}));

			setNewTranslations(existingTranslations);

			// Fetch related categories for editing
			if (category.relatedIds && category.relatedIds.length > 0) {
				await fetchRelatedCategoriesForEdit(category.relatedIds);
			} else {
				setRelatedCategories([]);
			}

			// Set icon for editing
			const iconId = category.iconId || null;
			const iconUrl = getCategoryIconUrl(iconId, icons);
			setCurrentIcon({ iconId, iconUrl });

			setNewIcon(null);
			setIsModalOpen(true);
		},
		[fetchRelatedCategoriesForEdit, setRelatedIds, setNewTranslations, setCurrentIcon]
	);

	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<H4 text={getCategoryName(category.labelId, languageId)} color='black' shouldBreak />
			<div className='mt-2'>
				{category.iconId ? (
					iconUrl ? (
						<Image src={iconUrl} alt='Category Icon' width={50} height={50} />
					) : (
						<p>Ikonica nije izabrana</p>
					)
				) : (
					<p>Ikonica ne postoji</p>
				)}
			</div>

			<TextNormal text={`Natkategorije:`} weight='bold' />
			<TextWrapped block={getParentCategoryNames(category.parents, languageId)} />

			<TextNormal text={`Povezane kategorije:`} weight='bold' />
			{displayRelatedCategories.length > 0 ? (
				<ul className='list-disc pl-5 text-gray-800'>
					{displayRelatedCategories.map(relatedCategory => (
						<li key={relatedCategory.id}>{getCategoryName(relatedCategory.labelId, languageId)}</li>
					))}
				</ul>
			) : (
				<TextWrapped block='Nema povezanih kategorija' />
			)}

			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={() => handleOpenEditModal(category)} />
				<DeleteButton onClick={() => handleDelete(category.id)} />
			</div>

			{category.children && category.children.length > 0 && (
				<div
					className='flex justify-center items-center py-2 bg-black rounded-lg mt-4'
					onClick={() => toggleCategory(category.id)}>
					<ArrowToggleButton
						isOpen={isCategoryExpanded(category.id)}
						onClick={() => {}}
						title='Potkategorije'
					/>
				</div>
			)}

			{category.children && isCategoryExpanded(category.id) && (
				<div className='mt-4 pl-4'>
					{category.children.map(subCategory => (
						<CategoryItem
							key={subCategory.id}
							category={subCategory}
							icons={icons}
							translations={translations}
							languages={languages}
							languageId={languageId}
							setCurrentIcon={setCurrentIcon}
							setCurrentEditCategory={setCurrentEditCategory}
							setParentIds={setParentIds}
							setNewTranslations={setNewTranslations}
							setNewIcon={setNewIcon}
							setIsModalOpen={setIsModalOpen}
							handleDelete={handleDelete}
							setRelatedIds={setRelatedIds}
							expandedCategories={expandedCategories} // Pass expandedCategories down
							toggleCategory={toggleCategory} // Pass toggleCategory function down
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
