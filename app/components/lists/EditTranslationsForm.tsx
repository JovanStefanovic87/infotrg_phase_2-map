import React, { useState, useEffect } from 'react';
import { Language, Translation } from '@/utils/helpers/types';
import InputDefault from '../input/InputDefault';
import SubmitButton from '../buttons/SubmitButton';

interface Props {
	currentTranslations: Translation[];
	languages: Language[];
	handleSubmit: (updatedTranslations: Translation[]) => void;
}

const EditTranslationsForm: React.FC<Props> = ({
	currentTranslations,
	languages,
	handleSubmit,
}) => {
	const [updatedTranslations, setUpdatedTranslations] = useState<Translation[]>([]);

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

	// Handle form submission
	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		handleSubmit(updatedTranslations);
	};

	return (
		<form onSubmit={onSubmit} className='flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg'>
			{languages.map((language, i) => {
				const existingTranslation = updatedTranslations.find(t => t.languageId === language.id);
				return (
					<div key={language.id} className='mb-4'>
						<label className='block mb-1 font-medium text-gray-700'>{language.name}</label>
						<InputDefault
							placeholder={
								existingTranslation?.translation
									? `${language.name} translation`
									: `No translation available for ${language.name}`
							}
							value={existingTranslation?.translation || ''} // Display existing translation or empty string
							onChange={e => handleTranslationChange(language.id, e.target.value)}
							className='text-black'
						/>
					</div>
				);
			})}
			<div className='flex justify-center mt-6'>
				<SubmitButton>Save Translations</SubmitButton>
			</div>
		</form>
	);
};

export default EditTranslationsForm;
