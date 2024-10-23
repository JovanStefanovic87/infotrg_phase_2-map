'use client';
import React, { useEffect, useState } from 'react';
import {
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';
import DynamicPageContainer from '../containers/DynamicPageContainer';
import CollapsibleFormContainer from '../forms/CollapsibleFormContainer';
import { useFetchLocations } from '@/app/helpers/api/location';
import { useCategoriesByPrefixAndLanguage } from '@/app/helpers/api/category';
import { useFetchRetailStores } from '@/app/helpers/api/retailStore';
import { adInit } from '@/utils/helpers/initialStates';
import { useFetchImages, useUploadImages } from '@/app/helpers/api/images';
import { useCreateAd, useFetchAds } from '@/app/helpers/api/ads';
import AdForm from '../forms/AdForm';
import AdsList from '../lists/AdsList';
import { AdFormState } from '@/utils/helpers/types';

interface Props {
	title: string;
}

const AdsAdmin: React.FC<Props> = ({ title }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [languageId, setLanguageId] = useState<number>(1);
	const [formData, setFormData] = useState(adInit);
	const [submitTrigger, setSubmitTrigger] = useState<boolean>(false);

	const { mutate: createAd } = useCreateAd();
	const { mutate: uploadImage } = useUploadImages();

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
	const { data: imagesData } = useFetchImages({
		directory: 'advertisments',
	});

	const { data: ads } = useFetchAds();

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

	const handleAdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setFormData((prev: AdFormState) => ({
			...prev,
			adType: value, // Ensure that value is treated as a string
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccessMessage(null);

		try {
			let imageId = formData.imageId;
			if (formData.newImageFile) {
				const imageUploadData = {
					image: formData.newImageFile,
					directory: 'advertisments',
				};

				await new Promise<void>((resolve, reject) => {
					uploadImage(imageUploadData, {
						onSuccess: (response: any) => {
							imageId = response?.data?.imageId;

							if (imageId) {
								resolve();
							} else {
								setError('Image upload failed. No ID returned.');
								setLoading(false);
								reject();
							}
						},
						onError: (err: any) => {
							setError('Failed to upload image');
							setLoading(false);
							console.error('Image upload error:', err);
							reject();
						},
					});
				});
			}

			// Sada kreiramo reklamu koristeći dobijeni ili postojeći imageId
			const formDataToSend = new FormData();

			formDataToSend.append('name', formData.name);
			formDataToSend.append('adType', formData.adType);
			formDataToSend.append('url', formData.url);
			formDataToSend.append('countryId', formData.countryId.toString());
			formDataToSend.append('cityId', formData.cityId.toString());

			if (formData.cityPartId) formDataToSend.append('cityPartId', formData.cityPartId.toString());
			if (formData.marketplaceId)
				formDataToSend.append('marketplaceId', formData.marketplaceId.toString());
			if (formData.retailStoreId)
				formDataToSend.append('retailStoreId', formData.retailStoreId.toString());

			formDataToSend.append(
				'articleCategoryIds',
				JSON.stringify(formData.articleCategoryIds || [])
			);
			formDataToSend.append(
				'activityCategoryIds',
				JSON.stringify(formData.activityCategoryIds || [])
			);
			formDataToSend.append(
				'objectTypeCategoryIds',
				JSON.stringify(formData.objectTypeCategoryIds || [])
			);

			if (imageId) {
				formDataToSend.append('imageId', imageId.toString());
			}

			submitAd(formDataToSend);
		} catch (error) {
			console.error('Form submission error:', error);
			setError('Something went wrong while submitting the form.');
			setLoading(false);
		}
	};

	const submitAd = (formDataToSend: FormData) => {
		createAd(formDataToSend, {
			onSuccess: (response: any) => {
				setSuccessMessage('Reklama uspešno kreirana.');
				setLoading(false);
				setFormData(adInit);
				setSubmitTrigger(prev => !prev);
			},
			onError: (err: any) => {
				console.error('Error in creating advertisement:', err);
				setError('Reklama nije uspešno kreirana.');
				setLoading(false);
			},
		});
	};

	useEffect(() => {
		setLoading(loading);
	}, [loading]);

	const filteredStores = retails?.filter(store => {
		if (formData.marketplaceId) {
			return store.marketplaceId === formData.marketplaceId;
		}

		if (formData.cityPartId) {
			return store.cityPartId === formData.cityPartId;
		}

		if (formData.cityId) {
			return store.cityId === formData.cityId;
		}

		if (formData.countryId) {
			return store.countryId === formData.countryId;
		}

		return true;
	});

	return (
		<DynamicPageContainer
			clearSuccess={() => setSuccessMessage(null)}
			successMessage={successMessage}
			error={error}
			clearError={() => setError('')}
			loading={loading}
			title={title}>
			{error && <p>Greška prilikom učitavanja podataka.</p>}

			<div className='mt-8'>
				<CollapsibleFormContainer
					articleCategories={articleCategories || []}
					activityCategories={activityCategories || []}
					objectTypeCategories={objectTypeCategories || []}
					setFormData={setFormData}
					submitTrigger={submitTrigger}>
					<AdForm
						formData={formData}
						setFormData={setFormData}
						locations={locations}
						handleChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
						handleSelectChange={e =>
							setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
						}
						handleAdTypeChange={handleAdTypeChange}
						loading={loading}
						filteredCities={filteredCities}
						filteredCityParts={filteredCityParts}
						filteredMarketplaces={filteredMarketplaces}
						filteredStores={filteredStores || []}
						successMessage={successMessage}
						handleSubmit={handleSubmit}
						mutation={undefined}
						existingImages={imagesData || []}
					/>
				</CollapsibleFormContainer>
			</div>
			<AdsList ads={ads} setSuccessMessage={setSuccessMessage} setError={setError} />
		</DynamicPageContainer>
	);
};

export default AdsAdmin;
