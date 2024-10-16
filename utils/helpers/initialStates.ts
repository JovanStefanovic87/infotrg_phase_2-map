import { RetailLocationData, RetailAdmin, RetailFormState } from './types';

export const retailLocationInit: RetailLocationData = {
	countryId: 0,
	cityId: 0,
	cityPartId: null,
	latitude: 0.0,
	longitude: 0.0,
};

export const retailInit: RetailFormState = {
	name: '',
	phoneNumber: '',
	email: '',
	website: '',
	countryId: 0,
	cityId: 0,
	cityPartId: 0,
	marketplaceId: 0,
	latitude: 0,
	longitude: 0,
	articleCategoryIds: [] as number[],
	activityCategoryIds: [] as number[],
	objectTypeCategoryIds: [] as number[],
};
