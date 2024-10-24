import React, { useState } from 'react';
import LabelInputForm from '../input/LabelInputForm';
import SelectInputForm from '../input/SelectInputForm';
import SubmitButton from '../buttons/SubmitButton';
import ImagePickerForm from './ImagePickerForm';
import { AdFormState, AdType, Icon } from '@/utils/helpers/types';
import ImageUploadButton from '../buttons/ImageUploadButton';
import ChooseImageButton from '../buttons/ChooseImageButton';
import { adTypeOptions } from '@/utils/helpers/varStrings';
import Image from 'next/image';

interface Props {
	formData: AdFormState;
	setFormData: React.Dispatch<React.SetStateAction<AdFormState>>;
	locations: any[];
	filteredCities: any[];
	filteredCityParts: any[];
	filteredMarketplaces: any[];
	filteredStores: any[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleSelectChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleAdTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	handleSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	mutation: any;
	existingImages: Icon[];
	successMessage: string | null;
}

const AdForm: React.FC<Props> = ({
	formData,
	setFormData,
	locations,
	filteredCities,
	filteredCityParts,
	filteredMarketplaces,
	filteredStores,
	handleChange,
	handleSelectChange,
	handleAdTypeChange,
	handleSubmit,
	loading,
	mutation,
	existingImages,
	successMessage,
}) => {
	const [isImagePickerOpen, setIsImagePickerOpen] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleImageSelect = (icon: { iconId: number; iconUrl: string }) => {
		setPreviewImage(null);
		setFormData(prev => ({
			...prev,
			imageId: icon.iconId,
			newImageFile: undefined,
		}));
		setIsImagePickerOpen(false);
	};

	const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setPreviewImage(imageUrl);
			setFormData(prev => ({
				...prev,
				newImageFile: file,
				imageId: undefined,
			}));
		} else {
			setPreviewImage(null);
		}
	};

	// Provera da li su svi obavezni podaci prisutni
	const isFormValid = () => {
		if (
			!formData.name ||
			!formData.countryId ||
			!formData.cityId ||
			!formData.retailStoreId ||
			formData.adType === 'NONE' ||
			(!formData.imageId && !formData.newImageFile) ||
			!(
				formData.articleCategoryIds.length > 0 ||
				formData.activityCategoryIds.length > 0 ||
				formData.objectTypeCategoryIds.length > 0
			)
		) {
			return false;
		}
		return true;
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isFormValid()) {
			setErrorMessage('Molimo popunite sve obavezne podatke.');
			return;
		}

		setErrorMessage(null);
		handleSubmit(e);
	};

	return (
		<form onSubmit={handleFormSubmit} className='space-y-2 px-8 py-4 shadow-md'>
			{errorMessage && <p className='text-red-500'>{errorMessage}</p>}

			{/* Ad Name */}
			<LabelInputForm
				id='name'
				name='name'
				label='Naziv reklame'
				value={formData.name}
				onChange={handleChange}
				placeholder='Unesite naziv reklame'
				required
			/>

			{/* Ad Type */}
			<SelectInputForm
				id='adType'
				label='Tip reklame'
				value={formData.adType}
				onChange={handleAdTypeChange}>
				<option value='' disabled>
					Izaberite tip reklame
				</option>
				{(Object.keys(adTypeOptions) as Array<keyof typeof adTypeOptions>).map(label => (
					<option key={label} value={adTypeOptions[label]} className='text-black'>
						{label}
					</option>
				))}
			</SelectInputForm>

			<LabelInputForm
				id='description'
				name='description'
				label='Opis reklame ili link ka eksternom sadržaju'
				value={formData.description}
				onChange={handleChange}
				placeholder='Unesite saržaj'
			/>

			{/* Image Picker */}
			<div>
				<ImageUploadButton
					id='upload-icon'
					label='Dodajte novu sliku'
					onChange={handleImagePreview}
				/>
				<ChooseImageButton
					onClick={() => setIsImagePickerOpen(true)}
					label={formData.imageId ? 'Promeni postojeću sliku' : 'Izaberite postojeću sliku'}
				/>
			</div>

			{/* Preview of selected image */}
			{previewImage && (
				<div className='mt-4'>
					<p className='text-gray-700'>Pregled odabrane nove slike:</p>
					<Image src={previewImage} alt='Preview' width={128} height={128} />
				</div>
			)}

			{/* Preview of existing image */}
			{formData.imageId && !previewImage && (
				<div className='mt-4'>
					<p className='text-gray-700'>Odabrana postojeća slika:</p>
					<Image
						src={existingImages.find(icon => icon.id === formData.imageId)?.url || ''}
						alt='Odabrana slika'
						width={128}
						height={128}
					/>
				</div>
			)}

			{/* Country Selection */}
			<SelectInputForm
				id='countryId'
				label='Izaberite državu'
				value={formData.countryId || 0}
				onChange={handleSelectChange}>
				<option value={0} disabled>
					Izaberite državu
				</option>
				{locations?.map(location => (
					<option key={location.id} value={location.id} className='text-black'>
						{location.label.translations[0]?.translation}
					</option>
				))}
			</SelectInputForm>

			{/* City Selection */}
			{formData.countryId > 0 && (
				<SelectInputForm
					id='cityId'
					label='Izaberite grad'
					value={formData.cityId || 0}
					onChange={handleSelectChange}>
					<option value={0} disabled>
						Izaberite grad
					</option>
					{filteredCities.map(city => (
						<option key={city.id} value={city.id} className='text-black'>
							{city.label.translations[0]?.translation}
						</option>
					))}
				</SelectInputForm>
			)}

			{/* City Part Selection */}
			{formData.cityId > 0 && (
				<SelectInputForm
					id='cityPartId'
					label='Izaberite deo grada'
					value={formData.cityPartId || 0}
					onChange={handleSelectChange}>
					<option value={0}>Izaberite deo grada</option>
					{filteredCityParts.map(cityPart => (
						<option key={cityPart.id} value={cityPart.id} className='text-black'>
							{cityPart.label.translations[0]?.translation}
						</option>
					))}
				</SelectInputForm>
			)}

			{/* Marketplace Selection */}
			{formData.cityPartId && formData.cityPartId > 0 && (
				<SelectInputForm
					id='marketplaceId'
					label='Izaberite tržni centar'
					value={formData.marketplaceId || 0}
					onChange={handleSelectChange}>
					<option value={0}>Izaberite tržni centar</option>
					{filteredMarketplaces.map(marketplace => (
						<option key={marketplace.id} value={marketplace.id} className='text-black'>
							{marketplace.label.translations[0]?.translation}
						</option>
					))}
				</SelectInputForm>
			)}

			{/* Retail Store Selection */}
			<SelectInputForm
				id='retailStoreId'
				label='Izaberite prodajni objekat'
				value={formData.retailStoreId || 0}
				onChange={handleSelectChange}>
				<option value={0}>Izaberite prodajni objekat</option>
				{filteredStores.map(store => (
					<option key={store.id} value={store.id} className='text-black'>
						{store.name}
					</option>
				))}
			</SelectInputForm>

			<div className='flex justify-end pt-4'>
				<SubmitButton>{loading ? 'U toku...' : 'Sačuvaj'}</SubmitButton>
			</div>

			<ImagePickerForm
				icons={existingImages}
				isOpen={isImagePickerOpen}
				onSelect={handleImageSelect}
				onClose={() => setIsImagePickerOpen(false)}
			/>

			{/* Error and Success Messages */}
			{mutation?.isError && <p className='text-red-500'>{mutation.error?.message}</p>}
			{mutation?.isSuccess && <p className='text-green-500'>{successMessage}</p>}
		</form>
	);
};

export default AdForm;
