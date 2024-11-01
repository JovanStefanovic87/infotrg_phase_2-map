import React, { useState } from 'react';
import ContentBlockContainer from '../containers/ContentBlockContainer';
import CoverImage from '../image/CoverImage';
import { ContentBlockItem } from '@/utils/helpers/types';
import BlockText from '@/app/components/text/BlockText';
import BlockTitleWrap from '@/app/components/text/BlockTitileWrap';
import ContentBlockInnerContainer from '../containers/ContentBlockInnerContainer';
import BlockButton from '../buttons/BlockButton';
import ImageModal from '../modals/ImageModal';

interface Props {
	title: string;
	description: string;
	descriptionAlign?: 'center' | 'left' | 'right';
	coverImage?: string;
	contentBlocks: ContentBlockItem[];
	openContentModal?: (contentBlocks: ContentBlockItem[]) => void;
	isLink?: boolean;
	useModal?: boolean;
}

const ContentBlock: React.FC<Props> = ({
	title,
	description,
	descriptionAlign = 'center',
	coverImage,
	contentBlocks,
	openContentModal = () => {},
	isLink = true,
	useModal = false,
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
				isLink={isLink}>
				<ContentBlockInnerContainer>
					{title && <BlockTitleWrap text={title} />}
					{coverImage && (
						<CoverImage
							src={coverImage}
							alt={title}
							openImageModal={openImageModal}
							useModal={useModal}
						/>
					)}
					<BlockText description={description} maxLines={2} align={descriptionAlign} />
					{isLink && <BlockButton text='Vidi još' />}
				</ContentBlockInnerContainer>
			</ContentBlockContainer>
			{isImageModalOpen && !isLink && (
				<ImageModal src={selectedImage} alt={`Image`} onClose={closeImageModal} />
			)}
		</>
	);
};

export default ContentBlock;
