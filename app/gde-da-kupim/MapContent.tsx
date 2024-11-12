import React, { useState, useEffect } from 'react';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, useMap, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import { useSearchParams } from 'next/navigation';
import { useCategories } from '@/app/helpers/api/category';
import { useFetchLocationsWithoutStates } from '@/app/helpers/api/location';
import { useFetchFilteredRetailStores } from '@/app/helpers/api/retailStore';
import { useFetchCategoryByIdAndLanguage } from '@/app/helpers/api/category';
import { useFetchLocationByIdAndLanguage } from '@/app/helpers/api/location';
import {
	Category,
	GetRetailStoreApi,
	LocationDataForMap,
	CategoryDataForMap,
} from '@/utils/helpers/types';
import { prefixAticleCategory, location } from '@/app/api/prefix';
import RetailStoreCard from './retailStoreList/RetailStoreCard';
import AssortmentModal from './retailStoreList/AssortmentModal';
import SpinnerForContainers from '../components/ui/SpinnerForContainers';
import ErrorDisplay from '../components/modals/systemModals/ErrorDisplay';
import RelatedCategories from './retailStoreList/RelatedCategroies';
import CurrentSelectionPanel from './retailStoreList/CurrentSelectionPanel';
import EditSelectionModal from '../components/modals/EditSelectionModal';

const MapContent: React.FC = () => {
	const mapInstance = useMap('my-map-id');
	const params = useSearchParams();
	const { data: categories = [] } = useCategories(prefixAticleCategory);
	const { data: locations = [] } = useFetchLocationsWithoutStates({
		prefix: location,
		languageId: 1,
	});
	const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : undefined;
	/* const stateId = params.get('stateId') ? Number(params.get('stateId')) : undefined; */
	const countyId = params.get('countyId') ? Number(params.get('countyId')) : undefined;
	const cityId = params.get('cityId') ? Number(params.get('cityId')) : null;
	const suburbId = params.get('suburbId') ? Number(params.get('suburbId')) : null;
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
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<CategoryDataForMap | null>(null);
	const [selectedLocation, setSelectedLocation] = useState<LocationDataForMap | null>(null);

	useScrollToTop();

	const {
		data: retailStores,
		isLoading,
		error,
	} = useFetchFilteredRetailStores({
		categoryId: categoryId || 0,
		countyId: countyId || 1,
		cityId: cityId ?? null,
		suburbId: suburbId ?? null,
		languageId: 1,
	});

	const languageId = 1;
	const { data: mainCategoryData } = useFetchCategoryByIdAndLanguage(categoryId || 10, languageId);
	const { data: mainCounty } = useFetchLocationByIdAndLanguage(countyId || 0, 'county', languageId);
	const { data: mainCity } = useFetchLocationByIdAndLanguage(cityId || 0, 'city', languageId);
	const { data: mainSuburb } = useFetchLocationByIdAndLanguage(suburbId || 0, 'suburb', languageId);
	const locationText =
		mainSuburb?.name || mainCity?.name || mainCounty?.name || 'Nepoznata lokacija';

	const openEditModal = () => setEditModalOpen(true);
	1;
	const closeEditModal = () => setEditModalOpen(false);

	/* const handleSaveSelection = (category: string, location: string) => {
		setSelectedCategory(category);
		setSelectedLocation(location);
	}; */

	console.log('categories', categories);

	useEffect(() => {
		if (mainCategoryData) {
			setSelectedCategory({ id: mainCategoryData.id, name: mainCategoryData.name || '' });
		}
		if (mainSuburb) {
			setSelectedLocation({ id: mainSuburb.id, name: mainSuburb.name, type: 'suburb' });
		} else if (mainCity) {
			setSelectedLocation({ id: mainCity.id, name: mainCity.name, type: 'city' });
		} else if (mainCounty) {
			setSelectedLocation({ id: mainCounty.id, name: mainCounty.name, type: 'county' });
		}
	}, [mainCategoryData, mainSuburb, mainCity, mainCounty]);

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
			relatedIds: category.relatedCategories?.map((relCategory: any) => relCategory.id) || [],
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

		const directSubcategories = formattedCategories.filter((category: Category) =>
			category.parents.some((parent: Category) => parent.id === categoryId)
		);

		if (directSubcategories.length > 0) {
			return directSubcategories.slice(0, 5);
		}

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
			mapInstance.setZoom(zoomLevel);
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

	const relatedCategories = mainCategoryData?.relatedCategories || [];

	return (
		<div className='flex flex-col gap-6'>
			{mainCategoryData?.icon && (
				<CurrentSelectionPanel
					mainCategoryData={mainCategoryData}
					locationText={locationText}
					openEditModal={openEditModal}
				/>
			)}
			<EditSelectionModal
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				location={mainSuburb}
				selectedCategory={selectedCategory}
				selectedLocation={selectedLocation}
				setSelectedCategory={setSelectedCategory}
				setSelectedLocation={setSelectedLocation}
				categories={categories}
				locations={locations}
			/>
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
							<SpinnerForContainers />
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
						map={mapInstance}
					/>
				</Map>
			</div>

			<div className='results-container p-2 bg-white mt-8 lg:mx-16'>
				{isLoading && <p className='text-center text-gray-500'>Učitavanje...</p>}
				{error && (
					<ErrorDisplay
						error={'Došlo je do greške prilikom učitavanja podataka.'}
						clearError={() => {}}
					/>
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
				{relatedCategories.length > 0 && (
					<RelatedCategories relatedCategories={relatedCategories} />
				)}
			</div>
		</div>
	);
};

export default MapContent;
