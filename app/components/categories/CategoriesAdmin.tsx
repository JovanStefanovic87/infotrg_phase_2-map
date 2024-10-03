'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import CategoryList from '../lists/CategoryList';
import { CategoryByLanguageAndPrefix, Language, CurrentIcon } from '@/utils/helpers/types';
import PageContainer from '@/app/components/containers/PageContainer';
import NewCategoryForm from '../forms/NewCategoryForm';
import apiClient from '@/utils/helpers/apiClient';
import ImagePickerForm from '../forms/ImagePickerForm';
import H1 from '@/app/components/text/H1';

interface Props {
	prefix: string;
	title: string;
}

const ArticleCategories: React.FC<Props> = ({ prefix, title }) => {
	const [parentIds, setParentIds] = useState<number[]>([]);
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [categories, setCategories] = useState<CategoryByLanguageAndPrefix[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [icon, setIcon] = useState<File | null>(null);
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [relatedIds, setRelatedIds] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});
	const [currentIcon, setCurrentIcon] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
	const [manuallyExpandedCategories, setManuallyExpandedCategories] = useState<Set<number>>(
		new Set()
	);
	const [filteredCategories, setFilteredCategories] = useState<CategoryByLanguageAndPrefix[]>([]);
	const [initialExpandedCategories, setInitialExpandedCategories] = useState<Set<number>>(
		new Set()
	);

	// Fetch categories by language and prefix
	const fetchCategoriesbyLanguage = () =>
		apiClient<CategoryByLanguageAndPrefix[]>({
			method: 'GET',
			url: `/api/categoriesByLanguage?prefix=${prefix}&languageId=${languageId}`,
		});

	const fetchLanguages = () => apiClient<Language[]>({ method: 'GET', url: '/api/languages' });

	// Refetch data function to get categories and languages
	const refetchData = useCallback(async () => {
		setLoading(true);
		try {
			const categoriesData = await fetchCategoriesbyLanguage();
			setCategories(categoriesData);
			setFilteredCategories(categoriesData);
		} catch (error) {
			console.error('Failed to refetch data', error);
		} finally {
			setLoading(false);
		}
	}, [languageId, prefix]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	// Fetch languages when component is mounted
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			let iconId = currentIcon.iconId;
			if (icon) {
				const formData = new FormData();
				formData.append('icon', icon);
				formData.append('directory', 'articles');
				const { data } = await axios.post('/api/icons', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
				iconId = data.iconId;
			}

			const { data: labelData } = await axios.post('/api/labels', { name, prefix });
			const newLabelId = labelData.id;

			if (!newLabelId) throw new Error('Failed to create label');
			console.log('parentIds:', parentIds);

			const { data: categoryData } = await axios.post('/api/categories', {
				parentIds,
				relatedIds,
				labelId: newLabelId,
				iconId,
				name,
			});

			if (!categoryData) throw new Error('Failed to create category');

			resetForm();
			setSuccessMessage('Kategorija uspešno sačuvana.');
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
		setParentIds([]);
		setRelatedIds([]);
		setLanguageId(1);
		setIcon(null);
		setError('');
	};

	return (
		<PageContainer>
			<H1 title={title} />
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			{successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}

			<NewCategoryForm
				name={name}
				setName={setName}
				parentIds={parentIds}
				setParentIds={setParentIds}
				categories={categories}
				onFileChange={handleFileChange}
				onFileReset={handleResetFileName}
				onSubmit={handleSubmit}
				isIconPickerOpen={isIconPickerOpen}
				setIsIconPickerOpen={setIsIconPickerOpen}
			/>
			<div className='mt-8'>
				<CategoryList
					categories={categories}
					currentIcon={currentIcon}
					setCurrentIcon={setCurrentIcon}
					languages={languages}
					languageId={languageId}
					relatedIds={relatedIds}
					setRelatedIds={setRelatedIds}
					refetchCategories={refetchData}
					onDeleteCategory={async (id: number) => {
						try {
							await axios.delete(`/api/categories/${id}`);
							await refetchData();
						} catch (err) {
							console.error('Failed to delete category', err);
						}
					}}
					isIconPickerOpen={isIconPickerOpen}
					setIsIconPickerOpen={setIsIconPickerOpen}
					expandedCategories={expandedCategories}
					setExpandedCategories={setExpandedCategories}
					manuallyExpandedCategories={manuallyExpandedCategories}
					setManuallyExpandedCategories={setManuallyExpandedCategories}
					filteredCategories={filteredCategories}
					setFilteredCategories={setFilteredCategories}
					initialExpandedCategories={initialExpandedCategories}
					setInitialExpandedCategories={setInitialExpandedCategories}
				/>
			</div>
			{/* <ImagePickerForm
				icons={icons}
				isOpen={isIconPickerOpen}
				onSelect={setCurrentIcon}
				onClose={() => setIsIconPickerOpen(false)}
			/> */}
		</PageContainer>
	);
};

export default ArticleCategories;
