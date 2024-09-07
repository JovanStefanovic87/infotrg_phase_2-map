'use client';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
	Category,
	Icon,
	Language,
	Translation,
	TranslationUpdate,
} from '../../../utils/helpers/types';
import { getCategoryIconUrl } from '../../../utils/helpers/universalFunctions';
import H4 from '../../components/text/H4';
import TextNormal from '../../components/text/TextNormal';
import TextWrapped from '../../components/text/TextWrapped';
import ArrowToggleButton from '../../components/buttons/ArrowToggleButton';
import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';

interface CategoryItemProps {
	category: Category;
	icons: Icon[];
	translations: Translation[];
	languages: Language[];
	languageId: number;
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	setCurrentEditCategory: React.Dispatch<React.SetStateAction<Category | null>>;
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	setNewTranslations: React.Dispatch<React.SetStateAction<TranslationUpdate[]>>;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleDelete: (categoryId: number) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	icons,
	translations,
	languages,
	languageId,
	setCurrentIcon,
	setCurrentEditCategory,
	setParentIds,
	setNewTranslations,
	setNewIcon,
	setIsModalOpen,
	handleDelete,
}) => {
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());

	const iconUrl = getCategoryIconUrl(category.iconId, icons);
	const isOpen = openCategories.has(category.id);

	const toggleCategory = useCallback((id: number) => {
		setOpenCategories(prev => {
			const newOpenCategories = new Set(prev);
			if (newOpenCategories.has(id)) {
				newOpenCategories.delete(id);
			} else {
				newOpenCategories.add(id);
			}
			return newOpenCategories;
		});
	}, []);

	const getCategoryTranslations = useCallback(
		(labelId: number) => {
			return translations.filter(t => t.labelId === labelId);
		},
		[translations]
	);

	const getLanguageName = useCallback(
		(languageId: number) => {
			const language = languages.find(l => l.id === languageId);
			return language ? language.name : 'Unknown';
		},
		[languages]
	);

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

	const getParentCategoryNames = useCallback(
		(parents: Category[], languageId: number): string => {
			if (parents.length === 0) return 'Ovo je glavna kategorija';
			return parents.map(parent => getCategoryName(parent.labelId, languageId)).join(', ');
		},
		[getCategoryName]
	);

	const handleOpenEditModal = useCallback(
		async (category: Category) => {
			setCurrentEditCategory(category);
			setParentIds(category.parents.map(parent => parent.id));

			try {
				const { data: categoryTranslations } = await axios.get<Translation[]>(
					`/api/translation/labels/${category.labelId}`
				);

				const existingTranslations = categoryTranslations.map(t => {
					return {
						translationId: t.id,
						languageId: t.languageId,
						translation: t.translation,
						description: t.description || '',
						synonyms: t.synonyms.map(s => s.synonym),
					};
				});

				setNewTranslations(existingTranslations);

				const iconId = category.iconId || null;
				const iconUrl = getCategoryIconUrl(iconId, icons);
				setCurrentIcon({
					iconId,
					iconUrl,
				});
			} catch (error) {
				console.error('Failed to fetch category translations', error);
			}

			setNewIcon(null);
			setIsModalOpen(true);
		},
		[
			setCurrentEditCategory,
			setParentIds,
			setNewTranslations,
			setCurrentIcon,
			setNewIcon,
			setIsModalOpen,
			icons,
		]
	);

	const categoryTranslations = getCategoryTranslations(category.labelId);

	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<H4 text={getCategoryName(category.labelId, languageId)} color='black' shouldBreak />
			<div className='mt-2'>
				{category.iconId ? (
					iconUrl ? (
						<Image src={iconUrl} alt='Category Icon' width={50} height={50} />
					) : (
						<p>Ikonica nije izabrana</p>
					)
				) : (
					<p>Ikonica ne postoji</p>
				)}
			</div>

			<TextNormal text={`Nadkategorije:`} weight='bold' />
			<TextWrapped block={getParentCategoryNames(category.parents, languageId)} />

			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={() => handleOpenEditModal(category)} />
				<DeleteButton onClick={() => handleDelete(category.id)} />
			</div>

			{category.children && category.children.length > 0 && (
				<div
					className='flex justify-center items-center py-2 bg-black rounded-lg mt-4'
					onClick={() => toggleCategory(category.id)}>
					<ArrowToggleButton isOpen={isOpen} onClick={() => {}} title='Potkategroije' />
				</div>
			)}

			{category.children && isOpen && (
				<div className='mt-4 pl-4'>
					{category.children.map(subCategory => (
						<CategoryItem
							key={subCategory.id}
							category={subCategory}
							icons={icons}
							translations={translations}
							languages={languages}
							languageId={languageId}
							setCurrentIcon={setCurrentIcon}
							setCurrentEditCategory={setCurrentEditCategory}
							setParentIds={setParentIds}
							setNewTranslations={setNewTranslations}
							setNewIcon={setNewIcon}
							setIsModalOpen={setIsModalOpen}
							handleDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
