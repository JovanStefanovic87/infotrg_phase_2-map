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
	const [translationValues, setTranslationValues] = useState<{ [key: number]: string }>({});
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
			url: `/api/categoriesByLanguage?prefix=${prefix}&languageId=${languageId}`,
		});

	const fetchLanguages = () => apiClient<Language[]>({ method: 'GET', url: '/api/languages' });
	const fetchIcons = () =>
		apiClient<Icon[]>({ method: 'GET', url: '/api/icons?directory=articles' });
	const fetchTranslations = async (languageId: number): Promise<Translation[]> => {
		try {
			const labels = await apiClient<{ id: number }[]>({
				method: 'GET',
				url: `/api/labels?languageId=${languageId}&prefix=${prefix}`,
			});
			const labelIds = labels.map(({ id }) => id).join(',');

			if (!labelIds) return [];
			return await apiClient<Translation[]>({
				method: 'GET',
				url: `/api/translation?languageId=${languageId}&labelIds=${labelIds}`,
			});
		} catch (error) {
			handleError(error, setError, setSuccessMessage);
			return [];
		}
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

	const resetTranslationValues = () => {
		const resetValues = languages.reduce((acc, language) => {
			acc[language.id] = '';
			return acc;
		}, {} as { [key: number]: string });
		setTranslationValues(resetValues);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!name.trim()) {
			setError('Naziv kategorije je obavezan.');
			return;
		}

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

			const translations = languages.map(language => ({
				labelId: newLabelId,
				languageId: language.id,
				translation: language.id === 1 ? name : translationValues[language.id] || '',
			}));

			console.log('Slanjem prevode:', translations);

			// Čuvanje prevoda
			await axios.post('/api/translation', { translations });

			// Čuvanje kategorije
			const { data: categoryData } = await axios.post('/api/categories', {
				parentIds,
				relatedIds,
				labelId: newLabelId,
				iconId,
				name,
			});

			console.log('Kategorija sačuvana sa podacima:', categoryData);

			if (!categoryData) throw new Error('Failed to create category');

			// Reset forme i ponovo učitajte podatke
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
		resetTranslationValues();
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
				languages={languages}
				translationValues={translationValues}
				setTranslationValues={setTranslationValues}
				onFileChange={handleFileChange}
				onSubmit={handleSubmit}
				setIsIconPickerOpen={setIsIconPickerOpen}
			/>
			<div className='mt-8'>
				{categories.length > 0 || loading ? (
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
				) : (
					<p className='text-center text-lg font-semibold text-gray-500 mt-4 p-4 bg-gray-100 rounded-md shadow-md'>
						Nema kategorija
					</p>
				)}
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
