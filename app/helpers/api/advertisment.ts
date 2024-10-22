import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteData,
	getWithParams,
	postDataMultipart,
	putData,
} from '@/app/helpers/api/common/base';
import { AdvertiseFormState } from '@/utils/helpers/types';

const createAdvertisment = async (advertismentData: FormData): Promise<AdvertiseFormState> => {
	return await postDataMultipart(`/api/advertisments`, advertismentData);
};

export const useCreateAdvertisment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['createAdvertisment'],
		mutationFn: (newAdvertisment: FormData) => createAdvertisment(newAdvertisment),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['advertisments'] });
		},
		onError: err => {
			console.error('Error in mutation:', err);
		},
	});
};
