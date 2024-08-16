'use client';
import { useEffect, useState, SyntheticEvent } from 'react';
import { Category, CategoryData, HandleAddCategoryProps } from '@/utils/helpers/types';

export const fetchCategories = async (): Promise<Category[]> => {
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

export const handleAddCategory = (
	getCategoryData: () => CategoryData,
	editingCategory: Category | null,
	clearForm: () => void,
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>
) => {
	return async (e: SyntheticEvent<HTMLButtonElement>): Promise<void> => {
		e.preventDefault();
		const categoryData = getCategoryData();

		const method = editingCategory ? 'PUT' : 'POST';
		const body = JSON.stringify({ ...categoryData, id: editingCategory?.id });

		try {
			const response = await fetch('/api/categories', {
				method,
				headers: { 'Content-Type': 'application/json' },
				body,
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await response.json();

			if (result.error) {
				alert(result.error);
			} else {
				alert(`Category ${editingCategory ? 'updated' : 'added'} successfully`);
				clearForm();
				const updatedCategories = await fetchCategories();
				setCategories(updatedCategories);
			}
		} catch (error) {
			console.error('Failed to add or update category:', error);
		}
	};
};

export const handleDeleteCategory = async (
	id: string,
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>
) => {
	if (confirm('Are you sure you want to delete this category?')) {
		try {
			const response = await fetch('/api/categories', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id }),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

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
