'use client';
import React, { useState, useEffect, useMemo } from 'react';
import PageContainer from '../components/containers/PageContainer';
import CategoryList from './CategoryList';
import QuickSearch from '../components/input/QuickSearch';
import { Synonym } from '@/utils/helpers/types';
import Cookies from 'js-cookie';

interface Category {
	id: number;
	name: string;
	iconId?: number;
	parents: Category[];
	children: Category[];
	synonyms: Synonym[];
}

interface CategoryOption {
	value: string;
	label: string;
	parent?: string;
	synonyms?: string[];
}

interface Props {
	categories: Category[];
}

const PageContent: React.FC<Props> = ({ categories }) => {
	const [languageCode, setLanguageCode] = useState<string>('rs');

	useEffect(() => {
		const cookieLanguage = Cookies.get('languageCode') || 'rs';
		setLanguageCode(cookieLanguage); // Ovo se poziva samo unutar useEffect
	}, []);

	const transformCategoriesToOptions = (categories: Category[]): CategoryOption[] => {
		const options: CategoryOption[] = [];

		const traverse = (category: Category, parentName: string | null = null) => {
			options.push({
				value: category.id.toString(),
				label: category.name,
				parent: parentName || undefined,
				synonyms: category.synonyms ? category.synonyms.map(s => s.synonym) : [],
			});

			category.children.forEach(child => traverse(child, category.name));
		};

		categories.forEach(category => traverse(category));
		return options;
	};

	const categoryOptions = useMemo(() => {
		return categories ? transformCategoriesToOptions(categories) : [];
	}, [categories]);

	return (
		<PageContainer bgColor='white'>
			<div className='flex flex-col items-center p-6 mx-auto w-full'>
				<h1 className='text-ms sm:text-base lg:text-xl text-center font-bold text-blue-900 leading-snug tracking-wider uppercase text-black'>
					Pronađite proizvode koji vas zanimaju i pogledajte gde se prodaju
				</h1>
			</div>

			<QuickSearch
				options={categoryOptions}
				onSelect={selectedOption => console.log('Selected option:', selectedOption)}
				placeholder='Brza pretraga kategorija proizvoda...'
			/>
			<CategoryList categories={categories} languageCode={languageCode} />
		</PageContainer>
	);
};

export default PageContent;
