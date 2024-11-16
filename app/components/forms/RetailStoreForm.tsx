import React from 'react';
import LabelInputForm from '../input/LabelInputForm';
import SelectInputForm from '../input/SelectInputForm';
import SubmitButton from '../buttons/SubmitButton';
import { RetailFormState, State, County, City, Suburb } from '@/utils/helpers/types';
import ErrorDisplay from '../modals/systemModals/ErrorDisplay';
import SuccessDisplay from '../modals/systemModals/SuccessDisplay';

interface Props {
	formData: RetailFormState;
	states: State[];
	filteredCounties: County[];
	filteredCities: City[];
	filteredSuburbs: Suburb[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleSelectChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	mutation: any;
	successMessage: string | null;
}

const RetailStoreForm: React.FC<Props> = ({
	formData,
	/* states, DO NOT DELETE THIS FUNCTION - IT WILL BE USED IN SOME OTHER CASES */
	filteredCounties,
	filteredCities,
	filteredSuburbs,
	handleChange,
	handleSelectChange,
	handleSubmit,
	loading,
	mutation,
	successMessage,
}) => {
	return (
		<form onSubmit={handleSubmit} className='space-y-2 px-8 py-4 shadow-md'>
			{mutation?.isError && (
				<ErrorDisplay error={mutation.error?.message} clearError={mutation.reset} />
			)}
			{mutation?.isSuccess && (
				<SuccessDisplay
					success={successMessage || 'Neočekivana greška'}
					clearSuccess={mutation.reset}
				/>
			)}
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
			{/* State Selection */}
			{/* <SelectInputForm DO NOT DETETE THIS FUNCTION - IT WILL BE USED IN SOME OTHER CASES
				id='stateId'
				label='Izaberite državu'
				value={formData.stateId || 0}
				onChange={handleSelectChange}>
				<option value={0} disabled>
					Izaberite državu
				</option>
				{states?.map((state: any) => (
					<option key={state.id} value={state.id} className='text-black'>
						{state.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm> */}
			{/* County Selection */}
			<SelectInputForm
				id='countyId'
				label='Izaberite državu'
				value={formData.countyId || 0}
				onChange={handleSelectChange}>
				<option value={0} disabled>
					Izaberite grad
				</option>
				{filteredCounties.map((county: any) => (
					<option key={county.id} value={county.id} className='text-black'>
						{county.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>
			{/* City Selection*/}
			<SelectInputForm
				id='cityId'
				label='Izaberite grad'
				value={formData.cityId || 0}
				onChange={handleSelectChange}>
				<option value={0}>Izaberite deo grada</option>
				{filteredCities.map((city: any) => (
					<option key={city.id} value={city.id} className='text-black'>
						{city.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>
			{/* Suburb Selection */}
			<SelectInputForm
				id='suburbId'
				label='Izaberite lokaciju'
				value={formData.suburbId || 0}
				onChange={handleSelectChange}>
				<option value={0}>Izaberite tržni centar</option>
				{filteredSuburbs.map((suburb: any) => (
					<option key={suburb.id} value={suburb.id} className='text-black'>
						{suburb.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>
			{/* Phone Number */}
			<LabelInputForm
				id='address'
				name='address'
				label='Adresa'
				value={formData.address || ''}
				onChange={handleChange}
				placeholder='Unesite adresu'
			/>
			{/* locationDescription */}
			<LabelInputForm
				id='locationDescription'
				name='locationDescription'
				label='Dodatne informacije o lokaciji'
				value={formData.locationDescription || ''}
				onChange={handleChange}
				placeholder='Unesite detalje'
			/>
			{/* Submit Button */}
			<div className='flex justify-end pt-4'>
				<SubmitButton>{loading ? 'U toku...' : 'Sačuvaj'}</SubmitButton>
			</div>
		</form>
	);
};

export default RetailStoreForm;
