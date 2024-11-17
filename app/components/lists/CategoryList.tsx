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
	const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
	const [newIcon, setNewIcon] = useState<File | null>(null);

	const lowercasedQuery = searchQuery.trim().toLowerCase();

	// Recursive filtering function
	const recursiveSearch = (
		categories: CategoryWithTranslations[],
		languageId: number,
		query: string
	): CategoryWithTranslations[] => {
		return categories
			.map(category => {
				const translation = category.translations.find(t => t.languageId === languageId);
				const categoryName = translation?.name.toLowerCase() || '';
				const matches = categoryName.includes(query);

				const childMatches = recursiveSearch(
					(category.children as CategoryWithTranslations[]) || [],
					languageId,
					query
				);

				if (matches || childMatches.length > 0) {
					return { ...category, children: childMatches };
				}
				return null;
			})
			.filter(Boolean) as CategoryWithTranslations[];
	};

	useEffect(() => {
		if (searchQuery.trim()) {
			const filtered = recursiveSearch(categories, languageId, lowercasedQuery);
			setFilteredCategories(filtered);
		} else {
			setFilteredCategories(categories);
		}
	}, [searchQuery, categories, languageId]);

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
					toggleCategory={toggleCategory} // Dodato
					expandedCategories={expandedCategories} // Dodato
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
