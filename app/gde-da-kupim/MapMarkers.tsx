import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import MapMarker from './MapMarker';
import { GetRetailStoreApi, Category } from '@/utils/helpers/types';
import { SlLocationPin } from 'react-icons/sl';
import { MdOutlinePhoneAndroid } from 'react-icons/md';
import { TfiWorld } from 'react-icons/tfi';
import { BiSolidNavigation } from 'react-icons/bi';
import AutoScrollCategories from './AutoScrollCategories';
import IconButton from '../components/buttons/IconButton';

interface MapMarkersProps {
	setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
	setZoom: React.Dispatch<React.SetStateAction<number>>;
	center: { lat: number; lng: number };
	zoom: number;
	setDefaultCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
	setDefaultZoom: React.Dispatch<React.SetStateAction<number>>;
	retailStores?: GetRetailStoreApi[];
	getDisplayedCategories: (store: GetRetailStoreApi, categoryId: number) => Category[];
	categoryId: number;
	map: google.maps.Map | null;
}

const MapMarkers: React.FC<MapMarkersProps> = ({
	setCenter,
	setZoom,
	center,
	zoom,
	retailStores,
	getDisplayedCategories,
	categoryId,
	setDefaultCenter,
	setDefaultZoom,
	map,
}) => {
	const [activeMarker, setActiveMarker] = useState<{
		position: google.maps.LatLngLiteral;
		title: string;
	} | null>(null);

	const activeMarkers = retailStores
		? retailStores
				.filter(store => store.coordinates)
				.map((store, index) => ({
					id: store.id,
					index,
					position: {
						lat: store.coordinates!.latitude,
						lng: store.coordinates!.longitude,
					},
					title: store.name,
					description: store.coordinates!.locationDescription || '',
					store,
				}))
		: [];

	const centerRef = useRef(center);
	const zoomRef = useRef(zoom);
	const hasInitialized = useRef(false);

	useEffect(() => {
		if (activeMarkers.length > 0 && map && !hasInitialized.current) {
			hasInitialized.current = true;

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

			const newCenter = {
				lat: (bounds.minLat + bounds.maxLat) / 2,
				lng: (bounds.minLng + bounds.maxLng) / 2,
			};

			const optimalZoom = Math.min(Math.log2(360 / Math.max(latSpan, lngSpan)) + 1, 18);

			centerRef.current = newCenter;
			zoomRef.current = optimalZoom;

			setDefaultCenter(newCenter);
			setDefaultZoom(optimalZoom);

			if (map) {
				map.panTo(newCenter);
				map.setZoom(optimalZoom);
			}
		}
	}, [activeMarkers, map, setCenter, setZoom]);

	const handleMapChange = useCallback(() => {
		if (map) {
			const center = map.getCenter();
			const zoom = map.getZoom();

			if (center && zoom !== undefined) {
				setCenter(center.toJSON());
				``;
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

	const handleMarkerClick = (marker: {
		position: google.maps.LatLngLiteral;
		title: string;
		description: string;
		store: GetRetailStoreApi;
	}) => {
		setActiveMarker(marker);
		setCenter(marker.position);
		setZoom(18);
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
						className='w-full transition-transform transform hover:scale-110'>
						<div className='relative'>{map && <MapMarker index={marker.index} map={map} />}</div>
					</AdvancedMarker>
					{activeMarker &&
						activeMarker.position.lat === marker.position.lat &&
						activeMarker.position.lng === marker.position.lng && (
							<InfoWindow
								position={marker.position}
								headerDisabled
								onCloseClick={() => setActiveMarker(null)}
								className='w-full bg-white rounded-lg shadow-lg px-3 pt-2 md:px-5 lg:px-8 max-h-[300px] sm:max-h-[400px] md:max-h-[500px]'>
								<div className='flex flex-col gap-3 text-gray-800 text-sm sm:text-base md:text-lg'>
									{/* Skrolabilni sadržaj */}
									<div className='absolute right-2 top-0'>
										<button
											onClick={() => setActiveMarker(null)}
											className='text-gray-500 hover:text-gray-700 text-4xl font-noraml focus:outline-none ml-2'>
											&times;
										</button>
									</div>
									<div className=' overflow-y-auto'>
										<div className='flex justify-between items-center px-2'>
											<div className='text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center flex-1'>
												{marker.title}
											</div>
										</div>

										<div className='flex justify-center flex-wrap gap-1'>
											{marker.store.objectTypeCategories?.map(type => (
												<span
													key={type.id}
													className='bg-indigo-100 text-black text-xs sm:text-sm md:text-base font-semibold px-2 py-0.5 rounded-full'>
													{type.name}
												</span>
											)) || <span className='text-xs text-gray-500'>Tip nije definisan</span>}
										</div>
										<AutoScrollCategories
											categories={getDisplayedCategories(marker.store, categoryId)}
										/>

										<div className='flex flex-col gap-1 text-xs sm:text-sm md:text-base pb-1'>
											{marker.store.website && (
												<a
													href={
														marker.store.website.startsWith('http')
															? marker.store.website
															: `https://${marker.store.website}`
													}
													target='_blank'
													rel='noopener noreferrer'
													className='flex items-center font-semibold text-blueDarker hover:text-blueDark outline-none'>
													<TfiWorld className='mr-1 text-sm' />
													<span>{marker.store.website}</span>
												</a>
											)}

											{marker.store.phoneNumber && (
												<div className='flex items-center'>
													<MdOutlinePhoneAndroid className='text-green-500 mr-1 text-sm' />
													<span className='font-semibold'>{marker.store.phoneNumber}</span>
												</div>
											)}
										</div>

										<div className='text-xs sm:text-sm md:text-base text-gray-600'>
											<div className='flex items-center'>
												<SlLocationPin className='text-red-500 mr-1 text-sm' />
												<span className='text-black font-normal'>
													{marker.store.city?.label?.translations?.[0]?.translation ||
														'Grad nije definisan'}
													, {marker.store.address}
												</span>
											</div>
											<div className='text-black font-normal'>{marker.description}</div>
										</div>
									</div>

									{/* Fiksirano dugme na dnu */}
									<div className='mt-3'>
										<IconButton
											icon={<BiSolidNavigation className='animate-bounceSmall drop-shadow-md' />}
											text='Putanja'
											onClick={() => handleNavigateToMarker(marker.position)}
										/>
									</div>
								</div>
							</InfoWindow>
						)}
				</div>
			))}
		</>
	);
};

export default MapMarkers;
