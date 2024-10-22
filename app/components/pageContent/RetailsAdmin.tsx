'use client';
import React, { useState } from 'react';
import { useFetchLocations } from '@/app/helpers/api/location';
import {
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';
import { useCategoriesByPrefixAndLanguage } from '@/app/helpers/api/category';
import DynamicPageContainer from '../containers/DynamicPageContainer';
import CollapsibleFormContainer from '../forms/CollapsibleFormContainer';
import RetailStoreForm from '../forms/RetailStoreForm';
import { retailInit } from '@/utils/helpers/initialStates';
import RetailStoreList from '../lists/RetailStoreList';
import { RetailAdmin } from '@/utils/helpers/types';
import { useCreateRetailStore, useFetchRetailStores } from '@/app/helpers/api/retailStore';

interface Props {
	title: string;
}

const RetailsAdmin: React.FC<Props> = ({ title }) => {
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState(retailInit);
	const [languageId, setLanguageId] = useState<number>(1);
	const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
	const mutation = useCreateRetailStore();

	const { data: locations } = useFetchLocations({
		prefix: '',
		languageId: languageId,
	});

	const { data: articleCategories } = useCategoriesByPrefixAndLanguage({
		prefix: prefixAticleCategory,
		languageId: 1,
	});

	const { data: activityCategories } = useCategoriesByPrefixAndLanguage({
		prefix: prefixActivityCategory,
		languageId: 1,
	});

	const { data: objectTypeCategories } = useCategoriesByPrefixAndLanguage({
		prefix: prefixObjectTypeCategory,
		languageId: 1,
	});

	const { data: retails } = useFetchRetailStores(languageId);

	// Logika za filtriranje gradova, delova grada i tržnih centara na osnovu odabira
	const filteredCities = formData.countryId
		? locations?.find((country: { id: number }) => country.id === formData.countryId)?.cities || []
		: [];

	const filteredCityParts = formData.cityId
		? filteredCities.find((city: { id: number }) => city.id === formData.cityId)?.cityParts || []
		: [];

	const filteredMarketplaces = formData.cityPartId
		? filteredCityParts.find((cityPart: { id: number }) => cityPart.id === formData.cityPartId)
				?.marketplaces || []
		: [];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newRetailStore = {
			name: formData.name,
			phoneNumber: formData.phoneNumber,
			email: formData.email,
			website: formData.website,
			countryId: formData.countryId,
			cityId: formData.cityId,
			cityPartId: formData.cityPartId || null,
			marketplaceId: formData.marketplaceId || null,
			coordinates: {
				latitude: parseFloat(formData.latitude.toString()),
				longitude: parseFloat(formData.longitude.toString()),
				locationDescription: 'Some location description',
			},
			articleCategoryIds: formData.articleCategoryIds,
			activityCategoryIds: formData.activityCategoryIds,
			objectTypeCategoryIds: formData.objectTypeCategoryIds,
		};

		mutation.mutate(newRetailStore, {
			onSuccess: () => {
				setSuccessMessage('Retail store created successfully!');
				setFormData(retailInit);
				setSubmitTrigger(prev => !prev);
			},
			onError: (error: any) => {
				setError(error?.message || 'Došlo je do greške prilikom čuvanja.');
			},
		});
	};

	const formattedRetails = retails?.map(
		(retail: any): RetailAdmin => ({
			id: retail.id,
			name: retail.name,
			phoneNumber: retail.phoneNumber,
			email: retail.email,
			website: retail.website,
			address: retail.address ?? 'N/A',
			latitude: retail.coordinates?.latitude ?? null,
			longitude: retail.coordinates?.longitude ?? null,
			viewCount: retail.viewCount,
			isSubscribedForAds: retail.isSubscribedForAds ?? false,
			adType: retail.adType ?? null,
			country: {
				id: retail.country.id,
				translation: retail.country.label.translations[0]?.translation || 'N/A',
			},
			city: {
				id: retail.city.id,
				translation: retail.city.label.translations[0]?.translation || 'N/A',
			},
			cityPart: retail.cityPart
				? {
						id: retail.cityPart.id,
						translation: retail.cityPart.label.translations[0]?.translation || 'N/A',
				  }
				: null,
			marketplace: retail.marketplace
				? {
						id: retail.marketplace.id,
						translation: retail.marketplace.label.translations[0]?.translation || 'N/A',
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

	return (
		<DynamicPageContainer
			clearSuccess={() => setSuccessMessage(null)}
			successMessage={successMessage}
			error={error}
			clearError={() => setError('')}
			loading={loading}
			title={title}>
			{/* CollapsibleFormContainer */}
			<CollapsibleFormContainer
				articleCategories={articleCategories || []}
				activityCategories={activityCategories || []}
				objectTypeCategories={objectTypeCategories || []}
				setFormData={setFormData}
				submitTrigger={submitTrigger}>
				<RetailStoreForm
					formData={formData}
					locations={locations}
					handleChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
					handleSelectChange={e =>
						setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
					}
					loading={loading}
					filteredCities={filteredCities}
					filteredCityParts={filteredCityParts}
					filteredMarketplaces={filteredMarketplaces}
					successMessage={successMessage}
					handleSubmit={handleSubmit}
					mutation={undefined}
				/>
			</CollapsibleFormContainer>
			<div className='mt-8'>
				<h2 className='text-2xl md:text-3xl font-semibold uppercase text-center pb-4'>
					Lista prodajnih objekata
				</h2>
				<RetailStoreList
					setSuccessMessage={setSuccessMessage}
					setError={setError}
					retails={formattedRetails || []}
					articleCategories={articleCategories || []}
					activityCategories={activityCategories || []}
					objectTypeCategories={objectTypeCategories || []}
					locations={locations}
				/>
			</div>
		</DynamicPageContainer>
	);
};

export default RetailsAdmin;
