'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Category, Icon, Translation, Language } from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import EditCategoryForm from '../forms/EditCategoryForm';
import InputDefault from '../input/InputDefault';
import { handleError } from '@/utils/helpers/universalFunctions';

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
	setError: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
	setError,
	setSuccessMessage,
	setLoading,
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

	useEffect(() => {
		if (!searchQuery.trim()) {
			const sortedCategories = [...categories].sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

			setFilteredCategories(sortedCategories);
			setExpandedCategories(new Set(initialExpandedCategories));
		} else {
			const { filteredCategories: filtered, expandedIds } = searchCategories(
				categories,
				searchQuery
			);

			const sortedFiltered = filtered.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});

			setFilteredCategories(sortedFiltered);
			setExpandedCategories(expandedIds);
		}
	}, [searchQuery, categories, initialExpandedCategories]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			setExpandedCategories(prev => {
				const manuallyExpanded = manuallyExpandedCategories;

				if (
					prev.size !== manuallyExpanded.size ||
					[...prev].some(id => !manuallyExpanded.has(id))
				) {
					return new Set(manuallyExpanded);
				}
				return prev;
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
		setNewIcon(null);
		setCurrentIcon({ iconId: null, iconUrl: null });
		setRelatedIds([]);
		setParentIds([]);
		setNewTranslations([]);
	};

	const handleSubmitEdit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();

			if (!currentIcon.iconId && !newIcon) {
				setError('Morate izabrati postojeću ikonu ili dodati novu ikonu za upload.');
				return;
			}

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
				handleError(err, setError, setSuccessMessage);
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
		}
	};

	const handleDelete = useCallback(
		async (id: number) => {
			if (
				confirm('Da li ste sigurni da želite obrisati ovu kategoriju i njene moguće potkategorije?')
			) {
				try {
					await onDeleteCategory(id);
					await refetchCategories();
				} catch (err) {
					handleError(err, setError, setSuccessMessage);
				}
			}
		},
		[onDeleteCategory, refetchCategories]
	);

	const filterCategoriesForSelect = () => {
		const allCategories: Category[] = [];

		const traverseCategories = (categoryList: Category[]) => {
			categoryList.forEach(cat => {
				allCategories.push(cat);

				if (cat.children && cat.children.length > 0) {
					traverseCategories(cat.children);
				}
			});
		};

		traverseCategories(categories);

		return allCategories.filter(
			cat =>
				!relatedIds.includes(cat.id) &&
				!parentIds.includes(cat.id) &&
				cat.id !== currentEditCategory?.id
		);
	};

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

	const getCategoryName = useCallback(
		(labelId: number, languageId: number) => {
			const translation = translations.find(
				t => t.labelId === labelId && t.languageId === languageId
			);
			if (translation && translation.translation) {
				return translation.translation.charAt(0).toUpperCase() + translation.translation.slice(1);
			}
			return 'Nedostaje naziv kategorije';
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
		<>
			<div className='mb-4'>
				<InputDefault
					placeholder='Brza pretraga kategorija'
					value={searchQuery}
					onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
						setSearchQuery(e.target.value)
					}
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
					setError={setError}
					setSuccessMessage={setSuccessMessage}
					setLoading={setLoading}
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
		</>
	);
};

export default CategoryList;
