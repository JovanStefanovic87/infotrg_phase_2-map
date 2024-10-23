import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteData,
	getWithParams,
	getData,
	postDataMultipart,
	putData,
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
