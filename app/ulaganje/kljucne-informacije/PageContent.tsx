'use client';
import React from 'react';
import { contentData } from './keyInformationsData';
import H1 from '../../components/text/H1';
import PageContainer from '../../components/containers/PageContainer';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import TextBoldAndLink from '@/app/components/text/TextBoldAndLink';

const AboutContent: React.FC = () => {
	useScrollToTop();

	return (
		<PageContainer>
			<H1 title='KLJUČNE INFORMACIJE O ULAGANJU U INFOTRG' pb={36} />
			<div className='relative bg-gradient-white shadow-md rounded-lg p-4'>
				{contentData.length > 0 &&
					contentData.map((block: any, index: number) => (
						<div key={index}>
							{block.type === 'TextBoldCustom' ? (
								<TextBoldAndLink
									label={block.label}
									content={block.content}
									paddingLeft={block.paddingLeft}
									paddingTop={block.paddingTop}
								/>
							) : null}
						</div>
					))}
			</div>
		</PageContainer>
	);
};

export default AboutContent;
