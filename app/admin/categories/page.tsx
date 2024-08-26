'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import CategoryList from './CategoryList';
import { Category, Language, Translation, Icon } from '@/utils/helpers/types';
import PageContainer from '@/app/components/containers/PageContainer';
import CategoryForm from './CategoryForm';
import apiClient from '@/utils/helpers/apiClient';

const AddCategoryPage: React.FC = () => {
	const [parentId, setParentId] = useState<number | null>(null);
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);

	const [loading, setLoading] = useState<boolean>(false);

	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	const fetchCategories = () => apiClient<Category[]>({ method: 'GET', url: '/api/categories' });
	const fetchLanguages = () => apiClient<Language[]>({ method: 'GET', url: '/api/languages' });
	const fetchIcons = () => apiClient<Icon[]>({ method: 'GET', url: '/api/icons' });
	const fetchTranslations = async (languageId: number): Promise<Translation[]> => {
		const labels = await apiClient<{ id: number }[]>({
			method: 'GET',
			url: `/api/labels?languageId=${languageId}`,
		});
		const translationsPromises = labels.map(({ id }) =>
			apiClient<Translation>({
				method: 'GET',
				url: `/api/translation?languageId=${languageId}&labelId=${id}`,
			})
		);
		return (await Promise.all(translationsPromises)).map(res => res);
	};

	const refetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [categoriesData, translationsData, iconsData] = await Promise.all([
				fetchCategories(),
				fetchTranslations(languageId),
				fetchIcons(),
			]);
			setCategories(categoriesData);
			setTranslations(translationsData);
			setIcons(iconsData);
		} catch (error) {
			console.error('Failed to refetch data', error);
		} finally {
			setLoading(false);
		}
	}, [languageId]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	useEffect(() => {
		const fetchLanguagesData = async () => {
			setLoading(true);
			try {
				const data = await fetchLanguages();
				setLanguages(data);
			} catch (err) {
				console.error('Failed to fetch languages', err);
			} finally {
				setLoading(false);
			}
		};
		fetchLanguagesData();
	}, []);

	useEffect(() => {
		if (languageId) {
			const fetchTranslationsData = async () => {
				setLoading(true);
				try {
					const data = await fetchTranslations(languageId);
					setTranslations(data);
				} catch (err) {
					console.error('Failed to fetch translations', err);
				} finally {
					setLoading(false);
				}
			};
			fetchTranslationsData();
		}
	}, [languageId]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			let iconId = 0;
			if (icon) {
				const formData = new FormData();
				formData.append('icon', icon);
				const { data } = await axios.post('/api/icons', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
				iconId = data.iconId;
			}
			const { data: labelData } = await axios.post('/api/labels', { name });
			const newLabelId = labelData.id;

			if (!newLabelId) throw new Error('Failed to create label');
			const { data: categoryData } = await axios.post('/api/categories', {
				parentId,
				labelId: newLabelId,
				iconId,
			});

			if (!categoryData) throw new Error('Failed to create category');

			// Generate translations array
			const translationsArray = [
				{
					labelId: newLabelId,
					languageId: languageId,
					translation: name,
				},
				...languages
					.filter(lang => lang.id !== languageId) // Exclude the current language
					.map(lang => ({
						labelId: newLabelId,
						languageId: lang.id,
						translation: null,
					})),
			];

			if (translationsArray.length) {
				await axios.post('/api/translation', { translations: translationsArray });
			}

			resetForm();
			setSuccessMessage('Data saved successfully.');
			if (fileUploadButtonRef.current.resetFileName) fileUploadButtonRef.current.resetFileName();
			await refetchData();
		} catch (err) {
			setError(
				`Submission Error: ${err instanceof Error ? err.message : 'An unexpected error occurred.'}`
			);
			setSuccessMessage(null);
		}
	};

	const handleFileChange = (file: File | null) => setIcon(file);
	const handleResetFileName = () =>
		fileUploadButtonRef.current.resetFileName && fileUploadButtonRef.current.resetFileName();
	const resetForm = () => {
		setName('');
		setParentId(null);
		setLanguageId(1);
		setIcon(null);
		setError('');
	};

	const handleEditCategory = useCallback(
		async (
			id: number,
			data: {
				translations: { translationId: number | null; languageId: number; translation: string }[];
				icon?: File | null;
			}
		) => {
			const { translations, icon: newIcon } = data;

			try {
				let iconId: number | undefined = undefined;

				// Handle icon upload
				if (newIcon) {
					const formData = new FormData();
					formData.append('icon', newIcon);
					const { data: iconData } = await axios.post('/api/icons', formData, {
						headers: { 'Content-Type': 'multipart/form-data' },
					});
					iconId = iconData.iconId;
				}

				// Update category with new icon
				await axios.put(`/api/categories/${id}`, { iconId });

				// Prepare translations for update
				const translationsArray = translations.map(translation => ({
					labelId: id,
					languageId: translation.languageId,
					translation: translation.translation ?? null, // Handle null values
				}));

				setSuccessMessage('Category updated successfully.');
				await refetchData();
			} catch (err) {
				console.error('Failed to update category', err);
				setError(
					`Update Error: ${err instanceof Error ? err.message : 'An unexpected error occurred.'}`
				);
				setSuccessMessage(null);
			}
		},
		[refetchData]
	);

	return (
		<PageContainer>
			<h1 className='text-xl font-bold mb-4'>Add New Category</h1>
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			{successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}
			<CategoryForm
				name={name}
				setName={setName}
				parentId={parentId}
				setParentId={setParentId}
				translations={translations}
				icon={icon}
				onFileChange={handleFileChange}
				onFileReset={handleResetFileName}
				onSubmit={handleSubmit}
			/>
			<div className='mt-8'>
				<CategoryList
					categories={categories}
					translations={translations}
					icons={icons}
					languages={languages}
					languageId={languageId}
					refetchCategories={refetchData}
					onEditCategory={handleEditCategory}
					onDeleteCategory={async id => {
						try {
							await axios.delete(`/api/categories/${id}`);
							await refetchData();
						} catch (err) {
							console.error('Failed to delete category', err);
						}
					}}
				/>
			</div>
		</PageContainer>
	);
};

export default AddCategoryPage;
