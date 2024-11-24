'use client';
import { contentData, mapIdToPath } from './pocetnaData';
import ContentBlock from '../components/blocks/ContentBlock';
import PageContainer from '../components/containers/PageContainer';
import renderGridSystem from '@/utils/helpers/renderGridSystem';
import AnimationBlock from './AnimationBlock';
import H2Title from '../components/text/H2Title';
import H2 from '../components/text/H2';
import TextSpecifications from '../components/text/TextSpecifications';
import H3Title from '../components/text/H3Title';
import useResponsiveColumns from '@/utils/helpers/useResponsiveColumns';
import CallToActionButton from '../components/buttons/CallToActionButton';

const PageContent: React.FC = () => {
	const columns = useResponsiveColumns(1);
	const INVEST_CALL_TO_ACTION =
		'POSTANITE INVESTITOR I SUVLASNIK INFOTRGA ILI SE PRIDRUŽITE TIMU KAO STALNI ILI POVREMENI SARADNIK';

	return (
		<PageContainer>
			<AnimationBlock />
			<div className='mt-2 sm:mt-4 mb-4'>
				<H2Title text={INVEST_CALL_TO_ACTION} size='xl' color='black' />
			</div>
			<div className='flex flex-col items-center bg-mainWhite rounded-lg p-6 shadow-lg mb-4 sm:mb-0 mx-0 sm:mx-2'>
				<H2
					text='Infotrgov investicioni program omogućava svakom fizičkom licu sticanje vlasničkog udela u poslovnom projektu, uz minimalnu mesečnu zaradu od 10% na uložena sredstva i garanciju povrata uloženog novca u slučaju raskida suvlasničkog odnosa.'
					align='center'
					color='black'
				/>
				<div className='mt-6'>
					<CallToActionButton label='OPŠIRNIJE' href='/ulaganje/kljucne-informacije' />
				</div>
			</div>
			<div className='bg-white sm:bg-transparent rounded-md overflow-hidden mb-4 sm:mb-0 sm:mt-2'>
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
			<div className='mt-1 sm:mt-0 mb-4'>
				<H2Title text={INVEST_CALL_TO_ACTION} size='xl' />
			</div>
			<div className='flex flex-col items-stretch sm:items-center bg-mainWhite rounded-lg p-6 shadow-lg'>
				<div className='w-full mb-4'>
					<H3Title text='Kontakt' color='black' />
				</div>
				<div className='w-full xl:w-1/3'>
					<TextSpecifications label='Koordinator projekta' value='Miroslav Ostrogonac' />
					<TextSpecifications label='Telefon' value='060 145 13 49' />
					<TextSpecifications label='Email' value='suinfotrg@gmail.com' />
				</div>
			</div>
		</PageContainer>
	);
};

export default PageContent;
