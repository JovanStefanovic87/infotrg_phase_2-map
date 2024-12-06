import React from 'react';
import { pageContentTranslations, PageContentTranslations } from '@/utils/translations';

interface CategorySearchInputProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	languageCode: string;
}

const ModalSearchInput: React.FC<CategorySearchInputProps> = ({
	searchTerm,
	setSearchTerm,
	languageCode,
}) => {
	const translations: PageContentTranslations = pageContentTranslations;
	return (
		<div className='mb-4'>
			<input
				type='text'
				placeholder={translations[languageCode].search}
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black'
			/>
		</div>
	);
};

export default ModalSearchInput;
