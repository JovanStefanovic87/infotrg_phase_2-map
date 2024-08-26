import axios from 'axios';
import { Category, Language, Translation, Icon } from '@/utils/helpers/types';

// Fetch categories with optional id
export const fetchCategories = async (id?: number): Promise<Category[]> => {
	try {
		const url = id ? `/api/categories/${id}` : '/api/categories'; // Build the URL based on the presence of id
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};

// Fetch languages
export const fetchLanguages = async (): Promise<Language[]> => {
	try {
		const response = await axios.get('/api/languages');
		return response.data;
	} catch (error) {
		console.error('Failed to fetch languages:', error);
		throw error;
	}
};

// Fetch icons
export const fetchIcons = async (): Promise<Icon[]> => {
	try {
		const response = await axios.get('/api/icons');
		return response.data;
	} catch (error) {
		console.error('Failed to fetch icons:', error);
		throw error;
	}
};

// Fetch translations based on languageId
export const fetchTranslations = async (languageId: number): Promise<Translation[]> => {
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
	} catch (error) {
		console.error('Failed to fetch translations:', error);
		throw error;
	}
};
