import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from '@/app/helpers/api/common/base';

// Hook for fetching languages
export const useFetchLanguages = () => {
	return useQuery({
		queryKey: ['languages'],
		queryFn: () => getWithParams('/api/languages', {}), // Pass empty object for no query params
		staleTime: 1000 * 60 * 5, // Cache the data for 5 minutes
		refetchOnWindowFocus: false, // Prevent refetching when window is focused
	});
};

// Hook for creating a new language
interface CreateLanguageData {
	code: string;
	name: string;
}

export const useCreateLanguage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateLanguageData) => {
			return postData('/api/languages', data); // Use POST to create a new language
		},
		onSuccess: () => {
			// After a successful mutation, refetch the languages
			queryClient.invalidateQueries({ queryKey: ['languages'] });
		},
		onError: error => {
			console.error('Error creating language:', error);
		},
	});
};
