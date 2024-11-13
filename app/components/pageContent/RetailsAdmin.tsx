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

	const { data: locations, isLoading: locationsLoading } = useFetchLocations({
		prefix: '',
		languageId: languageId,
	});
	const { data: articleCategories, isLoading: articleCategoriesLoading } =
		useCategoriesByPrefixAndLanguage({
			prefix: prefixAticleCategory,
			languageId: 1,
		});
	const { data: activityCategories, isLoading: activityCategoriesLoading } =
		useCategoriesByPrefixAndLanguage({
			prefix: prefixActivityCategory,
			languageId: 1,
		});
	const { data: objectTypeCategories, isLoading: objectTypeCategoriesLoading } =
		useCategoriesByPrefixAndLanguage({
			prefix: prefixObjectTypeCategory,
			languageId: 1,
		});
	const { data: retails, isLoading: retailsLoading } = useFetchRetailStores(languageId);

	React.useEffect(() => {
		const allDataLoaded = !(
			locationsLoading ||
			articleCategoriesLoading ||
			activityCategoriesLoading ||
			objectTypeCategoriesLoading ||
			retailsLoading
		);
		setLoading(!allDataLoaded);
	}, [
		locationsLoading,
		articleCategoriesLoading,
		activityCategoriesLoading,
		objectTypeCategoriesLoading,
		retailsLoading,
	]);

	const filteredCounties = formData.stateId
		? locations?.find((state: { id: number }) => state.id === formData.stateId)?.counties || []
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
	console.log('filteredCounties', filteredCounties);
	console.log('locations', locations);
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
				articleCategories={articleCategories || []}
				activityCategories={activityCategories || []}
				objectTypeCategories={objectTypeCategories || []}
				setFormData={setFormData}
				submitTrigger={submitTrigger}>
				<RetailStoreForm
					formData={formData}
					states={locations}
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
