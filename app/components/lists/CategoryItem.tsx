'use client';
import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { CategoryByLanguageAndPrefix, TranslationUpdate } from '../../../utils/helpers/types';
import H4 from '../text/H4';
import TextNormal from '../text/TextNormal';
import TextWrapped from '../text/TextWrapped';
import ArrowToggleButton from '../buttons/ArrowToggleButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import ToggleButtonContainer from '../buttons/ToggleButtonContainer';

interface CategoryItemProps {
	category: CategoryByLanguageAndPrefix;
	languageId: number;
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	setCurrentEditCategory: React.Dispatch<React.SetStateAction<CategoryByLanguageAndPrefix | null>>;
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	setNewTranslations: React.Dispatch<React.SetStateAction<TranslationUpdate[]>>;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleDelete: (categoryId: number) => void;
	setRelatedIds: (relatedIds: number[]) => void;
	expandedCategories: Set<number>; // Expanded categories
	toggleCategory: (id: number) => void; // Function to toggle category expand/collapse
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	languageId,
	setCurrentIcon,
	setCurrentEditCategory,
	setParentIds,
	setNewTranslations,
	setNewIcon,
	setIsModalOpen,
	handleDelete,
	setRelatedIds,
	expandedCategories, // Use expandedCategories instead of manuallyExpandedCategories or expandedCategoriesForSearch
	toggleCategory, // Function to toggle category
}) => {
	// State for displaying related categories
	const [displayRelatedCategories, setDisplayRelatedCategories] = useState<
		CategoryByLanguageAndPrefix[]
	>([]);

	// Check if the category is expanded based on expandedCategories
	const isCategoryExpanded = useCallback(
		(id: number) => {
			return expandedCategories.has(id);
		},
		[expandedCategories]
	);

	// Get the category icon URL directly from the `category.icon`
	const iconUrl = category.icon?.url || '';

	const getCategoryName = useCallback(
		(labelId: number) => {
			// Use the category name directly from the `category` state
			return category.name.charAt(0).toUpperCase() + category.name.slice(1);
		},
		[category]
	);

	const getParentCategoryNames = useCallback((): string => {
		if (category.parents.length === 0) return 'Ovo je glavna kategorija';
		return category.parents.map(parent => parent.name).join(', ');
	}, [category.parents]);

	// Handle opening the edit modal
	const handleOpenEditModal = useCallback(
		(category: CategoryByLanguageAndPrefix) => {
			setCurrentEditCategory(category);
			setParentIds(category.parents.map(parent => parent.id));

			// Set translations for editing
			const existingTranslations = (category.synonyms || []).map(synonym => ({
				translationId: 0, // Assume no translation ID for simplicity
				languageId: languageId,
				translation: synonym || '',
				description: '', // No description in this structure
				synonyms: [],
			}));

			setNewTranslations(existingTranslations);

			// Set related categories for editing
			setRelatedIds(category.relatedIds || []);

			// Set icon for editing
			const iconId = category.icon?.id || null;
			const iconUrl = category.icon?.url || '';
			setCurrentIcon({ iconId, iconUrl });

			setNewIcon(null);
			setIsModalOpen(true);
		},
		[
			category,
			setCurrentEditCategory,
			setParentIds,
			setNewTranslations,
			setCurrentIcon,
			setNewIcon,
			setIsModalOpen,
			setRelatedIds,
			languageId,
		]
	);

	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<H4 text={getCategoryName(category.labelId)} color='black' shouldBreak />

			{/* Display Icon */}
			<div className='mt-2'>
				{category.icon ? (
					<Image src={iconUrl} alt='Category Icon' width={50} height={50} priority={false} />
				) : (
					<p className='text-gray-500'>Ikonica ne postoji</p>
				)}
			</div>

			{/* Parent Categories */}
			<TextNormal text={`Natkategorije:`} weight='bold' />
			<TextWrapped block={getParentCategoryNames()} />

			{/* Related Categories */}
			<TextNormal text={`Povezane kategorije:`} weight='bold' />
			{displayRelatedCategories.length > 0 ? (
				<ul className='list-disc pl-5 text-gray-800'>
					{displayRelatedCategories.map(relatedCategory => (
						<li key={relatedCategory.id}>{relatedCategory.name}</li>
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
					data={{ id: category.id.toString() }} // Convert id to string
					toggleFunction={(id: string) => toggleCategory(parseInt(id))} // Convert back to number
				>
					<ArrowToggleButton isOpen={isCategoryExpanded(category.id)} onClick={() => {}} />
				</ToggleButtonContainer>
			)}

			{/* Subcategory List */}
			{category.children && isCategoryExpanded(category.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{category.children.map(subCategory => (
						<CategoryItem
							key={subCategory.id}
							category={subCategory}
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
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
