'use client';
import { contentData, mapIdToPath } from './ulaganjeData';
import ContentBlock from '../components/blocks/ContentBlock';
import H1 from '../components/text/H1';
import PageContainer from '../components/containers/PageContainer';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import useScrollToTop from '@/utils/helpers/useScrollToTop';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';
import ContentDescriptionText from '../components/text/ContentDescriptionText';
import CallToActionButton from '../components/buttons/CallToActionButton';

const InvestContent: React.FC = () => {
	useScrollToTop();
	const columns = useResponsiveColumns(1);

	return (
		<PageContainer>
			<H1 title='ULAGANJE U INFOTRG' pb='1rem' />

			<div className='flex flex-col items-center rounded-lg py-6 border-b-2'>
				<ContentDescriptionText
					text='Infotrgov investicioni program omogućava svakom fizičkom licu sticanje vlasničkog udela u poslovnom projektu, uz minimalnu mesečnu zaradu od 10% na uložena sredstva i garanciju povrata uloženog novca u slučaju raskida suvlasničkog odnosa.'
					align='center'
					color='black'
				/>
				<div className='mt-6 mb-4'>
					<CallToActionButton label='OPŠIRNIJE' href='/ulaganje/kljucne-informacije' />
				</div>
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

export default InvestContent;
