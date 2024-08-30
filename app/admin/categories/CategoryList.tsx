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
			translations: {
				translationId: number;
				languageId: number;
				translation: string;
			}[];
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

				const existingTranslations = categoryTranslations.map(t => ({
					translationId: t.id,
					languageId: t.languageId,
					translation: t.translation,
				}));

				setNewTranslations(existingTranslations);

				// Set the current icon URL based on the category's iconId
				const iconId = category.iconId || null;
				const iconUrl = getCategoryIconUrl(iconId); // Make sure this function works correctly
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
				let iconId: number | null = currentIcon.iconId; // Use currentIcon.iconId

				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					const { data: iconData } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = iconData.id; // Set iconId to new icon id
				}

				const translationUpdates = newTranslations.map(
					({ translationId, languageId, translation }) => ({
						translationId,
						languageId,
						translation,
					})
				);

				await axios.put('/api/translation/translations', {
					translations: translationUpdates,
				});

				const updateData: {
					translations: {
						translationId: number;
						languageId: number;
						translation: string;
					}[];
					iconId: number | null; // Ensure iconId is always included
					parentIds: number[];
				} = {
					translations: translationUpdates,
					iconId: iconId ?? null, // Always include iconId, even if it's null
					parentIds,
				};

				await onEditCategory(currentEditCategory.id, updateData);

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
			currentIcon, // include this dependency
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

	const handleRemoveParent = useCallback((parentId: number) => {
		setParentIds(prev => prev.filter(id => id !== parentId));
	}, []);

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

	// Function to filter categories for select input
	const filterCategoriesForSelect = useCallback(() => {
		if (!currentEditCategory) return categories;

		const completeBranch = getCompleteBranch(currentEditCategory);
		const uniqueCategories = categories.filter(cat => !completeBranch.has(cat.id));

		// Convert to a Set and back to an array to ensure uniqueness
		const uniqueCategoriesSet = new Set(uniqueCategories.map(cat => cat.id));
		return Array.from(uniqueCategoriesSet).map(id => categories.find(cat => cat.id === id));
	}, [categories, currentEditCategory]);

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
								{currentIcon.iconUrl && !newIcon ? (
									<div className='mt-2'>
										<Image src={currentIcon.iconUrl} alt='Current Icon' width={50} height={50} />
										<button
											type='button'
											className='text-blue-500 mt-2'
											onClick={() => {
												setIsIconPickerOpen(true);
												icons;
											}}>
											Choose from existing icons
										</button>
									</div>
								) : (
									<div className='mt-2'>
										<p className='text-gray-500'>No icon selected</p>
										<button
											type='button'
											className='text-blue-500 mt-2'
											onClick={() => {
												setIsIconPickerOpen(true);
												icons;
											}}>
											Choose from existing icons
										</button>
									</div>
								)}
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

							<div>
								<label className='font-semibold'>Current Parent Categories:</label>
								<ul>
									{[...new Set(parentIds)].map(parentId => (
										<li key={`parent-${parentId}`}>
											{getCategoryName(
												categories.find(cat => cat.id === parentId)?.labelId || 0,
												languageId
											)}
											<button
												type='button'
												onClick={() => handleRemoveParent(parentId)}
												className='text-red-500 ml-2'>
												Remove
											</button>
										</li>
									))}
								</ul>
								<select
									onChange={e => handleAddParent(Number(e.target.value))}
									value=''
									className='mt-2 text-black'>
									<option value='' disabled>
										Add Parent Category
									</option>
									{filterCategoriesForSelect().map(cat => {
										if (!cat) return null; // Ensure `cat` is defined before using its properties

										return (
											<option key={`select-${cat.id}`} value={cat.id}>
												{getCategoryName(cat.labelId, languageId)}
											</option>
										);
									})}
								</select>
							</div>

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
