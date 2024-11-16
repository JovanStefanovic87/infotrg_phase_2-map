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
import { formatRetailData } from '@/app/admin/prodavci/formatRetailData';
import { useCreateRetailStore, useFetchRetailStores } from '@/app/helpers/api/retailStore';
import { Location, Category, RetailAdmin } from '@/utils/helpers/types';

interface Props {
	title: string;
	initialData: {
		locations: Location[];
		articleCategories: Category[];
		activityCategories: Category[];
		objectTypeCategories: Category[];
		retails: RetailAdmin[];
	};
}

const RetailsAdmin: React.FC<Props> = ({ title, initialData }) => {
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [formData, setFormData] = useState(retailInit);
	const [languageId, setLanguageId] = useState<number>(1);
	const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);
	const mutation = useCreateRetailStore();

	const {
		locations: initialLocations,
		articleCategories: initialArticleCategories,
		activityCategories: initialActivityCategories,
		objectTypeCategories: initialObjectTypeCategories,
		retails: initialRetails,
	} = initialData;

	const fetchedLocations =
		useFetchLocations({
			prefix: '',
			languageId: 1,
		}).data || initialLocations;

	const articleCategories =
		useCategoriesByPrefixAndLanguage({
			prefix: prefixAticleCategory,
			languageId: 1,
		}).data || initialArticleCategories;

	const activityCategories =
		useCategoriesByPrefixAndLanguage({
			prefix: prefixActivityCategory,
			languageId: 1,
		}).data || initialActivityCategories;

	const objectTypeCategories =
		useCategoriesByPrefixAndLanguage({
			prefix: prefixObjectTypeCategory,
			languageId: 1,
		}).data || initialObjectTypeCategories;

	const retails = useFetchRetailStores(1).data || initialRetails;

	const filteredCounties = formData.stateId
		? fetchedLocations?.find((state: { id: number }) => state.id === formData.stateId)?.counties ||
		  []
		: [];

	const filteredCities = formData.countyId
		? filteredCounties.find((county: { id: number }) => county.id === formData.countyId)?.cities ||
		  []
		: [];

	const filteredSuburbs = formData.cityId
		? filteredCities.find((city: { id: number }) => city.id === formData.cityId)?.suburbs || []
		: [];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newRetailStore = {
			name: formData.name,
			phoneNumber: formData.phoneNumber,
			email: formData.email,
			website: formData.website,
			stateId: formData.stateId,
			countyId: formData.countyId,
			cityId: formData.cityId || null,
			suburbId: formData.suburbId || null,
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
	// Format fetched retail stores for display

	const formattedRetails = retails ? formatRetailData(retails) : [];

	return (
		<DynamicPageContainer
			clearSuccess={() => setSuccessMessage(null)}
			successMessage={successMessage}
			error={error}
			clearError={() => setError('')}
			loading={loading}
			title={title}>
			<CollapsibleFormContainer
				articleCategories={initialArticleCategories || []}
				activityCategories={initialActivityCategories || []}
				objectTypeCategories={initialObjectTypeCategories || []}
				setFormData={setFormData}
				submitTrigger={submitTrigger}>
				<RetailStoreForm
					formData={formData}
					states={fetchedLocations}
					handleChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
					handleSelectChange={e =>
						setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
					}
					loading={loading}
					filteredCounties={filteredCounties}
					filteredCities={filteredCities}
					filteredSuburbs={filteredSuburbs}
					successMessage={successMessage}
					handleSubmit={handleSubmit}
					mutation={undefined}
				/>
				{error && (
					<div className='mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded'>
						{error}
					</div>
				)}
			</CollapsibleFormContainer>
			<div className='mt-8'>
				<h2 className='text-2xl md:text-3xl font-semibold uppercase text-center pb-4 text-black'>
					Lista prodajnih objekata
				</h2>
				<RetailStoreList
					setSuccessMessage={setSuccessMessage}
					setError={setError}
					retails={formattedRetails || []}
					articleCategories={articleCategories || []}
					activityCategories={activityCategories || []}
					objectTypeCategories={objectTypeCategories || []}
					locations={fetchedLocations}
				/>
			</div>
		</DynamicPageContainer>
	);
};

export default RetailsAdmin;
