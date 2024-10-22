import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData } from '@/app/helpers/api/common/base';
import axios from 'axios';

interface FetchImagesParams {
	directory: string;
}

export const useFetchImages = (params: FetchImagesParams) => {
	return useQuery({
		queryKey: ['images', params],
		queryFn: () => getWithParams('/api/images', params),
		staleTime: 1000 * 60 * 5, // Set stale time to 5 minutes
		refetchOnWindowFocus: false, // Prevent refetching when window is focused
	});
};

interface UploadImageData {
	image: File;
	directory: string;
}

export const useUploadImages = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UploadImageData) => {
			const formData = new FormData();
			formData.append('image', data.image);
			formData.append('directory', data.directory);

			return axios.post('/api/images/', formData); // Use axios directly
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['images'] });
		},
		onError: error => {
			if (axios.isAxiosError(error)) {
				console.error('Error uploading image:', error.response?.data || error.message);
			} else {
				console.error('Error uploading image:', error.message);
			}
		},
	});
};
