import React, { useState, useEffect } from 'react';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, useMap, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import { useSearchParams } from 'next/navigation';
import { useFetchFilteredRetailStores } from '@/app/helpers/api/retailStore';
import { Category, GetRetailStoreApi } from '@/utils/helpers/types';
import RetailStoreCard from './RetailStoreCard';
import AssortmentModal from './AssortmentModal';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

const MapContent: React.FC = () => {
	const mapInstance = useMap('my-map-id');
	const params = useSearchParams();
	const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : undefined;
	const countryId = params.get('countryId') ? Number(params.get('countryId')) : undefined;
	const cityId = params.get('cityId') ? Number(params.get('cityId')) : undefined;
	const cityPartId = params.get('cityPartId') ? Number(params.get('cityPartId')) : null;
	const marketplaceId = params.get('marketplaceId') ? Number(params.get('marketplaceId')) : null;

	useScrollToTop();

	const [defaultCenter, setDefaultCenter] = useState<{ lat: number; lng: number }>({
		lat: 0,
		lng: 0,
	});
	const [defaultZoom, setDefaultZoom] = useState(10);
	const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
	const [zoom, setZoom] = useState(0);
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeStore, setActiveStore] = useState<GetRetailStoreApi | null>(null);
	const [categoryHierarchy, setCategoryHierarchy] = useState<Category[]>([]);
	const [isMarkersLoading, setIsMarkersLoading] = useState(true);

	const {
		data: retailStores,
		isLoading,
		error,
	} = useFetchFilteredRetailStores({
		categoryId: categoryId || 0,
		countryId: countryId || 1,
		cityId: cityId || 1,
		cityPartId: cityPartId ?? null,
		marketplaceId: marketplaceId ?? null,
		languageId: 1,
	});

	// Kada se retailStores učitaju, postavi `isMarkersLoading` na `false`
	useEffect(() => {
		if (retailStores) {
			setIsMarkersLoading(false);
		}
	}, [retailStores]);

	const formatCategories = (categories: any[]): Category[] => {
		return categories.map(category => ({
			id: category.id,
			name: category.name || 'Nedefinisano ime',
			icon: category.icon || null,
			iconId: category.icon?.id || null,
			labelId: category.labelId || 0,
			parents: category.parents ? formatCategories(category.parents) : [],
			children: category.childCategories ? formatCategories(category.childCategories) : [],
			relatedIds: category.relatedIds || [],
		}));
	};

	const openModalForStore = (store: GetRetailStoreApi) => {
		setActiveStore(store);
		const formattedCategories = formatCategories(store.articleCategories || []);
		const hierarchy = buildCategoryHierarchy(formattedCategories);
		setCategoryHierarchy(hierarchy);
		setModalOpen(true);
	};

	const closeModalForStore = () => {
		setActiveStore(null);
		setCategoryHierarchy([]);
		setModalOpen(false);
	};

	const handleNavigationClick = (lat: number, lng: number) => {
		const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
		window.open(url, '_blank');
	};

	useEffect(() => {
		if (retailStores) {
			const categories = retailStores.flatMap(store => store.articleCategories);
			const formattedCategories = formatCategories(categories);
			const hierarchy = buildCategoryHierarchy(formattedCategories);
			setCategoryHierarchy(hierarchy);
		}
	}, [retailStores]);

	const getDisplayedCategories = (store: GetRetailStoreApi, categoryId: number): Category[] => {
		const formattedCategories: Category[] = store.articleCategories.map((category: any) => ({
			id: category.id,
			name: category.label?.name || category.name || 'Nedefinisano ime',
			iconId: category.iconId,
			labelId: category.labelId,
			parents: category.parents || [],
			children: category.childCategories || [],
			relatedIds: category.relatedIds || [],
			icon: category.icon || null,
		}));

		// Pronađi direktne podkategorije categoryId
		const directSubcategories = formattedCategories.filter((category: Category) =>
			category.parents.some((parent: Category) => parent.id === categoryId)
		);

		// Ako postoje direktne podkategorije, prikaži njih (ograničeno na 5)
		if (directSubcategories.length > 0) {
			return directSubcategories.slice(0, 5);
		}

		// Ako nema direktnih podkategorija, pronađi i vrati samo kategoriju sa categoryId
		const mainCategory = formattedCategories.find(
			(category: Category) => category.id === categoryId
		);
		return mainCategory ? [mainCategory] : [];
	};

	const buildCategoryHierarchy = (categories: Category[]): Category[] => {
		const categoryMap: { [key: number]: Category } = {};
		categories.forEach(category => {
			categoryMap[category.id] = {
				...category,
				children: [],
				parents: [],
			};
		});

		categories.forEach(category => {
			category.parents?.forEach(parent => {
				const parentCategory = categoryMap[parent.id];
				if (parentCategory) {
					parentCategory.children.push(categoryMap[category.id]);
					categoryMap[category.id].parents.push(parentCategory);
				}
			});
		});

		return Object.values(categoryMap).filter(category => category.parents.length === 0);
	};

	const centerMapOnStore = (
		storeCoordinates: { latitude: number; longitude: number } | null,
		zoomLevel: number = 22
	) => {
		if (storeCoordinates && mapInstance) {
			// Set the zoom level first, then center the map
			mapInstance.setZoom(zoomLevel);

			// Use a small timeout to allow zoom to apply before centering
			setTimeout(() => {
				mapInstance.panTo({
					lat: storeCoordinates.latitude,
					lng: storeCoordinates.longitude,
				});

				// Smooth scroll to the map container
				const mapContainer = document.getElementById('map');
				mapContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 100); // Adjust timeout as needed for smoother behavior
		} else {
			console.warn('Map or coordinates are not available');
		}
	};

	return (
		<>
			<div id='map' className={`${styles.mapWrapper} relative`}>
				<Map
					id='my-map-id'
					defaultCenter={defaultCenter}
					defaultZoom={defaultZoom}
					className={`${styles.mapContainer} rounded-xl shadow-lg overflow-hidden`}
					mapId={'3b269361fc781f1f'}
					mapTypeId='satellite'
					gestureHandling='greedy'
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
					{isMarkersLoading && (
						<div className='absolute inset-0 flex justify-center items-center bg-white bg-opacity-80 z-10'>
							<div className='relative flex justify-center items-center w-32 h-32'>
								<div className='absolute inset-0 border-4 border-solid border-black border-t-blueLightest rounded-full animate-spin bg-yellowLighter'></div>
								<span className='absolute inset-0 flex justify-center items-center right-7 top-3'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='60'
										height='150'
										viewBox='0 0 1167 2622'
										preserveAspectRatio='xMidYMid meet'
										style={{ shapeRendering: 'geometricPrecision' }}>
										<g transform='translate(0 2622) scale(0.1 -0.1)' fill='#000' stroke='none'>
											<path d='M10635 22104c-293-53-553-233-740-514-147-220-209-439-208-730 0-145 3-177 26-264 81-304 290-521 575-598 118-31 314-29 446 6 199 52 376 163 546 343 225 238 342 494 370 813 35 399-127 717-445 876-158 78-370 104-570 68z' />
											<path d='M9335 17163c-295-35-516-93-820-216-795-320-1507-832-2345-1684-248-252-430-446-430-459 1-8 481-384 502-392 4-2 124 108 265 244 461 442 774 723 970 871 181 135 410 236 570 249 196 16 276-74 259-290-17-208-21-224-249-971-1035-3387-1577-5637-1577-6545 0-141 18-286 46-380 97-326 327-533 655-591 92-16 269-16 373 0 330 52 802 259 1221 535 446 295 1089 832 1916 1600l206 191-21 24c-12 12-114 113-228 223l-208 200-127-119c-906-843-1514-1301-1756-1320-58-5-71-3-111 21-60 35-121 122-148 209-108 357 278 1994 1219 5162 384 1296 605 2093 699 2530 79 370 50 550-116 715-102 102-225 158-408 185-87 13-279 18-357 8z' />
										</g>
									</svg>
								</span>
							</div>
						</div>
					)}
					<MapMarkers
						setCenter={setCenter}
						setZoom={setZoom}
						center={center}
						zoom={zoom}
						setDefaultCenter={value => setDefaultCenter(value)}
						setDefaultZoom={value => setDefaultZoom(value)}
						retailStores={retailStores}
						getDisplayedCategories={getDisplayedCategories}
						categoryId={categoryId || 0}
					/>
				</Map>
			</div>

			<div className='results-container p-2 bg-white mt-8 lg:mx-16'>
				{isLoading && <p className='text-center text-gray-500'>Učitavanje...</p>}
				{error && (
					<p className='text-center text-red-500'>
						Došlo je do greške prilikom učitavanja podataka.
					</p>
				)}
				{retailStores && retailStores.length > 0 ? (
					<div className='grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2 2xl:grid-cols-3'>
						{retailStores.map((store, index) => (
							<RetailStoreCard
								key={store.id}
								store={store}
								index={index}
								categoryId={categoryId || 0}
								centerMapOnStore={coordinates => centerMapOnStore(coordinates)}
								handleNavigationClick={handleNavigationClick}
								openModalForStore={openModalForStore}
								getDisplayedCategories={getDisplayedCategories}
							/>
						))}
					</div>
				) : (
					<p className='text-center text-gray-500 mt-6'>Nema dostupnih prodavnica za prikaz.</p>
				)}
				{isModalOpen && activeStore && (
					<AssortmentModal
						isOpen={isModalOpen}
						store={activeStore}
						categories={categoryHierarchy}
						onClose={closeModalForStore}
					/>
				)}
			</div>
		</>
	);
};

export default MapContent;
