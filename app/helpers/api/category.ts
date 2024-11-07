import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteData,
	getWithParams,
	postData,
	putData,
	getWithParamsWithNull,
} from '@/app/helpers/api/common/base';
import { Category } from '@/utils/helpers/types';

export const fetchCategoriesByPrefixAndLanguage = async (prefix: string, languageId: number) => {
	const response = await fetch(
		`/api/categoriesByLanguage?prefix=${prefix}&languageId=${languageId}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch categories');
	}
	return response.json();
};

interface UseCategoriesParams {
	prefix: string;
	languageId: number;
}

export const useCategoriesByPrefixAndLanguage = ({ prefix, languageId }: UseCategoriesParams) => {
	return useQuery({
		queryKey: ['categories', prefix, languageId], // Unique key for the query
		queryFn: () => fetchCategoriesByPrefixAndLanguage(prefix, languageId),
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	});
};

const fetchCategories = async (prefix: string): Promise<Category[]> => {
	return await getWithParams(`/api/categories`, { prefix });
};

export const useCategories = (prefix: string) => {
	return useQuery({
		queryKey: ['categories', prefix],
		queryFn: () => fetchCategories(prefix),
		staleTime: 1000 * 60 * 5,
	});
};

interface CreateCategoryData {
	parentIds?: number[];
	labelId: number;
	iconId?: number;
	relatedIds?: number[];
}

const createCategory = async (categoryData: CreateCategoryData): Promise<Category> => {
	return await postData('/api/categories', categoryData);
};

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newCategory: CreateCategoryData) => createCategory(newCategory),
		onSuccess: () => {
			// Invalidate and refetch the category data after a new category is created
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
	});
};

interface UpdateCategoryData {
	id: number;
	parentIds?: number[];
	labelId: number;
	iconId?: number;
	relatedIds?: number[];
	translations: {
		translationId?: number;
		languageId: number;
		translation: string;
		description?: string;
		synonyms?: string[];
	}[];
}

const updateCategory = async (categoryData: UpdateCategoryData): Promise<Category> => {
	return await putData(`/api/categories/${categoryData.id}`, categoryData);
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (updatedCategory: UpdateCategoryData) => updateCategory(updatedCategory),
		onSuccess: () => {
			// Invalidate and refetch the category data after updating
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
	});
};

export const useFetchCategory = (id: number) => {
	return useQuery({
		queryKey: ['category', id],
		queryFn: () => getWithParams(`/api/categories/${id}`),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
};

const deleteCategoryById = async (id: number) => {
	return await deleteData(`/api/categories/${id}`);
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => deleteCategoryById(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
	});
};

export const useFetchCategoryById = (id: number) => {
	return useQuery({
		queryKey: ['category', id],
		queryFn: () => getWithParamsWithNull(`/api/categories/${id}`),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
};

interface FetchCategoryByIdAndLanguageParams {
	id: number;
	languageId: number;
}

// Funkcija za učitavanje kategorije na osnovu categoryId i languageId
const fetchCategoryByIdAndLanguage = async ({
	id,
	languageId,
}: FetchCategoryByIdAndLanguageParams): Promise<Category> => {
	const response = await getWithParams(`/api/categoryByIdAndLanguageId/${id}`, { languageId });
	if (!response) {
		throw new Error('Failed to fetch category');
	}
	return response;
};

export const useFetchCategoryByIdAndLanguage = (id: number, languageId: number) => {
	return useQuery({
		queryKey: ['category', id, languageId],
		queryFn: () => fetchCategoryByIdAndLanguage({ id, languageId }),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
};
