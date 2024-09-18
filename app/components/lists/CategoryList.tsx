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
	onEditCategory: (
		id: number,
		data: {
			translations: Translation[];
			icon?: File | null;
			iconId?: number | null;
			parentIds: number[];
			relatedIds: number[]; // Added relatedIds to onEditCategory props
		}
	) => Promise<void>;
	onDeleteCategory: (id: number) => Promise<void>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: (isOpen: boolean) => void;
	expandedCategories: Set<number>;
	setExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	filteredCategories: Category[];
	setFilteredCategories: React.Dispatch<React.SetStateAction<Category[]>>;
	initialExpandedCategories: Set<number>;
	setInitialExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
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
	onEditCategory,
	onDeleteCategory,
	setIsIconPickerOpen,
	relatedIds,
	setRelatedIds,
	expandedCategories,
	setExpandedCategories,
	filteredCategories,
	setFilteredCategories,
	initialExpandedCategories,
	setInitialExpandedCategories,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditCategory, setCurrentEditCategory] = useState<Category | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [newTranslations, setNewTranslations] = useState<TranslationUpdate[]>([]);
	const [parentIds, setParentIds] = useState<number[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const searchCategories = (categories: Category[], query: string): Category[] => {
		const lowercasedQuery = query.toLowerCase();

		return categories
			.map(category => {
				const categoryName = getCategoryName(category.labelId, languageId).toLowerCase();
				const matches = categoryName.includes(lowercasedQuery);

				// Search within child categories
				const childMatches = searchCategories(category.children || [], query);

				// If the category or any of its children matches, include it
				if (matches || childMatches.length > 0) {
					setExpandedCategories(prev => {
						const newSet = new Set([...prev]);
						newSet.add(category.id); // Otvori nadkategoriju da se vidi filtrirana kategorija
						if (matches && childMatches.length === 0) {
							newSet.delete(category.id); // Zatvori potkategorije ako kategorija nema filtriranu decu
						}
						return newSet;
					});

					return {
						...category,
						children: childMatches.length > 0 ? childMatches : category.children, // Prikaži decu, ali bez otvaranja
					};
				}
				return null;
			})
			.filter(Boolean) as Category[];
	};

	// Trigger search whenever the searchQuery or categories change
	useEffect(() => {
		const filtered = searchQuery.trim() ? searchCategories(categories, searchQuery) : categories;

		// Ažuriraj filtrirane kategorije koristeći setFilteredCategories
		setFilteredCategories(filtered);

		// Ako je pretraga obrisana, vrati proširene kategorije na njihovo početno stanje
		if (!searchQuery.trim()) {
			setExpandedCategories(new Set(initialExpandedCategories));
		}
	}, [searchQuery, categories, languageId]);

	// Sačuvaj trenutno stanje proširenih kategorija pre pretrage
	useEffect(() => {
		if (!searchQuery.trim()) {
			setInitialExpandedCategories(new Set(expandedCategories));
		}
	}, [searchQuery]);

	// Handle the edit form submission
	const handleSubmitEdit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (!currentEditCategory) return;

			try {
				let iconId: number | null = currentIcon.iconId;

				// If a new icon is uploaded, handle the file upload
				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					const { data: iconData } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = iconData.id;
				}

				// Prepare the translations payload
				const translationUpdates = newTranslations.map(
					({ translationId, languageId, translation, description, synonyms }) => ({
						translationId,
						languageId,
						translation,
						description,
						synonyms: synonyms || [],
					})
				);

				// Submit the category update with hierarchy
				await axios.put(`/api/categories/${currentEditCategory.id}`, {
					iconId,
					parentIds,
					relatedIds, // Include relatedIds here
					translations: translationUpdates,
					labelId: currentEditCategory.labelId,
				});

				// Submit synonyms for translations
				for (const { translationId, synonyms } of translationUpdates) {
					await axios.post('/api/synonyms', { translationId, synonyms });
				}

				setIsModalOpen(false);
				setRelatedIds([]); // Reset relatedIds after successful submission
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
			relatedIds, // Ensure that relatedIds is part of the dependencies
		]
	);

	// Handle file change for the icon
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

	// Helper function to filter categories for the select input (avoiding circular references)
	const filterCategoriesForSelect = useCallback(() => {
		if (!currentEditCategory) return categories;

		// Dobijamo kompletnu granu (pretke i potomke) trenutne kategorije
		const completeBranch = getCompleteBranch(currentEditCategory);

		// Filtriramo kategorije koje nisu u kompletnom stablu i nisu već povezane kao relatedIds
		const uniqueCategories = categories.filter(
			cat => !completeBranch.has(cat.id) && !relatedIds.includes(cat.id)
		);

		return uniqueCategories;
	}, [categories, currentEditCategory, relatedIds]);

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

	const toggleCategory = useCallback((id: number) => {
		setExpandedCategories(prev => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	}, []);

	// Sort categories alphabetically
	const sortedCategories = [...categories].sort((a, b) => {
		const nameA = getCategoryName(a.labelId, languageId).toLowerCase();
		const nameB = getCategoryName(b.labelId, languageId).toLowerCase();
		return nameA.localeCompare(nameB);
	});

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
					setRelatedIds={setRelatedIds}
					expandedCategories={expandedCategories}
					toggleCategory={toggleCategory}
				/>
			))}

			{isModalOpen && currentEditCategory && (
				<CustomModal
					isOpen={isModalOpen}
					onRequestClose={() => {
						setIsModalOpen(false);
						setRelatedIds([]); // Reset relatedIds when modal is closed
					}}
					mt='10'>
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
