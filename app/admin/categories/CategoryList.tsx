'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Category, Icon, Translation, Language } from '@/utils/helpers/types';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CustomModal from '@/app/components/modals/CustomModal';
import CustomCombobox from '@/app/components/input/CustomCombobox';
import SumbitButton from '../../components/buttons/SubmitButton';
import axios from 'axios';
import ImageUploadButton from '@/app/components/buttons/ImageUploadButton';
import ChooseImageButton from '@/app/components/buttons/ChooseImageButton';
import H2 from '@/app/components/text/H2';
import TextBlockItem from '@/app/ulaganje/collapsible/TextBlockItem';

interface CategoryListProps {
	categories: Category[];
	translations: Translation[];
	icons: Icon[];
	currentIcon: {
		iconId: number | null;
		iconUrl: string | null;
	};
	setCurrentIcon: (icon: { iconId: number | null; iconUrl: string | null }) => void;
	languages: Language[];
	languageId: number;
	refetchCategories: () => Promise<void>;
	onEditCategory: (
		id: number,
		data: {
			translations: Translation[];
			icon?: File | null;
			iconId?: number | null; // Make iconId optional here
			parentIds: number[];
		}
	) => Promise<void>;
	onDeleteCategory: (id: number) => Promise<void>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: (isOpen: boolean) => void;
}

interface TranslationUpdate {
	translationId: number;
	languageId: number;
	translation: string;
	description?: string;
	synonyms: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({
	categories,
	translations,
	icons,
	currentIcon,
	setCurrentIcon,
	languages,
	languageId,
	refetchCategories,
	onEditCategory,
	onDeleteCategory,
	setIsIconPickerOpen,
}) => {
	const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentEditCategory, setCurrentEditCategory] = useState<Category | null>(null);
	const [newIcon, setNewIcon] = useState<File | null>(null);
	const [newTranslations, setNewTranslations] = useState<TranslationUpdate[]>([]);
	const [parentIds, setParentIds] = useState<number[]>([]);

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

