'use client';
import { useState } from 'react';
import CollapsibleContentBlockContainer from './CollapsibleContentBlockConainer';
import CollapsibleImageBlockItem from './CollapsibleImageBlockItem';
import TextBlockItem from './TextBlockItem';
import ColsapsibleContentBlockToggleButton from '@/app/components/buttons/ArrowToggleButton';

interface ContentBlockItem {
	type: 'text' | 'image';
	content: string | string[];
}

interface Props {
	title: string;
	openModal: (image: string, title: string) => void;
	contentBlocks: ContentBlockItem[];
}

const CollapsibleContentBlock: React.FC<Props> = ({ title, openModal, contentBlocks }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleContent = () => {
		setIsOpen(!isOpen);
	};

	return (
		<CollapsibleContentBlockContainer>
			<ColsapsibleContentBlockToggleButton title={title} isOpen={isOpen} onClick={toggleContent} />
			<div
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isOpen ? 'max-h-content' : 'max-h-0'
				}`}>
				<div className='py-4 px-6 bg-gray-100'>
					{contentBlocks.map((block, index) => {
						if (block.type === 'text') {
							return <TextBlockItem key={index} content={block.content} />;
						}
						if (block.type === 'image') {
							return (block.content as string[]).map((img, imgIndex) => (
								<CollapsibleImageBlockItem
									key={imgIndex}
									img={img}
									title={title}
									imgIndex={imgIndex}
									openModal={openModal}
								/>
							));
						}
					})}
				</div>
			</div>
		</CollapsibleContentBlockContainer>
	);
};

export default CollapsibleContentBlock;
