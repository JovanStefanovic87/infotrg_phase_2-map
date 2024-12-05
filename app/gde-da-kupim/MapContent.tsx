'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Map, useMap, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import {
	Category,
	GetRetailStoreApi,
	LocationDataForMap,
	CategoryDataForMap,
	RawCategoryData,
	SimplifiedCategory,
	RetailFormState,
	Language,
} from '@/utils/helpers/types';
import RetailStoreCard from './retailStoreList/RetailStoreCard';
import AssortmentModal from './retailStoreList/AssortmentModal';
import SpinnerForContainers from '../components/ui/SpinnerForContainers';
import ErrorDisplay from '../components/modals/systemModals/ErrorDisplay';
import RelatedCategories from './retailStoreList/RelatedCategroies';
import CurrentSelectionPanel from './retailStoreList/CurrentSelectionPanel';
import EditSelectionModal from '../components/modals/EditSelectionModal';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
	initialData: {
		locations: LocationDataForMap[];
		articleCategories: Category[];
		retails: GetRetailStoreApi[];
		lang: Language[];
	};
	queryParams: {
		categoryId: string | null;
		stateId: string | null;
		countyId: string | null;
		cityId: string | null;
		suburbId: string | null;
	};
}

const MapContent: React.FC<Props> = ({ initialData, queryParams }) => {
	const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
	const router = useRouter();
	const pathname = usePathname();
	const mapInstance = useMap('my-map-id');
	const locations = initialData.locations;
	const articleCategories = initialData.articleCategories;
	const categoryId =
		queryParams.categoryId && Number(queryParams.categoryId) > 0
			? Number(queryParams.categoryId)
			: articleCategories[0]?.id || null;
	const segments = pathname.split('/').filter(segment => segment);
	const lastSegment = segments[segments.length - 1];
	const findCategoryBySlug = (categories: Category[], slug: string): Category | null => {
		for (const category of categories) {
			if (category.slug === slug) {
				return category;
			}
			if (category.children && category.children.length > 0) {
				const found = findCategoryBySlug(category.children, slug);
				if (found) {
					return found;
				}
			}
		}
		return null;
	};
	const mainCategoryData = findCategoryBySlug(articleCategories, lastSegment);
	const stateId = queryParams.stateId ? Number(queryParams.stateId) : null;
	const countyId = queryParams.countyId ? Number(queryParams.countyId) : null;
	const cityId = queryParams.cityId ? Number(queryParams.cityId) : null;
	const suburbId = queryParams.suburbId ? Number(queryParams.suburbId) : null;
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
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<CategoryDataForMap | null>(null);
	const [selectedLocation, setSelectedLocation] = useState<LocationDataForMap | null>(null);
	const retailStores = initialData.retails;
	const isLoading = !retailStores;

	const findLocation = (
		locations: LocationDataForMap[],
		id: number | null,
		type: string
	): LocationDataForMap | undefined => {
		for (const location of locations) {
			if (location.id === id && location.type === type) {
				return location; // Pronađena lokacija
			}
			if (location.children && location.children.length > 0) {
				const result = findLocation(location.children, id, type);
				if (result) {
					return result; // Pronađeno u podnivoima
				}
			}
		}
		return undefined;
	};

	const mainCounty = findLocation(locations, countyId, 'county');
	const mainCity = findLocation(locations, cityId, 'city');
	const mainSuburb = findLocation(locations, suburbId, 'suburb');

	const locationText =
		mainSuburb?.name || mainCity?.name || mainCounty?.name || 'Nepoznata lokacija';

	const openEditModal = () => setEditModalOpen(true);
	1;
	const closeEditModal = () => setEditModalOpen(false);
	const handleClose = () => {
		setEditModalOpen(false);
		router.push('/');
	};

	useEffect(() => {
		if (mainSuburb) {
			setSelectedLocation({
				id: mainSuburb.id,
				name: mainSuburb.name,
				slug: mainSuburb.slug,
				type: 'suburb',
				parents: mainSuburb.parents,
			});
		} else if (mainCity) {
			setSelectedLocation({
				id: mainCity.id,
				name: mainCity.name,
				slug: mainCity.slug,
				type: 'city',
				parents: mainCity.parents,
			});
		} else if (mainCounty) {
			setSelectedLocation({
				id: mainCounty.id,
				name: mainCounty.name,
				slug: mainCounty.slug,
				type: 'county',
				parents: mainCounty.parents,
			});
		}
	}, [mainSuburb, mainCity, mainCounty]);

	useEffect(() => {
		if (mainCategoryData) {
			setSelectedCategory({
				id: mainCategoryData.id,
				name: mainCategoryData.name || '',
				slug: mainCategoryData.slug,
				parents: mainCategoryData.parents || [],
			});
		}
	}, [mainCategoryData]);

	const formatCategories = useCallback((categories: RawCategoryData[]): Category[] => {
		return categories.map(category => ({
			id: category.id,
			name: category.name || 'Nedefinisano ime',
			icon: category.icon || null,
			iconId: category.iconId || null,
			labelId: category.labelId || 0,
			parents: category.parents ? formatCategories(category.parents) : [],
			children: category.childCategories ? formatCategories(category.childCategories) : [],
			relatedIds: category.relatedCategories?.map(relCategory => relCategory.id) || [],
			synonyms: Array.isArray(category.synonyms)
				? category.synonyms.map(synonym =>
						typeof synonym === 'string' ? synonym : synonym.synonym
				  )
				: [],
		}));
	}, []);

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
			category.parents.some((parent: SimplifiedCategory) => parent.id === categoryId)
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
			}, 100);
		} else {
			console.warn('Map or coordinates are not available');
		}
	};

	const relatedCategories = mainCategoryData?.relatedCategories || [];

	if (segments.length < 4) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<EditSelectionModal
					isOpen={true}
					onClose={closeEditModal}
					handleClose={handleClose}
					location={selectedLocation}
					selectedCategory={selectedCategory}
					selectedLocation={selectedLocation}
					setSelectedCategory={setSelectedCategory}
					setSelectedLocation={setSelectedLocation}
					categories={initialData.articleCategories}
					locations={initialData.locations}
				/>
			</div>
		);
	}

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
				handleClose={closeEditModal}
				location={selectedLocation}
				selectedCategory={selectedCategory}
				selectedLocation={selectedLocation}
				setSelectedCategory={setSelectedCategory}
				setSelectedLocation={setSelectedLocation}
				categories={articleCategories}
				locations={locations}
			/>
			<div
				id='map'
				className={`${styles.mapWrapper} relative rounded-xl shadow-md shadow-grayMedium overflow-hidden mt-4 sm:mt-2`}>
				<Map
					id='my-map-id'
					defaultCenter={defaultCenter}
					defaultZoom={defaultZoom}
					className={`${styles.mapContainer}`}
					mapId={mapId}
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
					{isLoading && (
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
						openModalForStore={openModalForStore}
					/>
				</Map>
			</div>

			<div className='results-container p-2 bg-white mt-8 lg:mx-16'>
				{isLoading && <p className='text-center text-gray-500'>Učitavanje...</p>}
				{/* {error && (
					<ErrorDisplay
						error={'Došlo je do greške prilikom učitavanja podataka.'}
						clearError={() => {}}
					/>
				)} */}
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
					<RelatedCategories
						relatedCategories={relatedCategories.map(category => ({
							...category,
							icon: category.icon || null,
							parents: category.parents || [],
							children: category.children || [],
						}))}
					/>
				)}
			</div>
		</div>
	);
};

export default MapContent;
