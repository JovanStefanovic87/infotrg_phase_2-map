'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { fullDescriptionDataLinksData, contentBlocksData } from './fullDescriptionData';
import H1 from '@/app/components/text/H1';
import PageContainer from '@/app/components/containers/PageContainer';
import H2Title from '@/app/components/text/H2Title';
import ContentBlock from '@/app/components/blocks/ContentBlock';
import renderGridSystem2 from '@/utils/helpers/renderGridSystem2';
import ImageModal from '@/app/components/modals/ImageModal';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';

const PageContent: React.FC = () => {
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

	const pathname = usePathname();
	const blockId: string = pathname.split('/').pop() || '';

	const block = fullDescriptionDataLinksData.find(item => item.id === blockId);

	const contentBlocks = (contentBlocksData as any)[blockId] || [];

	if (!block) return null;

	return (
		<PageContainer>
			<H1 title='POSLOVNA SARADNJA' pb='0' />
			<div className='pb-4 sm:pb-10'>
				<H2Title text={block.label.toUpperCase()} padding={10} />
			</div>
			{renderGridSystem2({
				contentBlocks,
				columns,
				useLink: false,
				children: block => (
					<ContentBlock
						title={''}
						description={block.description}
						coverImage={block.coverImage}
						contentBlocks={[]}
						openContentModal={() => openImageModal(block.coverImage)}
						isLink={false}
					/>
				),
			})}
			{isImageModalOpen && (
				<ImageModal src={selectedImage} alt={`Image`} onClose={closeImageModal} />
			)}
		</PageContainer>
	);
};

export default PageContent;
