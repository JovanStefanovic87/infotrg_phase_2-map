import { NextPage } from 'next';
import AboutContent from './AboutContent';

export const metadata = {
  title: 'Infotrg | O nama',
  description: 'O nama',
};

const About: NextPage = () => {
  return (
    <>
      <AboutContent />
    </>
  );
};

export default About;
