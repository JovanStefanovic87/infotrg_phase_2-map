import { NextPage } from 'next';
import MapProvider from './MapProvider';
import { Suspense } from 'react';

export const metadata = {
	title: 'Infotrg | O nama',
	description: 'O nama',
};

const Map: NextPage = () => {
	return (
		<Suspense fallback={<div>Učitavanje mape...</div>}>
			<MapProvider />
		</Suspense>
	);
};

export default Map;
