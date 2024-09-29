import React, { useState, useEffect } from 'react';
import { Language, Translation, Icon } from '@/utils/helpers/types';
import InputDefault from '../input/InputDefault';
import SubmitButton from '../buttons/SubmitButton';

interface Props {
	currentTranslations: Translation[];
	languages: Language[];
	handleSubmit: (updatedTranslations: Translation[]) => void;
	currentIcon: string | null; // URL of the current icon
	newIcon: File | null; // Newly selected icon
	setNewIcon: React.Dispatch<React.SetStateAction<File | null>>;
	availableIcons: Icon[]; // List of available icons
	setCurrentIcon: (icon: Icon | null) => void; // Correct type for selecting an existing icon
	setIsIconPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
}) => {
	const [updatedTranslations, setUpdatedTranslations] = useState<Translation[]>([]);
	const [showIconPicker, setShowIconPicker] = useState<boolean>(false); // State to control visibility of icon picker

	// Initialize translations for all languages (including existing translations or empty fields)
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

	// Handle icon file selection
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setNewIcon(event.target.files[0]);
		}
	};

	// Handle form submission
	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		handleSubmit(updatedTranslations);
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

				{/* File input for selecting a new icon */}
				<input
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					className='border p-2 w-full'
				/>

				{newIcon && (
					<div className='mt-4'>
						<p>New Icon:</p>
						<img
							src={URL.createObjectURL(newIcon)}
							alt='New Icon Preview'
							className='w-16 h-16 object-cover'
						/>
					</div>
				)}
			</div>

			{/* Button to show available icons */}
			<div className='mb-6'>
				<button
					type='button'
					onClick={() => setIsIconPickerOpen(true)}
					className='bg-gray-300 p-2 rounded-md'>
					{showIconPicker ? 'Hide Available Icons' : 'Choose from Existing Icons'}
				</button>
			</div>

			{/* Conditionally render the available icons based on state */}
			{showIconPicker && (
				<div className='mb-6'>
					<label className='block mb-1 font-medium text-gray-700'>Available Icons</label>
					<div className='flex flex-wrap gap-2'>
						{availableIcons.map(icon => (
							<button
								key={icon.id}
								type='button'
								onClick={() => setCurrentIcon(icon)}
								className='border p-2'>
								<img src={icon.url} alt='Available Icon' className='w-16 h-16 object-cover' />
							</button>
						))}
					</div>
				</div>
			)}

			{/* Translations Section */}
			{languages.map((language, i) => {
				const existingTranslation = updatedTranslations.find(t => t.languageId === language.id);
				return (
					<div key={language.id} className='mb-4'>
						<label className='block mb-1 font-medium text-gray-700'>{language.name}</label>
						<InputDefault
							placeholder={
								existingTranslation?.translation || `No translation available for ${language.name}`
							}
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
