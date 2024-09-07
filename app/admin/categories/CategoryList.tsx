'use client';
import React, { useState, useCallback } from 'react';
import { Category, Icon, Translation, Language } from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import EditCategoryForm from './EditCategoryForm';

interface CategoryListProps {
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
	currentIcon: {
		iconId: number | null;
		iconUrl: string | null;
	};
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	languages: Language[];
	languageId: number;
	refetchCategories: () => Promise<void>;
	onDeleteCategory: (id: number) => Promise<void>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: (isOpen: boolean) => void;
}

interface TranslationUpdate {
	translationId: number;
	languageId: number;
	translation: string;
	description?: string;
	synonyms: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	translations,
	icons,
	currentIcon,
	setCurrentIcon,
	languages,
	languageId,
	refetchCategories,
	onDeleteCategory,
	setIsIconPickerOpen,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditCategory, setCurrentEditCategory] = useState<Category | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [newTranslations, setNewTranslations] = useState<TranslationUpdate[]>([]);
	const [parentIds, setParentIds] = useState<number[]>([]);

	const handleSubmitEdit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (!currentEditCategory) return;

			try {
				let iconId: number | null = currentIcon.iconId;

				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					const { data: iconData } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = iconData.id;
				}

				const translationUpdates = newTranslations.map(
					({ translationId, languageId, translation, description, synonyms }) => ({
						translationId,
						languageId,
						translation,
						description, // Include description in the update payload
						synonyms: synonyms || [],
					})
				);

				await axios.put(`/api/categories/${currentEditCategory.id}`, {
					iconId,
					parentIds,
					translations: translationUpdates,
					labelId: currentEditCategory.labelId,
				});

				for (const { translationId, synonyms } of translationUpdates) {
					await axios.post('/api/synonyms', {
						translationId,
						synonyms,
					});
				}

				setIsModalOpen(false);
				await refetchCategories();
			} catch (err) {
				console.error('Failed to edit category', err);
			}
		},
		[currentEditCategory, newTranslations, newIcon, parentIds, refetchCategories, currentIcon]
	);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setNewIcon(event.target.files[0]);
		}
	};

	const handleDelete = useCallback(
		async (id: number) => {
			if (confirm('Are you sure you want to delete this category?')) {
				try {
					await onDeleteCategory(id);
					await refetchCategories();
				} catch (err) {
					console.error('Failed to delete category', err);
				}
			}
		},
		[onDeleteCategory, refetchCategories]
	);

	const flattenCategories = (categories: Category[]): Category[] => {
		let result: Category[] = [];

		const recurse = (cats: Category[]) => {
			for (const cat of cats) {
				result.push(cat);
				if (cat.children && cat.children.length > 0) {
					recurse(cat.children);
				}
			}
		};

		recurse(categories);
		return result;
	};

	// Helper function to recursively get all descendant IDs of a category
	const getDescendants = useCallback(
		(category: Category, descendants: Set<number> = new Set()): Set<number> => {
			category.children.forEach(child => {
				descendants.add(child.id);
				getDescendants(child, descendants); // Recursively add all nested children
			});
			return descendants;
		},
		[]
	);

	// Helper function to get all ancestors of a category
	const getAncestors = (category: Category, ancestors: Set<number> = new Set()): Set<number> => {
		category.parents.forEach(parent => {
			ancestors.add(parent.id);
			const parentCategory = categories.find(cat => cat.id === parent.id);
			if (parentCategory) {
				getAncestors(parentCategory, ancestors);
			}
		});
		return ancestors;
	};

	// Helper function to filter categories for select input
	const filterCategoriesForSelect = useCallback(() => {
		if (!currentEditCategory) return [];

		const allCategories = flattenCategories(categories);

		// Get all descendants of the current category
		const descendants = getDescendants(currentEditCategory);

		// Get direct parents of the current category
		const directParentIds = new Set(currentEditCategory.parents.map(parent => parent.id));

		// Use a Map to store unique categories by their IDs
		const uniqueCategoriesMap = new Map<number, Category>();

		for (const cat of allCategories) {
			// Exclude the current category, all its descendants, and its direct parent
			if (
				cat.id !== currentEditCategory.id &&
				!descendants.has(cat.id) &&
				!directParentIds.has(cat.id)
			) {
				uniqueCategoriesMap.set(cat.id, cat);
			}
		}

		const uniqueCategories = Array.from(uniqueCategoriesMap.values());

		return uniqueCategories;
	}, [categories, currentEditCategory, getDescendants]);

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

	// Sort categories alphabetically based on category name
	const sortedCategories = [...categories].sort((a, b) => {
		const nameA = getCategoryName(a.labelId, languageId).toLowerCase();
		const nameB = getCategoryName(b.labelId, languageId).toLowerCase();
		return nameA.localeCompare(nameB);
	});

	// Helper function to get the complete branch (all descendants and ancestors) of a category
	const getCompleteBranch = (category: Category): Set<number> => {
		const branch = new Set<number>();
		branch.add(category.id); // Add the category itself
		const descendants = getDescendants(category);
		const ancestors = getAncestors(category);
		descendants.forEach(id => branch.add(id));
		ancestors.forEach(id => branch.add(id));
		return branch;
	};

	return (
		<div>
			{sortedCategories.map(category => (
				<CategoryItem
					key={category.id}
					category={category}
					icons={icons}
					translations={translations}
					languages={languages}
					languageId={languageId}
					handleDelete={handleDelete}
					setCurrentIcon={setCurrentIcon}
					setCurrentEditCategory={setCurrentEditCategory}
					setParentIds={setParentIds}
					setNewIcon={setNewIcon}
					setIsModalOpen={setIsModalOpen}
					setNewTranslations={setNewTranslations}
				/>
			))}

			{isModalOpen && currentEditCategory && (
				<CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} mt='10'>
					<EditCategoryForm
						categories={categories}
						currentIcon={currentIcon}
						newIcon={newIcon}
						filterCategoriesForSelect={filterCategoriesForSelect}
						handleFileChange={handleFileChange}
						handleSubmitEdit={handleSubmitEdit}
						languages={languages}
						newTranslations={newTranslations}
						parentIds={parentIds}
						setNewTranslations={setNewTranslations}
						setParentIds={setParentIds}
						setIsIconPickerOpen={setIsIconPickerOpen}
						translations={translations}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default CategoryList;
