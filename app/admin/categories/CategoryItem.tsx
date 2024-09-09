'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
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
	onToggleCategory: (categoryId: number) => void;
	fetchSubCategories: (parentId: number) => Promise<Category[]>;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
	category,
	setCategories,
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
	onToggleCategory,
	fetchSubCategories,
}) => {
	const [subCategories, setSubCategories] = useState<Category[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(false); // New state to manage loading

	const iconUrl = getCategoryIconUrl(category.iconId, icons);

	const handleToggle = () => {
		console.log('Category shildren:', category || 'Category:', []);
		if (!isOpen && category.hasChildren) {
			setIsLoadingSubCategories(true);
			fetchSubCategories(category.id)
				.then(subcategories => {
					console.log('Fetched subcategories:', subcategories); // Log the fetched subcategories
					setSubCategories(subcategories);
					setIsOpen(true);
				})
				.finally(() => setIsLoadingSubCategories(false));
		} else {
			setIsOpen(!isOpen);
		}
	};

	console.log('Updated subCategories state:', subCategories);

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
		(parents: Category[] = [], languageId: number): string => {
			console.log('Parents array:', parents); // Dodaj log da proverimo roditelje
			if (parents.length === 0) return 'Ovo je glavna kategorija';
			return parents.map(parent => getCategoryName(parent.labelId, languageId)).join(', ');
		},
		[getCategoryName]
	);
	

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
				<EditButton onClick={() => setCurrentEditCategory(category)} />
				<DeleteButton onClick={() => handleDelete(category.id)} />
			</div>

			{category.hasChildren && (
				<div
					className='flex justify-center items-center py-2 bg-black rounded-lg mt-4'
					onClick={handleToggle}>
					<ArrowToggleButton isOpen={isOpen} title='Potkategorije' onClick={handleToggle} />
				</div>
			)}

			{isOpen && isLoadingSubCategories && <p>Loading...</p>}

			{isOpen && !isLoadingSubCategories && subCategories.length > 0 && (
				<div className='mt-4 pl-4'>
					{subCategories.map(subCategory => (
						<CategoryItem
							key={subCategory.id}
							category={subCategory}
							setCategories={setCategories}
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
							onToggleCategory={onToggleCategory}
							fetchSubCategories={fetchSubCategories}
						/>
					))}
				</div>
			)}

			{isOpen && subCategories.length === 0 && (
				<div className='mt-4 pl-4'>
					<p>Nema potkategorija.</p>
				</div>
			)}
		</div>
	);
};

export default CategoryItem;
