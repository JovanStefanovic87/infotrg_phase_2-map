'use client';
import React from 'react';
import PageContainer from '../components/containers/PageContainer';
import MapContent from './MapContent';
import { APIProvider } from '@vis.gl/react-google-maps';
import { LocationDataForMap, Category, RetailFormState, Language } from '@/utils/helpers/types';

interface Props {
	initialData: {
		locations: LocationDataForMap[];
		articleCategories: Category[];
		retails: RetailFormState[];
		lang: Language[];
	};
}

const MapProvider: React.FC<Props> = ({ initialData }: Props) => {
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<PageContainer>
				<MapContent initialData={initialData} />
			</PageContainer>
		</APIProvider>
	);
};

export default MapProvider;
