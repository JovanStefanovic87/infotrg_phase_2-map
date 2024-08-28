'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Category, Icon, Translation, Language } from '@/utils/helpers/types';
import { FiChevronDown, FiChevronUp, FiEdit, FiTrash } from 'react-icons/fi';
import CustomModal from '@/app/components/modals/CustomModal';
import axios from 'axios';

interface CategoryListProps {
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
	languages: Language[];
	languageId: number;
	refetchCategories: () => Promise<void>;
	onEditCategory: (
		id: number,
		data: {
			translations: {
				translationId: number;
				languageId: number;
				translation: string;
			}[];
			icon?: File | null;
		}
	) => Promise<void>;
	onDeleteCategory: (id: number) => Promise<void>;
}

interface TranslationUpdate {
	translationId: number;
	languageId: number;
	translation: string;
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	translations,
	icons,
	languages,
	languageId,
	refetchCategories,
	onEditCategory,
	onDeleteCategory,
}) => {
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditCategory, setCurrentEditCategory] = useState<Category | null>(null);
	const [translationsByLanguage, setTranslationsByLanguage] = useState<Record<number, string>>({});
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [newTranslations, setNewTranslations] = useState<TranslationUpdate[]>([]);

	useEffect(() => {
		setOpenCategories(new Set());
	}, [categories, translations]);

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

	const getCategoryName = useCallback(
		(labelId: number, languageId: number) => {
			const translation = translations.find(
				t => t.labelId === labelId && t.languageId === languageId
			);
			return translation ? translation.translation : 'Unknown';
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

	// Updated to handle multiple parent categories
	const getParentCategoryNames = useCallback(
		(parents: Category[], languageId: number): string => {
			if (parents.length === 0) return 'This is a main category';

			// Map through parent categories and get their names
			return parents.map(parent => getCategoryName(parent.labelId, languageId)).join(', ');
		},
		[getCategoryName]
	);

	const getCategoryIconUrl = useCallback(
		(iconId: number | null) => {
			const icon = icons.find(icon => icon.id === iconId);
			return icon ? icon.url : '';
		},
		[icons]
	);

	const getCategoryTranslations = useCallback(
		(labelId: number) => {
			return translations.filter(t => t.labelId === labelId);
		},
		[translations]
	);

	const handleOpenEditModal = useCallback(
		async (category: Category) => {
			setCurrentEditCategory(category);

			try {
				const { data: categoryTranslations } = await axios.get<Translation[]>(
					`/api/translation/labels/${category.labelId}`
				);

				const translationsMap = languages.reduce<Record<number, string>>((acc, lang) => {
					const translation = categoryTranslations.find(
						(t: Translation) => t.languageId === lang.id
					);
					acc[lang.id] = translation ? translation.translation : '';
					return acc;
				}, {});

				setTranslationsByLanguage(translationsMap);

				// Initialize `newTranslations` with existing translations
				const existingTranslations = categoryTranslations.map(t => ({
					translationId: t.id,
					languageId: t.languageId,
					translation: t.translation,
				}));

				setNewTranslations(existingTranslations);
			} catch (error) {
				console.error('Failed to fetch category translations', error);
			}

			setNewIcon(null);
			setIsModalOpen(true);
		},
		[languages]
	);

	const handleSubmitEdit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (!currentEditCategory) return;

			try {
				let iconId: number | undefined = undefined;

				// Upload new icon if provided
				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					const { data: iconData } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = iconData.id;
				}

				// Prepare translations update
				const translationUpdates = newTranslations.map(
					({ translationId, languageId, translation }) => ({
						translationId,
						languageId,
						translation,
					})
				);

				// Batch update translations
				await axios.put('/api/translation/translations', {
					translations: translationUpdates,
				});

				// Call the edit category API
				await onEditCategory(currentEditCategory.id, {
					translations: translationUpdates,
					icon: newIcon,
				});

				setIsModalOpen(false);
				await refetchCategories();
			} catch (err) {
				console.error('Failed to edit category', err);
				// Display an error message to the user
			}
		},
		[currentEditCategory, newTranslations, newIcon, onEditCategory, refetchCategories]
	);

	const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setNewIcon(e.target.files[0]);
		} else {
			setNewIcon(null);
		}
	}, []);

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

	const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
		const iconUrl = getCategoryIconUrl(category.iconId);
		const isOpen = openCategories.has(category.id);

		const categoryTranslations = getCategoryTranslations(category.labelId);
		const languagesList = categoryTranslations.map(t => getLanguageName(t.languageId)).join(', ');

		return (
			<div className='border p-4 mb-4 rounded-lg shadow-md'>
				<div className='flex items-center justify-between'>
					<h3 className='text-lg font-semibold'>{getCategoryName(category.labelId, languageId)}</h3>
					{category.children && category.children.length > 0 && (
						<button
							className='text-blue-500 hover:text-blue-700 focus:outline-none flex items-center'
							onClick={() => toggleCategory(category.id)}>
							{isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
							<span className='ml-2'>Subcategories</span>
						</button>
					)}
				</div>

				<div className='mt-2'>
					{category.iconId ? (
						iconUrl ? (
							<Image src={iconUrl} alt='Category Icon' width={50} height={50} />
						) : (
							<p>No image selected</p>
						)
					) : (
						<p>No image available</p>
					)}
				</div>
				<p className='mt-2 text-gray-600'>
					Parent Categories: {getParentCategoryNames(category.parents, languageId)}
				</p>
				<p className='mt-2 text-gray-600'>Languages: {languagesList}</p>

				<div className='mt-4 flex space-x-2'>
					<button
						className='bg-blue-500 text-white px-4 py-2 rounded'
						onClick={() => handleOpenEditModal(category)}>
						Edit
					</button>
					<button
						className='bg-red-500 text-white px-4 py-2 rounded'
						onClick={() => handleDelete(category.id)}>
						Delete
					</button>
				</div>

				{category.children && isOpen && (
					<div className='mt-4 pl-4'>
						{category.children.map(subCategory => (
							<CategoryItem key={subCategory.id} category={subCategory} />
						))}
					</div>
				)}
			</div>
		);
	};

	return (
		<div>
			{categories.map(category => (
				<CategoryItem key={category.id} category={category} />
			))}

			{isModalOpen && currentEditCategory && (
				<CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
					{currentEditCategory && (
						<form onSubmit={handleSubmitEdit} className='space-y-4'>
							<div className='flex flex-col'>
								<label htmlFor='icon' className='font-semibold'>
									Icon
								</label>
								<input
									type='file'
									id='icon'
									className='text-black'
									name='icon'
									accept='image/*'
									onChange={handleFileChange}
								/>
							</div>

							{languages.map(language => (
								<div key={language.id} className='flex flex-col'>
									<label htmlFor={`translation-${language.id}`} className='font-semibold'>
										{language.name}
									</label>
									<input
										type='text'
										id={`translation-${language.id}`}
										className='text-black'
										value={
											newTranslations.find(t => t.languageId === language.id)?.translation || ''
										}
										onChange={e => {
											const translation = e.target.value;
											setNewTranslations(prevTranslations =>
												prevTranslations.map(t =>
													t.languageId === language.id ? { ...t, translation } : t
												)
											);
										}}
									/>
								</div>
							))}

							<button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded'>
								Save Changes
							</button>
						</form>
					)}
				</CustomModal>
			)}
		</div>
	);
};

export default CategoryList;
