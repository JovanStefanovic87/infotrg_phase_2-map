'use client';
import { contentData as rawContentData } from './jobData';
import H1 from '../components/text/H1';
import PageContainer from '../components/containers/PageContainer';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import { BasicInformation } from '@/utils/helpers/types';
import H2Title from '../components/text/H2Title';
import ContentBlockSpacification from '../components/blocks/ContentBlockSpacification';
import H3Title from '../components/text/H3Title';
import TextSpecifications from '../components/text/TextSpecifications';
import Link from 'next/link';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';

const AboutContent: React.FC = () => {
	useScrollToTop();
	const columns = useResponsiveColumns(1);

	const contentData = rawContentData.filter(
		(item): item is BasicInformation & { id: string; coverImage: string } => item.id !== undefined
	);

	return (
		<PageContainer>
			<H1 title='INFOTRG POSAO' pb={0} />
			<H2Title text='Tražimo saradnike na sledećim radnim pozicijama:' padding={24} />
			<div className='bg-white sm:bg-transparent rounded-md overflow-hidden mb-4'>
				{renderGridSystem({
					contentData,
					columns: columns,
					useLink: false,
					useDevider: false,
					children: block => (
						<ContentBlockSpacification
							title={block.title}
							description={block.description || ''}
							coverImage={block.coverImage}
							contentBlocks={[]}
							opisPosla={block.opisPosla || []}
							usloviRada={block.usloviRada || []}
							potrebneKvalifikacije={block.potrebneKvalifikacije || []}
							openContentModal={() => {}}
							isLink={block.isLink}
						/>
					),
				})}
			</div>
			<div className='flex flex-col items-stretch sm:items-center bg-mainWhite rounded-lg p-6 shadow-lg mb-8'>
				<div className='w-full mb-4'>
					<H3Title text='Kontakt za više informacija:' color='black' />
				</div>
				<div className='w-full xl:w-1/3'>
					<TextSpecifications label='Koordinator projekta' value='Miroslav Ostrogonac' />
					<TextSpecifications label='Telefon' value='060 145 13 49' />
					<TextSpecifications label='Email' value='suinfotrg@gmail.com' />
					<Link href='/o-nama'>
						<TextSpecifications label='Ko smo mi?' value='www.infotrg.com/o-nama' />
					</Link>
				</div>
			</div>
		</PageContainer>
	);
};

export default AboutContent;
