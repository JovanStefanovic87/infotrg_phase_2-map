import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
  title: 'Infotrg | Raspodela investicionog fonda',
  description: 'Detalji o raspodeli investicionog fonda kompanije Infotrg.',
};

const Invest: NextPage = () => {
  return (
    <>
      <PageContent />
    </>
  );
};

export default Invest;
