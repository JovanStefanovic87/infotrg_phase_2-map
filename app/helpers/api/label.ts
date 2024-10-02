import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postData, getWithParams } from '@/app/helpers/api/common/base';

interface FetchLabelsParams {
	languageId: number;
	prefix?: string;
}

export const useFetchLabels = (params: FetchLabelsParams) => {
	return useQuery({
		queryKey: ['labels', params],
		queryFn: () => getWithParams('/api/labels', params),
		staleTime: 1000 * 60 * 5, // Set stale time to 5 minutes
		refetchOnWindowFocus: false, // Prevent refetching when window is focused
	});
};

interface CreateLabelData {
	name: string;
	prefix: string;
}

export const useCreateLabel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateLabelData) => postData('/api/labels', data),
		onSuccess: () => {
			// Invalidate and refetch labels after successful mutation
			queryClient.invalidateQueries({ queryKey: ['labels'] });
		},
		onError: error => {
			console.error('Error creating label:', error);
		},
	});
};
