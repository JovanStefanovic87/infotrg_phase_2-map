'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FileUploadButton from '@/app/components/buttons/FileUploadButton';
import CategoryList from './CategoryList';

interface Category {
	id: number;
	labelId: number;
	parentId: number | null;
	iconId: number | null;
	subcategories: Category[];
}

export interface Translation {
	id: number;
	labelId: number;
	languageId: number;
	translation: string;
}

interface Language {
	id: number;
	code: string;
	name: string;
}

interface Icon {
	id: number;
	name: string;
	url: string;
}

const AddCategoryPage: React.FC = () => {
	const [parentId, setParentId] = useState<number | null>(null);
	const [languageId, setLanguageId] = useState<number | ''>(1);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);

	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get('/api/categories');
				setCategories(response.data);
			} catch (err) {
				console.error('Failed to fetch categories', err);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchLanguages = async () => {
			try {
				const response = await axios.get('/api/languages');
				setLanguages(response.data);
			} catch (err) {
				console.error('Failed to fetch languages', err);
			}
		};

		fetchLanguages();
	}, []);

	useEffect(() => {
		if (languageId) {
			const fetchLabels = async () => {
				try {
					const response = await axios.get('/api/labels', { params: { languageId } });
					const labels = Array.isArray(response.data) ? response.data : [];

					const fetchTranslations = async () => {
						try {
							const translationResponses = await Promise.all(
								labels.map(async (label: { id: number }) => {
									const response = await axios.get('/api/translation', {
										params: {
											languageId,
											labelId: label.id,
										},
									});
									return response.data;
								})
							);
							const allTranslations = translationResponses.flat();
							setTranslations(allTranslations);
						} catch (err) {
							console.error('Failed to fetch translation', err);
						}
					};

					fetchTranslations();
				} catch (err) {
					console.error('Failed to fetch labels', err);
				}
			};

			fetchLabels();
		}
	}, [languageId]);

	useEffect(() => {
		const fetchIcons = async () => {
			try {
				const response = await axios.get('/api/icons'); // Ensure this endpoint returns icon data
				setIcons(response.data);
			} catch (err) {
				console.error('Failed to fetch icons', err);
			}
		};

		fetchIcons();
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			let iconId = 0;

			// Upload the icon first if it exists
			if (icon) {
				const formData = new FormData();
				formData.append('icon', icon);

				const uploadResponse = await axios.post('/api/icons', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				iconId = uploadResponse.data.iconId; // Get the iconId from the response
			}

			// Create the label
			const labelResponse = await axios.post('/api/labels', { name });
			const newLabelId = labelResponse.data.id;

			if (!newLabelId) {
				throw new Error('Failed to create label');
			}

			// Create the category with the iconId
			const categoryResponse = await axios.post('/api/categories', {
				parentId,
				labelId: newLabelId,
				iconId, // Include iconId in the request
			});

			if (!categoryResponse.data) {
				throw new Error('Failed to create category');
			}

			// Handle translations if needed
			if (languageId) {
				await axios.post('/api/translation', {
					labelId: newLabelId,
					languageId,
					translation: name,
				});
			}

			// Reset form fields
			setName('');
			setParentId(null);
			setLanguageId('');
			setIcon(null);
			setError('');
			setSuccessMessage('Podaci uspešno sačuvani.');

			// Trigger file name reset
			if (fileUploadButtonRef.current.resetFileName) {
				fileUploadButtonRef.current.resetFileName();
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(`Submission Error: ${err.message}`);
				setSuccessMessage(null); // Clear success message on error
			} else {
				setError('An unexpected error occurred.');
				setSuccessMessage(null); // Clear success message on error
			}
		}
	};

	const handleFileChange = (file: File | null) => {
		setIcon(file);
	};

	const handleResetFileName = () => {
		// This callback will be triggered to reset the file name
		if (fileUploadButtonRef.current.resetFileName) {
			fileUploadButtonRef.current.resetFileName();
		}
	};

	return (
		<div className='p-4'>
			<h1 className='text-xl font-bold mb-4'>Add New Category</h1>
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			{successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block mb-2'>
						Category Name:
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={e => setName(e.target.value)}
						className='border p-2 w-full text-black'
					/>
				</div>
				<div>
					<label htmlFor='parentId' className='block mb-2'>
						Parent Category (optional):
					</label>
					<select
						id='parentId'
						value={parentId !== null ? parentId : ''}
						onChange={e => setParentId(e.target.value ? +e.target.value : null)}
						className='border p-2 w-full text-black'>
						<option value=''>None</option>
						{translations.map(translation => (
							<option key={translation.id} value={translation.id} className='text-black'>
								{translation.translation}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor='icon' className='block mb-2'>
						Icon:
					</label>
					<FileUploadButton
						onFileChange={handleFileChange}
						resetFileName={handleResetFileName}
						ref={fileUploadButtonRef}
					/>
				</div>
				<div>
					<button type='submit' className='bg-blue-500 text-white px-4 py-2'>
						Save
					</button>
				</div>
			</form>
			<div className='mt-8'>
				<CategoryList categories={categories} translations={translations} icons={icons} />
			</div>
		</div>
	);
};

export default AddCategoryPage;

/* 'use client';
import React, { useEffect, useState } from 'react';
import PageContainer from '@/app/components/containers/PageContainer';
import Combobox from '@/app/components/input/CustomCombobox';

interface Category {
	id: string;
	name: string;
	description?: string;
	parentId?: string | null;
	subcategories: Category[];
	synonyms?: string[];
}

const AdminCategoriesPage = () => {
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [parentId, setParentId] = useState<string | null>(null);
	const [synonyms, setSynonyms] = useState<string>('');
	const [language, setLanguage] = useState('rs'); // Default language
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

	const languages = [
		{ code: 'rs', name: 'Serbian' },
		{ code: 'hu', name: 'Hungarian' },
	];

	const fetchCategories = async (): Promise<Category[]> => {
		try {
			const response = await fetch('/api/categories');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const result = await response.json();
			return result;
		} catch (error) {
			console.error('Failed to fetch categories:', error);
			return [];
		}
	};

	useEffect(() => {
		const loadCategories = async () => {
			const result = await fetchCategories();
			setCategories(result);
			setLoading(false);
		};

		loadCategories();
	}, []);

	const handleAddCategory = async () => {
		// Validate input
		if (!category.trim()) {
			alert('Category name is required.');
			return;
		}

		try {
			const response = await fetch('/api/categories', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					names: [{ name: category, language }],
					description: description ? [{ description, language }] : null,
					parentId,
					synonyms: synonyms ? synonyms.split(',').map(s => s.trim()) : [],
				}),
			});

			const result = await response.json();

			if (result.error) {
				console.error('Server error:', result.error);
				alert('Failed to add category. Please check the console for details.');
			} else {
				alert('Category added successfully');
				setCategory('');
				setDescription('');
				setParentId(null);
				setSynonyms('');
				setLanguage('rs'); // Reset to default language
				const updatedCategories = await fetchCategories();
				setCategories(updatedCategories);
			}
		} catch (error) {
			console.error('Failed to add category:', error);
			alert('Failed to add category. Please check the console for details.');
		}
	};

	const handleEditCategory = (category: Category) => {
		setEditingCategory(category);
		setCategory(category.name);
		setDescription(category.description || '');
		setParentId(category.parentId || null);
		setSynonyms((category.synonyms || []).join(', '));
		// Assume the editing category has a language field
		// setLanguage(category.language || 'rs');
	};

	const handleUpdateCategory = async () => {
		if (editingCategory) {
			const response = await fetch('/api/categories', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: editingCategory.id,
					names: [{ name: category, language }],
					description: description ? [{ description, language }] : null,
					parentId,
					synonyms: synonyms.split(',').map(s => s.trim()),
				}),
			});
			const result = await response.json();
			if (result.error) {
				console.error(result.error);
			} else {
				alert('Category updated successfully');
				setEditingCategory(null);
				setCategory('');
				setDescription('');
				setParentId(null);
				setSynonyms('');
				setLanguage('rs'); // Reset to default language
				const updatedCategories = await fetchCategories();
				setCategories(updatedCategories);
			}
		}
	};

	const handleDeleteCategory = async (id: string) => {
		if (confirm('Are you sure you want to delete this category?')) {
			try {
				const response = await fetch('/api/categories', {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id }),
				});
				const result = await response.json();
				if (result.error) {
					console.error(result.error);
				} else {
					alert('Category deleted successfully');
					const updatedCategories = await fetchCategories();
					setCategories(updatedCategories);
				}
			} catch (error) {
				console.error('Failed to delete category:', error);
			}
		}
	};

	const renderCategoryList = (categories: Category[]) => (
		<ul>
			{categories.map(category => (
				<li key={category.id} className='mb-2'>
					<span className='font-semibold'>{category.name}</span>
					<button
						onClick={() => handleEditCategory(category)}
						className='ml-2 text-blue-600 hover:underline'>
						Edit
					</button>
					<button
						onClick={() => handleDeleteCategory(category.id)}
						className='ml-2 text-red-600 hover:underline'>
						Delete
					</button>
					{category.subcategories.length > 0 && (
						<ul className='pl-4'>{renderCategoryList(category.subcategories)}</ul>
					)}
				</li>
			))}
		</ul>
	);

	const selectOptions = categories.map(cat => ({
		id: cat.id,
		name: cat.name,
		synonyms: cat.synonyms,
	}));

	if (loading) return <p className='text-gray-700'>Loading...</p>;

	return (
		<PageContainer>
			<div className='p-6 bg-gray-100 min-h-screen'>
				<h1 className='text-4xl font-bold mb-6 text-gray-900'>Admin Categories Page</h1>
				<div className='bg-white p-6 rounded-lg shadow-md mb-6'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>Add/Edit Category</h2>
					<input
						type='text'
						placeholder='Category Name'
						value={category}
						onChange={e => setCategory(e.target.value)}
						className='block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
					/>
					<textarea
						placeholder='Description'
						value={description}
						onChange={e => setDescription(e.target.value)}
						className='block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
					/>
					<Combobox
						options={selectOptions}
						onSelect={option => setParentId(option?.id || null)}
						placeholder='Search Parent Category'
					/>
					<input
						type='text'
						placeholder='Synonyms (comma separated)'
						value={synonyms}
						onChange={e => setSynonyms(e.target.value)}
						className='block text-black w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
					<select
						value={language}
						onChange={e => setLanguage(e.target.value)}
						className='block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'>
						{languages.map(lang => (
							<option key={lang.code} value={lang.code}>
								{lang.name}
							</option>
						))}
					</select>
					<button
						onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
						className='w-full bg-blueLight text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
						{editingCategory ? 'Update Category' : 'Add Category'}
					</button>
				</div>
				<div className='bg-white text-black p-6 rounded-lg shadow-md'>
					<h2 className='text-2xl font-semibold mb-4 text-gray-800'>Category List</h2>
					{renderCategoryList(categories)}
				</div>
			</div>
		</PageContainer>
	);
};

export default AdminCategoriesPage;
 */
