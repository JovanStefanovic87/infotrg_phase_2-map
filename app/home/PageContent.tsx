'use client';
import React, { useState, useEffect } from 'react';
import PageContainer from '../components/containers/PageContainer';
import CategoryList from './CategoryList';
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

interface Props {
	categories: Category[];
}

const PageContent: React.FC<Props> = ({ categories }) => {
	const [languageCode, setLanguageCode] = useState<string>('rs');

	useEffect(() => {
		const cookieLanguage = Cookies.get('languageCode') || 'rs';
		setLanguageCode(cookieLanguage); // Ovo se poziva samo unutar useEffect
	}, []);

	return (
		<PageContainer bgColor='white'>
			<div className='flex flex-col items-center p-6 mx-auto w-full'>
				<h1 className='text-ms sm:text-base lg:text-xl text-center font-bold text-blue-900 leading-snug tracking-wider uppercase text-black'>
					Pronađite proizvode koji vas zanimaju i pogledajte gde se prodaju
				</h1>
			</div>
			<CategoryList categories={categories} languageCode={languageCode} />
		</PageContainer>
	);
};

export default PageContent;
