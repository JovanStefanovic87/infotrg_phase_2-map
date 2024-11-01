'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { contentData, contentBlocksData } from '../ulaganjeData';
import ImageModal from '../../components/modals/ImageModal';
import ImageBlock from '../../components/image/ImageBlock';
import TextWrapped from '../../components/text/TextWrapped';
import H1 from '@/app/components/text/H1';
import PageContainer from '@/app/components/containers/PageContainer';
import OrderedList from '@/app/components/text/OrderedList';
import H2 from '@/app/components/text/H2';
import TextNormal from '@/app/components/text/TextNormal';
import Devider2 from '@/app/components/ui/Devider2';
import H3 from '@/app/components/text/H3';
import H4 from '@/app/components/text/H4';
import H3Title from '@/app/components/text/H3Title';
import TextBoldList from '@/app/components/text/TextBoldList';
import TextBoldCustom from '@/app/components/text/TextBoldCustom';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import ContentDescriptionText from '@/app/components/text/ContentDescriptionText';

const PageContent: React.FC = () => {
	useScrollToTop();
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	const openImageModal = (image: string) => {
		setSelectedImage(image);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
	};

	const pathname = usePathname();
	const blockId: string = pathname.split('/').pop() || '';

	const block = contentData.find(item => item.id === blockId);
	const contentBlocks = (contentBlocksData as any)[blockId] || [];

	if (!block) return <p>Block not found</p>;

	return (
		<PageContainer>
			<H1 title={block.title} />
			<div className='border-b-2 pb-4'>
				<ContentDescriptionText
					text='Investicioni fond obuhvata sva potrebna finansijska sredstva koja se ulažu u razvoj projekta sve do njegovog samostalnog funkcionisanja.'
					align='center'
					color='black'
				/>
			</div>
			<div className='pt-4'>
				<ContentDescriptionText text='VREDNOST INVESTICIONOG FONDA:' align='center' color='black'>
					<H2 text={'50.000 EUR'} color={'black'} weight='bold' />
				</ContentDescriptionText>
			</div>
			<H2 text='RASPODELA INVESTICIONOG FONDA' align='center' />
			<div className='relative shadow-md rounded-lg px-4'>
				{contentBlocks.length > 0 &&
					contentBlocks.map((block: any, index: number) => (
						<div key={index}>
							{block.type === 'text' ? (
								<TextWrapped block={block.content || ''} />
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
								<H2
									text={block.content}
									align='center'
									color='black'
									marginBottom={block.marginBottom}
								/>
							) : block.type === 'h3' ? (
								<H3 text={block.content} align='center' />
							) : block.type === 'h3Block' ? (
								<div className='flex items-center justify-center bg-bgMain rounded-lg p-4'>
									<H3Title text={block.content} color='black' />
								</div>
							) : block.type === 'plus' ? (
								<div className='flex items-center justify-center text-bgMain text-4xl'>+</div>
							) : block.type === 'h4' ? (
								<H4
									text={block.content}
									align='left'
									paddingTop={block.paddingTop}
									paddingBottom={6}
								/>
							) : block.type === 'pNormal' ? (
								<TextNormal
									text={block.content}
									weight={block.weight}
									paddingLeft={block.paddingLeft}
									paddingTop={block.paddingTop}
									align={block.align}
									link={block.link}
								/>
							) : block.type === 'H2BoldCenter' ? (
								<H2 text={block.content} weight='bold' align='center' color='black' />
							) : block.type === 'TextBoldList' ? (
								<TextBoldList
									bullet={block.bullet}
									content={block.content}
									paddingLeft={block.paddingLeft}
								/>
							) : block.type === 'TextBoldCustom' ? (
								<TextBoldCustom
									label={block.label}
									content={block.content}
									paddingLeft={block.paddingLeft}
									paddingTop={block.paddingTop}
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
