import React, { useState, useEffect, useRef } from 'react';
import { MdApps, MdOutlineAlternateEmail, MdOutlinePhoneAndroid } from 'react-icons/md';
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
import { Category, EnhancedCategory } from '@/utils/helpers/types';
import DefaultButton from '../components/buttons/DefaultButton';
import ResultTextIconBlock from './ResultTextIconBlock';
import MapMarker from './MapMarker';
import IconButton from '../components/buttons/IconButton';

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
							<span className='text-xs sm:text-sm font-medium'>{category.name}</span>
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
								className='p-4 bg-white border-b-8 pb-6 rounded-lg shadow-md relative'
								onClick={e => {
									e.stopPropagation();
									if (store.coordinates) {
										setCenter({
											lat: store.coordinates.latitude,
											lng: store.coordinates.longitude,
										});
										setZoom(20);
										mapRef.current?.scrollIntoView({ behavior: 'smooth' });
									}
								}}>
								<div className='absolute top-2 right-2 bg-red-600 text-white text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center'>
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

								<div className='flex items-center border-b-2 pb-2 mb-2'>
									<MdApps className='text-gray-500 text-lg mr-2' />
									<div className='flex flex-wrap overflow-x-auto max-w-full space-x-1 text-black'>
										{categoryHierarchy
											.filter(category => category.id === categoryId)
											.flatMap(category => category.children.slice(0, 5))
											.map((childCategory, idx, arr) => (
												<span
													key={idx}
													className='text-xs font-normal cursor-pointer hover:underline'
													onClick={() => setModalOpen(true)}>
													{`${childCategory.name}${idx < arr.length - 1 ? ', ' : ''}`}
												</span>
											))}
									</div>
								</div>

								{(store.phoneNumber || store.email || store.website) && (
									<div className='flex items-start gap-2 border-b-2 pb-2'>
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
								{isModalOpen && (
									<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
										<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto flex flex-col overflow-hidden'>
											<h4 className='text-lg font-semibold mb-4 text-center'>
												Sve kategorije i potkategorije
											</h4>
											<div className='border rounded-lg p-4 overflow-y-auto h-60'>
												<CategoryHierarchy categories={categoryHierarchy} />
											</div>
											<button
												className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 w-full'
												onClick={() => setModalOpen(false)}>
												Zatvori
											</button>
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
