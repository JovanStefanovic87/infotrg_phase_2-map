import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from '@/app/helpers/api/common/base';

export const useFetchCategories = (prefix: string) => {
	return useQuery({
		queryKey: ['categories', prefix],
		queryFn: () => getWithParams(`/api/categories`, { prefix }),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
};

interface CreateCategoryData {
	parentIds: number[];
	labelId: number;
	iconId?: number;
	relatedIds?: number[];
}

export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCategoryData) => {
			return postData('/api/categories', data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: error => {
			console.error('Error creating category:', error);
		},
	});
};

interface UpdateCategoryData {
	id: number;
	parentIds: number[];
	labelId: number;
	iconId?: number;
	relatedIds?: number[];
	translations: {
		translationId: number;
		languageId: number;
		translation: string;
		description?: string;
		synonyms?: string[];
	}[];
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateCategoryData) => {
			return postData(`/api/categories/${data.id}`, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
		onError: error => {
			console.error('Error updating category:', error);
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

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, { id: number }>({
		mutationFn: async (data: { id: number }) => {
			const url = `/api/categories/${data.id}`;
			await postData(url, { action: 'delete' });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'], exact: true });
		},
		onError: error => {
			console.error('Error deleting category:', error);
		},
	});
};

interface UpdateCategoryByIdData {
	id: number;
	parentIds: number[];
	relatedIds: number[];
	labelId: number;
	iconId?: number;
	translations: {
		translationId: number;
		languageId: number;
		translation: string;
		description?: string;
		synonyms?: string[];
	}[];
}

export const useUpdateCategoryById = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, any>({
		mutationFn: async (data: any) => {
			const url = `/api/categories/${data.id}`;
			await postData(url, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'], exact: true });
		},
		onError: error => {
			console.error('Error updating category:', error);
		},
	});
};
