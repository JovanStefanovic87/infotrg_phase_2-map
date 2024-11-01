import { NextPage } from 'next';
import MapProvider from './MapProvider';
export const metadata = {
  title: 'Infotrg | O nama',
  description: 'O nama',
};

const Map: NextPage = () => {
  return (
    <>
      <MapProvider />
    </>
  );
};

export default Map;
