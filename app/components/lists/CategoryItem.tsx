'use client';
import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { CategoryWithTranslations, Icon } from '@/utils/helpers/types';
import { getCategoryIconUrl } from '@/utils/helpers/universalFunctions';
import H4 from '../text/H4';
import TextNormal from '../text/TextNormal';
import TextWrapped from '../text/TextWrapped';
import ArrowToggleButton from '../buttons/ArrowToggleButton';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import ToggleButtonContainer from '../buttons/ToggleButtonContainer';

interface CategoryItemProps {
	category: CategoryWithTranslations;
	icons: Icon[];
	languageId: number;
	allCategories: CategoryWithTranslations[];
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	setCurrentEditCategory: React.Dispatch<React.SetStateAction<CategoryWithTranslations | null>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleDelete: (categoryId: number) => void;
	toggleCategory: (id: number) => void;
	expandedCategories: Set<number>;
	isCategoryExpanded: (id: number) => boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	icons,
	languageId,
	allCategories,
	setCurrentIcon,
	setCurrentEditCategory,
	setIsModalOpen,
	handleDelete,
	toggleCategory,
	expandedCategories,
	isCategoryExpanded,
}) => {
	const [relatedCategories, setRelatedCategories] = useState<CategoryWithTranslations[]>([]);

	const iconUrl = getCategoryIconUrl(category.iconId, icons);
	console.log('Category children for', category.name, category.children);
	const getCategoryName = useCallback(
		(category: CategoryWithTranslations) => {
			// Proveri da li je category i category.translations definisan
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

	const getParentCategoryNames = useCallback(
		(parents: CategoryWithTranslations[]): string => {
			if (parents.length === 0) return 'Ovo je glavna kategorija';

			return parents.map(parent => getCategoryName(parent)).join(', ');
		},
		[getCategoryName]
	);

	/* useEffect(() => {
		if (category.relatedIds?.length) {
			const relatedCategories = category.relatedIds
				.map(id => category.children.find(child => child.id === id))
				.filter(relatedCategory => relatedCategory && typeof relatedCategory.id === 'number'); // Proverava validnost objekta
			setDisplayRelatedCategories(relatedCategories as CategoryWithTranslations[]);
		} else {
			setDisplayRelatedCategories([]);
		}
	}, [category]); */

	useEffect(() => {
		// Pretraži sve kategorije kako bi našli one iz relatedIds
		const related = category.relatedIds
			?.map(relatedId => allCategories.find(cat => cat.id === relatedId))
			.filter(Boolean) as CategoryWithTranslations[];

		setRelatedCategories(related);
	}, [category.relatedIds, allCategories]);

	const handleOpenEditModal = () => {
		setCurrentEditCategory(category);
		setCurrentIcon({ iconId: category.iconId, iconUrl: iconUrl || '' });
		setIsModalOpen(true);
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
			{relatedCategories.length > 0 ? (
				<ul className='list-disc pl-5 text-gray-800'>
					{relatedCategories.map(relatedCategory => (
						<li key={relatedCategory.id}>{getCategoryName(relatedCategory)}</li>
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
							setIsModalOpen={setIsModalOpen}
							handleDelete={handleDelete}
							toggleCategory={toggleCategory}
							expandedCategories={expandedCategories}
							isCategoryExpanded={isCategoryExpanded}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
