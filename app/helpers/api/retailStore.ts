'use client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { postData, getWithParams, deleteData, putData } from './common/base';

interface RetailStoreData {
	name: string;
	locationId?: number;
	newLocation?: {
		countryId: number;
		cityId: number;
		cityPartId?: number;
		marketplaceId?: number;
		address: string;
	};
	phoneNumber: string;
	email: string;
	website?: string;
	viewCount?: number;
	isSubscribedForAds?: boolean;
	adType?: string;
	isPhoneConfirmed?: boolean;
	isEmailConfirmed?: boolean;
	coordinates?: {
		latitude: number;
		longitude: number;
		locationDescription: string;
	};
	articleCategoryIds: number[];
	activityCategoryIds: number[];
	objectTypeCategoryIds: number[];
}

const postRetailStore = async (data: RetailStoreData) => {
	const response = await postData('/api/retailStores', data);
	return response;
};

export const useCreateRetailStore = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postRetailStore,
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['retailStores'] });
			console.log('Retail store successfully created:', data);
		},
		onError: error => {
			console.error('Error creating retail store:', error);
		},
	});
};

interface RetailStore {
	id: number;
	name: string;
	location: {
		country: {
			label: {
				translations: { translation: string }[];
			};
		};
		city: {
			label: {
				translations: { translation: string }[];
			};
		};
		cityPart: {
			label: {
				translations: { translation: string }[];
			};
		};
		marketplace?: {
			label: {
				translations: { translation: string }[];
			};
		};
	};
	articleCategories: {
		label: {
			translations: { translation: string }[];
		};
	}[];
	activityCategories: {
		label: {
			translations: { translation: string }[];
		};
	}[];
	objectTypeCategories: {
		label: {
			translations: { translation: string }[];
		};
	}[];
}

const fetchRetailStores = async (languageId: number) => {
	const params = { languageId };
	const data = await getWithParams('/api/retailStores', params);
	return data;
};

export const useFetchRetailStores = (languageId: number) => {
	return useQuery<RetailStore[]>({
		queryKey: ['retailStores', languageId],
		queryFn: () => fetchRetailStores(languageId),
		staleTime: 1000 * 60 * 5,
	});
};

interface RetailStoreUpdateData {
	name: string;
	locationId?: number;
	updatedLocation?: {
		countryId: number;
		cityId: number;
		cityPartId?: number;
		marketplaceId?: number;
		address: string;
	};
	phoneNumber: string;
	email: string;
	website?: string;
	viewCount?: number;
	isSubscribedForAds?: boolean;
	adType?: string;
	isPhoneConfirmed?: boolean;
	isEmailConfirmed?: boolean;
	coordinates?: {
		latitude: number;
		longitude: number;
		locationDescription: string;
	};
	articleCategoryIds: number[];
	activityCategoryIds: number[];
	objectTypeCategoryIds: number[];
}

const updateRetailStore = async (id: string, data: RetailStoreUpdateData) => {
	const response = await putData(`/api/retail-store/${id}`, data);
	return response;
};

export const useUpdateRetailStore = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: RetailStoreUpdateData }) =>
			updateRetailStore(id, data),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['retailStores'] });
			console.log('Retail store successfully updated:', data);
		},
		onError: error => {
			console.error('Error updating retail store:', error);
		},
	});
};

const deleteRetailStore = async (id: string) => {
	const response = await deleteData(`/api/retail-store/${id}`);
	return response;
};

export const useDeleteRetailStore = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteRetailStore(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['retailStores'] });
			console.log('Retail store deleted successfully');
		},
		onError: error => {
			console.error('Error deleting retail store:', error);
		},
	});
};
