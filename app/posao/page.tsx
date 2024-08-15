import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
  title: 'Infotrg | Posao',
  description: 'Postanite deo našeg tima.',
};

const Job: NextPage = () => {
  return (
    <>
      <PageContent />
    </>
  );
};

export default Job;
