import { RetailLocationData, RetailFormState, AdType, AdFormState } from './types';

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

export const adInit: AdFormState = {
	retailStore: {
		name: '',
		id: 0,
		phoneNumber: null,
		email: null,
		website: null,
		viewCount: 0,
		isPhoneConfirmed: false,
		isEmailConfirmed: false,
		createdAt: new Date(),
		updatedAt: new Date(),
		countryId: 0,
		cityId: 0,
		cityPartId: 0,
		marketplaceId: 0,
		locationId: null,
		coordinatesId: null,
	},
	objectTypeCategories: [], // Default to empty arrays or an appropriate initial state
	articleCategories: [],
	activityCategories: [],
	image: null, // or an appropriate initial image object
	viewCount: 0,
	marketplace: null, // or an appropriate initial state
	city: null, // or an appropriate initial state
	country: null, // or an appropriate initial state
	id: 0, // or any default value for id
	name: '',
	description: '',
	url: '',
	imageId: undefined,
	newImageFile: null,
	adType: 'NONE',
	countryId: 1,
	cityId: 1,
	cityPartId: 0,
	marketplaceId: 0,
	articleCategoryIds: [] as number[],
	activityCategoryIds: [] as number[],
	objectTypeCategoryIds: [] as number[],
	imageFile: undefined,
	validTo: new Date().toISOString(), // Initialize validTo with a default value
};
