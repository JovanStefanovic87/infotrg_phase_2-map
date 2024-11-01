'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { investicioniFondLinksData, contentBlocksData } from './investicioniFondData';
import ImageModal from '../../../components/modals/ImageModal';
import ImageBlock from '../../../components/image/ImageBlock';
import TextWrapped from '../../../components/text/TextWrapped';
import H1 from '@/app/components/text/H1';
import PageContainer from '@/app/components/containers/PageContainer';
import OrderedList from '@/app/components/text/OrderedList';
import H2 from '@/app/components/text/H2';
import H3 from '@/app/components/text/H3';
import H4 from '@/app/components/text/H4';
import Text from '@/app/components/text/Text';
import Devider2 from '@/app/components/ui/Devider2';
import TextNormal from '@/app/components/text/TextNormal';
import useScrollToTop from '@/utils/helpers/useScrollToTop';

const PageContent: React.FC = () => {
	useScrollToTop();
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	const marginLeftSmall = '2vw';
	const maxWidth = `calc(100vw - ${50}px)`;

	const openImageModal = (image: string) => {
		setSelectedImage(image);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
	};

	const pathname = usePathname();
	const blockId: string = pathname.split('/').pop() || '';

	const block = investicioniFondLinksData.find(item => item.id === blockId);
	const contentBlocks = (contentBlocksData as any)[blockId] || [];

	if (!block) return <p>Block not found</p>;

	return (
		<PageContainer>
			<H1 title='INVESTICIONI FOND' pb='0' />
			<div className='relative'>
				<div className={`mb-4 flex flex-col items-center pt-4 pb-8`}>
					<H2 text={block.listOrder} weight='normal' align='center' color='black' />
					<H2 text={block.label.toUpperCase()} weight='bold' align='center' color='black' />
					<H2 text={block.amount} align='center' weight='normal' color='black' />
				</div>

				{contentBlocks.length > 0 &&
					contentBlocks.map((block: any, index: number) => (
						<div key={index} className='flex flex-col' style={{ maxWidth: maxWidth }}>
							{block.type === 'text' ? (
								<div className='py-3'>
									<TextNormal
										text={block.content}
										weight={block.weight}
										paddingLeft={marginLeftSmall}
										align={block.align}
									/>
								</div>
							) : block.type === 'image' ? (
								Array.isArray(block.url) ? (
									block.url.map((image: string, imgIndex: number) => (
										<ImageBlock
											key={imgIndex}
											image={image}
											imgIndex={imgIndex}
											openImageModal={openImageModal}
										/>
									))
								) : (
									<ImageBlock
										key={index}
										image={block.content || ''}
										imgIndex={index}
										openImageModal={openImageModal}
									/>
								)
							) : block.type === 'paragraph1' || block.type === 'paragraph2' ? (
								<TextWrapped block={block.content || ''} />
							) : block.type === 'hr' ? (
								<Devider2 marginY={12} height={block.height} />
							) : block.type === 'list' ? (
								<OrderedList items={[block]} />
							) : block.type === 'h2' ? (
								<H2 text={block.content} align='center' />
							) : block.type === 'H2BoldCenter' ? (
								<H2 text={block.content} align='center' weight='bold' />
							) : block.type === 'h3' ? (
								<H3 text={block.content} />
							) : block.type === 'h4' ? (
								<H4 text={block.content} paddingBottom={6} wrap={true} />
							) : block.type === 'p' ? (
								<Text
									text={block.content}
									weight={block.weight}
									paddingLeft={block.paddingLeft}
									align={block.align}
								/>
							) : null}
						</div>
					))}
			</div>
			{isImageModalOpen && (
				<ImageModal src={selectedImage} alt={`Image`} onClose={closeImageModal} />
			)}
		</PageContainer>
	);
};

export default PageContent;
