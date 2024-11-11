import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWithParams } from '@/app/helpers/api/common/base';
import axios from 'axios';

interface FetchIconsParams {
	directory: string;
}
// Fetch icons based on directory parameter
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
// Upload a new icon and invalidate icon queries on success
export const useUploadIcon = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UploadIconData) => {
			const formData = new FormData();
			formData.append('icon', data.icon);
			formData.append('directory', data.directory);

			return axios.post('/api/icons', formData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['icons'] });
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				console.error('Error uploading icon:', error.response?.data || error.message);
			} else {
				console.error('Error uploading icon:', error.message);
			}
		},
	});
};
