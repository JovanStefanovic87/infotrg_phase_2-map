import { NextPage } from 'next';
import TimContent from './TimContent';

export const metadata = {
  title: 'Infotrg | Tim',
  description: 'Saznajte više o članovima infotrg tima.',
};

const Tim: NextPage = () => {
  return (
    <>
      <TimContent />
    </>
  );
};

export default Tim;
