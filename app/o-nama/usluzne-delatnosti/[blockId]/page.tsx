import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
  title: 'Infotrg | Usužne delatnosti',
  description: 'Detalji o uslužnim delatnostima kompanije Infotrg.',
};

const Invest: NextPage = () => {
  return (
    <>
      <PageContent />
    </>
  );
};

export default Invest;
