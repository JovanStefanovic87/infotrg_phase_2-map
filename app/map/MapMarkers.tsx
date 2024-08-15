import React, { useState, useEffect, useCallback } from 'react';
import { AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import BlockButton from '../components/buttons/BlockButton';
import { markers, markers2 } from './markersData';

interface MapMarkersProps {
	setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
	setZoom: React.Dispatch<React.SetStateAction<number>>;
	center: { lat: number; lng: number };
	zoom: number;
}

const MapMarkers: React.FC<MapMarkersProps> = ({ setCenter, setZoom, center, zoom }) => {
	const map = useMap();
	const [activeMarker, setActiveMarker] = useState<{
		position: google.maps.LatLngLiteral;
		title: string;
	} | null>(null);

	const [activeMarkers, setActiveMarkers] = useState(markers);

	useEffect(() => {
		if (activeMarkers.length > 0 && map) {
			const bounds = activeMarkers.reduce(
				(acc, marker) => ({
					minLat: Math.min(acc.minLat, marker.position.lat),
					maxLat: Math.max(acc.maxLat, marker.position.lat),
					minLng: Math.min(acc.minLng, marker.position.lng),
					maxLng: Math.max(acc.maxLng, marker.position.lng),
				}),
				{
					minLat: Infinity,
					maxLat: -Infinity,
					minLng: Infinity,
					maxLng: -Infinity,
				}
			);

			const latSpan = bounds.maxLat - bounds.minLat;
			const lngSpan = bounds.maxLng - bounds.minLng;
			const latZoom = Math.log2(360 / latSpan);
			const lngZoom = Math.log2(360 / lngSpan);

			const newCenter = {
				lat: (bounds.minLat + bounds.maxLat) / 2,
				lng: (bounds.minLng + bounds.maxLng) / 2,
			};

			const newZoom = Math.max(Math.min(latZoom, lngZoom) - 1, 1);

			setCenter(newCenter);
			setZoom(newZoom);
			const timeoutId = setTimeout(() => {
				if (map) {
					map.panTo(newCenter);
					map.setZoom(newZoom);
				}
			}, 300);
			return () => clearTimeout(timeoutId);
		}
	}, [activeMarkers, map, setCenter, setZoom]);

	const handleMapChange = useCallback(() => {
		if (map) {
			const center = map.getCenter();
			const zoom = map.getZoom();

			if (center && zoom !== undefined) {
				setCenter(center.toJSON());
				setZoom(zoom);
			}
		}
	}, [map, setCenter, setZoom]);

	useEffect(() => {
		if (map) {
			map.addListener('center_changed', handleMapChange);
			map.addListener('zoom_changed', handleMapChange);
		}
		return () => {
			if (map) {
				google.maps.event.clearListeners(map, 'center_changed');
				google.maps.event.clearListeners(map, 'zoom_changed');
			}
		};
	}, [map, handleMapChange]);

	const handleMarkerClick = (marker: { position: google.maps.LatLngLiteral; title: string }) => {
		setActiveMarker(marker);
		setCenter(marker.position);
	};

	const handleNavigateToMarker = (position: google.maps.LatLngLiteral) => {
		const url = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`;
		window.open(url, '_blank');
	};

	return (
		<>
			{activeMarkers.map(marker => (
				<div key={marker.id} className='w-full'>
					<AdvancedMarker
						position={marker.position}
						title={marker.title}
						onClick={() => handleMarkerClick(marker)}
						className='w-full'
					/>
					{activeMarker &&
						activeMarker.position.lat === marker.position.lat &&
						activeMarker.position.lng === marker.position.lng && (
							<InfoWindow
								position={marker.position}
								onCloseClick={() => setActiveMarker(null)}
								className='w-full text-black'>
								<div className='flex flex-col gap-3 w-full'>
									<BlockButton
										onClick={() => handleNavigateToMarker(marker.position)}
										className='w-full'
										text='Odvedi me na lokaciju'
									/>
									<div className='font-bold text-lg'>{marker.title}</div>
									<div>{marker.description}</div>
								</div>
							</InfoWindow>
						)}
				</div>
			))}
			{/* <BlockButton
        onClick={() => setActiveMarkers(markers2)}
        className='absolute top-0'
        text='Promeni'
      /> */}
		</>
	);
};

export default MapMarkers;
