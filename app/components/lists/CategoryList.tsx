'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
	CategoryWithTranslations,
	Icon,
	Translation,
	TranslationUpdate,
	Language,
} from '@/utils/helpers/types';
import CustomModal from '@/app/components/modals/CustomModal';
import CategoryItem from './CategoryItem';
import EditCategoryForm from '../forms/EditCategoryForm';
import InputDefault from '../input/InputDefault';
import { handleError } from '@/utils/helpers/universalFunctions';
import axios from 'axios';

interface CategoryListProps {
	categories: CategoryWithTranslations[];
	icons: Icon[];
	setIcons: React.Dispatch<React.SetStateAction<Icon[]>>;
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
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	icons,
	setIcons,
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
	setIsIconPickerOpen,

	setLoading,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredCategories, setFilteredCategories] =
		useState<CategoryWithTranslations[]>(categories);
	const [currentEditCategory, setCurrentEditCategory] = useState<CategoryWithTranslations | null>(
		null
	);
	const [relatedIds, setRelatedIds] = useState<number[]>([]);
	const [parentIds, setParentIds] = useState<number[]>([]);
	const [newTranslations, setNewTranslations] = useState<TranslationUpdate[]>([]);
	const [translations, setTranslations] = useState<Translation[]>([]);

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

	const filterCategoriesForSelect = (): CategoryWithTranslations[] => {
		const allCategories: CategoryWithTranslations[] = [];

		const traverseCategories = (categoryList: CategoryWithTranslations[]) => {
			categoryList.forEach(cat => {
				allCategories.push(cat);
				if (cat.children && Array.isArray(cat.children) && cat.children.length > 0) {
					traverseCategories(cat.children as CategoryWithTranslations[]);
				}
			});
		};

		traverseCategories(categories);

		// Uklonite duplikate pomoću Map-a za unique kategorije prema ID-u
		const uniqueCategories = Array.from(new Map(allCategories.map(cat => [cat.id, cat])).values());

		// Filtrirajte prema potrebama
		return uniqueCategories.filter(
			cat =>
				!relatedIds.includes(cat.id) &&
				!parentIds.includes(cat.id) &&
				cat.id !== currentEditCategory?.id
		);
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
					const { data } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = data.iconId;
					if (!iconId) throw new Error('Neuspešno kreiranje ikonice.');
				}

				// Pripremite payload za API
				if (iconId) {
					const payload = {
						iconId,
						parentIds: currentEditCategory.parents?.map(parent => parent.id) || [],
						relatedIds: currentEditCategory.relatedCategories?.map(related => related.id) || [],
						translations: currentEditCategory.label.translations.map(
							(translation: {
								id: number | null;
								languageId: number;
								translation: string;
								description: string | null;
								synonyms: { synonym: string }[];
							}) => ({
								translationId: translation.id, // Postojeći ID prevoda, ako postoji
								labelId: currentEditCategory.labelId, // ID labele
								languageId: translation.languageId, // ID jezika
								translation: translation.translation, // Tekst prevoda
								description: translation.description || null, // Opis
								synonyms: translation.synonyms?.map(synonym => synonym.synonym) || [], // Sinonimi kao niz stringova
							})
						),
						labelId: currentEditCategory.labelId, // ID labele kategorije
					};

					// Pošaljite podatke API-ju
					await axios.put(`/api/categories/${currentEditCategory.id}`, payload);
				}

				setIsModalOpen(false); // Zatvorite modal
				await refetchCategories(); // Osvežite kategorije nakon uspešnog ažuriranja
			} catch (err) {
				handleError(err, setError, setSuccessMessage); // Obrada grešaka
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

	useEffect(() => {
		if (currentEditCategory) {
			setParentIds(currentEditCategory.parents?.map(pc => pc.id) || []);
			setRelatedIds(currentEditCategory.relatedCategories?.map(rc => rc.id) || []);
		}
	}, [currentEditCategory]);

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
					setParentIds={setParentIds}
					setNewTranslations={setNewTranslations}
					setIsModalOpen={setIsModalOpen}
					setRelatedIds={setRelatedIds}
					toggleCategory={toggleCategoryExpansion} // Dodato
					expandedCategories={expandedCategories} // Dodato
					isCategoryExpanded={isCategoryExpanded}
					setError={setError}
					setSuccessMessage={setSuccessMessage}
					setLoading={setLoading}
				/>
			))}

			{isModalOpen && currentEditCategory && (
				<CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
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
						currentEditCategory={currentEditCategory}
						setCurrentEditCategory={setCurrentEditCategory}
					/>
				</CustomModal>
			)}
		</>
	);
};

export default CategoryList;
