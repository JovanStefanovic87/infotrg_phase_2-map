import React from 'react';
import ContentBlockContainer from '../../components/containers/ContentBlockContainer';
import CoverImage from '../../components/image/CoverImage';
import BlockTitle from '../../components/text/BlockTitle';
import { ContentBlockItem } from '@/utils/helpers/types';
import Devider from '@/app/components/ui/Devider';
import H2 from '@/app/components/text/H2';
import TextBlockItem from '@/app/ulaganje/collapsible/TextBlockItem';

interface Props {
	title: string;
	description: string;
	coverImage?: string;
	name: string;
	contentBlocks: ContentBlockItem[];
	openContentModal: (contentBlocks: ContentBlockItem[]) => void;
}

const ContentBlock: React.FC<Props> = ({
	title,
	description,
	coverImage,
	name,
	contentBlocks,
	openContentModal,
}) => {
	return (
		<ContentBlockContainer contentBlocks={contentBlocks} openContentModal={openContentModal}>
			<div className='cursor-pointer w-full sm:p-2 h-auto rounded-md overflow-hidden'>
				<div className='flex flex-col h-full bg-gradient-white p-4 rounded-md overflow-hidden bg-yellowLighter'>
					<BlockTitle text={title} />
					<div className='text-gray-800 text-base leading-relaxed max-w-full flex-grow pl-4 '>
						<TextBlockItem content={description} align='center' />
					</div>
					{coverImage && (
						<div className='mt-4'>
							<CoverImage src={coverImage} alt={title} />
						</div>
					)}
					<div className='-mt-3'>
						<H2 text={name} weight='bold' align='center' color='black' />
					</div>
					<div className='mt-4'>
						<button className='text-blue-500 mt-2 border border-blueLight bg-blueLightest px-4 py-2 rounded-md self-start'>
							Vidi još
						</button>
					</div>
					<div className='block sm:hidden pt-8'>
						<Devider />
					</div>
				</div>
			</div>
		</ContentBlockContainer>
	);
};

export default ContentBlock;
