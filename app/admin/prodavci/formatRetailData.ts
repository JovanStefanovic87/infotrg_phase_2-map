import { RetailAdmin } from '@/utils/helpers/types';

// Function to format retail data
export const formatRetailData = (retails: any[]): RetailAdmin[] => {
	return retails.map(
		(retail: any): RetailAdmin => ({
			id: retail.id,
			name: retail.name,
			phoneNumber: retail.phoneNumber,
			email: retail.email,
			website: retail.website,
			address: retail.address ?? 'N/A',
			latitude: retail.coordinates?.latitude ?? null,
			longitude: retail.coordinates?.longitude ?? null,
			locationDescription: retail.coordinates?.locationDescription ?? '',
			viewCount: retail.viewCount,
			isSubscribedForAds: retail.isSubscribedForAds ?? false,
			adType: retail.adType ?? null,
			state: {
				id: retail.state.id,
				translation: retail.state.label.translations[0]?.translation || 'N/A',
			},
			county: retail.county
				? {
						id: retail.county.id,
						translation: retail.county.label.translations[0]?.translation || 'N/A',
				  }
				: null,
			city: retail.city
				? {
						id: retail.city.id,
						translation: retail.city.label.translations[0]?.translation || 'N/A',
				  }
				: null,
			suburb: retail.suburb
				? {
						id: retail.suburb.id,
						translation: retail.suburb.label.translations[0]?.translation || 'N/A',
				  }
				: null,
			articleCategories:
				retail.articleCategories?.map((category: any) => ({
					id: category.id,
					label: category.label.translations[0]?.translation || 'N/A',
					iconId: category.iconId ?? null,
				})) ?? [],
			activityCategories:
				retail.activityCategories?.map((category: any) => ({
					id: category.id,
					label: category.label.translations[0]?.translation || 'N/A',
					iconId: category.iconId ?? null,
				})) ?? [],
			objectTypeCategories:
				retail.objectTypeCategories?.map((category: any) => ({
					id: category.id,
					label: category.label.translations[0]?.translation || 'N/A',
					iconId: category.iconId ?? null,
				})) ?? [],
		})
	);
};
