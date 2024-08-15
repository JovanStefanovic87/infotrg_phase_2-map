import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
  title: 'Infotrg | Tim',
  description: 'Članovi infotrg tima',
};

const Tim: NextPage = () => {
  return (
    <>
      <PageContent />
    </>
  );
};

export default Tim;
