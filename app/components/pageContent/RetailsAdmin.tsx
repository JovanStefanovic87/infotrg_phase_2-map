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
import DynamicPageContainer from '../containers/DynamicPageContainer';
import RetailStoreList from '../lists/RetailStoreList';
import NewRetailStoreForm from '../forms/NewRetailStoreForm'; // Nova komponenta

interface Props {
	title: string;
}

const RetailsAdmin: React.FC<Props> = ({ title }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [languageId, setLanguageId] = useState<number>(1);

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
			address: retail.location.address,
			latitude: retail.coordinates?.latitude ?? null,
			longitude: retail.coordinates?.longitude ?? null,
			viewCount: retail.viewCount,
			isSubscribedForAds: retail.isSubscribedForAds ?? false,
			adType: retail.adType ?? null,
			country: {
				id: retail.location.country.id,
				translation: retail.location.country.label.translations[0]?.translation || 'N/A',
			},
			city: {
				id: retail.location.city.id,
				translation: retail.location.city.label.translations[0]?.translation || 'N/A',
			},
			cityPart: retail.location.cityPart
				? {
						id: retail.location.cityPart.id,
						translation: retail.location.cityPart.label.translations[0]?.translation || 'N/A',
				  }
				: null,
			marketplace: retail.location.marketplace
				? {
						id: retail.location.marketplace.id,
						translation: retail.location.marketplace.label.translations[0]?.translation || 'N/A',
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

			{/* Dodajemo formu za unos novog retail store-a */}
			<div className='mt-8'>
				<NewRetailStoreForm
					successMessage={successMessage}
					setSuccessMessage={setSuccessMessage}
					setError={setError}
					loading={loading}
					setLoading={setLoading}
					error={error}
				/>
			</div>

			{/* Prikaz postojeće liste retail store-a */}
			<div className='mt-8'>
				<RetailStoreList
					setSuccessMessage={setSuccessMessage}
					setError={setError}
					retails={formattedRetails || []}
				/>
			</div>
		</DynamicPageContainer>
	);
};

export default RetailsAdmin;
