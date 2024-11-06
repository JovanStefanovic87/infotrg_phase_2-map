import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface IconMarkerProps {
	index: number;
	map: google.maps.Map;
}

const MapMarker: React.FC<IconMarkerProps> = ({ index, map }) => {
	const [zoom, setZoom] = useState(map?.getZoom() || 10);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleZoomChange = () => {
			if (map) setZoom(map.getZoom() || 10);
		};

		const listener = map.addListener('zoom_changed', handleZoomChange);

		return () => {
			if (listener) google.maps.event.removeListener(listener);
		};
	}, [map]);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const baseSize = windowWidth < 640 ? 24 : 48;
	const minSize = 16;
	const maxSize = 50;
	const size = Math.max(minSize, Math.min(maxSize, baseSize * (zoom / 10)));

	// Računamo broj cifara i dinamički podešavamo veličinu kruga i fonta
	const circleSize = Math.min(size * 0.5, size * 0.8); // Ograničenje kruga na 80% markera
	const fontSize = Math.min(circleSize / 2, size / 3); // Prilagođava font za veći broj cifara

	return (
		<div className='relative flex items-center justify-center'>
			<FaMapMarkerAlt size={size} color='#B91C1C' className='drop-shadow-md' />
			<span
				className='absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold bg-red-950 rounded-full flex items-center justify-center shadow-md text-shadow subpixel-antialiased'
				style={{
					width: `${circleSize}px`,
					height: `${circleSize}px`,
					lineHeight: `${circleSize}px`,
					fontSize: `${fontSize}px`,
				}}>
				{index + 1}
			</span>
		</div>
	);
};

export default MapMarker;
