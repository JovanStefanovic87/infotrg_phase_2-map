'use client';
import React, { useEffect, useState } from 'react';
import PageContainer from '@/app/components/containers/PageContainer';
import Combobox from '@/app/components/input/customCombobox';
import CategoryList from './CategoryList';

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
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);

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
		const response = await fetch('/api/categories', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: category,
				description,
				parentId,
				synonyms: synonyms.split(',').map(s => s.trim()),
			}),
		});

		const result = await response.json();
		if (result.error) {
			alert(result.error);
		} else {
			alert('Category added successfully');
			setCategory('');
			setDescription('');
			setParentId(null);
			setSynonyms('');
			const updatedCategories = await fetchCategories();
			setCategories(updatedCategories);
		}
	};

	const handleEditCategory = (category: Category) => {
		setEditingCategory(category);
		setCategory(category.name);
		setDescription(category.description || '');
		setParentId(category.parentId || null);
		setSynonyms((category.synonyms || []).join(', '));
	};

	const handleUpdateCategory = async () => {
		if (editingCategory) {
			const response = await fetch('/api/categories', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: editingCategory.id,
					name: category,
					description,
					parentId,
					synonyms: synonyms.split(',').map(s => s.trim()),
				}),
			});
			const result = await response.json();
			if (result.error) {
				alert(result.error);
			} else {
				alert('Category updated successfully');
				setEditingCategory(null);
				setCategory('');
				setDescription('');
				setParentId(null);
				setSynonyms('');
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
					alert(result.error);
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

	const renderCategoryList = (categories: Category[]) => {
		return (
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
						{category.subcategories && category.subcategories.length > 0 && (
							<ul className='pl-4'>{renderCategoryList(category.subcategories)}</ul>
						)}
					</li>
				))}
			</ul>
		);
	};

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
