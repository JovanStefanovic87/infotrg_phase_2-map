'use client';
import { usePathname } from 'next/navigation';
import { contentData, contentBlocksData } from './investPlan';
import H1 from '@/app/components/text/H1';
import PageContainer from '@/app/components/containers/PageContainer';
import H2Title from '@/app/components/text/H2Title';
import ContentBlockImageNumber from '@/app/components/blocks/ContentBlockImageNumber';
import renderGridSystem2 from '@/utils/helpers/renderGridSystem2';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';

const PageContent: React.FC = () => {
	useScrollToTop();
	const columns = useResponsiveColumns(1);

	const pathname = usePathname();
	const blockId: string = pathname.split('/').pop() || '';

	const block = contentData.find(item => item.id === blockId);
	const contentBlocks = (contentBlocksData as any)[blockId] || [];

	if (!block || columns === null) return null;

	return (
		<PageContainer>
			<H1 title='INVESTICIONI PLAN I PROGRAM' pb='0' />
			<div className='pb-4 sm:pb-10'>
				<H2Title text={block.title.toUpperCase()} padding={10} color='black' />
			</div>
			{renderGridSystem2({
				contentBlocks,
				columns,
				useLink: block.isLink,
				children: block => (
					<ContentBlockImageNumber
						title={block.title}
						description={block.description}
						coverImage={block.coverImage}
						contentBlocks={[]}
						openContentModal={() => {}}
						isLink={block.isLink}
					/>
				),
			})}
		</PageContainer>
	);
};

export default PageContent;
