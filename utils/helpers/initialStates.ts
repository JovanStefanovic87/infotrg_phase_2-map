import { RetailLocationData, RetailFormState, AdType, AdFormState } from './types';

export const retailLocationInit: RetailLocationData = {
	stateId: 3, // Change to 1 in production
	countyId: 0,
	cityId: null,
	latitude: 0.0,
	longitude: 0.0,
};

export const retailInit: RetailFormState = {
	name: '',
	phoneNumber: '',
	email: '',
	website: '',
	stateId: 1, // Change to 1 in production
	countyId: 1,
	cityId: 1,
	suburbId: 1,
	latitude: 0,
	longitude: 0,
	address: 'Somborski put 79',
	locationDescription: '',
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
		stateId: 3, // Change to 1 in production
		countyId: 1,
		cityId: 1,
		suburbId: 1,
		locationId: null,
		coordinatesId: null,
		address: '',
	},
	objectTypeCategories: [],
	articleCategories: [],
	activityCategories: [],
	image: null,
	viewCount: 0,
	suburb: null,
	city: null,
	state: null,
	id: 0,
	name: '',
	description: '',
	url: '',
	imageId: undefined,
	newImageFile: null,
	adType: 'NONE',
	stateId: 3,
	countyId: 1,
	cityId: 1,
	suburbId: 1,
	articleCategoryIds: [] as number[],
	activityCategoryIds: [] as number[],
	objectTypeCategoryIds: [] as number[],
	imageFile: undefined,
	validTo: new Date().toISOString(),
};
