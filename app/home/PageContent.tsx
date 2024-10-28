'use client';
import React, { useState, useEffect } from 'react';
import { contentData, mapIdToPath } from './pocetnaData';
import ContentBlock from '../components/blocks/ContentBlock';
import PageContainer from '../components/containers/PageContainer';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import AnimationBlock from './AnimationBlock';
import H2Title from '../components/text/H2Title';
import H2 from '../components/text/H2';
import TextSpecifications from '../components/text/TextSpecifications';
import H3Title from '../components/text/H3Title';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';
import CallToActionButton from '../components/buttons/CallToActionButton';
import H1 from '../components/text/H1';
import { prefixAticleCategory } from '@/app/api/prefix';
import { useCategoriesByPrefixAndLanguage } from '@/app/helpers/api/category';
import CategoryList from './CategoryList';

const PageContent: React.FC = () => {
	const columns = useResponsiveColumns(1);

	const { data: categories } = useCategoriesByPrefixAndLanguage({
		prefix: prefixAticleCategory,
		languageId: 1,
	});

	console.log('categories', categories);

	return (
		<PageContainer>
			<div className='flex flex-col items-center bg-mainWhite rounded-lg p-4 sm:p-8 shadow-lg mb-4 mx-auto w-full'>
				<h1 className='text-lg sm:text-3xl lg:text-4xl text-center font-bold text-black leading-snug uppercase'>
					Pronađite proizvode i gde se prodaju
				</h1>
			</div>

			<CategoryList categories={categories} />

			<div className='bg-white sm:bg-transparent rounded-md overflow-hidden mb-4 sm:mb-0 sm:mt-2'>
				{renderGridSystem({
					contentData,
					columns: columns,
					useLink: true,
					mapIdToPath: (id: string) => mapIdToPath(id),
					children: block => (
						<ContentBlock
							title={block.title}
							description={block.description || ''}
							coverImage={block.coverImage}
							contentBlocks={[]}
							openContentModal={() => {}}
						/>
					),
				})}
			</div>
			<div className='flex flex-col items-stretch sm:items-center bg-mainWhite rounded-lg p-6 shadow-lg'>
				<div className='w-full mb-4'>
					<H3Title text='Kontakt' color='black' />
				</div>
				<div className='w-full xl:w-1/3'>
					<TextSpecifications label='Koordinator projekta' value='Miroslav Ostrogonac' />
					<TextSpecifications label='Telefon' value='060 145 13 49' />
					<TextSpecifications label='Email' value='suinfotrg@gmail.com' />
				</div>
			</div>
		</PageContainer>
	);
};

export default PageContent;
