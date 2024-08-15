import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
  title: 'Infotrg | Opširniji prikaz poslovne saradnje',
  description: 'Detalji poslovne saranje sa Infotrg-om',
};

const Invest: NextPage = () => {
  return (
    <>
      <PageContent />
    </>
  );
};

export default Invest;
