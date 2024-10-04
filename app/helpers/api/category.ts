import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteData, getWithParams, postData, putData } from '@/app/helpers/api/common/base';
import { Category } from '@/utils/helpers/types';

const fetchCategories = async (prefix: string): Promise<Category[]> => {
	return await getWithParams(`/api/categories`, { prefix });
};

export const useCategories = (prefix: string) => {
	return useQuery({
		queryKey: ['categories', prefix],
		queryFn: () => fetchCategories(prefix),
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
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
