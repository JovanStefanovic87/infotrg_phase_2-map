'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useCreateRetailStore } from '@/app/helpers/api/retailStore';
import { useFetchLocations } from '@/app/helpers/api/location';

interface NewRetailStoreFormProps {
	successMessage: string | null;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	error: string;
	loading: boolean;
}

const NewRetailStoreForm: React.FC<NewRetailStoreFormProps> = ({
	successMessage,
	setSuccessMessage,
	setError,
	setLoading,
	error,
	loading,
}) => {
	const mutation = useCreateRetailStore();
	const { data: locations, isLoading: loadingLocations } = useFetchLocations({
		prefix: '',
		languageId: 1,
	});

	const [formData, setFormData] = useState({
		name: '',
		phoneNumber: '',
		email: '',
		website: '',
		countryId: 0,
		cityId: 0,
		cityPartId: 0,
		marketplaceId: 0,
		latitude: '',
		longitude: '',
		articleCategoryIds: [] as number[],
		activityCategoryIds: [] as number[],
		objectTypeCategoryIds: [] as number[],
	});

	useEffect(() => {
		console.log('formData:', formData);
	}, [formData]);

	// Logovanje lokacija kako bismo bili sigurni šta API vraća
	useEffect(() => {
		console.log('locations:', locations);
	}, [locations]);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: type === 'number' || name.endsWith('Id') ? parseInt(value, 10) || 0 : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		mutation.mutate(
			{
				name: formData.name,
				phoneNumber: formData.phoneNumber,
				email: formData.email,
				website: formData.website,
				newLocation: {
					countryId: formData.countryId,
					cityId: formData.cityId,
					cityPartId: formData.cityPartId,
					marketplaceId: formData.marketplaceId,
					address: 'Some Address',
				},
				coordinates: {
					latitude: parseFloat(formData.latitude),
					longitude: parseFloat(formData.longitude),
					locationDescription: 'Some location description',
				},
				articleCategoryIds: formData.articleCategoryIds,
				activityCategoryIds: formData.activityCategoryIds,
				objectTypeCategoryIds: formData.objectTypeCategoryIds,
			},
			{
				onSuccess: () => {
					setSuccessMessage('Retail store created successfully!');
					setLoading(false);
				},
				onError: error => {
					setError(error.message);
					setLoading(false);
				},
			}
		);
	};

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

	useEffect(() => {
		console.log('Locations data:', locations);
	}, [locations]);

	useEffect(() => {
		console.log('Filtered Cities:', filteredCities);
		console.log('Filtered City Parts:', filteredCityParts);
		console.log('Filtered Marketplaces:', filteredMarketplaces);
	}, [filteredCities, filteredCityParts, filteredMarketplaces]);

	return (
		<form onSubmit={handleSubmit} className='space-y-6 bg-white p-6 rounded shadow-md'>
			{/* Store Name */}
			<div className='flex flex-col'>
				<label htmlFor='name'>Store Name</label>
				<input
					id='name'
					name='name'
					type='text'
					value={formData.name}
					onChange={handleChange}
					placeholder='Enter store name'
					required
					className='border border-gray-300 p-2 rounded'
				/>
			</div>

			{/* Phone Number */}
			<div className='flex flex-col'>
				<label htmlFor='phoneNumber'>Phone Number</label>
				<input
					id='phoneNumber'
					name='phoneNumber'
					type='text'
					value={formData.phoneNumber}
					onChange={handleChange}
					placeholder='Enter phone number'
					required
					className='border border-gray-300 p-2 rounded'
				/>
			</div>

			{/* Email */}
			<div className='flex flex-col'>
				<label htmlFor='email'>Email</label>
				<input
					id='email'
					name='email'
					type='email'
					value={formData.email}
					onChange={handleChange}
					placeholder='Enter email'
					required
					className='border border-gray-300 p-2 rounded'
				/>
			</div>

			{/* Website */}
			<div className='flex flex-col'>
				<label htmlFor='website'>Website</label>
				<input
					id='website'
					name='website'
					type='text'
					value={formData.website}
					onChange={handleChange}
					placeholder='Enter website'
					className='border border-gray-300 p-2 rounded'
				/>
			</div>

			{/* Country Selection */}
			<div className='flex flex-col'>
				<label htmlFor='countryId'>Select Country</label>
				<select
					id='countryId'
					name='countryId'
					value={formData.countryId}
					onChange={handleChange}
					className='border border-gray-300 p-2 rounded'>
					<option value={0}>Select Country</option>
					{locations?.map((location: any) => (
						<option key={location.id} value={location.id}>
							{location.label.translations[0]?.translation || location.label.name}
						</option>
					))}
				</select>
			</div>

			{/* City Selection */}
			<div className='flex flex-col'>
				<label htmlFor='cityId'>Select City</label>
				<select
					id='cityId'
					name='cityId'
					value={formData.cityId}
					onChange={handleChange}
					className='border border-gray-300 p-2 rounded'>
					<option value={0}>Select City</option>
					{filteredCities.map((city: any) => (
						<option key={city.id} value={city.id}>
							{city.label.translations[0]?.translation}
						</option>
					))}
				</select>
			</div>

			{/* City Part Selection */}
			{formData.cityId && (
				<div className='flex flex-col'>
					<label htmlFor='cityPartId'>Select City Part</label>
					<select
						id='cityPartId'
						name='cityPartId'
						value={formData.cityPartId}
						onChange={handleChange}
						className='border border-gray-300 p-2 rounded'>
						<option value={0}>Select City Part</option>
						{filteredCityParts.map((cityPart: any) => (
							<option key={cityPart.id} value={cityPart.id}>
								{cityPart.label.translations[0]?.translation || cityPart.label.name}
							</option>
						))}
					</select>
				</div>
			)}

			{/* Marketplace Selection */}
			{formData.cityPartId && (
				<div className='flex flex-col'>
					<label htmlFor='marketplaceId'>Select Marketplace</label>
					<select
						id='marketplaceId'
						name='marketplaceId'
						value={formData.marketplaceId}
						onChange={handleChange}
						className='border border-gray-300
p-2 rounded'>
						<option value={0}>Select Marketplace</option>
						{filteredMarketplaces.map((marketplace: any) => (
							<option key={marketplace.id} value={marketplace.id}>
								{marketplace.label.translations[0]?.translation || marketplace.label.name}
							</option>
						))}
					</select>
				</div>
			)}

			{/* Latitude */}
			<div className='flex flex-col'>
				<label htmlFor='latitude'>Latitude</label>
				<input
					id='latitude'
					name='latitude'
					type='text'
					value={formData.latitude}
					onChange={handleChange}
					placeholder='Enter latitude'
					required
					className='border border-gray-300 p-2 rounded'
				/>
			</div>

			{/* Longitude */}
			<div className='flex flex-col'>
				<label htmlFor='longitude'>Longitude</label>
				<input
					id='longitude'
					name='longitude'
					type='text'
					value={formData.longitude}
					onChange={handleChange}
					placeholder='Enter longitude'
					required
					className='border border-gray-300 p-2 rounded'
				/>
			</div>

			<div className='flex justify-end'>
				<button
					type='submit'
					disabled={loading}
					className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
					{loading ? 'Loading...' : 'Submit'}
				</button>
			</div>

			{/* Error and Success Messages */}
			{mutation.isError && <p className='text-red-500'>{mutation.error?.message}</p>}
			{mutation.isSuccess && <p className='text-green-500'>{successMessage}</p>}
		</form>
	);
};

export default NewRetailStoreForm;
