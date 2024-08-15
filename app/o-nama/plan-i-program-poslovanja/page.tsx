import { NextPage } from 'next';
import BusinessPlan from './BusinessPlan';

export const metadata = {
  title: 'Infotrg | Plan i program poslovanja',
  description:
    'Detalji o planu i programu poslovanja kompanije Infotrg. Saznajte više o našim planovima i programima.',
};

const Invest: NextPage = () => {
  return (
    <>
      <BusinessPlan />
    </>
  );
};

export default Invest;
