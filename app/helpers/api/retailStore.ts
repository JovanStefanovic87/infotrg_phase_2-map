'use client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { GetRetailStoreApi } from '@/utils/helpers/types';
import { postData, getWithParams, getWithParamsWithNull, deleteData, putData } from './common/base';

interface RetailStoreData {
	name: string;
	locationId?: number;
	newLocation?: {
		stateId: number;
		countyId: number;
		cityId?: number;
		suburbId?: number;
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
		},
		onError: error => {
			const errorMessage = error?.message || 'Došlo je do greške prilikom čuvanja.';
			console.error('Greška:', errorMessage);
		},
	});
};

const fetchRetailStores = async (languageId: number) => {
	const params = { languageId };
	const data = await getWithParams('/api/retailStores', params);
	return data;
};

export const useFetchRetailStores = (languageId: number) => {
	return useQuery<GetRetailStoreApi[]>({
		queryKey: ['retailStores', languageId],
		queryFn: () => fetchRetailStores(languageId),
		staleTime: 1000,
	});
};

interface RetailStoreUpdateData {
	name: string;
	locationId?: number;
	updatedLocation?: {
		stateId: number;
		countyId: number;
		cityId?: number;
		suburbId?: number;
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
	address?: string;
}

const updateRetailStore = async (id: string, data: RetailStoreUpdateData) => {
	const response = await putData(`/api/retailStores/${id}`, data);
	return response;
};

export const useUpdateRetailStore = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: RetailStoreUpdateData }) =>
			updateRetailStore(id, data),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['retailStores'] });
		},
		onError: error => {
			console.error('Error updating retail store:', error);
		},
	});
};

const deleteRetailStore = async (id: string) => {
	const response = await deleteData(`/api/retailStores/${id}`);
	return response;
};

export const useDeleteRetailStore = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteRetailStore(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['retailStores'] });
		},
		onError: error => {
			console.error('Error deleting retail store:', error);
		},
	});
};

interface FetchFilteredRetailStoresParams {
	categoryId?: number;
	stateId?: number;
	countyId?: number | null;
	cityId?: number | null;
	suburbId?: number | null;
	languageId?: number;
}

export const fetchFilteredRetailStores = async (params: FetchFilteredRetailStoresParams) => {
	const queryParams = new URLSearchParams();

	if (params.categoryId !== undefined && params.categoryId !== null) {
		queryParams.append('categoryId', params.categoryId.toString());
	}
	if (params.stateId !== undefined && params.stateId !== null) {
		queryParams.append('stateId', params.stateId.toString());
	}
	if (params.countyId !== undefined && params.countyId !== null) {
		queryParams.append('countyId', params.countyId.toString());
	}
	if (params.cityId !== undefined && params.cityId !== null) {
		queryParams.append('cityId', params.cityId.toString());
	}
	if (params.suburbId !== undefined && params.suburbId !== null) {
		queryParams.append('suburbId', params.suburbId.toString());
	}
	queryParams.append('languageId', (params.languageId || 1).toString());

	const response = await getWithParamsWithNull(
		`/api/filteredRetailStores?${queryParams.toString()}`
	);
	return response;
};

interface UseFetchFilteredRetailStoresParams {
	categoryId?: number;
	stateId?: number;
	countyId?: number | null;
	cityId?: number | null;
	suburbId?: number | null;
	languageId?: number;
}

export const useFetchFilteredRetailStores = (params: UseFetchFilteredRetailStoresParams) => {
	return useQuery<GetRetailStoreApi[]>({
		queryKey: ['filteredRetailStores', params],
		queryFn: () => fetchFilteredRetailStores(params),
		staleTime: 1000 * 60 * 5,
	});
};
