import React, { ReactNode } from 'react';
import { ContentBlockItem } from '@/utils/helpers/types';

interface ContainerProps {
	contentBlocks: ContentBlockItem[];
	openContentModal: (contentBlocks: ContentBlockItem[]) => void;
	isLink?: boolean;
	useModal?: boolean;
	children?: ReactNode;
}

const ContentBlockContainer: React.FC<ContainerProps> = ({
	contentBlocks,
	openContentModal,
	isLink = true,
	useModal = false,
	children,
}) => {
	return (
		<div
			className={`flex items-stretch justify-center rounded-md relative h-full transition-transform transform cursor-${
				useModal ? 'pointer' : 'default:'
			} ${isLink && 'sm:hover:scale-95 lg:hover:scale-x-95 cursor-pointer'}`}
			onClick={() => openContentModal(contentBlocks)}>
			{children}
		</div>
	);
};

export default ContentBlockContainer;
