'use client';
import React, { useState } from 'react';
import { contentData, hyperlinks } from './BussinessCooperationData';
import ContentBlock from '../../components/blocks/ContentBlock';
import H1 from '../../components/text/H1';
import PageContainer from '../../components/containers/PageContainer';
import H2Title from '@/app/components/text/H2Title';
import UnorderedList from '@/app/components/text/UnorderedList';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import { BasicInformation } from '@/utils/helpers/types';
import ImageModal from '@/app/components/modals/ImageModal';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';
import ContentDescriptionText from '@/app/components/text/ContentDescriptionText';

const BussinessCooperation: React.FC = () => {
	useScrollToTop();
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	const columns = useResponsiveColumns(1);

	const openImageModal = (image: string) => {
		setSelectedImage(image);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
	};

	if (columns === null) return null;

	return (
		<PageContainer>
			<H1 title='POSLOVNA SARADNJA' pb='0' />
			<div className='border-b-2 pt-4 pb-4'>
				<ContentDescriptionText
					text='Strategija razvoja Infotrga odvija se kroz deset osnovnih koraka, tokom kojih su uspostavljena pravila međusobne komunikacije i raspodele radnih zaduženja među saradnicima.'
					align='center'
					color='black'
				/>
			</div>
			<div className='px-2 pt-4'>
				<H2Title text='SAŽET PRIKAZ POSLOVNE SARADNJE' padding={10} color='black' />
			</div>
			{renderGridSystem({
				contentData,
				columns: columns,
				useLink: false,
				children: (block: BasicInformation) => (
					<ContentBlock
						title={''}
						description={block.description || ''}
						coverImage={block.coverImage}
						contentBlocks={[]}
						openContentModal={() => openImageModal(block.coverImage || '')}
						isLink={false}
					/>
				),
			})}
			<H2Title text='OPŠIRNIJI PRIKAZ POSLOVNE SARADNJE' padding={24} />
			<div className='sm:p-2'>
				<div className='flex justify-center p-8 items-start md:items-center'>
					<UnorderedList items={hyperlinks} />
				</div>
			</div>
			{isImageModalOpen && (
				<ImageModal src={selectedImage} alt={`Image`} onClose={closeImageModal} />
			)}
		</PageContainer>
	);
};

export default BussinessCooperation;
