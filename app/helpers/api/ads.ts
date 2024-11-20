import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteData,
	getWithParams,
	getData,
	postDataMultipart,
	patchData,
	putDataMultipart,
} from '@/app/helpers/api/common/base';
import { AdFormState } from '@/utils/helpers/types';

const createAd = async (adData: FormData): Promise<AdFormState> => {
	return await postDataMultipart(`/api/ads`, adData);
};

export const useCreateAd = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['createAd'],
		mutationFn: (newAd: FormData) => createAd(newAd),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ads'] });
		},
		onError: err => {
			console.error('Error in mutation:', err);
		},
	});
};

const fetchAds = async (): Promise<AdFormState[]> => {
	const response = await getData('/api/ads');
	if (!response || !Array.isArray(response)) {
		throw new Error('Invalid data received from API');
	}

	return response;
};

export const useFetchAds = () => {
	return useQuery<AdFormState[], Error>({
		queryKey: ['ads'],
		queryFn: fetchAds,
	});
};

const deleteAd = async (adId: number): Promise<void> => {
	await deleteData(`/api/ads/${adId}`);
};

export const useDeleteAd = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['deleteAd'],
		mutationFn: (adId: number) => deleteAd(adId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ads'] });
		},
		onError: err => {
			console.error('Error in delete mutation:', err);
		},
	});
};

const extendAd = async (adId: number, updatedData: { validTo: Date }): Promise<void> => {
	await patchData(`/api/ads/${adId}`, updatedData);
};

export const useExtendAd = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['extendAd'],
		mutationFn: ({ adId, updatedData }: { adId: number; updatedData: { validTo: Date } }) =>
			extendAd(adId, updatedData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ads'] });
		},
		onError: err => {
			console.error('Error in extend mutation:', err);
		},
	});
};

const updateAd = async (adId: number, adData: FormData): Promise<AdFormState> => {
	return await putDataMultipart(`/api/ads/${adId}`, adData);
};

export const useUpdateAd = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['updateAd'],
		mutationFn: ({ adId, adData }: { adId: number; adData: FormData }) => updateAd(adId, adData),

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['ads'] });
		},
		onError: err => {
			console.error('Error in update mutation:', err);
		},
	});
};
