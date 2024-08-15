'use client';
import React, { useState } from 'react';
import ContentBlockContainer from '../../components/containers/ContentBlockContainer';
import CoverImage from '../../components/image/CoverImage';
import { ContentBlockItem } from '@/utils/helpers/types';
import BlockText from '@/app/components/text/BlockText';
import BlockTitileWrap from '@/app/components/text/BlockTitileWrap';
import ContentModalInnerContainer from '@/app/components/containers/ContentModalInnerContainer';
import ContentModalContainer from '@/app/components/containers/ContentModalContainer';
import ContentDisplay from './ContentDisplay';
import BlockButton from '../buttons/BlockButton';
import ContentBlockInnerContainer from '../containers/ContentBlockInnerContainer';

interface Props {
	title: string;
	description: string;
	coverImage?: string;
	contentBlocks: ContentBlockItem[];
	openContentModal?: (contentBlocks: ContentBlockItem[]) => void;
	content?: any;
}

const ContentBlock: React.FC<Props> = ({
	title,
	description,
	coverImage,
	contentBlocks,
	openContentModal,
	content,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleOpenModal = () => {
		if (openContentModal) {
			openContentModal(contentBlocks);
		}
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<ContentBlockContainer
				contentBlocks={contentBlocks}
				openContentModal={handleOpenModal}
				isLink={false}
				useModal={true}>
				<ContentBlockInnerContainer>
					<BlockTitileWrap text={title} />
					{coverImage && (
						<div className='cover-image'>
							<CoverImage src={coverImage} alt={title} />
						</div>
					)}
					<BlockText description={description} maxLines={2} align='center' />
					<BlockButton text='Vidi još' />
				</ContentBlockInnerContainer>
			</ContentBlockContainer>

			{isModalOpen && (
				<ContentModalContainer onContentModalClose={handleCloseModal} isStandard={false}>
					<ContentModalInnerContainer>
						<ContentDisplay data={content} />
					</ContentModalInnerContainer>
				</ContentModalContainer>
			)}
		</>
	);
};

export default ContentBlock;
