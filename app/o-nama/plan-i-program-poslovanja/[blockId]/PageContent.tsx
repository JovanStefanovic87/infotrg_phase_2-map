'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { pppLinksData, contentBlocksData } from './pppData';
import ImageModal from '../../../components/modals/ImageModal';
import TextWrapped from '../../../components/text/TextWrapped';
import H1 from '@/app/components/text/H1';
import PageContainer from '@/app/components/containers/PageContainer';
import OrderedList from '@/app/components/text/OrderedList';
import H2 from '@/app/components/text/H2';
import H3 from '@/app/components/text/H3';
import H4 from '@/app/components/text/H4';
import Text from '@/app/components/text/Text';
import TextNormal from '@/app/components/text/TextNormal';
import Devider2 from '@/app/components/ui/Devider2';
import useScrollToTop from '@/utils/helpers/useScrollToTop';

interface Props {
	[key: string]: string;
}

const PageContent: React.FC = () => {
	useScrollToTop();
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	const getBgColorByOwner = (owner?: string): string => {
		switch (owner) {
			case 'autor':
				return 'white';
			case 'administrator':
				return 'darkblue';
			case 'koordinator':
				return 'black';
			case 'webmaster':
				return 'red';
			case 'marketing-manager':
				return 'orange';
			case 'pr':
				return 'yellow';
			case 'graphic-designer':
				return 'purple';
			default:
				return 'transparent';
		}
	};

	const getTextColorByOwner = (owner?: string): string => {
		switch (owner) {
			case 'autor':
				return 'black';
			case 'administrator':
				return 'white';
			case 'koordinator':
				return 'white';
			case 'webmaster':
				return 'white';
			case 'marketing-manager':
				return 'black';
			case 'pr':
				return 'black';
			case 'graphic-designer':
				return 'white';
			default:
				return 'black';
		}
	};

	const openImageModal = (image: string) => {
		setSelectedImage(image);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
	};

	const pathname = usePathname();
	const blockId: string = pathname.split('/').pop() || '';

	const block = pppLinksData.find(item => item.id === blockId);
	const contentBlocks = (contentBlocksData as any)[blockId] || [];

	if (!block) return <p>Block not found</p>;

	return (
		<PageContainer>
			<H1 title='PLAN I PROGRAM POSLOVANJA' pb='0' />
			<H2 text={block.label.toUpperCase()} weight='bold' align='center' />
			<H2 text={block.amount} weight='bold' align='center' />
			<div className='relative pt-2 bg-gradient-white shadow-md rounded-lg p-4 mt-8'>
				{contentBlocks.length > 0 &&
					contentBlocks.map((block: any, index: number) => (
						<div key={index} className='flex flex-col'>
							{block.type === 'text' ? (
								<TextWrapped block={block.content || ''} />
							) : block.type === 'hr' ? (
								<Devider2 marginY={24} height={block.height} />
							) : block.type === 'list' ? (
								<OrderedList items={[block]} />
							) : block.type === 'h2' ? (
								<H2 text={block.content} align='center' color={block.color} />
							) : block.type === 'H2BoldCenter' ? (
								<H2 text={block.content} align='center' weight='bold' color={block.color} />
							) : block.type === 'h3' ? (
								<H3 text={block.content} align='center' />
							) : block.type === 'h4' ? (
								<div className='pt-4'>
									<H4 text={block.content} weight='bold' color='black' paddingTop={16} />
								</div>
							) : block.type === 'pNormal' ? (
								<TextNormal
									text={block.content}
									weight={block.weight}
									paddingLeft={block.paddingLeft}
									align={block.align}
								/>
							) : block.type === 'p' ? (
								<Text
									text={block.content}
									weight={block.weight}
									paddingLeft={block.paddingLeft}
									align={block.align}
								/>
							) : block.type === 'listEvenly' ? (
								block.circleContent && (
									<div className='flex flex-wrap justify-center space-x-2 sm:space-x-4 pt-4'>
										<div className='flex flex-wrap justify-center space-x-2 sm:space-x-4'>
											{Object.entries(block.circleContent as Props).map(([key, value], idx) => {
												const bgColorClass = getBgColorByOwner(block.owner);
												const textColorClass = getTextColorByOwner(block.owner);
												return (
													<div
														key={idx}
														className={`flex flex-col items-center justify-center w-24 h-24 text-black p-2 rounded-full lg:w-32 lg:h-32 shadow-grayLight shadow-lg border-2 border-l-blueLightest border-r-blueLightest lowercase`}
														style={{ backgroundColor: bgColorClass }}>
														<p
															className='text-xxxs sm:text-xs md:text-xs lg:text-sm underline underline-offset-8'
															style={{ color: textColorClass }}>
															{key.toLocaleUpperCase()}
														</p>
														<p
															className='text-xxs2 md:text-xs lg:text-base text-center font-bold mt-2'
															style={{ color: textColorClass }}>
															{value}
														</p>
													</div>
												);
											})}
										</div>
									</div>
								)
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
