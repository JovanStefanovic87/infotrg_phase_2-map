'use client';
import { contentData as rawContentData, mapIdToPath } from './InvestPlanData';
import ContentBlock from '../../components/blocks/ContentBlock';
import H1 from '../../components/text/H1';
import PageContainer from '../../components/containers/PageContainer';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import { BasicInformation } from '@/utils/helpers/types';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';
import ContentDescriptionText from '@/app/components/text/ContentDescriptionText';

const InvestPlan: React.FC = () => {
	useScrollToTop();
	const columns = useResponsiveColumns(1);

	const contentData = rawContentData.filter(
		(item): item is BasicInformation & { id: string; coverImage: string } =>
			item.id !== undefined && item.coverImage !== undefined
	);

	return (
		<PageContainer>
			<H1 title='INVESTICIONI PLAN I PROGRAM' />
			<div className='border-b-2 pb-4'>
				<ContentDescriptionText
					text='Investicioni plan i program opisuje postupak učlanjivanja investitora, protokol ulaganja finansijskih sredstava, sticanje vlasničkog udela, kao i sva druga prava i obaveze investitora.'
					align='center'
					color='black'
				/>
			</div>
			<div className='bg-white sm:bg-transparent rounded-md overflow-hidden mb-4'>
				{renderGridSystem({
					contentData,
					columns: columns,
					useLink: true,
					mapIdToPath: (id: string) => mapIdToPath(id),
					children: block => (
						<ContentBlock
							title={block.title}
							description={block.description || ''}
							coverImage={block.coverImage}
							contentBlocks={[]}
							openContentModal={() => {}}
						/>
					),
				})}
			</div>
		</PageContainer>
	);
};

export default InvestPlan;
