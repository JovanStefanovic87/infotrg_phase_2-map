import React, { useState, useEffect } from 'react';
import { Language, Translation, Icon } from '@/utils/helpers/types';
import InputDefault from '../input/InputDefault';
import SubmitButton from '../buttons/SubmitButton';
import UploadNewIconOnEditButton from '../buttons/UploadNewIconOnEditButton';
import Image from 'next/image';
import ChooseImageButton from '../buttons/ChooseImageButton';

interface Props {
	currentTranslations: Translation[];
	languages: Language[];
	handleSubmit: (
		updatedTranslations: Translation[],
		newIcon: File | null,
		currentIconId: number | null,
		locationId: number,
		type: string,
		postalCode?: string // Make postalCode optional for locations other than cities
	) => void;
	currentIcon: string | null;
	currentIconId: number | null;
	newIcon: File | null;
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	availableIcons: Icon[];
	setCurrentIcon: (icon: Icon | null) => void;
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	locationId: number | null;
	type: string;
	postalCode?: string; // Add postalCode
	setPostalCode?: React.Dispatch<React.SetStateAction<string>>; // Add setPostalCode
}

const EditLocationForm: React.FC<Props> = ({
	currentTranslations,
	languages,
	handleSubmit,
	currentIcon,
	newIcon,
	setNewIcon,
	availableIcons,
	setCurrentIcon,
	setIsIconPickerOpen,
	locationId,
	type,
	currentIconId,
	postalCode, // Postal code
	setPostalCode, // Function to update postal code
}) => {
	const [updatedTranslations, setUpdatedTranslations] = useState<Translation[]>([]);

	// Initialize translations for all languages (including existing translations or empty fields)
	console.log(postalCode);
	useEffect(() => {
		const translationsWithLanguages = languages.map(language => {
			const existingTranslation = currentTranslations.find(
				t => t.languageId === language.id && t.labelId === currentTranslations[0]?.labelId
			);

			return (
				existingTranslation || {
					languageId: language.id,
					translation: '', // Empty for languages without translations
					labelId: currentTranslations.length ? currentTranslations[0].labelId : 0,
					translationId: Math.random(),
					id: Math.random(),
					createdAt: new Date(),
					synonyms: [],
				}
			);
		});

		setUpdatedTranslations(translationsWithLanguages);
	}, [currentTranslations, languages]);

	// Handle translation change
	const handleTranslationChange = (languageId: number, translation: string) => {
		setUpdatedTranslations(prevState =>
			prevState.map(t => (t.languageId === languageId ? { ...t, translation } : t))
		);
	};

	// Handle icon file selection (new upload)
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setNewIcon(event.target.files[0]); // Set new icon
			setCurrentIcon(null); // Clear the existing icon when a new icon is selected
		}
	};

	// Handle form submission
	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		// Validate locationId
		if (!locationId || locationId === 0) {
			console.error('Invalid locationId:', locationId);
			return;
		}

		handleSubmit(updatedTranslations, newIcon, currentIconId, locationId, type, postalCode);
	};

	return (
		<form onSubmit={onSubmit} className='flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg'>
			{/* Icon Section */}
			<div className='mb-6'>
				<label className='block mb-1 font-medium text-gray-700'>Current Icon</label>
				{currentIcon && (
					<div className='mb-4'>
						<img src={currentIcon} alt='Current Icon' className='w-16 h-16 object-cover' />
					</div>
				)}

				<UploadNewIconOnEditButton onChange={handleFileChange} />
				<ChooseImageButton onClick={() => setIsIconPickerOpen(true)} label='Izbor ikonice' />

				{newIcon && (
					<div className='mt-4'>
						<p>New Icon:</p>
						<Image
							src={URL.createObjectURL(newIcon)}
							alt='New Icon Preview'
							className='w-16 h-16 object-cover'
							width={16}
							height={16}
						/>
					</div>
				)}
			</div>

			{/* Postal Code Section (conditionally displayed for city type) */}
			{type === 'city' && (
				<div className='mb-4'>
					<label className='block mb-1 font-medium text-gray-700'>Postal Code</label>
					<input
						type='text'
						value={postalCode || ''}
						onChange={e => setPostalCode?.(e.target.value)} // Update postal code
						className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
					/>
				</div>
			)}

			{/* Translations Section */}
			{languages.map(language => {
				const existingTranslation = updatedTranslations.find(t => t.languageId === language.id);
				return (
					<div key={language.id} className='mb-4'>
						<label className='block mb-1 font-medium text-gray-700'>{language.name}</label>
						<InputDefault
							placeholder={`Translation for ${language.name}`}
							value={existingTranslation?.translation || ''}
							onChange={e => handleTranslationChange(language.id, e.target.value)}
							className='text-black'
						/>
					</div>
				);
			})}

			<div className='flex justify-center mt-6'>
				<SubmitButton>Save Changes</SubmitButton>
			</div>
		</form>
	);
};

export default EditLocationForm;
