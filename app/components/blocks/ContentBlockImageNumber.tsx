'use client';
import React, { useState } from 'react';
import ContentBlockContainer from '../../components/containers/ContentBlockContainer';
import CoverImage from '../../components/image/CoverImage';
import { ContentBlockItem } from '@/utils/helpers/types';
import ImageModal from '@/app/components/modals/ImageModal';
import Devider from '@/app/components/ui/Devider';
import BlockText from '@/app/components/text/BlockText';
import BlockTitle from '@/app/components/text/BlockTitle';
import ContentBlockInnerContainer from '../containers/ContentBlockInnerContainer';
import BlockButton from '../buttons/BlockButton';

interface Props {
	title: string;
	description: string;
	date?: string;
	coverImage?: string;
	contentBlocks: ContentBlockItem[];
	openContentModal: (contentBlocks: ContentBlockItem[]) => void;
	isLink?: boolean;
	deviderMarginY?: string;
}

const ContentBlockImageNumber: React.FC<Props> = ({
	title,
	description,
	date,
	coverImage,
	contentBlocks,
	openContentModal,
	isLink = false,
	deviderMarginY,
}) => {
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	const openImageModal = (image: string) => {
		setSelectedImage(image);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
	};

	return (
		<>
			<ContentBlockContainer
				contentBlocks={contentBlocks}
				openContentModal={openContentModal}
				isLink={isLink ? isLink : false}>
				<ContentBlockInnerContainer>
					{coverImage && (
						<CoverImage src={coverImage} alt={title} openImageModal={openImageModal} useModal />
					)}
					<BlockText description={description} maxLines={20} align='center' />

					{date && (
						<>
							<div className='sm:block hidden'>
								<Devider marginY='0' />
							</div>
							<BlockTitle text={date} align='center' bgColor='transparent' />
						</>
					)}
					{isLink && <BlockButton text='Vidi još' />}
				</ContentBlockInnerContainer>
			</ContentBlockContainer>

			{isImageModalOpen && !isLink && (
				<ImageModal src={selectedImage} alt={`Image`} onClose={closeImageModal} />
			)}
		</>
	);
};

export default ContentBlockImageNumber;
