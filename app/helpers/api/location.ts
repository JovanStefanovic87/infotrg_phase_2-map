import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getWithParams, postData } from '@/app/helpers/api/common/base';

export const useFetchLocations = (params: any) => {
	return useQuery({
		queryKey: ['locations', params],
		queryFn: () => getWithParams('/api/locations', params),
		staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
		refetchOnWindowFocus: false,
	});
};

export const useCreateLocation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: any) => postData('/api/locations', data),
		onSuccess: () => {
			// Invalidira keš za lokacije i refetchuje podatke
			queryClient.invalidateQueries({ queryKey: ['locations'] });
		},
		onError: error => {
			console.error('Error creating location:', error);
		},
	});
};

export function useUpdateLocation() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, any>({
		mutationFn: async (data: any) => {
			const url = `/api/locations/${data.id}?type=${data.type}`;
			await postData(url, data);
		},
		onSuccess: (_, data) => {
			queryClient.invalidateQueries({ queryKey: ['locations'], exact: true });
		},
		onError: error => {
			console.error('Error updating location:', error);
		},
	});
}

export function useDeleteLocation() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, { id: number; type: string }>({
		mutationFn: async (data: { id: number; type: string }) => {
			const url = `/api/locations/${data.id}?type=${data.type}`;
			await postData(url, { action: 'delete' });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'], exact: true });
		},
		onError: error => {
			console.error('Error deleting location:', error);
		},
	});
}

export const useFetchLocationByIdAndLanguage = (id: number, type: string, languageId: number) => {
	return useQuery({
		queryKey: ['location', id, type, languageId],
		queryFn: () => getWithParams(`/api/locations/${id}`, { type, languageId }),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		enabled: Boolean(id && type && languageId),
	});
};

export const useFetchAllLocationsWithTranslations = (params: {
	prefix?: string;
	languageId?: number;
}) => {
	return useQuery({
		queryKey: ['allLocations', params],
		queryFn: () => getWithParams('/api/locationsByLanguage', params),
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
	});
};
