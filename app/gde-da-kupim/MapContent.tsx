import React, { useState } from 'react';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import { useSearchParams } from 'next/navigation';
import { useFetchFilteredRetailStores } from '@/app/helpers/api/retailStore';

const MapContent: React.FC = () => {
	const params = useSearchParams();
	const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : undefined;
	const countryId = params.get('countryId') ? Number(params.get('countryId')) : undefined;
	const cityId = params.get('cityId') ? Number(params.get('cityId')) : undefined;
	const cityPartId = params.get('cityPartId') ? Number(params.get('cityPartId')) : null;
	const marketplaceId =
		params.get('marketplaceId') && !isNaN(Number(params.get('marketplaceId')))
			? Number(params.get('marketplaceId'))
			: null;
	useScrollToTop();
	console.log('categoryId', categoryId);
	console.log('countryId', countryId);
	console.log('cityId', cityId);
	console.log('cityPartId', cityPartId);
	console.log('marketplaceId', marketplaceId);

	const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
	const [zoom, setZoom] = useState(10);

	const {
		data: retailStores,
		isLoading,
		error,
	} = useFetchFilteredRetailStores({
		categoryId,
		countryId,
		cityId,
		cityPartId,
		marketplaceId,
		languageId: 1, // Primer, podesite na željeni languageId
	});

	if (retailStores) {
		console.log('Fetched retail stores:', retailStores);
	}

	return (
		<>
			<div className={styles.mapWrapper}>
				<Map
					center={center}
					zoom={zoom}
					className={styles.mapContainer}
					mapId={'3b269361fc781f1f'}
					mapTypeId='satellite'
					gestureHandling='greedy'
					onTilesLoaded={() => {}}
					zoomControl={false}
					mapTypeControlOptions={{
						position: ControlPosition.TOP_CENTER,
					}}
					fullscreenControlOptions={{
						position: ControlPosition.LEFT_TOP,
					}}
					rotateControlOptions={{
						position: ControlPosition.RIGHT_BOTTOM,
					}}
					streetViewControlOptions={{
						position: ControlPosition.RIGHT_TOP,
					}}>
					<MapMarkers setCenter={setCenter} setZoom={setZoom} center={center} zoom={zoom} />
				</Map>
			</div>
		</>
	);
};

export default MapContent;
