'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { CategoryWithTranslations, Icon, Translation, Language } from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import CategoryItem from './CategoryItem';
import EditCategoryForm from '../forms/EditCategoryForm';
import InputDefault from '../input/InputDefault';
import { handleError } from '@/utils/helpers/universalFunctions';

interface CategoryListProps {
	categories: CategoryWithTranslations[];
	icons: Icon[];
	currentIcon: { iconId: number | null; iconUrl: string | null };
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	languages: Language[];
	languageId: number;
	refetchCategories: () => Promise<void>;
	initialExpandedCategories: Set<number>;
	setInitialExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	manuallyExpandedCategories: Set<number>;
	setManuallyExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	expandedCategories: Set<number>;
	setExpandedCategories: React.Dispatch<React.SetStateAction<Set<number>>>;
	onDeleteCategory: (id: number) => Promise<void>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	icons,
	currentIcon,
	setCurrentIcon,
	languages,
	languageId,
	refetchCategories,
	manuallyExpandedCategories,
	setManuallyExpandedCategories,
	initialExpandedCategories,
	setInitialExpandedCategories,
	expandedCategories,
	setExpandedCategories,
	onDeleteCategory,
	setError,
	setSuccessMessage,

	setLoading,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredCategories, setFilteredCategories] =
		useState<CategoryWithTranslations[]>(categories);
	const [currentEditCategory, setCurrentEditCategory] = useState<CategoryWithTranslations | null>(
		null
	);

	const [newIcon, setNewIcon] = useState<File | null>(null);

	const lowercasedQuery = searchQuery.trim().toLowerCase();

	const toggleCategoryExpansion = (id: number) => {
		setManuallyExpandedCategories(prev => {
			const updated = new Set(prev);
			if (updated.has(id)) {
				updated.delete(id);
			} else {
				updated.add(id);
			}
			return updated;
		});
	};

	const isCategoryExpanded = (id: number) => expandedCategories.has(id);

	// Recursive filtering function
	const recursiveSearch = (
		categories: CategoryWithTranslations[],
		languageId: number,
		query: string,
		expandedIds: Set<number>
	): CategoryWithTranslations[] => {
		return categories
			.map(category => {
				const translation = category.translations.find(t => t.languageId === languageId);
				const categoryName = translation?.name.toLowerCase() || '';

				// Proveri da li kategorija ili neka od potkategorija odgovara pretrazi
				const matches = categoryName.includes(query);
				const childMatches = recursiveSearch(
					(category.children as CategoryWithTranslations[]) || [],
					languageId,
					query,
					expandedIds
				);

				// Dodaj u expandedIds ako postoji podudaranje ili odgovarajuće potkategorije
				if (matches || childMatches.length > 0) {
					expandedIds.add(category.id);
					return {
						...category,
						children: matches ? category.children : childMatches, // Zadrži sve potkategorije ako postoji podudaranje
					};
				}

				return null; // Ignoriši kategorije koje nemaju podudaranje
			})
			.filter(Boolean) as CategoryWithTranslations[];
	};

	useEffect(() => {
		if (searchQuery.trim()) {
			const expanded = new Set<number>();
			const filtered = recursiveSearch(categories, languageId, lowercasedQuery, expanded);

			// Automatski proširi sve kategorije koje sadrže rezultat pretrage
			const expandAllMatching = (categories: CategoryWithTranslations[]) => {
				categories.forEach(category => {
					expanded.add(category.id);
					if (category.children) expandAllMatching(category.children as CategoryWithTranslations[]);
				});
			};
			expandAllMatching(filtered);

			setExpandedCategories(expanded);
			setFilteredCategories(filtered);
		} else {
			setFilteredCategories(categories);
			setExpandedCategories(new Set(initialExpandedCategories));
		}
	}, [searchQuery, categories, languageId, initialExpandedCategories]);

	const handleDelete = useCallback(
		async (id: number) => {
			if (confirm('Da li ste sigurni da želite obrisati ovu kategoriju?')) {
				try {
					await onDeleteCategory(id);
					await refetchCategories();
				} catch (err) {
					handleError(err, setError, setSuccessMessage);
				}
			}
		},
		[onDeleteCategory, refetchCategories, setError, setSuccessMessage]
	);

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setCurrentEditCategory(null);
		setNewIcon(null);
		setCurrentIcon({ iconId: null, iconUrl: null });
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setNewIcon(event.target.files[0]);
		}
	};

	const handleSubmitEdit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();

			if (!currentIcon.iconId && !newIcon) {
				setError('Morate izabrati postojeću ikonu ili dodati novu.');
				return;
			}

			if (!currentEditCategory) return;

			try {
				let iconId = currentIcon.iconId;

				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					formData.append('directory', 'articles');

					const { data } = await fetch('/api/icons', {
						method: 'POST',
						body: formData,
					}).then(res => res.json());
					iconId = data.iconId;
				}

				await fetch(`/api/categories/${currentEditCategory.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ iconId }),
				});

				setIsModalOpen(false);
				await refetchCategories();
			} catch (err) {
				handleError(err, setError, setSuccessMessage);
			}
		},
		[currentIcon, newIcon, currentEditCategory, refetchCategories, setError, setSuccessMessage]
	);

	const toggleCategory = (id: number) => {
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
					placeholder='Pretraži kategorije'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
			</div>
			{filteredCategories.map(category => (
				<CategoryItem
					key={category.id}
					category={category}
					icons={icons}
					languageId={languageId}
					allCategories={categories}
					handleDelete={handleDelete}
					setCurrentIcon={setCurrentIcon}
					setCurrentEditCategory={setCurrentEditCategory}
					setIsModalOpen={setIsModalOpen}
					toggleCategory={toggleCategoryExpansion} // Dodato
					expandedCategories={expandedCategories} // Dodato
					isCategoryExpanded={isCategoryExpanded}
				/>
			))}

			{isModalOpen && currentEditCategory && (
				<CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
					<EditCategoryForm
						currentIcon={currentIcon}
						newIcon={newIcon}
						handleFileChange={handleFileChange}
						handleSubmitEdit={handleSubmitEdit}
					/>
				</CustomModal>
			)}
		</>
	);
};

export default CategoryList;
