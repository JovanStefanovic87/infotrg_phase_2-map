import React, { useState } from 'react';
import ImageModal from './ImageModal';
import { ContentBlockItem } from '@/utils/helpers/types';
import ContentModalContainer from '../containers/ContentModalContainer';
import TitleMain from '../text/H2';
import ImageBlock from '../image/ImageBlock';
import ContentModalInnerContainer from '../containers/ContentModalInnerContainer';
import TextNormal from '../text/TextNormal';
import H3 from '../text/H3';

interface Props {
	title: string;
	contentBlocks: ContentBlockItem[];
	onContentModalClose: () => void;
}

const ContentModal: React.FC<Props> = ({ title, contentBlocks, onContentModalClose }) => {
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');
	const [isContentModalOpen, setIsContentModalOpen] = useState(false);
	const [selectedContent, setSelectedContent] = useState<ContentBlockItem[]>([]);

	const openImageModal = (image: string) => {
		setSelectedImage(image);
		setIsImageModalOpen(true);
	};

	const closeImageModal = () => {
		setIsImageModalOpen(false);
	};

	const openContentModal = (content: ContentBlockItem[]) => {
		setSelectedContent(content);
		setIsContentModalOpen(true);
	};

	const closeContentModal = () => {
		setIsContentModalOpen(false);
	};

	return (
		<>
			<ContentModalContainer onContentModalClose={onContentModalClose}>
				<ContentModalInnerContainer>
					<TitleMain text={title} />
					<div className='relative z-40 pt-6'>
						{contentBlocks.map((block, index) => (
							<div
								key={index}
								className='mb-6'
								onClick={() => {
									if (Array.isArray(block.content)) {
										openContentModal(block.content);
									}
								}}>
								{block.type === 'image' ? (
									Array.isArray(block.content) ? (
										block.content.map((image, imgIndex) => (
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
											image={block.content as string}
											imgIndex={index}
											openImageModal={openImageModal}
										/>
									)
								) : block.type === 'pNormal' ? (
									<TextNormal text={block.content as string} />
								) : block.type === 'h3' ? (
									<H3 text={block.content as string} />
								) : (
									<p></p>
								)}
							</div>
						))}
					</div>
				</ContentModalInnerContainer>
			</ContentModalContainer>
			{isImageModalOpen && (
				<ImageModal src={selectedImage} alt={`Image`} onClose={closeImageModal} />
			)}
			{isContentModalOpen && (
				<ContentModal
					onContentModalClose={closeContentModal}
					title='Content'
					contentBlocks={selectedContent}
				/>
			)}
		</>
	);
};

export default ContentModal;
