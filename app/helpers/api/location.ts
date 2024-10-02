import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getWithParams, postData } from '@/app/helpers/api/common/base';

// Example for fetching locations
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
			const url = `/api/locations/${data.id}?type=${data.type}`; // Prilagođeno za update sa ID-jem i tipom
			await postData(url, data);
		},
		onSuccess: (_, data) => {
			queryClient.invalidateQueries({ queryKey: ['locations'], exact: true }); // Osvježavanje liste lokacija
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
			await postData(url, { action: 'delete' }); // Koristimo 'action' da naznačimo brisanje
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'], exact: true }); // Osvježavanje liste lokacija
		},
		onError: error => {
			console.error('Error deleting location:', error);
		},
	});
}
