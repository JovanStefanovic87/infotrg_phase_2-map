import React, { useState } from 'react';
import CategoryHierarchy from './CategoryHierarchy';
import FormDefaultButton from '../../components/buttons/FormDefaultButton';
import { CategoryWithSynonyms, GetRetailStoreApi } from '@/utils/helpers/types';
import ModalSearchInput from '@/app/components/input/ModalSearchInput';
import fuzzysort from 'fuzzysort';
import { pageContentTranslations, PageContentTranslations } from '@/utils/translations';

interface Props {
	isOpen: boolean;
	store: GetRetailStoreApi | null;
	categories: CategoryWithSynonyms[];
	onClose: () => void;
	languageCode: string;
}

const AssortmentModal: React.FC<Props> = ({ isOpen, store, categories, onClose, languageCode }) => {
	const translations: PageContentTranslations = pageContentTranslations;
	const [searchTerm, setSearchTerm] = useState('');

	if (!isOpen || !store) return null;

	const searchCategoriesRecursive = (
		categories: CategoryWithSynonyms[],
		searchTerm: string
	): CategoryWithSynonyms[] => {
		if (!searchTerm) return categories;

		const normalizedSearchTerm = searchTerm.toLowerCase();

		return categories
			.map(category => {
				const matchingChildren = searchCategoriesRecursive(category.children || [], searchTerm);

				const nameMatches = fuzzysort.single(normalizedSearchTerm, category.name);
				const synonymMatches = category.synonyms?.some(synonym =>
					fuzzysort.single(normalizedSearchTerm, synonym)
				);

				if (nameMatches || synonymMatches || matchingChildren.length > 0) {
					return { ...category, children: matchingChildren };
				}

				return null;
			})
			.filter(Boolean) as CategoryWithSynonyms[];
	};

	const filteredCategories = searchCategoriesRecursive(categories, searchTerm);

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8'
			onClick={onClose}>
			<div
				className='relative bg-white rounded-lg shadow-xl w-full max-w-2xl h-[85vh] flex flex-col overflow-hidden'
				onClick={e => e.stopPropagation()}>
				{/* Header */}

				<div className='flex items-center justify-between p-6 bg-yellowLogo text-white rounded-t-lg'>
					<h4 className='text-2xl font-bold text-black'>{store.name}</h4>
					<div className='absolute right-2 top-0'>
						<button
							onClick={onClose}
							className='text-gray-500 hover:text-gray-700 text-4xl font-noraml focus:outline-none ml-2'>
							&times;
						</button>
					</div>
				</div>

				{/* Search Input */}
				<div className='p-4 border-b border-gray-200 bg-gray-50'>
					<ModalSearchInput
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						languageCode={languageCode}
					/>
				</div>

				{/* Categories List */}
				<div className='flex-1 p-4 overflow-y-auto bg-white'>
					<CategoryHierarchy categories={filteredCategories} />
				</div>

				{/* Footer */}
				<div className='flex justify-end p-4 bg-gray-100 border-t border-gray-200'>
					<FormDefaultButton onClick={onClose} label={translations[languageCode].close} />
				</div>
			</div>
		</div>
	);
};

export default AssortmentModal;
