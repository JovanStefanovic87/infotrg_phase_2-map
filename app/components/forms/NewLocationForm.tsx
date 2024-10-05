'use client';
import { ChangeEvent } from 'react';
import { Country, Location } from '@/utils/helpers/types';
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
	countryId: number | null;
	setCountryId: React.Dispatch<React.SetStateAction<number | null>>;
	type: 'country' | 'city' | 'cityPart' | 'marketplace';
	setType: React.Dispatch<React.SetStateAction<'country' | 'city' | 'cityPart' | 'marketplace'>>;
	cityId: number | null;
	setCityId: React.Dispatch<React.SetStateAction<number | null>>;
	cityPartId: number | null;
	setCityPartId: React.Dispatch<React.SetStateAction<number | null>>;
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
	countryId,
	setCountryId,
	type,
	setType,
	cityId,
	setCityId,
	cityPartId,
	setCityPartId,
	setIcon,
	setIsIconPickerOpen,
	postCode,
	setPostCode,
	locations,
}) => {
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value);
	const handlePostCodeChange = (e: ChangeEvent<HTMLInputElement>) => setPostCode(e.target.value);

	const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCountryId(Number(e.target.value));
		setCityId(null);
		setCityPartId(null);
	};

	const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCityId(Number(e.target.value));
		setCityPartId(null);
	};

	const handleCityPartChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCityPartId(Number(e.target.value));
	};

	const handleIconChange = (file: File | null) => setIcon(file);

	const filteredCities = countryId
		? (locations.find(location => location.id === countryId) as Country)?.cities || []
		: [];

	const filteredCityParts = cityId
		? filteredCities.find(city => city.id === cityId)?.cityParts || []
		: [];

	const filteredCountryOptions = locations.map(country => ({
		...country,
		label: {
			...country.label,
			name:
				country.label.translations.find(t => t.languageId === languageId)?.translation ||
				country.label.name,
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

	const filteredCityPartOptions = filteredCityParts.map(part => ({
		...part,
		label: {
			...part.label,
			name:
				part.label.translations.find(t => t.languageId === languageId)?.translation ||
				part.label.name,
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
					onChange={e => setType(e.target.value as 'country' | 'city' | 'cityPart' | 'marketplace')}
					options={[
						{ value: 'country', label: 'Država' },
						{ value: 'city', label: 'Mesto' },
						{ value: 'cityPart', label: 'Deo mesta' },
						{ value: 'marketplace', label: 'Pijaca' },
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

			{/* Marketplace Address */}
			{type === 'marketplace' && (
				<div className='flex flex-col'>
					<LabelInputDefault
						label='Adresa pijace'
						value={address}
						onChange={handleAddressChange}
						placeholder=''
						required
					/>
				</div>
			)}

			{/* Country Selection */}
			{(type === 'city' || type === 'cityPart' || type === 'marketplace') && (
				<div className='flex flex-col'>
					<Label htmlFor='countryId'>Izaberite državu</Label>
					<select
						id='countryId'
						value={countryId ?? ''}
						onChange={handleCountryChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite državu</option>
						{filteredCountryOptions.map(country => (
							<option key={country.id} value={country.id}>
								{country.label.name}
							</option>
						))}
					</select>
				</div>
			)}

			{/* City Selection */}
			{(type === 'cityPart' || type === 'marketplace') && (
				<div className='flex flex-col'>
					<Label htmlFor='countryId'>Izaberite mesto</Label>
					<select
						id='cityId'
						value={cityId ?? ''}
						onChange={handleCityChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite mesto</option>
						{filteredCityOptions.map(city => (
							<option key={city.id} value={city.id}>
								{city.label.name}
							</option>
						))}
					</select>
				</div>
			)}

			{/* City Part Selection */}
			{type === 'marketplace' && (
				<div className='flex flex-col'>
					<Label htmlFor='countryId'>Izaberite deo mesta</Label>
					<select
						id='cityPartId'
						value={cityPartId ?? ''}
						onChange={handleCityPartChange}
						className='mt-1 p-2 border border-gray-300 rounded text-black'
						required>
						<option value=''>Izaberite deo mesta</option>
						{filteredCityPartOptions.map(part => (
							<option key={part.id} value={part.id}>
								{part.label.name}
							</option>
						))}
					</select>
				</div>
			)}

			{/* Post Code */}
			{(type === 'cityPart' || type === 'city') && (
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
					label='Upload Icon'
					onChange={e => handleIconChange(e.target.files?.[0] || null)}
				/>
				<ChooseImageButton onClick={() => setIsIconPickerOpen(true)} label='Choose Existing Icon' />
			</div>

			{/* Submit Button */}
			<SubmitButton>Sačuvaj lokaciju</SubmitButton>
		</form>
	);
};

export default NewLocationForm;
