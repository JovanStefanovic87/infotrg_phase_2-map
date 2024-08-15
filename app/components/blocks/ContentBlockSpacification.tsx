import React from 'react';
import ContentBlockContainer from '../containers/ContentBlockContainer';
import CoverImage from '../image/CoverImage';
import { ContentBlockItem } from '@/utils/helpers/types';
import BlockText from '@/app/components/text/BlockText';
import BlockTitleWrap from '@/app/components/text/BlockTitileWrap';
import ContentBlockInnerContainer from '../containers/ContentBlockInnerContainer';
import BlockButton from '../buttons/BlockButton';
import H4 from '../text/H4';
import TextNormal from '../text/TextNormal';

interface Props {
	title: string;
	description: string;
	descriptionAlign?: 'center' | 'left' | 'right';
	coverImage?: string;
	contentBlocks: ContentBlockItem[];
	openContentModal?: (contentBlocks: ContentBlockItem[]) => void;
	opisPosla: string[];
	usloviRada: string[];
	potrebneKvalifikacije: string[];
	isLink?: boolean;
}

const ContentBlockSpacification: React.FC<Props> = ({
	title,
	description,
	descriptionAlign = 'center',
	coverImage,
	contentBlocks,
	openContentModal = () => {},
	opisPosla,
	usloviRada,
	potrebneKvalifikacije,
	isLink = false,
}) => {
	return (
		<ContentBlockContainer
			contentBlocks={contentBlocks}
			openContentModal={openContentModal}
			isLink={isLink}>
			<ContentBlockInnerContainer>
				{title && <BlockTitleWrap text={title} />}

				{coverImage && (
					<div className='mt-4'>
						<CoverImage src={coverImage} alt={title} useModal />
					</div>
				)}
				<H4 text='Opis posla:' />
				<div className='pt-1 pb-4'>
					{opisPosla.map((item, index) => (
						<TextNormal key={index} text={`➤ ${item}`} paddingLeft='2vw' />
					))}
				</div>

				<H4 text='Uslovi rada:' />
				<div className='pt-1 pb-4'>
					{usloviRada.map((item, index) => (
						<TextNormal key={index} text={`➤ ${item}`} paddingLeft='2vw' />
					))}
				</div>
				<H4 text='Potrebne kvalifikacije:' />
				<div className='pt-1 pb-4'>
					{potrebneKvalifikacije.map((item, index) => (
						<TextNormal key={index} text={`➤ ${item}`} paddingLeft='2vw' />
					))}
				</div>
				<BlockText description={description} maxLines={2} align={descriptionAlign} />
				{isLink && <BlockButton text='Vidi još' />}
			</ContentBlockInnerContainer>
		</ContentBlockContainer>
	);
};

export default ContentBlockSpacification;
