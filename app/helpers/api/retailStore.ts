'use client';
import {
	useMutation,
	useQueryClient,
	useQuery,
	UseQueryOptions,
	UseQueryResult,
} from '@tanstack/react-query';
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
		},
		onError: error => {
			console.error('Error creating retail store:', error);
		},
	});
};

interface RetailStore {
	id: number;
	name: string;
	phoneNumber: string;
	email: string;
	website?: string;
	viewCount: number;
	isPhoneConfirmed: boolean;
	isEmailConfirmed: boolean;
	createdAt: string;
	updatedAt: string;

	// Direct top-level IDs
	countryId: number;
	cityId: number;
	cityPartId?: number | null;
	marketplaceId?: number | null;
	coordinatesId?: number | null;

	// Related entities as objects
	country: {
		id: number;
		label: {
			translations: { translation: string }[];
		};
	};
	city: {
		id: number;
		label: {
			translations: { translation: string }[];
		};
	};
	cityPart?: {
		id: number;
		label: {
			translations: { translation: string }[];
		};
	} | null;
	marketplace?: {
		id: number;
		label: {
			translations: { translation: string }[];
		};
	} | null;

	// Coordinates object
	coordinates?: {
		latitude: number;
		longitude: number;
	} | null;

	// Categories
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
	countryId?: number;
	cityId?: number;
	cityPartId?: number | null;
	marketplaceId?: number | null;
	languageId?: number;
}

export const fetchFilteredRetailStores = async (params: FetchFilteredRetailStoresParams) => {
	const queryParams = new URLSearchParams();

	if (params.categoryId) queryParams.append('categoryId', params.categoryId.toString());
	if (params.countryId) queryParams.append('countryId', params.countryId.toString());
	if (params.cityId) queryParams.append('cityId', params.cityId.toString());
	if (params.cityPartId) queryParams.append('cityPartId', params.cityPartId.toString());
	if (params.marketplaceId !== null && params.marketplaceId !== undefined) {
		queryParams.append('marketplaceId', params.marketplaceId.toString());
	}
	queryParams.append('languageId', (params.languageId || 1).toString());

	const response = await getWithParams(`/api/filteredRetailStores?${queryParams.toString()}`);
	return response;
};

interface UseFetchFilteredRetailStoresParams {
	categoryId?: number;
	countryId?: number;
	cityId?: number;
	cityPartId?: number | null;
	marketplaceId?: number | null;
	languageId?: number;
}

export const useFetchFilteredRetailStores = (params: UseFetchFilteredRetailStoresParams) => {
	return useQuery<RetailStore[]>({
		queryKey: ['filteredRetailStores', params],
		queryFn: () => fetchFilteredRetailStores(params),
		staleTime: 1000 * 60 * 5,
	});
};
