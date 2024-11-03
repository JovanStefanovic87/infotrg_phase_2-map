import React, { useState, useEffect, useRef } from 'react';
import {
	MdApps,
	MdOutlineAlternateEmail,
	MdOutlinePhoneAndroid,
	MdMoreHoriz,
} from 'react-icons/md';
import { FaStore } from 'react-icons/fa';
import { BiSolidNavigation } from 'react-icons/bi';
import { TfiWorld } from 'react-icons/tfi';
import { SlLocationPin } from 'react-icons/sl';
import { FaMagnifyingGlassLocation } from 'react-icons/fa6';
import { FaSearchLocation } from 'react-icons/fa';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import { useSearchParams } from 'next/navigation';
import { useFetchFilteredRetailStores } from '@/app/helpers/api/retailStore';
import { Category, EnhancedCategory, GetRetailStoreApi } from '@/utils/helpers/types';
import DefaultButton from '../components/buttons/DefaultButton';
import ResultTextIconBlock from './ResultTextIconBlock';
import MapMarker from './MapMarker';
import IconButton from '../components/buttons/IconButton';
import BlockButton from '../components/buttons/BlockButton';
import CloseButton from '../components/buttons/CloseButton';
import FormDefaultButton from '../components/buttons/FormDefaultButton';
import RetailStoreCard from './RetailStoreCard';
import AssortmentModal from './AssortmentModal';

const MapContent: React.FC = () => {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const params = useSearchParams();
	const categoryId = params.get('categoryId') ? Number(params.get('categoryId')) : undefined;
	const countryId = params.get('countryId') ? Number(params.get('countryId')) : undefined;
	const cityId = params.get('cityId') ? Number(params.get('cityId')) : undefined;
	const cityPartId = params.get('cityPartId') ? Number(params.get('cityPartId')) : null;
	const marketplaceId = params.get('marketplaceId') ? Number(params.get('marketplaceId')) : null;

	useScrollToTop();

	const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
	const [zoom, setZoom] = useState(10);
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
	// Funkcija za formatiranje podataka iz API-ja u Category format
	const formatCategories = (categories: any[]): Category[] => {
		return categories.map(category => ({
			id: category.id,
			name: category.name || 'Nedefinisano ime', // Ako nema prevoda, koristi originalno ime
			icon: category.icon || null,
			iconId: category.icon?.id || null,
			labelId: category.labelId || 0,
			parents: category.parents ? formatCategories(category.parents) : [], // Rekurzivno formatiramo roditelje
			children: category.childCategories ? formatCategories(category.childCategories) : [], // Rekurzivno formatiramo decu
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
		setCategoryHierarchy([]); // Resetuje categoryHierarchy kada se zatvori modal
		setModalOpen(false);
	};

	const handleNavigationClick = (lat: number, lng: number) => {
		const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
		window.open(url, '_blank');
	};

	useEffect(() => {
		if (retailStores) {
			const categories = retailStores.flatMap(store => store.articleCategories);
			const formattedCategories = formatCategories(categories); // Formatiramo u odgovarajući tip
			const hierarchy = buildCategoryHierarchy(formattedCategories);
			setCategoryHierarchy(hierarchy);
		}
	}, [retailStores]);

	const getDisplayedCategories = (store: GetRetailStoreApi, categoryId: number): Category[] => {
		// Pretpostavljamo da svaki objekat u `store.articleCategories` treba da bude konvertovan u `Category`
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

	// Build the hierarchy and ensure children are nested under their parents
	const buildCategoryHierarchy = (categories: Category[]): Category[] => {
		// Kreiramo mapu kategorija gde je ID ključ, a vrednost je referenca na kategoriju
		const categoryMap: { [key: number]: Category } = {};

		// Inicijalizujemo sve kategorije u categoryMap i postavljamo prazne children i parents nizove
		categories.forEach(category => {
			categoryMap[category.id] = {
				...category,
				children: [],
				parents: [],
			};
		});

		// Prolazimo kroz sve kategorije i postavljamo relationships za roditelje i decu
		categories.forEach(category => {
			category.parents?.forEach(parent => {
				const parentCategory = categoryMap[parent.id];
				if (parentCategory) {
					// Dodajemo trenutnu kategoriju u children niz roditelja
					parentCategory.children.push(categoryMap[category.id]);

					// Dodajemo referencu na roditelja u parents niz trenutne kategorije
					categoryMap[category.id].parents.push(parentCategory);
				}
			});
		});

		// Vraćamo samo top-level kategorije (kategorije bez roditelja)
		return Object.values(categoryMap).filter(category => category.parents.length === 0);
	};

	const centerMapOnStore = (
		storeCoordinates: { latitude: number; longitude: number } | null,
		mapRef: React.RefObject<HTMLDivElement>,
		setCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>,
		setZoom: React.Dispatch<React.SetStateAction<number>>,
		zoomLevel: number = 20
	) => {
		if (storeCoordinates) {
			setCenter({
				lat: storeCoordinates.latitude,
				lng: storeCoordinates.longitude,
			});
			setZoom(zoomLevel);
			mapRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	console.log('categoryHierarchy', categoryHierarchy);
	console.log('retailStores', retailStores);
	return (
		<>
			<div ref={mapRef} className={`${styles.mapWrapper} relative`}>
				<Map
					center={center}
					zoom={zoom}
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
						retailStores={retailStores}
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
					<div className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{retailStores.map((store, index) => (
							<RetailStoreCard
								key={store.id}
								store={store}
								index={index}
								categoryId={categoryId || 0}
								centerMapOnStore={coordinates =>
									centerMapOnStore(coordinates, mapRef, setCenter, setZoom)
								}
								handleNavigationClick={handleNavigationClick}
								openModalForStore={openModalForStore} // Prosleđujemo funkciju za otvaranje modala
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
