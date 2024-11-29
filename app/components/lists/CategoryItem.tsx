'use client';
import React, { useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CategoryWithTranslations, Icon, Category, TranslationUpdate } from '@/utils/helpers/types';
import { getCategoryIconUrl } from '@/utils/helpers/universalFunctions';
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
	languageId: number;
	allCategories: CategoryWithTranslations[];
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	setCurrentEditCategory: React.Dispatch<React.SetStateAction<CategoryWithTranslations | null>>;
	setParentIds: (parentIds: number[]) => void;
	setNewTranslations: React.Dispatch<React.SetStateAction<TranslationUpdate[]>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setRelatedIds: (relatedIds: number[]) => void;
	handleDelete: (categoryId: number) => void;
	toggleCategory: (id: number) => void;
	expandedCategories: Set<number>;
	isCategoryExpanded: (id: number) => boolean;
	setError: (error: string) => void;
	setSuccessMessage: (message: string | null) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	icons,
	languageId,
	allCategories,
	setCurrentIcon,
	setCurrentEditCategory,
	setParentIds,
	setNewTranslations,
	setIsModalOpen,
	setRelatedIds,
	handleDelete,
	toggleCategory,
	expandedCategories,
	isCategoryExpanded,
	setError,
	setSuccessMessage,
	setLoading,
}) => {
	const iconUrl = getCategoryIconUrl(category.iconId, icons);

	/* const fetchRelatedCategoriesForEdit = useCallback(async () => {
		console.log('category.relatedIds', category.relatedIds); // Dodaj ovo
		if (category.relatedIds && category.relatedIds.length > 0) {
			setLoading(true);
			try {
				await fetchRelatedCategoriesForDisplay(category.relatedIds);
				setRelatedIds(category.relatedIds);
			} catch (error) {
				handleError(error, setError, setSuccessMessage);
				setRelatedIds([]);
			} finally {
				setLoading(false);
			}
		} else {
			setDisplayRelatedCategories([]);
			setRelatedIds([]);
		}
	}, [
		category.relatedIds,
		fetchRelatedCategoriesForDisplay,
		setRelatedIds,
		setError,
		setSuccessMessage,
		setLoading,
	]); */

	const getCategoryName = useCallback(
		(category: CategoryWithTranslations) => {
			if (!category || !Array.isArray(category.translations)) {
				return 'Naziv nije dostupan';
			}

			const translation = category.translations.find(t => t.languageId === languageId);

			return (
				(translation?.name?.trim() || category.name?.trim() || 'Naziv nije dostupan')
					.charAt(0)
					.toUpperCase() + (translation?.name?.slice(1) || category.name?.slice(1) || '')
			);
		},
		[languageId]
	);

	const handleOpenEditModal = async () => {
		setIsModalOpen(true);
		setLoading(true);

		try {
			const response = await axios.get(`/api/categoriesWithTranslations/${category.id}`);
			const categoryData = response.data;

			setCurrentEditCategory(categoryData);

			setCurrentIcon({
				iconId: categoryData.icon?.id || null,
				iconUrl: categoryData.icon?.url || null,
			});

			setParentIds(
				categoryData.parents
					.filter((parent: Category) => parent.id !== categoryData.id)
					.map((parent: Category) => parent.id)
			);

			setRelatedIds(
				categoryData.relatedIds?.filter(
					(relatedId: number) =>
						relatedId !== categoryData.id &&
						!categoryData.children.some((child: Category) => child.id === relatedId)
				) || []
			);

			const translations = categoryData.label.translations.map(
				(t: { languageId: number; translation: string; description: string; synonyms: any[] }) => ({
					languageId: t.languageId,
					translation: t.translation,
					description: t.description || '',
					synonyms: t.synonyms ? t.synonyms.map(s => s.synonym) : [],
				})
			);
			setNewTranslations(translations);
		} catch (error) {
			handleError(error, setError, setSuccessMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<H4 text={getCategoryName(category)} color='black' shouldBreak />

			{/* Display Icon */}
			<div className='mt-2'>
				{iconUrl ? (
					<Image src={iconUrl} alt='Category Icon' width={50} height={50} priority={false} />
				) : (
					<TextWrapped block='Ikonica nije dostupna' />
				)}
			</div>
			{/* Prikaz nadkategorija */}
			<TextNormal text='Natkategorije:' weight='bold' />
			<TextWrapped
				block={
					category.parents.length > 0
						? category.parents
								.map(parent => {
									if ('translations' in parent) {
										return getCategoryName(parent as CategoryWithTranslations);
									}
									return parent.name || 'Nepoznato';
								})
								.join(', ')
						: 'Ovo je glavna kategorija'
				}
			/>
			{/* Related Categories */}
			<TextNormal text='Povezane kategorije:' weight='bold' />
			{category.relatedCategories && category.relatedCategories.length > 0 ? (
				<ul className='list-disc pl-5 text-gray-800'>
					{category.relatedCategories.map(relatedCategory => (
						<li key={relatedCategory.id}>{relatedCategory.name || 'Nepoznato'}</li>
					))}
				</ul>
			) : (
				<TextWrapped block='Nema povezanih kategorija' />
			)}

			{/* Edit and Delete Buttons */}
			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={handleOpenEditModal} />
				<DeleteButton onClick={() => handleDelete(category.id)} />
			</div>

			{/* Toggle Subcategories */}
			{category.children && category.children.length > 0 && (
				<ToggleButtonContainer
					data={{ id: category.id.toString() }}
					toggleFunction={(id: string) => toggleCategory(parseInt(id))}>
					<ArrowToggleButton isOpen={isCategoryExpanded(category.id)} onClick={() => {}} />
				</ToggleButtonContainer>
			)}

			{/* Subcategory List */}
			{category.children && category.children.length > 0 && isCategoryExpanded(category.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{category.children.map(subCategory => (
						<CategoryItem
							key={subCategory.id}
							category={subCategory as CategoryWithTranslations}
							icons={icons}
							languageId={languageId}
							allCategories={allCategories}
							setCurrentIcon={setCurrentIcon}
							setCurrentEditCategory={setCurrentEditCategory}
							setParentIds={setParentIds}
							setNewTranslations={setNewTranslations}
							setIsModalOpen={setIsModalOpen}
							setRelatedIds={setRelatedIds}
							handleDelete={handleDelete}
							toggleCategory={toggleCategory}
							expandedCategories={expandedCategories}
							isCategoryExpanded={isCategoryExpanded}
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
