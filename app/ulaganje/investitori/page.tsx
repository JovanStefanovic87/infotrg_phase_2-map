import { NextPage } from 'next';
import Investors from './Investors';

export const metadata = {
  title: 'Infotrg | Investitori',
  description: 'Investitori kompanije Infotrg.',
};

const Invest: NextPage = () => {
  return (
    <>
      <Investors />
    </>
  );
};

export default Invest;
