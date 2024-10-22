import React from 'react';
import LabelInputForm from '../input/LabelInputForm';
import SelectInputForm from '../input/SelectInputForm';
import SubmitButton from '../buttons/SubmitButton';
import { RetailFormState } from '@/utils/helpers/types';

interface Props {
	formData: RetailFormState;
	locations: any[];
	filteredCities: any[];
	filteredCityParts: any[];
	filteredMarketplaces: any[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleSelectChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	mutation: any;
	successMessage: string | null;
}

const RetailStoreForm: React.FC<Props> = ({
	formData,
	locations,
	filteredCities,
	filteredCityParts,
	filteredMarketplaces,
	handleChange,
	handleSelectChange,
	handleSubmit,
	loading,
	mutation,
	successMessage,
}) => {
	return (
		<form onSubmit={handleSubmit} className='space-y-2 px-8 py-4 shadow-md'>
			{/* Store Name */}
			<LabelInputForm
				id='name'
				name='name'
				label='Naziv'
				value={formData.name}
				onChange={handleChange}
				placeholder='Unesite naziv'
				required
			/>

			{/* Phone Number */}
			<LabelInputForm
				id='phoneNumber'
				name='phoneNumber'
				label='Broj telefona'
				value={formData.phoneNumber}
				onChange={handleChange}
				placeholder='Unesite broj telefona'
			/>

			{/* Email */}
			<LabelInputForm
				id='email'
				name='email'
				label='Email'
				value={formData.email}
				onChange={handleChange}
				placeholder='Unesite email'
				type='email'
			/>

			{/* Website */}
			<LabelInputForm
				id='website'
				name='website'
				label='Website'
				value={formData.website}
				onChange={handleChange}
				placeholder='Unesite website'
			/>

			{/* Latitude */}
			<LabelInputForm
				id='latitude'
				name='latitude'
				label='Latitude'
				value={formData.latitude}
				onChange={handleChange}
				placeholder='Unesite geografsku širinu'
				type='number'
			/>

			{/* Longitude */}
			<LabelInputForm
				id='longitude'
				name='longitude'
				label='Longitude'
				value={formData.longitude}
				onChange={handleChange}
				placeholder='Unesite geografsku dužinu'
				type='number'
			/>

			{/* Country Selection */}
			<SelectInputForm
				id='countryId'
				label='Izaberite državu'
				value={formData.countryId || 0}
				onChange={handleSelectChange}>
				<option value={0} disabled>
					Izaberite državu
				</option>
				{locations?.map((location: any) => (
					<option key={location.id} value={location.id} className='text-black'>
						{location.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>

			{/* City Selection - Prikazujemo samo ako postoji izabrana država */}
			<SelectInputForm
				id='cityId' // Ovaj ID treba biti "cityId"
				label='Izaberite grad'
				value={formData.cityId || 0} // Postavi trenutni grad ako postoji
				onChange={handleSelectChange}>
				<option value={0} disabled>
					Izaberite grad
				</option>
				{filteredCities.map((city: any) => (
					<option key={city.id} value={city.id} className='text-black'>
						{city.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>

			{/* City Part Selection - Prikazujemo samo ako postoji izabrani grad */}
			<SelectInputForm
				id='cityPartId' // Ovaj ID treba biti "cityPartId"
				label='Izaberite deo grada'
				value={formData.cityPartId || 0} // Postavi trenutni deo grada ako postoji
				onChange={handleSelectChange}>
				<option value={0}>Izaberite deo grada</option>
				{filteredCityParts.map((cityPart: any) => (
					<option key={cityPart.id} value={cityPart.id} className='text-black'>
						{cityPart.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>

			{/* Marketplace Selection - Prikazujemo samo ako postoji izabrani deo grada */}
			<SelectInputForm
				id='marketplaceId' // Ovaj ID treba biti "marketplaceId"
				label='Izaberite tržni centar'
				value={formData.marketplaceId || 0} // Postavi trenutni tržni centar ako postoji
				onChange={handleSelectChange}>
				<option value={0}>Izaberite tržni centar</option>
				{filteredMarketplaces.map((marketplace: any) => (
					<option key={marketplace.id} value={marketplace.id} className='text-black'>
						{marketplace.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>

			{/* Submit Button */}
			<div className='flex justify-end pt-4'>
				<SubmitButton>{loading ? 'U toku...' : 'Sačuvaj'}</SubmitButton>
			</div>

			{/* Error and Success Messages */}
			{mutation?.isError && <p className='text-red-500'>{mutation.error?.message}</p>}
			{mutation?.isSuccess && <p className='text-green-500'>{successMessage}</p>}
		</form>
	);
};

export default RetailStoreForm;
