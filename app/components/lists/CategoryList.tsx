'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
	CategoryByLanguageAndPrefix,
	Icon,
	TranslationUpdate,
	Language,
} from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import axios from 'axios';
import CategoryItem from './CategoryItem';
import EditCategoryForm from '../forms/EditCategoryForm';

interface CategoryListProps {
	categories: CategoryByLanguageAndPrefix[];
	currentIcon: { iconId: number | null; iconUrl: string | null };
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	languages: Language[];
	languageId: number;
	relatedIds: number[];
	setRelatedIds: (relatedIds: number[]) => void;
	refetchCategories: () => Promise<void>;
	onDeleteCategory: (id: number) => Promise<void>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: (isOpen: boolean) => void;
	filteredCategories: CategoryByLanguageAndPrefix[];
	setFilteredCategories: React.Dispatch<React.SetStateAction<CategoryByLanguageAndPrefix[]>>;
	initialExpandedCategories: Set<number>;
	setInitialExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	manuallyExpandedCategories: Set<number>;
	setManuallyExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	expandedCategories: Set<number>;
	setExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
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
	const [currentEditCategory, setCurrentEditCategory] =
		useState<CategoryByLanguageAndPrefix | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [newTranslations, setNewTranslations] = useState<TranslationUpdate[]>([]);
	const [parentIds, setParentIds] = useState<number[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const searchCategories = (
		categories: CategoryByLanguageAndPrefix[],
		query: string
	): { filteredCategories: CategoryByLanguageAndPrefix[]; expandedIds: Set<number> } => {
		const lowercasedQuery = query.toLowerCase();
		const expandedIds = new Set<number>();

		const recursiveSearch = (
			categories: CategoryByLanguageAndPrefix[]
		): { filteredCategories: CategoryByLanguageAndPrefix[]; expandedIds: Set<number> } => {
			const expandedIds = new Set<number>();

			return {
				filteredCategories: categories
					.map(category => {
						const categoryName = category.name.toLowerCase();
						const matches = categoryName.includes(lowercasedQuery);

						const childMatches = category.children
							? recursiveSearch(category.children as CategoryByLanguageAndPrefix[])
									.filteredCategories
							: [];

						if (matches || childMatches.length > 0) {
							expandedIds.add(category.id);

							return {
								...category,
								children: childMatches.length > 0 ? childMatches : category.children,
							};
						}
						return null;
					})
					.filter(Boolean) as CategoryByLanguageAndPrefix[],
				expandedIds,
			};
		};

		return recursiveSearch(categories);
	};

	useEffect(() => {
		if (!searchQuery.trim()) {
			setInitialExpandedCategories(new Set(manuallyExpandedCategories));
		}
	}, [manuallyExpandedCategories]);

	useEffect(() => {
		if (!searchQuery.trim()) {
			const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name));
			setFilteredCategories(sortedCategories);
			setExpandedCategories(new Set(initialExpandedCategories));
		} else {
			const { filteredCategories: filtered, expandedIds } = searchCategories(
				categories,
				searchQuery
			);
			setFilteredCategories(filtered);
			setExpandedCategories(expandedIds);
		}
	}, [searchQuery, categories, initialExpandedCategories]);

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

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const selectedFile = event.target.files[0];
			setNewIcon(selectedFile);
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

	const filterCategoriesForSelect = () => {
		const allCategories: CategoryByLanguageAndPrefix[] = [];

		const traverseCategories = (categoryList: CategoryByLanguageAndPrefix[]) => {
			categoryList.forEach(cat => {
				allCategories.push(cat);
				if (cat.children && Array.isArray(cat.children) && cat.children.length > 0) {
					traverseCategories(cat.children as CategoryByLanguageAndPrefix[]);
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
					languageId={languageId}
					handleDelete={handleDelete}
					setCurrentIcon={setCurrentIcon}
					setCurrentEditCategory={setCurrentEditCategory}
					setParentIds={setParentIds}
					setNewIcon={setNewIcon}
					setIsModalOpen={setIsModalOpen}
					setNewTranslations={setNewTranslations}
					expandedCategories={expandedCategories}
					setRelatedIds={setRelatedIds}
					toggleCategory={function (id: number): void {
						throw new Error('Function not implemented.');
					}}
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
						relatedIds={relatedIds}
						setRelatedIds={setRelatedIds}
						translations={[]}
					/>
				</CustomModal>
			)}
		</div>
	);
};

export default CategoryList;
