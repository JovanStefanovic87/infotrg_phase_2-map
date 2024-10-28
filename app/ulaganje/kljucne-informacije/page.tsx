import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
  title: 'Infotrg | Ključne informacije',
  description: 'Ključne informacije o projektu Infotrg',
};

const KeyInformationsPage: NextPage = () => {
  return (
    <>
      <PageContent />
    </>
  );
};

export default KeyInformationsPage;
