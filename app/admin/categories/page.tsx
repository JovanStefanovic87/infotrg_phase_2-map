'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import CategoryList from './CategoryList';
import { Category, Language, Translation, Icon } from '@/utils/helpers/types';
import PageContainer from '@/app/components/containers/PageContainer';
import CategoryForm from './CategoryForm';

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

	const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
	const [loadingLanguages, setLoadingLanguages] = useState<boolean>(false);
	const [loadingTranslations, setLoadingTranslations] = useState<boolean>(false);
	const [loadingIcons, setLoadingIcons] = useState<boolean>(false);

	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	const fetchCategories = async (): Promise<Category[]> => {
		try {
			const response = await fetch('/api/categories');
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching categories:', error);
			return [];
		}
	};

	const fetchLanguages = async (): Promise<Language[]> => {
		try {
			const response = await axios.get('/api/languages');
			return response.data;
		} catch (err) {
			console.error('Failed to fetch languages', err);
			throw err;
		}
	};

	const fetchIcons = async (): Promise<Icon[]> => {
		try {
			const response = await axios.get('/api/icons');
			return response.data;
		} catch (err) {
			console.error('Failed to fetch icons', err);
			throw err;
		}
	};

	const fetchTranslations = async (languageId: number): Promise<Translation[]> => {
		try {
			const labelsResponse = await axios.get('/api/labels', { params: { languageId } });
			const labels = Array.isArray(labelsResponse.data) ? labelsResponse.data : [];

			const translationsPromises = labels.map(async (label: { id: number }) => {
				const translationResponse = await axios.get('/api/translation', {
					params: { languageId, labelId: label.id },
				});
				return translationResponse.data;
			});

			return (await Promise.all(translationsPromises)).flat();
		} catch (err) {
			console.error('Failed to fetch translations', err);
			throw err;
		}
	};

	const refetchCategories = useCallback(async () => {
		setLoadingCategories(true);
		setLoadingTranslations(true);
		setLoadingIcons(true);
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
			setLoadingCategories(false);
			setLoadingTranslations(false);
			setLoadingIcons(false);
		}
	}, [languageId]);

	useEffect(() => {
		refetchCategories();
	}, [refetchCategories]);

	useEffect(() => {
		const fetchLanguagesData = async () => {
			setLoadingLanguages(true);
			try {
				const data = await fetchLanguages();
				setLanguages(data);
			} catch (err) {
				console.error('Failed to fetch languages', err);
			} finally {
				setLoadingLanguages(false);
			}
		};

		fetchLanguagesData();
	}, []);

	useEffect(() => {
		if (languageId) {
			const fetchTranslationsData = async () => {
				setLoadingTranslations(true);
				try {
					const data = await fetchTranslations(languageId);
					setTranslations(data);
				} catch (err) {
					console.error('Failed to fetch translations', err);
				} finally {
					setLoadingTranslations(false);
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

				const uploadResponse = await axios.post('/api/icons', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
				iconId = uploadResponse.data.iconId;
			}

			const labelResponse = await axios.post('/api/labels', { name });
			const newLabelId = labelResponse.data.id;

			if (!newLabelId) {
				throw new Error('Failed to create label');
			}

			const categoryResponse = await axios.post('/api/categories', {
				parentId,
				labelId: newLabelId,
				iconId,
			});

			if (!categoryResponse.data) {
				throw new Error('Failed to create category');
			}

			if (languageId) {
				await axios.post('/api/translation', {
					labelId: newLabelId,
					languageId,
					translation: name,
				});
			}

			resetForm();
			setSuccessMessage('Podaci uspešno sačuvani.');

			if (fileUploadButtonRef.current.resetFileName) {
				fileUploadButtonRef.current.resetFileName();
			}

			await refetchCategories(); // Refetch categories, translations, and icons after successful submission
		} catch (err) {
			setError(
				err instanceof Error ? `Submission Error: ${err.message}` : 'An unexpected error occurred.'
			);
			setSuccessMessage(null);
		}
	};

	const handleFileChange = (file: File | null) => setIcon(file);

	const handleResetFileName = () => {
		if (fileUploadButtonRef.current.resetFileName) {
			fileUploadButtonRef.current.resetFileName();
		}
	};

	const resetForm = () => {
		setName('');
		setParentId(null);
		setLanguageId(1);
		setIcon(null);
		setError('');
	};

	if (loadingCategories || loadingIcons || loadingTranslations) return <p>Loading...</p>;

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
				onFileChange={file => setIcon(file)}
				onFileReset={() => setIcon(null)}
				onSubmit={handleSubmit}
			/>

			<div className='mt-8'>
				<CategoryList
					categories={categories}
					translations={translations}
					icons={icons}
					languages={languages}
					languageId={languageId}
					refetchCategories={refetchCategories}
					onEditCategory={async (id, newName) => {
						try {
							await axios.put(`/api/categories/${id}`, { name: newName });
							await refetchCategories(); // Refetch data after editing
						} catch (err) {
							console.error('Failed to edit category', err);
						}
					}}
					onDeleteCategory={async id => {
						try {
							await axios.delete(`/api/categories/${id}`);
							await refetchCategories(); // Refetch data after deleting
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
