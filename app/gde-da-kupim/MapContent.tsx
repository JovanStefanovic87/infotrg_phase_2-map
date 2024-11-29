'use client';
import React, { useState, useEffect, useCallback } from 'react';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, useMap, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import { useSearchParams } from 'next/navigation';
import { useCategories } from '@/app/helpers/api/category';
import { useFetchFilteredRetailStores } from '@/app/helpers/api/retailStore';
import { useFetchCategoryByIdAndLanguage } from '@/app/helpers/api/category';
import { useFetchLocationByIdAndLanguage } from '@/app/helpers/api/location';
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

interface Props {
	initialData: {
		locations: LocationDataForMap[];
		articleCategories: Category[];
		retails: RetailFormState[];
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
	const mapInstance = useMap('my-map-id');
	const params = useSearchParams();
	const languageId = 1;
	const locations = initialData.locations;
	const articleCategories = initialData.articleCategories;
	const categoryId = queryParams.categoryId ? Number(queryParams.categoryId) : 0;
	const mainCategoryData = articleCategories.find(category => category.id === categoryId);
	const stateId = queryParams.stateId ? Number(queryParams.stateId) : 1;
	const countyId = queryParams.countyId ? Number(queryParams.countyId) : 0;
	const cityId = queryParams.cityId ? Number(queryParams.cityId) : 0;
	const suburbId = queryParams.suburbId ? Number(queryParams.suburbId) : 0;

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
	const [id, setId] = useState<number | null>(null);
	const [type, setType] = useState<'county' | 'city' | 'suburb' | null>(null);
	useScrollToTop();
	const {
		data: retailStores,
		isLoading,
		error,
	} = useFetchFilteredRetailStores({
		categoryId: categoryId || 0,
		stateId: stateId || 1,
		countyId: countyId || 1,
		cityId: cityId ?? 0,
		suburbId: suburbId ?? 0,
		languageId: 1,
	});
	const isMarkersLoading = !retailStores;
	/* 	const { data: mainCategoryData } = useFetchCategoryByIdAndLanguage(categoryId || 10, languageId); */
	const flattenLocations = (locations: LocationDataForMap[]): LocationDataForMap[] => {
		const flatLocations: LocationDataForMap[] = [];

		const flatten = (locs: LocationDataForMap[]) => {
			for (const location of locs) {
				flatLocations.push(location); // Dodaj trenutnu lokaciju
				if (location.children?.length) {
					flatten(location.children); // Rekurzivno obradi children
				}
			}
		};

		flatten(locations);
		return flatLocations;
	};

	const flatLocations = flattenLocations(locations);

	const mainCounty = flatLocations.find(
		location => location.id === countyId && location.type === 'county'
	);
	const mainCity = flatLocations.find(
		location => location.id === cityId && location.type === 'city'
	);
	const mainSuburb = flatLocations.find(
		location => location.id === suburbId && location.type === 'suburb'
	);

	console.log('mainSuburb', mainSuburb);

	const locationText =
		mainSuburb?.name || mainCity?.name || mainCounty?.name || 'Nepoznata lokacija';

	const openEditModal = () => setEditModalOpen(true);
	1;
	const closeEditModal = () => setEditModalOpen(false);

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

	useEffect(() => {
		if (retailStores) {
			const categories = retailStores.flatMap(store => store.articleCategories);
			const formattedCategories = formatCategories(categories);
			const hierarchy = buildCategoryHierarchy(formattedCategories);
			setCategoryHierarchy(hierarchy);
		}
	}, [retailStores, formatCategories]);

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

	const reloadData = () => {
		const currentParams = new URLSearchParams(window.location.search);
		const categoryId = currentParams.get('categoryId')
			? Number(currentParams.get('categoryId'))
			: undefined;
		const stateId = currentParams.get('stateId') ? Number(currentParams.get('stateId')) : undefined;
		const countyId = currentParams.get('countyId') ? Number(currentParams.get('countyId')) : 0;
		const cityId = currentParams.get('cityId') ? Number(currentParams.get('cityId')) : 0;
		const suburbId = currentParams.get('suburbId') ? Number(currentParams.get('suburbId')) : 0;

		// Update local state
		setSelectedCategory(categoryId ? { id: categoryId, name: '' } : null);
		setSelectedLocation(
			suburbId
				? { id: suburbId, name: '', type: 'suburb' }
				: cityId
				? { id: cityId, name: '', type: 'city' }
				: countyId
				? { id: countyId, name: '', type: 'county' }
				: null
		);
	};

	const handleUpdateParams = (newId: number, newType: 'county' | 'city' | 'suburb') => {
		setId(newId);
		setType(newType);
	};

	const onSave = () => {
		// Koristimo trenutno selektovane kategorije i lokacije
		const categoryId = selectedCategory?.id || null;
		const location = selectedLocation || null;

		const url = new URL(window.location.href);

		// Ažuriraj URL parametre za kategoriju
		if (categoryId) {
			url.searchParams.set('categoryId', categoryId.toString());
		} else {
			url.searchParams.delete('categoryId');
		}

		// Ažuriraj URL parametre za lokaciju prema tipu
		if (location?.type === 'suburb') {
			url.searchParams.set('suburbId', location.id.toString());
			if (location.cityId) {
				url.searchParams.set('cityId', location.cityId.toString());
			}
			if (location.countyId) {
				url.searchParams.set('countyId', location.countyId.toString());
			}
		} else if (location?.type === 'city') {
			url.searchParams.set('cityId', location.id.toString());
			if (location.countyId) {
				url.searchParams.set('countyId', location.countyId.toString());
			}
			url.searchParams.delete('suburbId'); // Uklanja suburb ako je prelazak na city
		} else if (location?.type === 'county') {
			url.searchParams.set('countyId', location.id.toString());
			url.searchParams.delete('cityId');
			url.searchParams.delete('suburbId');
		} else {
			// Ako nema validne lokacije, brišu se svi lokacijski parametri
			url.searchParams.delete('countyId');
			url.searchParams.delete('cityId');
			url.searchParams.delete('suburbId');
		}

		// Ažuriranje URL-a
		history.pushState({}, '', url.toString());

		// Osvježavanje lokalnog stanja sa ažuriranim parametrima
		reloadData();
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
				onSave={onSave}
				location={selectedLocation}
				selectedCategory={selectedCategory}
				selectedLocation={selectedLocation}
				setSelectedCategory={setSelectedCategory}
				setSelectedLocation={setSelectedLocation}
				categories={articleCategories}
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
