'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import CategoryList from '../lists/CategoryList';
import {
	CategoryWithTranslations,
	Language,
	TranslationSimple,
	Icon,
	CurrentIcon,
} from '@/utils/helpers/types';
import NewCategoryForm from '../forms/NewCategoryForm';
import apiClient from '@/utils/helpers/apiClient';
import ImagePickerForm from '../forms/ImagePickerForm';
import DynamicPageContainer from '../containers/DynamicPageContainer';
import { handleError } from '@/utils/helpers/universalFunctions';

interface Props {
	prefix: string;
	title: string;
	initialData?: {
		categories: CategoryWithTranslations[];
		languages: Language[];
		icons: Icon[];
	};
}

const CategoriesAdmin: React.FC<Props> = ({ prefix, title, initialData }) => {
	const [parentIds, setParentIds] = useState<number[]>([]);
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [categories, setCategories] = useState<CategoryWithTranslations[]>(
		initialData?.categories || []
	);
	const [languages, setLanguages] = useState<Language[]>(initialData?.languages || []);
	const [translations, setTranslations] = useState<TranslationSimple[]>([]);
	const [icons, setIcons] = useState<Icon[]>(initialData?.icons || []);
	const [icon, setIcon] = useState<File | null>(null);
	const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
	const [relatedIds, setRelatedIds] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(!initialData);
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});
	const [currentIcon, setCurrentIcon] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [translationValues, setTranslationValues] = useState<{
		[key: number]: string;
	}>({});
	const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
	const [manuallyExpandedCategories, setManuallyExpandedCategories] = useState<Set<number>>(
		new Set()
	);
	const [filteredCategories, setFilteredCategories] = useState<CategoryWithTranslations[]>(
		initialData?.categories || []
	);
	const [initialExpandedCategories, setInitialExpandedCategories] = useState<Set<number>>(
		new Set()
	);

	const toggleCategoryExpansion = (id: number) => {
		setManuallyExpandedCategories(prev => {
			const updated = new Set(prev);
			if (updated.has(id)) {
				updated.delete(id);
			} else {
				updated.add(id);
			}
			return updated;
		});
	};

	const isCategoryExpanded = (id: number) => {
		return expandedCategories.has(id) || manuallyExpandedCategories.has(id);
	};

	const updateExpandedCategories = useCallback(() => {
		const expanded = new Set<number>();

		// Dodaj sve kategorije koje su ručno proširene
		manuallyExpandedCategories.forEach(id => expanded.add(id));

		// Dodaj inicijalno proširene kategorije (ako je potrebno)
		initialExpandedCategories.forEach(id => expanded.add(id));

		setExpandedCategories(expanded);
	}, [manuallyExpandedCategories, initialExpandedCategories]);

	useEffect(() => {
		updateExpandedCategories();
	}, [updateExpandedCategories]);

	const fetchCategories = () =>
		apiClient<CategoryWithTranslations[]>({
			method: 'GET',
			url: `/api/categories?prefix=${prefix}`,
		});

	const refetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [categoriesData] = await Promise.all([fetchCategories()]);

			const sortedCategories = sortCategories(categoriesData);
			setCategories(sortedCategories);
			setFilteredCategories(sortedCategories);
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
		} finally {
			setLoading(false);
		}
	}, [languageId]);

	useEffect(() => {
		if (!initialData) {
			refetchData();
		} else {
			const sortedCategories = sortCategories(initialData.categories || []);
			setFilteredCategories(sortedCategories);
			setCategories(sortedCategories);
		}
	}, [refetchData, initialData]);

	/* useEffect(() => {
		const fetchLanguagesData = async () => {
			try {
				const data = await fetchLanguages();
				setLanguages(data);
			} catch (err) {
				handleError(err, setError, setSuccessMessage);
			}
		};
		fetchLanguagesData();
	}, []); */

	/* useEffect(() => {
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
	}, [languageId]); */

	const resetTranslationValues = () => {
		const resetValues = languages.reduce((acc, language) => {
			acc[language.id] = ''; // Reset every language translation to an empty string
			return acc;
		}, {} as { [key: number]: string });
		setTranslationValues(resetValues);
	};

	const getLeafCategoryIds = (parentIds: number[], categories: CategoryWithTranslations[]) => {
		// Mapirajte parentIds u odgovarajuće kategorije
		const mappedCategories = mapParentIdsToCategories(parentIds, categories);

		// Filtrirajte samo leaf kategorije (one koje nemaju children)
		return mappedCategories
			.filter(category => category.children.length === 0)
			.map(category => category.id); // Vratite ID-ove leaf kategorija
	};

	const handleCategorySelection = (selectedCategoryIds: number[]) => {
		// Proverite da li su ID-ovi već prisutni
		setParentIds(prev => [...new Set([...prev, ...selectedCategoryIds])]);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!name.trim()) {
			setError('Naziv kategorije je obavezan.');
			return;
		}

		if (!currentIcon.iconId && !icon) {
			setError('Morate izabrati postojeću ikonu ili dodati novu ikonu za upload.');
			return;
		}

		try {
			let iconId = currentIcon.iconId;
			if (icon) {
				const formData = new FormData();
				formData.append('icon', icon, icon.name);
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

			await axios.post('/api/translation', { translations });

			await axios.post('/api/categories', {
				parentIds,
				relatedIds,
				labelId: newLabelId,
				iconId,
				name,
			});

			resetForm();
			setSuccessMessage('Kategorija uspešno sačuvana.');
			if (fileUploadButtonRef.current.resetFileName) fileUploadButtonRef.current.resetFileName();
			await refetchData();
		} catch (err) {
			handleError(err, setError, setSuccessMessage);
		}
	};

	const handleFileChange = (file: File | null) => setIcon(file);

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

	const memoizedSetInitialExpandedCategories = useCallback(
		(newSet: React.SetStateAction<Set<number>>) => {
			setInitialExpandedCategories(newSet);
		},
		[]
	);

	const mapParentIdsToCategories = (
		parentIds: number[],
		categories: CategoryWithTranslations[]
	): CategoryWithTranslations[] => {
		// Koristimo Set da uklonimo duplikate iz parentIds
		const uniqueParentIds = Array.from(new Set(parentIds));

		return uniqueParentIds
			.map(parentId => categories.find(category => category.id === parentId))
			.filter((category): category is CategoryWithTranslations => !!category);
	};

	const generateTranslationOptions = (
		categories: CategoryWithTranslations[],
		languageId: number
	): TranslationSimple[] => {
		const options: TranslationSimple[] = [];

		const traverseCategories = (categories: CategoryWithTranslations[], parentPrefix = '') => {
			categories.forEach(category => {
				const translation = category.translations.find(t => t.languageId === languageId);
				options.push({
					labelId: category.labelId,
					name: `${parentPrefix}${translation?.name || category.name}`,
					languageId: languageId,
					caegoryId: category.id,
				});
				if (category.children && category.children.length > 0) {
					traverseCategories(
						category.children as CategoryWithTranslations[],
						`${parentPrefix}${translation?.name || category.name} > `
					);
				}
			});
		};

		traverseCategories(categories);
		return options;
	};

	const translationOptions = generateTranslationOptions(categories, 1);

	const sortCategories = (categories: CategoryWithTranslations[]): CategoryWithTranslations[] => {
		return categories
			.map(category => ({
				...category,
				children: sortCategories(category.children as CategoryWithTranslations[]),
			}))
			.sort((a, b) => a.name.localeCompare(b.name, 'sr', { sensitivity: 'base' }));
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
				translationOptions={translationOptions}
				languages={languages}
				translationValues={translationValues}
				setTranslationValues={setTranslationValues}
				onFileChange={handleFileChange}
				onSubmit={handleSubmit}
				setIsIconPickerOpen={setIsIconPickerOpen}
				categories={categories}
				handleCategorySelection={handleCategorySelection}
			/>
			<div className='mt-8'>
				{categories.length > 0 || loading ? (
					<CategoryList
						categories={categories}
						icons={icons}
						setIcons={setIcons}
						currentIcon={currentIcon}
						setCurrentIcon={setCurrentIcon}
						languages={languages}
						languageId={languageId}
						refetchCategories={refetchData}
						expandedCategories={expandedCategories}
						setExpandedCategories={setExpandedCategories}
						manuallyExpandedCategories={manuallyExpandedCategories}
						setManuallyExpandedCategories={setManuallyExpandedCategories}
						initialExpandedCategories={initialExpandedCategories}
						setInitialExpandedCategories={memoizedSetInitialExpandedCategories}
						onDeleteCategory={handleDeleteCategory}
						setError={setError}
						setSuccessMessage={setSuccessMessage}
						setLoading={setLoading}
						setIsIconPickerOpen={setIsIconPickerOpen}
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
