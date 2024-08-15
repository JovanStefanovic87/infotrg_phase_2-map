import { NextPage } from 'next';
import BussinessCooperation from './ServiceActivities';

export const metadata = {
  title: 'Infotrg | Usužne delatnosti',
  description: 'Detalji o uslužnim delatnostima kompanije Infotrg.',
};

const UsluzneDelatnosti: NextPage = () => {
  return (
    <>
      <BussinessCooperation />
    </>
  );
};

export default UsluzneDelatnosti;
