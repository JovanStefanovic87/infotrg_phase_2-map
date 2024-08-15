import React, { useState } from 'react';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';

const MapContent: React.FC = () => {
	useScrollToTop();

	const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
	const [zoom, setZoom] = useState(10);

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
