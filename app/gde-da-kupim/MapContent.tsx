import React, { useState, useEffect } from 'react';
import { MdApps, MdOutlineAlternateEmail, MdOutlinePhoneAndroid } from 'react-icons/md';
import { FaStore } from 'react-icons/fa';
import { TfiWorld } from 'react-icons/tfi';
import { GiPositionMarker } from 'react-icons/gi';
import useScrollToTop from '../../utils/helpers/useScrollToTop';
import { Map, ControlPosition } from '@vis.gl/react-google-maps';
import MapMarkers from './MapMarkers';
import styles from '../components/map/Map.module.css';
import { useSearchParams } from 'next/navigation';
import { useFetchFilteredRetailStores } from '@/app/helpers/api/retailStore';
import { Category, EnhancedCategory } from '@/utils/helpers/types';
import DefaultButton from '../components/buttons/DefaultButton';

const MapContent: React.FC = () => {
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
			<div className={`${styles.mapWrapper} relative`}>
				<Map
					center={center}
					zoom={zoom}
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
					<MapMarkers setCenter={setCenter} setZoom={setZoom} center={center} zoom={zoom} />
				</Map>
			</div>

			<div className='results-container p-2 bg-white shadow-xl rounded-lg mt-8 mx-4 lg:mx-16'>
				{isLoading && <p className='text-center text-gray-500'>Učitavanje...</p>}
				{error && (
					<p className='text-center text-red-500'>
						Došlo je do greške prilikom učitavanja podataka.
					</p>
				)}
				{retailStores && retailStores.length > 0 ? (
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{retailStores.map((store, index) => (
							<div key={store.id} className='p-2 rounded-lg bg-white relative'>
								{/* Indeks u gornjem levom uglu */}
								<div className='absolute top-2 right-2 bg-red-600 text-white text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center'>
									{index + 1}
								</div>

								<div className='flex items-center mb-4'>
									<div className='bg-yellow-100 p-3 rounded-full'>
										<span className='text-black text-3xl'>
											<FaStore />
										</span>
									</div>
									<div>
										<h3 className='ml-3 text-2xl font-bold text-gray-800'>{store.name}</h3>
										{store.objectTypeCategories && store.objectTypeCategories.length > 0 && (
											<div className='flex items-center ml-3'>
												<span className='text-gray-800'>
													{store.objectTypeCategories
														.map(c => {
															const translation = c.label?.translations?.[0]?.translation;
															return translation ? translation : c.name || 'Nedefinisano';
														})
														.join(', ')}
												</span>
											</div>
										)}
									</div>
								</div>

								<div className='my-3 flex items-center border-b-2'>
									{/* Ikonica kategorije */}
									<span className='text-grayMedium text-lg mr-2'>
										<MdApps />
									</span>

									<div>
										<div
											className='flex flex-wrap mb-2 overflow-x-auto max-w-full'
											onClick={() => setModalOpen(true)}>
											{categoryHierarchy
												.filter(category => category.id === categoryId)
												.flatMap(category => category.children.slice(0, 5))
												.map((childCategory, index, arr) => (
													<span
														key={index}
														className='text-black px-[1px] py-[1px] text-xs font-normal cursor-pointer hover:underline'
														onClick={() => setModalOpen(true)}>
														{`${childCategory.name}${index < arr.length - 1 ? ', ' : ''}`}
													</span>
												))}
										</div>
									</div>
								</div>

								{(store.phoneNumber || store.email || store.website) && (
									<div className='my-3 flex items-start gap-2 border-b-2'>
										<div className='space-y-2'>
											{store.phoneNumber && (
												<div className='flex items-center gap-2'>
													<span className='text-grayMedium text-lg'>
														<MdOutlinePhoneAndroid />
													</span>
													<span className='text-blueDarker'>{store.phoneNumber}</span>
												</div>
											)}
											{store.email && (
												<div className='flex items-center gap-2'>
													<span className='text-grayMedium text-lg'>
														<MdOutlineAlternateEmail />
													</span>
													<span className='text-blueDarker'>{store.email}</span>
												</div>
											)}
											{store.website && (
												<div className='pb-2 flex items-center gap-2'>
													<span className='text-grayMedium text-lg'>
														<TfiWorld />
													</span>
													<span className='text-blueDarker'>{store.website}</span>
												</div>
											)}
										</div>
									</div>
								)}

								<div className='flex items-center gap-2'>
									<span className='text-grayMedium text-lg'>
										<GiPositionMarker />
									</span>
									<span className='text-gray-800'>
										{store.city?.label?.translations?.[0]?.translation || 'Grad nije definisan'},{' '}
										{store.address}, {store.coordinates?.locationDescription}
									</span>
								</div>
								<div className='flex items-center justify-center gap-2 mt-4'>
									<DefaultButton>Putanja</DefaultButton>
								</div>

								{isModalOpen && (
									<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black'>
										<div className='bg-white p-6 rounded-lg shadow-lg w-full h-full sm:max-w-lg sm:max-h-[75vh] sm:w-auto sm:h-auto flex flex-col overflow-hidden'>
											<h4 className='text-lg font-semibold mb-4 text-center'>
												Sve kategorije i potkategorije
											</h4>
											<div className='border rounded-lg p-4 h-full overflow-y-auto flex-grow'>
												<CategoryHierarchy categories={categoryHierarchy} />
											</div>
											<button
												className='mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200'
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
