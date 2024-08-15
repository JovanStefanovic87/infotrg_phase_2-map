'use client';
import React, { useState } from 'react';
import { NextPage } from 'next';
import { contentData } from './investorsData';
import ContentBlock from './ContentBlock';
import H1 from '../../components/text/H1';
import PageContainer from '../../components/containers/PageContainer';
import Investor from './Investor';
import ContentModalContainer from '@/app/components/containers/ContentModalContainer';
import ContentModalInnerContainer from '@/app/components/containers/ContentModalInnerContainer';
import useScrollToTop from '@/utils/helpers/useScrollToTop';

const Investors: NextPage = () => {
	useScrollToTop();
	const [modalData, setModalData] = useState<{
		type: 'investment' | 'withdrawal';
		data: any;
	} | null>(null);

	const handleOpenModal = (type: 'investment' | 'withdrawal', data: any) => {
		setModalData({ type, data });
	};

	const handleCloseModal = () => {
		setModalData(null);
	};

	return (
		<PageContainer>
			<H1 title='INVESTITORI' />

			<div className='lg:grid lg:grid-cols-3 lg:gap-8 rounded-md overflow-hidden'>
				{contentData.map(block => (
					<ContentBlock
						key={block.id}
						id={block.id}
						name={block.name}
						email={block.email}
						phone={block.phone}
						amount={block.amount}
						share={block.share}
						contentBlocks={[]}
						onOpenModal={handleOpenModal}
					/>
				))}
			</div>

			{modalData && (
				<ContentModalContainer onContentModalClose={handleCloseModal} isStandard={false}>
					<ContentModalInnerContainer>
						<Investor id={modalData.data.id} view={modalData.type} name={modalData.data.name} />
					</ContentModalInnerContainer>
				</ContentModalContainer>
			)}
		</PageContainer>
	);
};

export default Investors;
