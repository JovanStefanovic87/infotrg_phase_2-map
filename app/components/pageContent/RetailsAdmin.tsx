'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFetchRetailStores } from '@/app/helpers/api/retailStore';
import {
	CurrentIcon,
	Icon,
	Language,
	AdType,
	RetailAdmin,
	RetailLocationData,
	Location,
} from '@/utils/helpers/types';
import {
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';
import DynamicPageContainer from '../containers/DynamicPageContainer';
import RetailStoreList from '../lists/RetailStoreList';
import CollapsibleFormContainer from '../forms/CollapsibleFormContainer';
import { useFetchLocations } from '@/app/helpers/api/location';
import { useCategoriesByPrefixAndLanguage } from '@/app/helpers/api/category';

interface Props {
	title: string;
}

const RetailsAdmin: React.FC<Props> = ({ title }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [languageId, setLanguageId] = useState<number>(1);

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

	const { data: retails, isLoading, isError } = useFetchRetailStores(languageId);

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading]);

	const formattedRetails = retails?.map(
		(retail: any): RetailAdmin => ({
			id: retail.id,
			name: retail.name,
			phoneNumber: retail.phoneNumber,
			email: retail.email,
			website: retail.website,
			// Direktno koristiš `address` iz `RetailStore`
			address: retail.address ?? 'N/A',
			latitude: retail.coordinates?.latitude ?? null,
			longitude: retail.coordinates?.longitude ?? null,
			viewCount: retail.viewCount,
			isSubscribedForAds: retail.isSubscribedForAds ?? false,
			adType: retail.adType ?? null,
			// Koristi direktno `country`, `city`, `cityPart`, i `marketplace`
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
			{isError && <p>Error fetching retail stores.</p>}

			<div className='mt-8'>
				<CollapsibleFormContainer
					successMessage={successMessage}
					setSuccessMessage={setSuccessMessage}
					setError={setError}
					loading={loading}
					setLoading={setLoading}
					articleCategories={articleCategories || []}
					activityCategories={activityCategories || []}
					objectTypeCategories={objectTypeCategories || []}
					locations={locations || []}
					formData={undefined}
					setFormData={function (value: any): void {
						throw new Error('Function not implemented.');
					}}
				/>
			</div>

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
