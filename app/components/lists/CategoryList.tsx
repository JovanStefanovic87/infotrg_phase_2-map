'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Category, Icon, Translation, Language } from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import EditCategoryForm from '../forms/EditCategoryForm';

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
	relatedIds: number[];
	setRelatedIds: (relatedIds: number[]) => void;
	refetchCategories: () => Promise<void>;
	onDeleteCategory: (id: number) => Promise<void>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: (isOpen: boolean) => void;
	filteredCategories: Category[];
	setFilteredCategories: React.Dispatch<React.SetStateAction<Category[]>>;
	initialExpandedCategories: Set<number>;
	setInitialExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	manuallyExpandedCategories: Set<number>;
	setManuallyExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	expandedCategories: Set<number>;
	setExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
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
	relatedIds,
	setRelatedIds,
	manuallyExpandedCategories,
	setManuallyExpandedCategories,
	filteredCategories,
	setFilteredCategories,
	initialExpandedCategories,
	setInitialExpandedCategories,
	expandedCategories,
	setExpandedCategories,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditCategory, setCurrentEditCategory] = useState<Category | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [newTranslations, setNewTranslations] = useState<TranslationUpdate[]>([]);
	const [parentIds, setParentIds] = useState<number[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const searchCategories = (
		categories: Category[],
		query: string
	): { filteredCategories: Category[]; expandedIds: Set<number> } => {
		const lowercasedQuery = query.toLowerCase();
		const expandedIds = new Set<number>();

		const recursiveSearch = (categories: Category[]): Category[] => {
			return categories
				.map(category => {
					const categoryName = getCategoryName(category.labelId, languageId).toLowerCase();
					const matches = categoryName.includes(lowercasedQuery);

					const childMatches = category.children ? recursiveSearch(category.children) : [];

					if (matches || childMatches.length > 0) {
						expandedIds.add(category.id);

						return {
							...category,
							children: childMatches.length > 0 ? childMatches : category.children,
						};
					}
					return null;
				})
				.filter(Boolean) as Category[];
		};

		const filteredCategories = recursiveSearch(categories);
		return { filteredCategories, expandedIds };
	};

	useEffect(() => {
		if (!searchQuery.trim()) {
			setInitialExpandedCategories(new Set(manuallyExpandedCategories));
		}
	}, [manuallyExpandedCategories]);

	// Search logic and reset state when search is cleared
	useEffect(() => {
		if (!searchQuery.trim()) {
			// Sortiraj kategorije po abecednom redosledu (po imenu)
			const sortedCategories = [...categories].sort((a, b) => {
				return a.name.localeCompare(b.name); // Sortiranje po imenu
			});

			setFilteredCategories(sortedCategories);
			setExpandedCategories(new Set(initialExpandedCategories));
		} else {
			const { filteredCategories: filtered, expandedIds } = searchCategories(
				categories,
				searchQuery
			);

			// Sortiraj filtrirane kategorije po abecednom redosledu
			const sortedFiltered = filtered.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

			setFilteredCategories(sortedFiltered);
			setExpandedCategories(expandedIds);
		}
	}, [searchQuery, categories, initialExpandedCategories]);

	// Save expanded categories on initial load or refetch
	useEffect(() => {
		if (!searchQuery.trim()) {
			// This will only set expandedCategories if manuallyExpandedCategories has changed
			setExpandedCategories(prev => {
				const manuallyExpanded = manuallyExpandedCategories;

				if (
					prev.size !== manuallyExpanded.size ||
					[...prev].some(id => !manuallyExpanded.has(id))
				) {
					return new Set(manuallyExpanded); // Create a new Set only if it has changed
				}
				return prev; // No update needed
			});
		}
	}, [manuallyExpandedCategories, searchQuery]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setExpandedCategories(new Set(manuallyExpandedCategories));
		}
	}, [manuallyExpandedCategories]);

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setNewIcon(null); // Reset newIcon when closing the modal
		setCurrentIcon({ iconId: null, iconUrl: null }); // Optionally reset currentIcon
		setRelatedIds([]); // Reset relatedIds
		setParentIds([]); // Reset parent categories
		setNewTranslations([]); // Clear translation updates
	};

	// Handle the edit form submission
	const handleSubmitEdit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (!currentEditCategory) return;

			try {
				let iconId = currentIcon.iconId;

				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					formData.append('directory', 'articles');

					const { data: iconData } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});

					iconId = iconData?.iconId;
				}

				if (iconId) {
					await axios.put(`/api/categories/${currentEditCategory.id}`, {
						iconId,
						parentIds,
						relatedIds,
						translations: newTranslations.map(
							({ translationId, languageId, translation, description, synonyms }) => ({
								translationId,
								languageId,
								translation,
								description,
								synonyms: synonyms || [],
							})
						),
						labelId: currentEditCategory.labelId,
					});
				}

				setIsModalOpen(false);
				setRelatedIds([]);
				await refetchCategories();
			} catch (err) {
				console.error('Failed to edit category', err);
			}
		},
		[
			currentEditCategory,
			newTranslations,
			newIcon,
			currentIcon.iconId,
			parentIds,
			refetchCategories,
			relatedIds,
		]
	);

	// Handle file change for the icon
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			setNewIcon(selectedFile);
		} else {
			console.log('No file selected');
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

	// Helper function to filter categories for the select input (avoiding circular references)
	const filterCategoriesForSelect = () => {
		const allCategories: Category[] = [];

		const traverseCategories = (categoryList: Category[]) => {
			categoryList.forEach(cat => {
				allCategories.push(cat); // Add the current category to the list

				if (cat.children && cat.children.length > 0) {
					traverseCategories(cat.children); // Recursively add subcategories
				}
			});
		};

		traverseCategories(categories); // Start from the root categories

		// Filter out categories that are already related, selected as parent categories,
		// and the category being edited (currentEditCategory).
		return allCategories.filter(
			cat =>
				!relatedIds.includes(cat.id) &&
				!parentIds.includes(cat.id) &&
				cat.id !== currentEditCategory?.id // Exclude the category being edited
		);
	};

	// Recursive function to get all descendants of a category
	const getDescendants = (
		category: Category,
		descendants: Set<number> = new Set()
	): Set<number> => {
		if (category.children && Array.isArray(category.children)) {
			category.children.forEach(child => {
				descendants.add(child.id);
				getDescendants(child, descendants);
			});
		}
		return descendants;
	};

	// Recursive function to get all ancestors of a category
	const getAncestors = (category: Category, ancestors: Set<number> = new Set()): Set<number> => {
		if (category.parents && Array.isArray(category.parents)) {
			category.parents.forEach(parent => {
				ancestors.add(parent.id);
				const parentCategory = categories.find(cat => cat.id === parent.id);
				if (parentCategory) {
					getAncestors(parentCategory, ancestors);
				}
			});
		}
		return ancestors;
	};

	// Function to get the complete branch of a category (descendants + ancestors)
	const getCompleteBranch = (category: Category): Set<number> => {
		const branch = new Set<number>();
		branch.add(category.id); // Add the category itself
		const descendants = getDescendants(category);
		const ancestors = getAncestors(category);
		descendants.forEach(id => branch.add(id));
		ancestors.forEach(id => branch.add(id));
		return branch;
	};

	// Get the category name in the current language
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

	const toggleCategory = (id: number) => {
		setManuallyExpandedCategories(prev => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
		setExpandedCategories(prev => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	return (
		<div>
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Brza pretraga kategorija'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border p-2 w-full text-black'
				/>
			</div>
			{filteredCategories.map(category => (
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
					toggleCategory={toggleCategory}
					expandedCategories={expandedCategories}
					setRelatedIds={setRelatedIds}
				/>
			))}

			{isModalOpen && currentEditCategory && (
				<CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal} mt='10'>
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
						relatedIds={relatedIds}
						setRelatedIds={setRelatedIds}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default CategoryList;
