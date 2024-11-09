'use client';
import { ChangeEvent } from 'react';
import { State, Location } from '@/utils/helpers/types';
import SubmitButton from '../buttons/SubmitButton';
import ImageUploadButton from '../buttons/ImageUploadButton';
import ChooseImageButton from '../buttons/ChooseImageButton';
import Label from '../text/Label';
import SelectInput from '../input/SelectInput';
import LabelInputDefault from '../input/LabelInputDefault';

interface NewLocationFormProps {
	languageId: number;
	onSubmit: (event: React.FormEvent) => Promise<void>;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	stateId: number | null;
	setStateId: React.Dispatch<React.SetStateAction<number | null>>;
	type: 'state' | 'county' | 'city' | 'suburb';
	setType: React.Dispatch<React.SetStateAction<'state' | 'county' | 'city' | 'suburb'>>;
	countyId: number | null;
	setCountyId: React.Dispatch<React.SetStateAction<number | null>>;
	cityId: number | null;
	setCityId: React.Dispatch<React.SetStateAction<number | null>>;
	setIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	postCode: string;
	setPostCode: React.Dispatch<React.SetStateAction<string>>;
	locations: Location[];
}

const NewLocationForm: React.FC<NewLocationFormProps> = ({
	languageId,
	onSubmit,
	name,
	setName,
	address,
	setAddress,
	stateId,
	setStateId,
	type,
	setType,
	countyId,
	setCountyId,
	cityId,
	setCityId,
	setIcon,
	setIsIconPickerOpen,
	postCode,
	setPostCode,
	locations,
}) => {
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
	const handlePostCodeChange = (e: ChangeEvent<HTMLInputElement>) => setPostCode(e.target.value);

	const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
		//DO NOT REMOVE THIS FUNCTION - IT WILL BE USED IN SOME OTHER CASES
		setStateId(Number(e.target.value));
		setCountyId(null);
		setCityId(null);
	};

	const handleCountyChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCountyId(Number(e.target.value));
		setCityId(null);
	};

	const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCityId(Number(e.target.value));
	};

	const handleIconChange = (file: File | null) => setIcon(file);

	const filteredCounties = stateId
		? (locations.find(location => location.id === stateId) as State)?.counties || []
		: [];

	const filteredCities = countyId
		? filteredCounties.find(county => county.id === countyId)?.cities || []
		: [];

	const filteredStateOptions = locations.map(state => ({
		...state,
		label: {
			...state.label,
			name:
				state.label.translations.find(t => t.languageId === languageId)?.translation ||
				state.label.name,
		},
	}));

	const filteredCountyOptions = filteredCounties.map(county => ({
		...county,
		label: {
			...county.label,
			name:
				county.label.translations.find(t => t.languageId === languageId)?.translation ||
				county.label.name,
		},
	}));

	const filteredCityOptions = filteredCities.map(city => ({
		...city,
		label: {
			...city.label,
			name:
				city.label.translations.find(t => t.languageId === languageId)?.translation ||
				city.label.name,
		},
	}));

	return (
		<form onSubmit={onSubmit} className='space-y-4 bg-white p-4 rounded shadow-md'>
			{/* Location Type */}
			<div className='flex flex-col'>
				<Label htmlFor='type'>Tip lokacije</Label>
				<SelectInput
					id='type'
					value={type}
					onChange={e => setType(e.target.value as 'state' | 'county' | 'city' | 'suburb')}
					options={[
						{ value: 'state', label: 'Savez' },
						{ value: 'county', label: 'Država' },
						{ value: 'city', label: 'Grad' },
						{ value: 'suburb', label: 'Deo grada' },
					]}
				/>
			</div>
			{/* Location Name */}
			<div className='flex flex-col'>
				<LabelInputDefault
					label='Naziv lokacije'
					value={name}
					onChange={handleNameChange}
					placeholder=''
					required
				/>
			</div>

			{/* Suburb Address */}
			{type === 'suburb' && (
				<div className='flex flex-col'>
					<LabelInputDefault
						label='Adresa'
						value={address}
						onChange={handleAddressChange}
						placeholder=''
						required
					/>
				</div>
			)}
			{(type === 'county' || type === 'city' || type === 'suburb') && (
				<div className='flex flex-col'>
					<Label htmlFor='stateId'>Izaberite savez</Label>
					<select
						id='stateId'
						value={stateId ?? ''}
						onChange={handleStateChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite državu</option>
						{filteredStateOptions.map(state => (
							<option key={state.id} value={state.id}>
								{state.label.name}
							</option>
						))}
					</select>
				</div>
			)}
			{/* State Selection */}
			{/* {(type === 'county' || type === 'city' || type === 'suburb') && (  DO NOT REMOVE THIS FUNCTION - IT WILL BE USED IN SOME OTHER CASES
				<div className='flex flex-col'>
					<Label htmlFor='stateId'>Izaberite državu</Label>
					<select
						id='stateId'
						value={stateId ?? ''}
						onChange={handleStateChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite državu</option>
						{filteredStateOptions.map(state => (
							<option key={state.id} value={state.id}>
								{state.label.name}
							</option>
						))}
					</select>
				</div>
			)} */}

			{/* County Selection */}
			{/* {(type === 'city' || type === 'suburb') && (  DO NOT REMOVE THIS FUNCTION - IT WILL BE USED IN SOME OTHER CASES
				<div className='flex flex-col'>
					<Label htmlFor='countyId'>Izaberite mesto</Label>
					<select
						id='countyId'
						value={countyId ?? ''}
						onChange={handleCountyChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite mesto</option>
						{filteredCountyOptions.map(county => (
							<option key={county.id} value={county.id}>
								{county.label.name}
							</option>
						))}
					</select>
				</div>
			)} */}

			{/* County Selection */}
			{(type === 'city' || type === 'suburb') && (
				<div className='flex flex-col'>
					<Label htmlFor='countyId' color='black'>
						Izaberite mesto
					</Label>
					<select
						id='countyId'
						value={countyId ?? ''}
						onChange={handleCountyChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite mesto</option>
						{filteredCountyOptions.map(county => (
							<option key={county.id} value={county.id}>
								{county.label.name}
							</option>
						))}
					</select>
				</div>
			)}

			{/* City Selection */}
			{type === 'suburb' && (
				<div className='flex flex-col'>
					<Label htmlFor='cityId' color='black'>
						Izaberite lokaciju
					</Label>
					<select
						id='cityId'
						value={cityId ?? ''}
						onChange={handleCityChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite deo mesta</option>
						{filteredCityOptions.map(city => (
							<option key={city.id} value={city.id}>
								{city.label.name}
							</option>
						))}
					</select>
				</div>
			)}

			{/* Post Code */}
			{(type === 'city' || type === 'suburb') && (
				<div className='flex flex-col'>
					<LabelInputDefault
						label='Poštanski kod'
						value={postCode}
						onChange={handlePostCodeChange}
						placeholder=''
					/>
				</div>
			)}

			{/* Icon Upload and Select */}
			<div className='flex flex-col'>
				<ImageUploadButton
					id='upload-icon'
					label='Dodajte novi logo'
					onChange={e => handleIconChange(e.target.files?.[0] || null)}
				/>
				<ChooseImageButton
					onClick={() => setIsIconPickerOpen(true)}
					label='Izaberite postojeći logo'
				/>
			</div>

			{/* Submit Button */}
			<SubmitButton>Sačuvaj lokaciju</SubmitButton>
		</form>
	);
};

export default NewLocationForm;
