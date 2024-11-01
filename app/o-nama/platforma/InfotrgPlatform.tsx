'use client';
import ContentBlockWithModal from '@/app/components/blocks/ContentBlockWithModal';
import H2Title from '@/app/components/text/H2Title';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';

interface Props {
	contentData: any[];
	title: string;
	id: string;
}

const InfotrgPlatform: React.FC<Props> = ({ contentData, title, id }) => {
	useScrollToTop();
	const columns = useResponsiveColumns(1);

	return (
		<div className='mt-4' id={id}>
			<div className='p-2 '>
				<H2Title text={title} padding={10} color='black' />
			</div>
			<div className='bg-white sm:bg-transparent rounded-md overflow-hidden'>
				{renderGridSystem({
					contentData,
					columns: columns,
					useLink: false,
					children: block => (
						<ContentBlockWithModal
							title={block.title}
							description={block.description || ''}
							coverImage={block.coverImage}
							contentBlocks={[]}
							openContentModal={() => {}}
							content={block.content}
						/>
					),
				})}
			</div>
		</div>
	);
};

export default InfotrgPlatform;
