'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import CategoryList from '../lists/CategoryList';
import { Category, Language, Translation, Icon, CurrentIcon } from '@/utils/helpers/types';
import NewCategoryForm from '../forms/NewCategoryForm';
import apiClient from '@/utils/helpers/apiClient';
import ImagePickerForm from '../forms/ImagePickerForm';
import DynamicPageContainer from '../containers/DynamicPageContainer';
import { handleError } from '@/utils/helpers/universalFunctions';

interface Props {
	prefix: string;
	title: string;
}

const CategoriesAdmin: React.FC<Props> = ({ prefix, title }) => {
	const [parentIds, setParentIds] = useState<number[]>([]);
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [relatedIds, setRelatedIds] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});
	const [currentIcon, setCurrentIcon] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
	const [manuallyExpandedCategories, setManuallyExpandedCategories] = useState<Set<number>>(
		new Set()
	);
	const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
	const [initialExpandedCategories, setInitialExpandedCategories] = useState<Set<number>>(
		new Set()
	);
	const fetchCategories = () =>
		apiClient<Category[]>({
			method: 'GET',
			url: `/api/categories?prefix=${prefix}`,
		});

	const fetchLanguages = () => apiClient<Language[]>({ method: 'GET', url: '/api/languages' });
	const fetchIcons = () =>
		apiClient<Icon[]>({ method: 'GET', url: '/api/icons?directory=articles' });
	const fetchTranslations = async (languageId: number): Promise<Translation[]> => {
		const labels = await apiClient<{ id: number }[]>({
			method: 'GET',
			url: `/api/labels?languageId=${languageId}&prefix=${prefix}`,
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
			setFilteredCategories(categoriesData);
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
		} finally {
			setLoading(false);
		}
	}, [languageId]);

	useEffect(() => {
		refetchData();
	}, [refetchData]);

	useEffect(() => {
		const fetchLanguagesData = async () => {
			try {
				const data = await fetchLanguages();
				setLanguages(data);
			} catch (err) {
				handleError(err, setError, setSuccessMessage);
			}
		};
		fetchLanguagesData();
	}, []);

	useEffect(() => {
		if (languageId) {
			const fetchTranslationsData = async () => {
				try {
					const data = await fetchTranslations(languageId);
					setTranslations(data);
				} catch (err) {
					handleError(err, setError, setSuccessMessage);
				}
			};
			fetchTranslationsData();
		}
	}, [languageId]);

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

			const { data: categoryData } = await axios.post('/api/categories', {
				parentIds,
				relatedIds,
				labelId: newLabelId,
				iconId,
				name,
			});

			if (!categoryData) throw new Error('Failed to create category');

			const translations = languages.map(language => ({
				labelId: newLabelId,
				languageId: language.id,
				translation: language.id === 1 ? name : '',
			}));

			await axios.post('/api/translation', { translations });

			resetForm();
			setSuccessMessage('Kategorija uspešno sačuvana.');
			if (fileUploadButtonRef.current.resetFileName) fileUploadButtonRef.current.resetFileName();
			await refetchData();
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
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

	const handleDeleteCategory = async (id: number) => {
		try {
			await axios.delete(`/api/categories/${id}`);
			await refetchData();
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
		}
	};

	return (
		<DynamicPageContainer
			clearSuccess={() => setSuccessMessage(null)}
			successMessage={successMessage}
			error={error}
			clearError={() => setError('')}
			loading={loading}
			title={title}>
			<NewCategoryForm
				name={name}
				setName={setName}
				parentIds={parentIds}
				setParentIds={setParentIds}
				translations={translations}
				onFileChange={handleFileChange}
				onSubmit={handleSubmit}
				setIsIconPickerOpen={setIsIconPickerOpen}
			/>
			<div className='mt-8'>
				<CategoryList
					categories={categories}
					translations={translations}
					icons={icons}
					currentIcon={currentIcon}
					setCurrentIcon={setCurrentIcon}
					languages={languages}
					languageId={languageId}
					relatedIds={relatedIds}
					setRelatedIds={setRelatedIds}
					refetchCategories={refetchData}
					onDeleteCategory={(id: number) => handleDeleteCategory(id)}
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
					setError={setError}
					setSuccessMessage={setSuccessMessage}
					setLoading={setLoading}
				/>
			</div>
			<ImagePickerForm
				icons={icons}
				isOpen={isIconPickerOpen}
				onSelect={setCurrentIcon}
				onClose={() => setIsIconPickerOpen(false)}
			/>
		</DynamicPageContainer>
	);
};

export default CategoriesAdmin;
