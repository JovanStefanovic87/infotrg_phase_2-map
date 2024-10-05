'use client';
import { useEffect, useState, SyntheticEvent } from 'react';
import { Category, CategoryData, HandleAddCategoryProps, Language } from '@/utils/helpers/types';
import axios from 'axios';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

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

export const fetchLanguages = async (): Promise<Language[]> => {
	try {
		const response = await axios.get('/api/languages');
		return response.data;
	} catch (err) {
		console.error('Failed to fetch languages', err);
		throw err;
	}
};

export const fetchIcons = async () => {
	try {
		const response = await axios.get('/api/icons');
		return response.data;
	} catch (err) {
		console.error('Failed to fetch icons', err);
		throw err;
	}
};

export const fetchCategories = async (): Promise<Category[]> => {
	try {
		const response = await axios.get('/api/categories');
		return response.data;
	} catch (err) {
		console.error('Failed to fetch categories', err);
		throw new Error('Failed to fetch categories');
	}
};
