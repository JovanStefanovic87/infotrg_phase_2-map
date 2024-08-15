'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { contentData, contentBlocksData, contentBlocks2Data } from './memebrs';
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
import Image from 'next/image';
import TextSpecifications from '@/app/components/text/TextSpecifications';
import useScrollToTop from '@/utils/helpers/useScrollToTop';

interface Props {
	[key: string]: string;
}

interface ContentTitleProps {
	keyName: string;
	type: 'maintain' | 'service';
}

const ContentTitle: React.FC<ContentTitleProps> = ({ keyName, type }) => {
	useScrollToTop();
	const getTitleText = () => {
		const nameMap: { [key: string]: string } = {
			autor: 'autora',
			administrator: 'administratora',
			vebmaster: 'vebmastera',
			koordinator: 'koordinatora',
			'graficki-dizajner': 'grafičkog dizajnera',
			'pr-menadzer': 'pr menadžera',
			'marketing-menadzer': 'marketing menadžera',
		};
		const name = nameMap[keyName] || keyName;
		if (type === 'maintain') {
			return `ZADUŽENJA ${name.toUpperCase()} NA ODRŽAVANJU I UNAPREĐIVANJU INFOTRGA`;
		} else if (type === 'service') {
			return `ZADUŽENJA ${name.toUpperCase()} U OKVIRU USLUŽNIH DELATNOSTI INFOTRGA`;
		}
		return '';
	};

	return (
		<>
			<H2 text={getTitleText()} align='center' color='black' />
			<div className='h-8'></div>
		</>
	);
};

const PageContent: React.FC = () => {
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

	/* const openImageModal = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  }; */

	const closeImageModal = () => {
		setIsImageModalOpen(false);
	};

	const pathname = usePathname();
	const blockId: string = pathname.split('/').pop() || '';

	const block = contentData.find(item => item.id === blockId);
	const contentBlocks = (contentBlocksData as any)[blockId] || [];
	const contentBlocks2 = (contentBlocks2Data as any)[blockId] || [];

	if (!block) return <p>Block not found</p>;

	return (
		<PageContainer>
			<H1 title='INFOTRG TIM' pb='0' />
			<div className='relative pt-2 bg-gradient-white shadow-md rounded-lg p-4 mt-8'>
				<div className='flex flex-col'>
					{block.title && <H2 text={block.title.toUpperCase()} align='center' color={'black'} />}
					<div className='flex flex-col lg:flex-row justify-center items-center gap-8'>
						<div
							className={`relative mt-4 flex items-center justify-center h-52 w-52 lg:h-120 lg:w-120 p-4`}>
							<Image
								src={block.image}
								alt={block.image}
								fill
								style={{ objectFit: 'contain' }}
								priority
								sizes='100%'
							/>
						</div>
						<div className='flex flex-col w-full lg:w-auto'>
							{[
								{ label: 'Ime i prezime:', value: block.name },
								{ label: 'Datum rođenja:', value: block.birth },
								{ label: 'Zanimanje:', value: block.profession },
								{ label: 'Afiniteti:', value: block.affinities },
								{ label: 'Prethodni angažmani:', value: block.previousEngagements },
								{ label: 'Angažman na Infotrgu:', value: block.infotrgEngagements },
								{ label: 'Telefon:', value: block.phone },
								{ label: 'Email:', value: block.email },
							].map((item, index) => (
								<TextSpecifications key={index} label={item.label} value={item.value} />
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='relative pt-2 bg-gradient-white shadow-md rounded-lg p-4 mt-8'>
				{contentBlocks.length > 0 && (
					<>
						<ContentTitle keyName={blockId} type='maintain' />
						{contentBlocks.map((block: any, index: number) => (
							<div key={index} className='flex flex-col'>
								{block.type === 'text' ? (
									<TextWrapped block={block.content || ''} />
								) : block.type === 'hr' ? (
									<Devider2 marginY={8} height={block.height} width='50%' />
								) : block.type === 'list' ? (
									<OrderedList items={[block]} />
								) : block.type === 'h2' ? (
									<H2 text={block.content} align='center' color={block.color} />
								) : block.type === 'H2BoldCenter' ? (
									<H2 text={block.content} align='center' weight='bold' />
								) : block.type === 'h3' ? (
									<H3 text={block.content} align='left' />
								) : block.type === 'h4' ? (
									<div className='pt-4'>
										<H4 text={block.content} weight='bold' color='black' paddingTop={16} />
									</div>
								) : block.type === 'pNormal' ? (
									<TextNormal
										text={`► ${block.content}`}
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
															className={`flex flex-col items-center justify-center w-20 h-20 text-black p-2 rounded-full sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 shadow-grayLight shadow-lg border-2 border-l-blueLightest border-r-blueLightest`}
															style={{ backgroundColor: bgColorClass }}>
															<p
																className='font-boldtext-xs text-xxxs sm:text-xxs md:text-xs lg:text-sm font-bold underline underline-offset-4'
																style={{ color: textColorClass }}>
																{key.toLocaleUpperCase()}
															</p>
															<p
																className='text-xxxs sm:text-xxs md:text-xs lg:text-sm text-center'
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
					</>
				)}
			</div>
			{contentBlocks2.length > 0 && (
				<div className='relative pt-2 bg-gradient-white shadow-md rounded-lg p-4 mt-8'>
					<ContentTitle keyName={blockId} type='service' />
					{contentBlocks2.map((block: any, index: number) => (
						<div key={index} className='flex flex-col'>
							{block.type === 'text' ? (
								<TextWrapped block={block.content || ''} />
							) : block.type === 'hr' ? (
								<Devider2 marginY={8} height={block.height} width='50%' />
							) : block.type === 'list' ? (
								<OrderedList items={[block]} />
							) : block.type === 'h2' ? (
								<H2 text={block.content} align='center' color={block.color} />
							) : block.type === 'H2BoldCenter' ? (
								<H2 text={block.content} align='center' weight='bold' />
							) : block.type === 'h3' ? (
								<H3 text={block.content} align='left' />
							) : block.type === 'h4' ? (
								<div className='pt-4'>
									<H4 text={block.content} weight='bold' color='black' paddingTop={16} />
								</div>
							) : block.type === 'pNormal' ? (
								<TextNormal
									text={`► ${block.content}`}
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
														className={`flex flex-col items-center justify-center w-20 h-20 text-black p-2 rounded-full sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 shadow-grayLight shadow-lg border-2 border-l-blueLightest border-r-blueLightest`}
														style={{ backgroundColor: bgColorClass }}>
														<p
															className='font-boldtext-xs text-xxxs sm:text-xxs md:text-xs lg:text-sm font-bold underline underline-offset-4'
															style={{ color: textColorClass }}>
															{key.toLocaleUpperCase()}
														</p>
														<p
															className='text-xxxs sm:text-xxs md:text-xs lg:text-sm text-center'
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
			)}
			{isImageModalOpen && (
				<ImageModal src={selectedImage} alt={`Image`} onClose={closeImageModal} />
			)}
		</PageContainer>
	);
};

export default PageContent;
