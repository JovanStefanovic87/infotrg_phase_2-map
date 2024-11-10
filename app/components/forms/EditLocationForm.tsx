import React, { useState, useEffect } from 'react';
import { Language, Translation, Icon, Location } from '@/utils/helpers/types';
import InputDefault from '../input/InputDefault';
import SubmitButton from '../buttons/SubmitButton';
import UploadNewIconOnEditButton from '../buttons/UploadNewIconOnEditButton';
import Image from 'next/image';
import ChooseImageButton from '../buttons/ChooseImageButton';
import { handleError } from '@/utils/helpers/universalFunctions';
import LabelInputDefault from '../input/LabelInputDefault';

interface Props {
	currentTranslations: Translation[];
	languages: Language[];
	handleSubmitEdit: (
		updatedTranslations: Translation[],
		newIcon: File | null,
		currentIconId: number | null,
		locationId: number,
		type: string,
		postCode?: string,
		address?: string
	) => void;
	currentIcon: string | null;
	currentIconId: number | null;
	newIcon: File | null;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	setCurrentIcon: (icon: Icon | null) => void;
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	locationId: number | null;
	type: string;
	postCode?: string;
	setPostCode?: React.Dispatch<React.SetStateAction<string>>;
	currentLocation: Location | null;
	address?: string;
	setAddress?: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
}

const EditLocationForm: React.FC<Props> = ({
	currentTranslations,
	languages,
	handleSubmitEdit,
	currentIcon,
	newIcon,
	setNewIcon,
	setCurrentIcon,
	setIsIconPickerOpen,
	locationId,
	type,
	currentIconId,
	postCode,
	setPostCode,
	currentLocation,
	address,
	setAddress,
	setSuccessMessage,
	setError,
}) => {
	const [updatedTranslations, setUpdatedTranslations] = useState<Translation[]>([]);
	useEffect(() => {
		const translationsWithLanguages = languages.map(language => {
			const existingTranslation = currentTranslations.find(
				t => t.languageId === language.id && t.labelId === currentTranslations[0]?.labelId
			);

			return (
				existingTranslation || {
					languageId: language.id,
					translation: '',
					labelId: currentTranslations.length ? currentTranslations[0].labelId : 0,
					translationId: 0,
					id: 0,
					createdAt: new Date(),
					synonyms: [],
				}
			);
		});

		setUpdatedTranslations(translationsWithLanguages as Translation[]);
	}, [currentTranslations, languages]);

	useEffect(() => {
		if (currentLocation && (type === 'county' || type === 'city')) {
			if ('postCode' in currentLocation) {
				setPostCode?.(currentLocation.postCode || '');
			}
		}
		if (currentLocation && type === 'suburb') {
			if ('address' in currentLocation) {
				setAddress?.(currentLocation.address || '');
			}
		}
	}, [currentLocation, type]);

	const handleTranslationChange = (languageId: number, translation: string) => {
		setUpdatedTranslations(prevState =>
			prevState.map(t => (t.languageId === languageId ? { ...t, translation } : t))
		);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setNewIcon(event.target.files[0]);
			setCurrentIcon(null);
		}
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (!locationId || locationId === 0) {
			console.error('Invalid locationId:', locationId);
			return;
		}

		handleSubmitEdit(
			updatedTranslations,
			newIcon,
			currentIconId,
			locationId,
			type,
			postCode,
			address
		);

		setNewIcon(null);
		setCurrentIcon(null);
	};

	return (
		<form onSubmit={onSubmit} className='flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg'>
			{/* Icon Section */}
			<div className='mb-6'>
				<label className='block mb-1 font-medium text-gray-700'>Trenutna Icon</label>
				{currentIcon && (
					<div className='mb-4'>
						<Image src={currentIcon} alt='Current Icon' width={100} height={100} />
					</div>
				)}

				<UploadNewIconOnEditButton onChange={handleFileChange} />
				<ChooseImageButton onClick={() => setIsIconPickerOpen(true)} label='Izbor ikonice' />

				{newIcon && (
					<div className='mt-4'>
						<p>Nova ikonica:</p>
						<Image
							src={URL.createObjectURL(newIcon)}
							alt='New Icon Preview'
							width={100}
							height={100}
						/>
					</div>
				)}
			</div>

			{/* Post Code Section (conditionally displayed for city type) */}
			{(type === 'city' || type === 'suburb') && (
				<div className='mb-4'>
					<LabelInputDefault
						label='Poštanski broj'
						value={postCode || ''}
						onChange={e => setPostCode?.(e.target.value)}
						placeholder=''
					/>
				</div>
			)}

			{type === 'suburb' && (
				<div className='mb-4'>
					<LabelInputDefault
						label='Adresa'
						value={address || ''}
						onChange={e => setAddress?.(e.target.value)}
						placeholder=''
					/>
				</div>
			)}

			{/* Translations Section */}
			{languages.map(language => {
				const existingTranslation = updatedTranslations.find(t => t.languageId === language.id);
				return (
					<div key={language.id} className='mb-4'>
						<LabelInputDefault
							label={`${language.name} prevod`}
							value={existingTranslation?.translation || ''}
							onChange={e => handleTranslationChange(language.id, e.target.value)}
							placeholder={`Translation for ${language.name}`}
						/>
					</div>
				);
			})}

			<div className='flex justify-center mt-6'>
				<SubmitButton>Sačuvaj izmene</SubmitButton>
			</div>
		</form>
	);
};

export default EditLocationForm;
