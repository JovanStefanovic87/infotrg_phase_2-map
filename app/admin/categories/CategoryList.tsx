'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Category, Icon, Translation, Language, Synonym } from '@/utils/helpers/types';
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
				synonyms: string[];
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

				const existingTranslations = categoryTranslations.map(t => ({
					translationId: t.id,
					languageId: t.languageId,
					translation: t.translation,
					synonyms: t.synonyms.map(s => s.synonym), // Extract synonyms
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
					({ translationId, languageId, translation, synonyms }) => ({
						translationId,
						languageId,
						translation,
						synonyms: synonyms || [], // Ensure synonyms is an array
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

	const handleRemoveParent = useCallback((parentId: number) => {
		setParentIds(prev => prev.filter(id => id !== parentId));
	}, []);

	const handleAddSynonym = (languageId: number, synonym: string) => {
		setNewTranslations(prevTranslations =>
			prevTranslations.map(t =>
				t.languageId === languageId ? { ...t, synonyms: [...(t.synonyms || []), synonym] } : t
			)
		);
	};

	const handleRemoveSynonym = (languageId: number, index: number) => {
		setNewTranslations(prevTranslations =>
			prevTranslations.map(t =>
				t.languageId === languageId
					? { ...t, synonyms: t.synonyms?.filter((_, i) => i !== index) }
					: t
			)
		);
	};

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
					<form
						onSubmit={handleSubmitEdit}
						className='space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto'>
						{/* Icon Section */}
						<div className='flex flex-col items-center'>
							<label htmlFor='icon' className='font-semibold mb-2'>
								Icon
							</label>
							{currentIcon.iconUrl && !newIcon ? (
								<div className='mb-4'>
									<Image src={currentIcon.iconUrl} alt='Current Icon' width={50} height={50} />
									<button
										type='button'
										className='text-blue-500 mt-2'
										onClick={() => setIsIconPickerOpen(true)}>
										Choose from existing icons
									</button>
								</div>
							) : (
								<p className='text-gray-500'>No icon selected</p>
							)}
							<input
								type='file'
								id='icon'
								className='text-black mb-4'
								name='icon'
								accept='image/*'
								onChange={handleFileChange}
							/>
						</div>

						{/* Translations and Synonyms */}
						{languages.map(language => (
							<div key={language.id} className='flex flex-col mb-4'>
								<label htmlFor={`translation-${language.id}`} className='font-semibold mb-1'>
									{language.name}
								</label>
								<input
									type='text'
									id={`translation-${language.id}`}
									className='border p-2 rounded w-full mb-2'
									value={newTranslations.find(t => t.languageId === language.id)?.translation || ''}
									onChange={e => {
										const translation = e.target.value;
										setNewTranslations(prevTranslations =>
											prevTranslations.map(t =>
												t.languageId === language.id ? { ...t, translation } : t
											)
										);
									}}
								/>
								{/* Synonyms Input */}
								<input
									type='text'
									placeholder='Add synonyms, separated by commas...'
									className='border p-2 rounded w-full'
									value={
										newTranslations.find(t => t.languageId === language.id)?.synonyms.join(', ') ||
										''
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
						))}

						{/* Parent Categories Section */}
						<div className='mb-4'>
							<label className='font-semibold mb-2'>Current Parent Categories:</label>
							<ul className='list-disc pl-5'>
								{[...new Set(parentIds)].map(parentId => (
									<li key={`parent-${parentId}`} className='flex items-center'>
										<span>{categories.find(cat => cat.id === parentId)?.labelId || 'Unknown'}</span>
										<button
											type='button'
											onClick={() => setParentIds(parentIds.filter(id => id !== parentId))}
											className='text-red-500 ml-2'>
											Remove
										</button>
									</li>
								))}
							</ul>
							<select
								onChange={e => setParentIds([...parentIds, Number(e.target.value)])}
								value=''
								className='mt-2 text-black border p-2 rounded w-full'>
								<option value='' disabled>
									Add Parent Category
								</option>
								{categories
									.filter(cat => !parentIds.includes(cat.id))
									.map(cat => (
										<option key={`select-${cat.id}`} value={cat.id}>
											{cat.labelId}
										</option>
									))}
							</select>
						</div>

						{/* Save Button */}
						<button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded w-full'>
							Save Changes
						</button>
					</form>
				</CustomModal>
			)}
		</div>
	);
};

export default CategoryList;