	const getParentCategoryNames = useCallback(
		(parents: Category[], languageId: number): string => {
			if (parents.length === 0) return 'This is a main category';
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
			setParentIds(category.parents.map(parent => parent.id));

			try {
				const { data: categoryTranslations } = await axios.get<Translation[]>(
					`/api/translation/labels/${category.labelId}`
				);

				const existingTranslations = categoryTranslations.map(t => {
					console.log('Translation Data:', t); // Check each translation data fetched
					return {
						translationId: t.id,
						languageId: t.languageId,
						translation: t.translation,
						description: t.description || '',
						synonyms: t.synonyms.map(s => s.synonym),
					};
				});

				setNewTranslations(existingTranslations);

				// Set the current icon URL based on the category's iconId
				const iconId = category.iconId || null;
				const iconUrl = getCategoryIconUrl(iconId);
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
		[getCategoryIconUrl, languages]
	);

	const handleSubmitEdit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (!currentEditCategory) return;

			try {
				let iconId: number | null = currentIcon.iconId;

				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					const { data: iconData } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = iconData.id;
				}

				console.log('newTranslations before submit:', newTranslations);

				const translationUpdates = newTranslations.map(
					({ translationId, languageId, translation, description, synonyms }) => ({
						translationId,
						languageId,
						translation,
						description, // Include description in the update payload
						synonyms: synonyms || [],
					})
				);

				await axios.put(`/api/categories/${currentEditCategory.id}`, {
					iconId,
					parentIds,
					translations: translationUpdates,
					labelId: currentEditCategory.labelId,
				});

				for (const { translationId, synonyms } of translationUpdates) {
					console.log('synonyms-fe', synonyms);
					await axios.post('/api/synonyms', {
						translationId,
						synonyms,
					});
				}

				setIsModalOpen(false);
				await refetchCategories();
			} catch (err) {
				console.error('Failed to edit category', err);
			}
		},
		[
			currentEditCategory,
			newTranslations,
			newIcon,
			onEditCategory,
			parentIds,
			refetchCategories,
			currentIcon,
		]
	);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setNewIcon(event.target.files[0]);
		}
	};

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

	const handleAddParent = useCallback(
		(parentId: number) => {
			if (!parentIds.includes(parentId)) {
				setParentIds(prev => [...prev, parentId]);
			}
		},
		[parentIds]
	);

	// Helper function to filter categories for select input
	const filterCategoriesForSelect = useCallback(() => {
		if (!currentEditCategory) return categories;

		const completeBranch = getCompleteBranch(currentEditCategory);
		const uniqueCategories = categories.filter(cat => !completeBranch.has(cat.id));

		return uniqueCategories;
	}, [categories, currentEditCategory]);

	// Helper function to get all descendants of a category
	const getDescendants = (
		category: Category,
		descendants: Set<number> = new Set()
	): Set<number> => {
		category.children.forEach(child => {
			descendants.add(child.id);
			getDescendants(child, descendants);
		});
		return descendants;
	};

	// Helper function to get all ancestors of a category
	const getAncestors = (category: Category, ancestors: Set<number> = new Set()): Set<number> => {
		category.parents.forEach(parent => {
			ancestors.add(parent.id);
			const parentCategory = categories.find(cat => cat.id === parent.id);
			if (parentCategory) {
				getAncestors(parentCategory, ancestors);
			}
		});
		return ancestors;
	};

	// Helper function to get the complete branch (all descendants and ancestors) of a category
	const getCompleteBranch = (category: Category): Set<number> => {
		const branch = new Set<number>();
		branch.add(category.id); // Add the category itself
		const descendants = getDescendants(category);
		const ancestors = getAncestors(category);
		descendants.forEach(id => branch.add(id));
		ancestors.forEach(id => branch.add(id));
		return branch;
	};

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
							className='text-sky-500 hover:text-sky-700 focus:outline-none flex items-center'
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

				<div className='mt-4 flex space-x-2'>
					<button
						className='bg-sky-500 text-white px-4 py-2 rounded'
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
				<CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} mt='10'>
					<form
						onSubmit={handleSubmitEdit}
						className='flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto overflow-auto max-h-[85vh] lg:max-h-[90vh]'>
						{/* Icon Section */}
						<div className='flex flex-col items-center text-black mb-6 w-full'>
							<div className='mb-4'>
								<H2 text='KATEGROIJA PROIZVODA' color='black' />
							</div>
							{currentIcon.iconUrl && !newIcon ? (
								<div className='mb-4 flex gap-4 justify-center items-center w-full'>
									<TextBlockItem content='Trenutna ikonica:' />
									<Image src={currentIcon.iconUrl} alt='Current Icon' width={50} height={50} />
								</div>
							) : (
								<p className='text-gray-500 mb-4'>No icon selected</p>
							)}
							<div className='flex w-full justify-between space-x-4'>
								<ImageUploadButton
									id='iconUpload'
									label='Nova ikonica (PNG)'
									onChange={handleFileChange}
								/>
								<ChooseImageButton
									onClick={() => setIsIconPickerOpen(true)}
									label='Izbor ikonice'
								/>
							</div>
						</div>

						{/* Translations and Synonyms */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
							{languages.map(language => (
								<div key={language.id} className='flex flex-col text-black space-y-4'>
									{/* Translation Input */}
									<div>
										<label
											htmlFor={`translation-${language.id}`}
											className='font-semibold mb-1 block text-lg'>
											{`${language.name.charAt(0).toUpperCase()}${language.name
												.slice(1)
												.toLocaleLowerCase()} naziv`}
										</label>
										<input
											type='text'
											id={`translation-${language.id}`}
											className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
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

									{/* Description Input */}
									<div>
										<label
											htmlFor={`description-${language.id}`}
											className='font-semibold mb-1 block text-lg'>
											{`${language.name.charAt(0).toUpperCase()}${language.name
												.slice(1)
												.toLocaleLowerCase()} opis`}
										</label>
										<textarea
											id={`description-${language.id}`}
											className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
											value={
												newTranslations.find(t => t.languageId === language.id)?.description || ''
											}
											onChange={e => {
												const description = e.target.value;
												setNewTranslations(prevTranslations =>
													prevTranslations.map(t =>
														t.languageId === language.id ? { ...t, description } : t
													)
												);
											}}
										/>
									</div>

									{/* Synonyms Input */}
									<div>
										<label
											htmlFor={`synonyms-${language.id}`}
											className='font-semibold mb-1 block text-lg'>
											{`${language.name.charAt(0).toUpperCase()}${language.name
												.slice(1)
												.toLocaleLowerCase()} sinonimi`}
										</label>
										<input
											type='text'
											placeholder='Odvojite ih zarezom'
											className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
											value={
												newTranslations
													.find(t => t.languageId === language.id)
													?.synonyms.join(', ') || ''
											}
											onChange={e => {
												const synonyms = e.target.value.split(',').map(synonym => synonym.trim());
												setNewTranslations(prevTranslations =>
													prevTranslations.map(t =>
														t.languageId === language.id ? { ...t, synonyms } : t
													)
												);
											}}
										/>
									</div>
								</div>
							))}
						</div>

						{/* Parent Categories Section */}
						<div className='mb-6 w-full'>
							<label className='font-semibold text-lg mb-3 block text-black'>
								Izabrane nadkategorije:
							</label>
							<ul className='list-disc pl-5 text-black space-y-2 mb-4 max-h-48 overflow-y-auto'>
								{[...new Set(parentIds)].length > 0 ? (
									[...new Set(parentIds)].map(parentId => {
										const parentCategory = categories.find(cat => cat.id === parentId);
										const translation = translations.find(
											t => t.labelId === parentCategory?.labelId && t.languageId === 1
										);

										return (
											<li key={`parent-${parentId}`} className='flex items-center justify-between'>
												<span className='text-sm text-gray-800'>
													{translation ? translation.translation : 'Translation not available'}
												</span>
												<button
													type='button'
													onClick={() => setParentIds(parentIds.filter(id => id !== parentId))}
													className='ml-4 text-red-500 hover:text-red-700 focus:outline-none'>
													Ukloni
												</button>
											</li>
										);
									})
								) : (
									<li className='text-sm text-gray-500'>Ovo je glavna kategorija</li>
								)}
							</ul>
							<CustomCombobox
								options={filterCategoriesForSelect().map(cat => {
									const translation = translations.find(
										t => t.labelId === cat.labelId && t.languageId === 1
									);

									return {
										id: translation?.id || cat.id,
										labelId: cat.id,
										languageId: 1,
										translation: translation?.translation || 'Ne postoji prevod',
										description: translation?.description || '',
										createdAt: translation?.createdAt || new Date(),
										synonyms: translation?.synonyms || [],
										translationId: translation?.translationId ?? null,
									} as Translation;
								})}
								selectedOptions={translations.filter(t => parentIds.includes(t.labelId))}
								onSelect={selectedOptions => {
									const newParentIds = selectedOptions.map(option => option.labelId);
									setParentIds(newParentIds);
								}}
								placeholder='Izaberite nadkategorije'
							/>
						</div>

						<div className='flex justify-center mt-6'>
							<SumbitButton>SAČUVAJ</SumbitButton>
						</div>
					</form>
				</CustomModal>
			)}
		</div>
	);
};

export default CategoryList;
