'use client';
import React, { useState, useEffect } from 'react';
import PageContainer from '../components/containers/PageContainer';
import MapContent from './MapContent';
import { APIProvider } from '@vis.gl/react-google-maps';
import Cookies from 'js-cookie';

interface Props {
	initialData: {
		locations: any;
		articleCategories: any;
		retails: any;
		lang: any;
	};
	queryParams: {
		categoryId: string | null;
		stateId: string | null;
		countyId: string | null;
		cityId: string | null;
		suburbId: string | null;
	};
}

const MapProvider: React.FC<Props> = ({ initialData, queryParams }: Props) => {
	const [languageCode, setLanguageCode] = useState<string>('rs');

	useEffect(() => {
		const cookieLanguage = Cookies.get('languageCode') || 'rs';
		setLanguageCode(cookieLanguage);
	}, []);

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
			<PageContainer>
				<MapContent
					initialData={initialData}
					queryParams={queryParams}
					languageCode={languageCode}
				/>
			</PageContainer>
		</APIProvider>
	);
};

export default MapProvider;
