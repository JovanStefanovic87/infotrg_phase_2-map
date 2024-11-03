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

	const CategoryHierarchy: React.FC<{ categories: Category[] }> = ({ categories }) => {
		return (
			<ul className='space-y-1 sm:space-y-2 sm:ml-4 border-gray-200 overflow-x-auto'>
				{categories.map(category => (
					<div
						key={category.id}
						className='text-gray-700 hover:text-indigo-600 transition-colors duration-200'>
						<div className='flex items-center gap-2 sm:gap-3 py-1 sm:py-2'>
							<img
								src={category.icon?.url || '/icons/default-icon.png'}
								alt={category.name}
								className='w-4 h-4 sm:w-5 sm:h-5 rounded-full'
							/>
							<span className='text-sm sm:text-base font-medium'>{category.name}</span>
						</div>
						{category.children && category.children.length > 0 && (
							<div className='ml-3 sm:ml-5 border-l border-gray-200 pl-2 sm:pl-3 mt-1'>
								<CategoryHierarchy categories={category.children} />
							</div>
						)}
					</div>
				))}
			</ul>
		);
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
							<div
								key={store.id}
								className='p-4 bg-white border-b-8 pb-6 rounded-lg shadow-md relative'>
								<div
									className='absolute top-2 right-2 bg-red-600 text-white text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center'
									onClick={e => {
										e.stopPropagation();
										store.coordinates &&
											centerMapOnStore(store.coordinates, mapRef, setCenter, setZoom);
									}}>
									<MapMarker index={index} />
								</div>

								<div className='flex items-center mb-4 space-x-3'>
									<div className='bg-yellow-100 p-3 rounded-full'>
										<FaStore className='text-black text-3xl' />
									</div>
									<div>
										<h3 className='text-xl font-bold text-gray-800'>{store.name}</h3>
										{store.objectTypeCategories && store.objectTypeCategories.length > 0 && (
											<div className='text-gray-800 text-sm'>
												{store.objectTypeCategories
													.map(c => {
														const translation = c.label?.translations?.[0]?.translation;
														return translation || c.name || 'Nedefinisano';
													})
													.join(', ')}
											</div>
										)}
									</div>
								</div>

								<div className='flex items-center border-b-2 mb-2'>
									<MdApps className='text-gray-500 text-2xl mr-2 flex-shrink-0' />
									<div
										className='flex flex-wrap items-center overflow-x-auto max-w-full space-x-1 text-black cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors duration-200'
										onClick={e => {
											e.stopPropagation();
											openModalForStore(store);
										}}>
										{getDisplayedCategories(store, categoryId || 0).map(
											(childCategory, idx, arr) => (
												<span key={idx} className='text-xs font-normal'>
													{`${childCategory.name}${idx < arr.length - 1 ? ', ' : ''}`}
												</span>
											)
										)}
										<span className='flex items-center ml-4 py-1 text-sm font-semibold'>
											{`Vidi više >`}
										</span>
									</div>
								</div>

								{(store.phoneNumber || store.email || store.website) && (
									<div className='flex items-start gap-2 border-b-2 pb-2 mb-2'>
										<div className='space-y-2'>
											{store.phoneNumber && (
												<ResultTextIconBlock text={store.phoneNumber} color='text-blueDarker'>
													<MdOutlinePhoneAndroid />
												</ResultTextIconBlock>
											)}
											{store.email && (
												<ResultTextIconBlock text={store.email} color='text-blueDarker'>
													<MdOutlineAlternateEmail />
												</ResultTextIconBlock>
											)}
											{store.website && (
												<ResultTextIconBlock text={store.website} color='text-blueDarker'>
													<TfiWorld />
												</ResultTextIconBlock>
											)}
										</div>
									</div>
								)}

								<div className='flex items-center gap-2'>
									<ResultTextIconBlock
										text={`${
											store.city?.label?.translations?.[0]?.translation || 'Grad nije definisan'
										}, ${store.address}, ${store.coordinates?.locationDescription}`}
										color='text-black'>
										<SlLocationPin />
									</ResultTextIconBlock>
								</div>

								<div className='flex items-center justify-center gap-2 mt-4 w-full'>
									<div className='flex-1'>
										<IconButton
											icon={<FaSearchLocation className='animate-bounceSmall drop-shadow-md' />}
											text='Lociraj'
											onClick={() => {
												store.coordinates &&
													centerMapOnStore(store.coordinates, mapRef, setCenter, setZoom);
											}}
										/>
									</div>
									<div className='flex-1'>
										<IconButton
											icon={<BiSolidNavigation className='animate-bounceSmall drop-shadow-md' />}
											text='Putanja'
											onClick={() =>
												store.coordinates &&
												handleNavigationClick(
													store.coordinates.latitude,
													store.coordinates.longitude
												)
											}
										/>
									</div>
								</div>
								{isModalOpen && activeStore && (
									<div
										className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
										onClick={() => closeModalForStore()}>
										<div
											className='bg-white p-4 rounded-lg shadow-lg w-full max-w-lg h-[80vh] flex flex-col overflow-hidden'
											onClick={e => e.stopPropagation()}>
											<h4 className='text-2xl font-extrabold text-center text-indigo-700 mb-2'>
												Asortiman proizvoda
											</h4>
											<p className='text-lg font-semibold text-center text-gray-800 mb-4'>
												{activeStore.name}
											</p>
											<div className='border-t border-gray-300 mb-4'></div>
											<div className='flex-1 border rounded-lg p-4 overflow-y-auto'>
												<CategoryHierarchy categories={categoryHierarchy} />
											</div>
											<div className='flex justify-center items-center p-4'>
												<FormDefaultButton onClick={() => closeModalForStore()} label='Zatvori' />
											</div>
										</div>
									</div>
								)}
							</div>
						))}
					</div>
				) : (
					<p className='text-center text-gray-500 mt-6'>Nema dostupnih prodavnica za prikaz.</p>
				)}
			</div>
		</>
	);
};

export default MapContent;
