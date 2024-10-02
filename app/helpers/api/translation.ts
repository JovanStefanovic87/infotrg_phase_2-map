import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from '@/app/helpers/api/common/base';

// Hook for fetching a single translation
interface FetchTranslationParams {
	labelId: number;
	languageId: number;
}

export const useFetchTranslation = (params: FetchTranslationParams) => {
	return useQuery({
		queryKey: ['translation', params],
		queryFn: () => getWithParams('/api/translation', params),
		staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
		refetchOnWindowFocus: false, // Prevent refetching when window is focused
	});
};

// Hook for creating new translations
interface CreateTranslationData {
	translations: {
		labelId: number;
		languageId: number;
		translation: string;
	}[];
}

export const useCreateTranslations = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateTranslationData) => {
			return postData('/api/translation', data); // Use POST to create new translations
		},
		onSuccess: () => {
			// Invalidate and refetch translations after creation
			queryClient.invalidateQueries({ queryKey: ['translations'] });
		},
		onError: error => {
			console.error('Error creating translations:', error);
		},
	});
};

// Hook for updating translations
interface UpdateTranslationData {
	translations: {
		translationId: number;
		languageId: number;
		translation: string;
	}[];
}

export const useUpdateTranslations = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateTranslationData) => {
			return postData('/api/translation/translations', data); // Use PUT to update translations
		},
		onSuccess: () => {
			// Invalidate and refetch translations after updating
			queryClient.invalidateQueries({ queryKey: ['translations'] });
		},
		onError: error => {
			console.error('Error updating translations:', error);
		},
	});
};
