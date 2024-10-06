'use client';
import { ChangeEvent } from 'react';
import { Location } from '@/utils/helpers/types';
import SubmitButton from '../buttons/SubmitButton';
import ImageUploadButton from '../buttons/ImageUploadButton';
import ChooseImageButton from '../buttons/ChooseImageButton';
import Label from '../text/Label';
import SelectInput from '../input/SelectInput';
import LabelInputDefault from '../input/LabelInputDefault';

interface NewLocationFormProps {
	retails: any[];
	onSubmit: (event: React.FormEvent) => Promise<void>;
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	countryId: number | null;
	setCountryId: React.Dispatch<React.SetStateAction<number | null>>;
	cityId: number | null;
	setCityId: React.Dispatch<React.SetStateAction<number | null>>;
	cityPartId: number | null;
	setCityPartId: React.Dispatch<React.SetStateAction<number | null>>;
	marketplaceId: number | null;
	setMarketplaceId: React.Dispatch<React.SetStateAction<number | null>>;
	setRetail: React.Dispatch<React.SetStateAction<File | null>>;
	setIsRetailPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	locations: Location[];
	setLogo: React.Dispatch<React.SetStateAction<File | null>>;
	setIsLogoPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewRetailForm: React.FC<NewLocationFormProps> = ({
	onSubmit,
	name,
	setName,
	countryId,
	setCountryId,
	cityId,
	setCityId,
	cityPartId,
	setCityPartId,
	marketplaceId,
	setMarketplaceId,
	setRetail,
	setIsRetailPickerOpen,
	locations,
	setLogo,
	setIsLogoPickerOpen,
}) => {
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

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

	const handleLogoChange = (file: File | null) => setLogo(file);

	return (
		<form onSubmit={onSubmit}>
			<LabelInputDefault label='Name' value={name} onChange={handleNameChange} placeholder='Name' />
			<SelectInput
				value={countryId ?? ''}
				onChange={handleCountryChange}
				options={locations
					.filter(location => location.type === 'country')
					.map(location => ({
						value: location.id,
						label:
							location.label.translations.find(translation => translation.languageId === 1)
								?.translation || '',
					}))}
			/>
			<SelectInput
				value={cityId ?? ''}
				onChange={handleCityChange}
				options={locations
					.filter(location => location.type === 'city')
					.map(location => ({
						value: location.id,
						label:
							location.label.translations.find(translation => translation.languageId === 1)
								?.translation || '',
					}))}
			/>
			<SelectInput
				value={cityPartId ?? ''}
				onChange={handleCityPartChange}
				options={locations
					.filter(location => location.type === 'cityPart')
					.map(location => ({
						value: location.id,
						label:
							location.label.translations.find(translation => translation.languageId === 1)
								?.translation || '',
					}))}
			/>
			<SelectInput
				value={marketplaceId ?? ''}
				onChange={handleCityPartChange}
				options={locations
					.filter(location => location.type === 'marketplace')
					.map(location => ({
						value: location.id,
						label:
							location.label.translations.find(translation => translation.languageId === 1)
								?.translation || '',
					}))}
			/>
			<div className='flex flex-col'>
				<ImageUploadButton
					id='upload-icon'
					label='Upload Icon'
					onChange={e => handleLogoChange(e.target.files?.[0] || null)}
				/>
				<ChooseImageButton onClick={() => setIsLogoPickerOpen(true)} label='Choose Existing Icon' />
			</div>
			<SubmitButton>Sačuvaj</SubmitButton>
		</form>
	);
};

export default NewRetailForm;
