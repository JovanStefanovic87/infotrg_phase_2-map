'use client';
import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
	CategoryWithTranslations,
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
import ToggleButtonContainer from '../buttons/ToggleButtonContainer';
import { handleError } from '@/utils/helpers/universalFunctions';

interface CategoryItemProps {
	category: CategoryWithTranslations;
	icons: Icon[];
	languages: Language[];
	languageId: number;
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	setCurrentEditCategory: React.Dispatch<React.SetStateAction<CategoryWithTranslations | null>>;
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	setNewTranslations: React.Dispatch<React.SetStateAction<TranslationUpdate[]>>;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleDelete: (categoryId: number) => void;
	setRelatedIds: (relatedIds: number[]) => void;
	expandedCategories: Set<number>;
	toggleCategory: (id: number) => void;
	setError: (error: string) => void;
	setSuccessMessage: (message: string | null) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	icons,
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
	expandedCategories,
	toggleCategory,
	setError,
	setSuccessMessage,
	setLoading,
}) => {
	const [displayRelatedCategories, setDisplayRelatedCategories] = useState<
		CategoryWithTranslations[]
	>([]);
	/* console.log('category', category); */
	const iconUrl = getCategoryIconUrl(category.iconId, icons);

	const isCategoryExpanded = useCallback(
		(id: number) => {
			return expandedCategories.has(id);
		},
		[expandedCategories]
	);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchRelatedCategoriesForDisplay = useCallback(async (relatedIds: number[]) => {
		try {
			const promises = relatedIds.map(id =>
				axios.get<CategoryWithTranslations>(`/api/categories/${id}`)
			);
			const relatedData = await Promise.all(promises);

			const categories = relatedData.map(response => response.data);
			setDisplayRelatedCategories(categories);
		} catch (error) {
			handleError(error, setError, setSuccessMessage);
			setDisplayRelatedCategories([]);
		}
	}, []);

	useEffect(() => {
		if (category.relatedIds && category.relatedIds.length > 0) {
			fetchRelatedCategoriesForDisplay(category.relatedIds);
		} else {
			setDisplayRelatedCategories([]);
		}
	}, [category.relatedIds, fetchRelatedCategoriesForDisplay]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchRelatedCategoriesForEdit = useCallback(
		async (relatedIds: number[]) => {
			try {
				setRelatedIds(relatedIds);
			} catch (error) {
				handleError(error, setError, setSuccessMessage);
				setRelatedIds([]);
			}
		},
		[setRelatedIds]
	);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getCategoryName = useCallback((category: CategoryWithTranslations, languageId: number) => {
		// Proveri da li `translations` postoji i da li je niz
		if (Array.isArray(category.translations)) {
			const translation = category.translations.find(t => t.languageId === languageId);
			if (translation?.name?.trim()) {
				return translation.name.charAt(0).toUpperCase() + translation.name.slice(1);
			}
		}

		// Fallback na category.name ako prevod nije dostupan
		return category.name
			? category.name.charAt(0).toUpperCase() + category.name.slice(1)
			: 'Naziv nije dostupan';
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getParentCategoryNames = useCallback(
		(parents: CategoryWithTranslations[], languageId: number): string => {
			if (parents.length === 0) return 'Ovo je glavna kategorija';

			return parents
				.map(parent => {
					const translation = Array.isArray(parent.translations)
						? parent.translations.find(t => t.languageId === languageId)
						: null;
					return translation?.name || parent.name || 'Naziv nije dostupan';
				})
				.join(', ');
		},
		[]
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleOpenEditModal = useCallback(
		async (category: CategoryWithTranslations) => {
			setLoading(true);
			setCurrentEditCategory(category);
			setParentIds(category.parents.map(parent => parent.id));

			const { data: categoryTranslations } = await axios.get<Translation[]>(
				`/api/translation/labels/${category.labelId}`
			);

			const existingTranslations = languages.map(language => {
				const translation = categoryTranslations.find(t => t.languageId === language.id);

				return {
					translationId: translation?.id || 0,
					languageId: language.id,
					translation: translation?.translation || '',
					description: translation?.description || '',
					synonyms: translation?.synonyms?.map(s => s.synonym) || [],
				};
			});

			setNewTranslations(existingTranslations);

			if (category.relatedIds && category.relatedIds.length > 0) {
				await fetchRelatedCategoriesForEdit(category.relatedIds);
			}

			const iconId = category.iconId || null;
			const iconUrl = getCategoryIconUrl(iconId, icons);
			setCurrentIcon({ iconId, iconUrl });

			setNewIcon(null);
			setIsModalOpen(true);
			setLoading(false);
		},
		[
			fetchRelatedCategoriesForEdit,
			setRelatedIds,
			setNewTranslations,
			setCurrentIcon,
			languages,
			icons,
			setCurrentEditCategory,
			setIsModalOpen,
			setLoading,
			setNewIcon,
			setParentIds,
			setError,
			setSuccessMessage,
		]
	);

	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<H4 text={getCategoryName(category, languageId)} color='black' shouldBreak />

			{/* Display Icon */}
			<div className='mt-2'>
				{category.iconId ? (
					iconUrl ? (
						<Image src={iconUrl} alt='Category Icon' width={50} height={50} priority={false} />
					) : (
						<TextWrapped block='Ikonica nije izabrana' />
					)
				) : (
					<TextWrapped block='Ikonica ne postoji' />
				)}
			</div>

			{/* Parent Categories */}
			<TextNormal text={`Natkategorije:`} weight='bold' />
			<TextWrapped
				block={getParentCategoryNames(
					category.parents as CategoryWithTranslations[], // Ako su roditelji već tipa Category, kastujte ih
					languageId
				)}
			/>

			{/* Related Categories */}
			<TextNormal text={`Povezane kategorije:`} weight='bold' />
			{displayRelatedCategories.length > 0 ? (
				<ul className='list-disc pl-5 text-gray-800'>
					{displayRelatedCategories.map(relatedCategory => (
						<li key={relatedCategory.id}>{getCategoryName(relatedCategory, languageId)}</li>
					))}
				</ul>
			) : (
				<TextWrapped block='Nema povezanih kategorija' />
			)}
			{/* Edit and Delete Buttons */}
			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={() => handleOpenEditModal(category)} />
				<DeleteButton onClick={() => handleDelete(category.id)} />
			</div>

			{/* Toggle Subcategory Button */}
			{category.children && category.children.length > 0 && (
				<ToggleButtonContainer
					data={{ id: category.id.toString() }}
					toggleFunction={(id: string) => toggleCategory(parseInt(id))}>
					<ArrowToggleButton isOpen={isCategoryExpanded(category.id)} onClick={() => {}} />
				</ToggleButtonContainer>
			)}

			{/* Subcategory List */}
			{category.children && isCategoryExpanded(category.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{(category.children as CategoryWithTranslations[]).map(subCategory => (
						<CategoryItem
							key={subCategory.id}
							category={subCategory}
							icons={icons}
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
							expandedCategories={expandedCategories}
							toggleCategory={toggleCategory}
							setError={setError}
							setSuccessMessage={setSuccessMessage}
							setLoading={setLoading}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
