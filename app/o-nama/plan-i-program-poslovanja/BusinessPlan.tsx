'use client';
import {
	contentData as rawContentData,
	listOfLinks as rawListOfLinks,
	mapIdToPath,
} from './BussinessPlanData';
import ContentBlock from '../../components/blocks/ContentBlock';
import H1 from '../../components/text/H1';
import PageContainer from '../../components/containers/PageContainer';
import H2Title from '@/app/components/text/H2Title';
import Devider2 from '@/app/components/ui/Devider2';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';
import ContentDescriptionText from '@/app/components/text/ContentDescriptionText';

interface BasicInformation {
	id: string | undefined;
	title: string;
	description: string;
	date?: string;
	coverImage: string;
}

const BussinesPlan: React.FC = () => {
	useScrollToTop();
	const columns = useResponsiveColumns(1);

	const contentData = rawContentData.filter(
		(item): item is BasicInformation & { id: string } => item.id !== undefined
	);

	const listOfLinks = rawListOfLinks.filter(
		(item): item is BasicInformation & { id: string } => item.id !== undefined
	);

	return (
		<PageContainer>
			<H1 title='PLAN I PROGRAM POSLOVANJA' pb='0' />
			<div className='pb-4 sm:pb-10 pt-2 border-b-2'>
				<ContentDescriptionText
					text='Plan i program poslovanja prikazuje raspored svih zadatih ciljeva i predviđenih poslova za određeni vremenski period.'
					align='center'
					color='black'
				/>
			</div>
			<div className='px-2 pt-6'>
				<H2Title text='SAŽET PRIKAZ PLANA I PROGRAMA POSLOVANJA' padding={10} color='black' />
			</div>
			{renderGridSystem({
				contentData,
				columns,
				useLink: false,
				children: block => (
					<ContentBlock
						title={block.date || ''}
						description={block.description || ''}
						coverImage={block.coverImage}
						contentBlocks={[]}
						openContentModal={() => {}}
						isLink={false}
						useModal={true}
					/>
				),
			})}
			<div className='px-2 pt-0 pb-5'>
				<H2Title text='OPŠIRNIJI PRIKAZ PLANA I PROGRAMA POSLOVANJA' />
			</div>
			<div className='bg-white sm:bg-transparent rounded-md overflow-hidden mb-4'>
				{renderGridSystem({
					contentData: listOfLinks,
					columns,
					useLink: true,
					mapIdToPath: (id: string) => mapIdToPath(id),
					children: block => (
						<ContentBlock
							title={block.title}
							description={block.description || ''}
							descriptionAlign='left'
							contentBlocks={[]}
							openContentModal={() => {}}
						/>
					),
				})}
				<div className='flex sm:hidden'>
					<Devider2 marginY={4} />
				</div>
			</div>
		</PageContainer>
	);
};

export default BussinesPlan;
