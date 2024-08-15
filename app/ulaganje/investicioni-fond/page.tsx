import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
  title: 'Infotrg | Investicioni fond',
  description: 'Detalji o investicionom fondu kompanije Infotrg.',
};

const Invest: NextPage = () => {
  return (
    <>
      <PageContent />
    </>
  );
};

export default Invest;
