import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from '@/app/helpers/api/common/base';

interface FetchIconsParams {
	directory: string;
}

export const useFetchIcons = (params: FetchIconsParams) => {
	return useQuery({
		queryKey: ['icons', params],
		queryFn: () => getWithParams('/api/icons', params),
		staleTime: 1000 * 60 * 5, // Set stale time to 5 minutes
		refetchOnWindowFocus: false, // Prevent refetching when window is focused
	});
};

interface UploadIconData {
	icon: File;
	directory: string;
}

export const useUploadIcon = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UploadIconData) => {
			const formData = new FormData();
			formData.append('icon', data.icon);
			formData.append('directory', data.directory);

			// Uklonili smo ručno postavljanje Content-Type zaglavlja
			return postData('/api/icons', formData);
		},
		onSuccess: () => {
			// Invalidate and refetch icons after successful upload
			queryClient.invalidateQueries({ queryKey: ['icons'] });
		},
		onError: error => {
			console.error('Error uploading icon:', error);
		},
	});
};
