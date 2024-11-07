import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, useMap, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import { useSearchParams } from 'next/navigation';
import { useFetchFilteredRetailStores } from '@/app/helpers/api/retailStore';
import { useFetchCategoryByIdAndLanguage } from '@/app/helpers/api/category';
import { useFetchLocationByIdAndLanguage } from '@/app/helpers/api/location';
import { Category, GetRetailStoreApi } from '@/utils/helpers/types';
import RetailStoreCard from './retailStoreList/RetailStoreCard';
import AssortmentModal from './retailStoreList/AssortmentModal';
import SpinnerForContainers from '../components/ui/SpinnerForContainers';
import ErrorDisplay from '../components/modals/systemModals/ErrorDisplay';
import DefaultButton from '../components/buttons/DefaultButton';

const MapContent: React.FC = () => {
	const mapInstance = useMap('my-map-id');
	const params = useSearchParams();
	const [headerText, setHeaderText] = useState<React.ReactNode>('');
	const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : undefined;
	const countryId = params.get('countryId') ? Number(params.get('countryId')) : undefined;
	const cityId = params.get('cityId') ? Number(params.get('cityId')) : undefined;
	const cityPartId = params.get('cityPartId') ? Number(params.get('cityPartId')) : null;
	const marketplaceId = params.get('marketplaceId') ? Number(params.get('marketplaceId')) : null;
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
	useScrollToTop();

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
	console.log('retailStores', retailStores);

	const languageId = 1; // Define languageId
	const { data: mainCategoryData } = useFetchCategoryByIdAndLanguage(categoryId || 10, languageId);
	const { data: mainCountry } = useFetchLocationByIdAndLanguage(
		countryId || 0,
		'country',
		languageId
	);
	const { data: mainCity } = useFetchLocationByIdAndLanguage(cityId || 0, 'city', languageId);
	const { data: mainCityPart } = useFetchLocationByIdAndLanguage(
		cityPartId || 0,
		'cityPart',
		languageId
	);
	const { data: mainMarketplace } = useFetchLocationByIdAndLanguage(
		marketplaceId || 0,
		'marketplace',
		languageId
	);

	// Ekstraktujemo nazive lokacija
	const countryName = mainCountry?.name || '';
	const cityName = mainCity?.name || '';
	const cityPartName = mainCityPart?.name || '';
	const marketplaceName = mainMarketplace?.name || '';

	const locationParts = mainMarketplace?.name;

	const locationText = locationParts;

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

	const getRelatedCategories = (categories: Category[], categoryId: number): Category[] => {
		// Pronađi kategoriju sa prosleđenim `categoryId`
		const mainCategory = categories.find(category => category.id === categoryId);

		if (!mainCategory) return []; // Ako kategorija nije pronađena, vrati prazan niz

		// Filtriraj i pronađi sve kategorije čiji `id` se nalazi u `relatedIds` glavne kategorije
		const relatedCategories = categories.filter(
			category => mainCategory.relatedIds?.includes(category.id) || false
		);

		// Vrati samo do 6 povezanih kategorija
		return relatedCategories.slice(0, 6);
	};

	const relatedCategories = getRelatedCategories(categoryHierarchy, categoryId || 0);

	return (
		<>
			{mainCategoryData?.icon && (
				<div className='flex gap-2 bg-yellowLogo rounded-lg px-4 w-full max-w-xs md:max-w-lg mx-auto relative shadow-inner shadow-black'>
					<div className='relative flex items-center justify-center py-7'>
						<Image
							src={mainCategoryData.icon.url}
							alt={mainCategoryData.name}
							width={100}
							height={100}
							className='object-cover'
						/>
					</div>
					<div className='flex flex-col flex-1 pt-6 relative'>
						<span className='text-2xl font-extrabold text-black uppercase tracking-wide drop-shadow-md break-all text-center'>
							MAJICE DUGIH RUKAVA
						</span>
						<div className='absolute bottom-0 right-0 text-md text-black italic uppercase text-right font-extrabold whitespace-pre-line tracking-wide break-words w-28'>
							<span className='w-28'>{locationText}</span>
						</div>
					</div>
					<div className='absolute -bottom-4 left-0 flex justify-center w-full'>
						<DefaultButton className='px-4 py-1.5 shadow-black shadow-md'>Izmeni</DefaultButton>
					</div>
				</div>
			)}

			<div
				className={`${styles.header} flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-white shadow-lg rounded-md`}>
				<h1 className='text-xl md:text-2xl font-semibold text-gray-800 flex items-center space-x-2 mb-2 md:mb-0'>
					{headerText}
				</h1>
			</div>

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
					<div className='related-categories mt-6 text-black select-none'>
						<h2 className='text-base font-semibold mb-3 text-center'>Povezane kategorije</h2>
						<div className='flex flex-wrap justify-center gap-3'>
							{relatedCategories.map(category => (
								<div
									key={category.id}
									className='flex flex-col items-center p-2 w-20 rounded-md shadow-sm shadow-grayLighter hover:shadow-md transition-shadow duration-200 cursor-pointer'>
									{category.icon && (
										<Image
											src={category.icon.url}
											alt={category.name}
											width={40}
											height={40}
											style={{ objectFit: 'contain' }}
										/>
									)}
									<p className='text-xs text-center font-light truncate max-w-full'>
										{category.name}
									</p>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default MapContent;
