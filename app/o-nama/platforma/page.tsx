import { NextPage } from 'next';
import PageContainer from '@/app/components/containers/PageContainer';
import PlatformContainer from './PlatformContainer';

export const metadata = {
  title: 'Infotrg | Platforma',
  description: 'Detalji o platformi kompanije Infotrg. Saznajte više o našoj platformi.',
};

const Platform: NextPage = () => {
  return (
    <PageContainer>
      <PlatformContainer />
    </PageContainer>
  );
};

export default Platform;
