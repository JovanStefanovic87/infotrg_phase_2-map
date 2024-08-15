import { NextPage } from 'next';
import InvestPlan from './InvestPlan';

export const metadata = {
  title: 'Infotrg | Investicioni plan i program',
  description: 'Investicioni plan i program Infotrg-a',
};

const InvesticioniPlan: NextPage = () => {
  return (
    <>
      <InvestPlan />
    </>
  );
};

export default InvesticioniPlan;
