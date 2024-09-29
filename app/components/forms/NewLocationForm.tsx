'use client';
import { ChangeEvent } from 'react';
import { Icon, Country, City } from '@/utils/helpers/types';
import SubmitButton from '../buttons/SubmitButton';
import ImageUploadButton from '../buttons/ImageUploadButton';
import ChooseImageButton from '../buttons/ChooseImageButton';

interface NewLocationFormProps {
	onSubmit: (event: React.FormEvent) => Promise<void>;
	languageId: number;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	parentId: number | null;
	setParentId: React.Dispatch<React.SetStateAction<number | null>>;
	type: 'country' | 'city' | 'cityPart';
	setType: React.Dispatch<React.SetStateAction<'country' | 'city' | 'cityPart'>>;
	countries: Country[];
	cities: City[];
	setCities: React.Dispatch<React.SetStateAction<City[]>>;
	cityId: number | null;
	setCityId: React.Dispatch<React.SetStateAction<number | null>>;
	icons: Icon[];
	icon: File | null;
	setIcon: React.Dispatch<React.SetStateAction<File | null>>;
	iconId: number | null;
	setIconId: React.Dispatch<React.SetStateAction<number | null>>;
	isIconPickerOpen: boolean;
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	postalCode: string;
	setPostalCode: React.Dispatch<React.SetStateAction<string>>;
}

const NewLocationForm: React.FC<NewLocationFormProps> = ({
	onSubmit,
	languageId,
	name,
	setName,
	parentId,
	setParentId,
	type,
	setType,
	countries,
	cities,
	setCities,
	cityId,
	setCityId,
	icons,
	icon,
	setIcon,
	iconId,
	setIconId,
	isIconPickerOpen,
	setIsIconPickerOpen,
	postalCode,
	setPostalCode,
}) => {
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPostalCode(e.target.value);

	// Filter cities based on selected country
	const filteredCities = cities.filter(city => city.countryId === parentId);

	// For countries (parentId is countryId)
	const handleParentIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setParentId(Number(e.target.value)); // Correctly set parentId (countryId for cities)
		setCityId(null); // Reset cityId if parentId changes
	};

	const handleCityIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCityId(Number(e.target.value)); // Set cityId for city parts
	};

	const handleIconChange = (file: File | null) => setIcon(file);

	const handleIconSelection = (selectedIconId: number) => {
		setIconId(selectedIconId);
		setIsIconPickerOpen(false); // Close the icon picker after selection
	};

	console.log('postalCode:', postalCode);

	return (
		<form onSubmit={onSubmit} className='space-y-4 bg-white p-4 rounded shadow-md'>
			{/* Location Name */}
			<div className='flex flex-col'>
				<label htmlFor='location' className='font-medium text-gray-700'>
					Naziv lokacije
				</label>
				<input
					type='text'
					id='location'
					value={name}
					onChange={handleNameChange}
					className='mt-1 p-2 border border-gray-300 rounded text-black'
					required
				/>
			</div>

			{/* Location Type */}
			<div className='flex flex-col'>
				<label htmlFor='type' className='font-medium text-gray-700'>
					Tip lokacije
				</label>
				<select
					id='type'
					value={type}
					onChange={e => setType(e.target.value as 'country' | 'city' | 'cityPart')}
					className='mt-1 p-2 border border-gray-300 rounded text-black'>
					<option value='country'>Država</option>
					<option value='city'>Mesto</option>
					<option value='cityPart'>Deo mesta</option>
				</select>
			</div>

			{/* Country Selection for City */}
			{type === 'city' && (
				<>
					<div className='flex flex-col'>
						<label htmlFor='countryId' className='font-medium text-gray-700'>
							Izaberite državu
						</label>
						<select
							id='countryId'
							value={parentId ?? ''} // Set the value of parentId here
							onChange={handleParentIdChange} // This sets the parentId (countryId)
							className='mt-1 p-2 border border-gray-300 rounded text-black'
							required>
							<option value=''>Izaberite državu</option>
							{countries.map(country => (
								<option key={country.id} value={country.id}>
									{country.label.name}
								</option>
							))}
						</select>
					</div>

					{/* Postal Code */}
					<div className='flex flex-col'>
						<label htmlFor='postalCode' className='font-medium text-gray-700'>
							Postanski kod
						</label>
						<input
							type='text'
							id='postalCode'
							value={postalCode}
							onChange={handlePostalCodeChange}
							className='mt-1 p-2 border border-gray-300 rounded text-black'
							required
						/>
					</div>
				</>
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
