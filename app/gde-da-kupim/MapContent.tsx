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

const MapContent: React.FC = () => {
	// Povezujemo se sa mapom koristeći useMap sa ID-om
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
	const [center, setCenter] = useState<{ lat: number; lng: number }>({
		lat: 0,
		lng: 0,
	});
	const [zoom, setZoom] = useState(0);
	const [isModalOpen, setModalOpen] = useState(false);
	const [activeStore, setActiveStore] = useState<GetRetailStoreApi | null>(null);
	const [categoryHierarchy, setCategoryHierarchy] = useState<Category[]>([]);

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

		const mainCategories = formattedCategories.filter((category: Category) =>
			category.parents.some((parent: Category) => parent.id === categoryId)
		);

		const additionalCategories = formattedCategories.filter(
			(category: Category) => !mainCategories.includes(category)
		);

		return [...mainCategories, ...additionalCategories.slice(0, 5 - mainCategories.length)].slice(
			0,
			5
		);
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
		console.log('Map reference:', mapInstance);
		console.log('Store coordinates:', storeCoordinates);

		if (storeCoordinates && mapInstance) {
			// Pomeramo mapu na određene koordinate
			mapInstance.panTo({
				lat: storeCoordinates.latitude,
				lng: storeCoordinates.longitude,
			});
			mapInstance.setZoom(zoomLevel);

			// Pomeramo mapu u vidno polje
			const mapContainer = document.getElementById('map');
			mapContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			console.warn('Map or coordinates are not available');
		}
	};

	return (
		<>
			<div id='map' className={`${styles.mapWrapper} relative`}>
				<Map
					id='my-map-id' // Dodajemo ID za povezivanje sa useMap
					defaultCenter={defaultCenter}
					defaultZoom={defaultZoom}
					className={`${styles.mapContainer} rounded-xl shadow-lg overflow-hidden`}
					mapId={'3b269361fc781f1f'}
					mapTypeId='satellite'
					gestureHandling='greedy'
					zoomControl={true}
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
					<MapMarkers
						setCenter={setCenter}
						setZoom={setZoom}
						center={center}
						zoom={zoom}
						defaultCenter={defaultCenter}
						setDefaultCenter={value => setDefaultCenter(value)}
						defaultZoom={defaultZoom}
						setDefaultZoom={value => setDefaultZoom(value)}
						retailStores={retailStores}
						getDisplayedCategories={getDisplayedCategories}
						categoryId={categoryId || 0}
					/>
				</Map>
			</div>

			<div className='results-container p-2 bg-white mt-8  lg:mx-16'>
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
