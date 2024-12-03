import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import { NextPage } from 'next';
import MapProvider from '../MapProvider';
import { Suspense } from 'react';
import { prefixAticleCategory } from '@/app/api/prefix';
import { cookies } from 'next/headers';
import LanguageSelector from '@/app/components/ui/LanguageSelector';
import { Category } from '@/utils/helpers/types';

export function generateMetadata({ params }: { params: { segments: string[] } }) {
	// Prvi segment je jezik (npr. 'rs', 'hu')
	const language = params.segments[0] || 'rs'; // Podrazumevano 'rs' ako je jezik nepoznat

	// Preostali segmenti koji se koriste za putanju (kategorije, proizvodi)
	const pathWithoutLanguage = params.segments.slice(1).join('/');

	// Dinamički generišemo URL na osnovu jezika i segmenta
	const currentUrl = `https://infotrg.com/gde-da-kupim/${pathWithoutLanguage}`;

	// Kreiramo URL-ove za druge jezike
	const languageUrls = {
		rs: `https://infotrg.com/gde-da-kupim/rs/${pathWithoutLanguage}`,
		hu: `https://infotrg.com/gde-da-kupim/hu/${pathWithoutLanguage}`,
	};

	// Vraćamo metadata sa višejezičnom podrškom
	return {
		title: `Infotrg | Gde da kupim? - ${language.toUpperCase()}`, // Uključujemo jezik u title
		alternates: {
			canonical: currentUrl,
			languages: languageUrls,
		},
	};
}

const serializeData = (data: any) => JSON.parse(JSON.stringify(data));

const findCategoryIdBySlug = (slug: string, categories: Category[]): number | null => {
	for (const category of categories) {
		// Ako je slug kategorije isti kao traženi slug, vraćamo ID
		if (category.slug === slug) {
			return category.id; // Vraćamo ID kategorije
		}

		// Ako kategorija ima podkategorije (children), pozivamo rekurzivno funkciju za podkategorije
		if (category.children && category.children.length > 0) {
			const foundCategoryId = findCategoryIdBySlug(slug, category.children);
			if (foundCategoryId) {
				return foundCategoryId; // Vraćamo ID podkategorije ako je pronađena
			}
		}
	}
	return null; // Ako nije pronađena kategorija
};

const getLocationBySlug = (slug: string, locations: any[]): any => {
	// Pronađi lokaciju koja odgovara slugu
	for (const location of locations) {
		if (location.slug === slug) {
			return location; // Vraća objekat lokacije sa ID-jem i ostalim podacima
		}
		// Ako lokacija ima decu (children), proveri i njih
		if (location.children) {
			const childLocation = getLocationBySlug(slug, location.children);
			if (childLocation) return childLocation;
		}
	}
	return null; // Ako nije pronađena
};

const prefetchData = async (queryClient: QueryClient, languageCode: string, segments: string[]) => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	if (!baseUrl) {
		throw new Error('NEXT_PUBLIC_BASE_URL nije definisan u .env datoteci');
	}

	await prefetchQueryFunction({
		queryClient,
		queryKey: ['languages'],
		url: `${baseUrl}/api/languages`,
	});

	const languages = queryClient.getQueryData<{ id: number; code: string }[]>(['languages']);
	const language = languages?.find(lang => lang.code === languageCode);

	if (!language) {
		throw new Error(`Language with code '${languageCode}' not found.`);
	}

	const languageId = language.id;
	// Dohvaćanje kategorija i lokacija
	await Promise.all([
		prefetchQueryFunction({
			queryClient,
			queryKey: ['categories', 'article', languageId],
			url: `${baseUrl}/api/categoriesByLanguage`,
			params: { prefix: prefixAticleCategory, languageId },
		}),
		prefetchQueryFunction({
			queryClient,
			queryKey: ['locations', ''],
			url: `${baseUrl}/api/locationsByLanguage`,
			params: { languageId },
		}),
	]);

	// Ekstrahujemo poslednji segment za filtriranje
	const categories = queryClient.getQueryData<Category[]>(['categories', 'article', languageId]);

	if (!segments || !Array.isArray(segments) || segments.length === 0) {
		throw new Error('Segments array is empty or undefined in prefetchData.');
	}
	const categorySlug = segments[segments.length - 1];
	const categoryId = categories ? findCategoryIdBySlug(categorySlug, categories) : null;

	const allLocations: any[] = queryClient.getQueryData(['locations', '']) || [];

	// Pronalazak ID-ja lokacija na osnovu segmenata
	const locationIds = await Promise.all(
		segments.map(async segment => {
			const [type, name] = segment.split('-');
			if (['state', 'county', 'city', 'suburb'].includes(type)) {
				const location = getLocationBySlug(segment, allLocations); // Pronađi lokaciju prema slugu
				if (location) return { type, id: location.id }; // Vratimo ID ako je pronađena lokacija
			}
			return null; // Ako nije tip lokacije, vratimo null
		})
	);
	console.log('locationIds:', locationIds);
	// Filtriramo null vrednosti i uzimamo samo validne ID-jeve
	const filteredLocationIds = locationIds.filter(location => location !== null);

	await prefetchQueryFunction({
		queryClient,
		queryKey: ['retailStores', languageId],
		url: `${baseUrl}/api/filteredRetailStores`,
		params: {
			languageId,
			categoryId,
			stateId: filteredLocationIds.find(location => location.type === 'state')?.id || null,
			countyId: filteredLocationIds.find(location => location.type === 'county')?.id || null,
			cityId: filteredLocationIds.find(location => location.type === 'city')?.id || null,
			suburbId: filteredLocationIds.find(location => location.type === 'suburb')?.id || null,
		},
	});

	return {
		filteredLocationIds,
		categoryId,
	};
};

const Map: NextPage<{ params: { segments: string[] } }> = async ({ params }) => {
	const queryClient = new QueryClient();
	const segments = params.segments;

	const languageCode = segments[0] || cookies().get('languageCode')?.value || 'rs';

	// Prefetch data
	const { filteredLocationIds, categoryId } = await prefetchData(
		queryClient,
		languageCode,
		segments
	);

	const languages = queryClient.getQueryData<{ id: number; code: string }[]>(['languages']);
	const language = languages?.find(lang => lang.code === languageCode);
	const categories = queryClient.getQueryData<{ id: number; slug: string }[]>([
		'categories',
		'article',
		language?.id || 1,
	]);
	const locations = queryClient.getQueryData<{ id: number; slug: string }[]>([
		'locations',
		language?.id || 1,
	]);

	if (!language) {
		throw new Error(`Language with code '${languageCode}' not found.`);
	}
	const languageId = language.id;

	// Ekstrahujemo parametre za kategorije i lokacije
	const categorySlug = segments[segments.length - 1];
	const category = categories?.find(cat => cat.slug === categorySlug);
	const categoryIdStr = category ? category.id.toString() : null;

	const stateSlug = segments.find(segment => segment.includes('state'));
	const state = locations?.find(loc => loc.slug === stateSlug)?.id;

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className='flex justify-end w-full pr-2'>
				<LanguageSelector languages={serializeData(languages || [])} />
			</div>

			<Suspense fallback={<div>Učitavanje mape...</div>}>
				<MapProvider
					initialData={{
						locations: serializeData(queryClient.getQueryData(['locations', '']) || []),
						articleCategories: serializeData(
							queryClient.getQueryData(['categories', 'article', languageId]) || []
						),
						retails: serializeData(queryClient.getQueryData(['retailStores', languageId]) || []),
						lang: serializeData(languages || []),
					}}
					queryParams={{
						categoryId: categoryIdStr,
						stateId: filteredLocationIds.find(location => location.type === 'state')?.id || null,
						countyId: filteredLocationIds.find(location => location.type === 'county')?.id || null,
						cityId: filteredLocationIds.find(location => location.type === 'city')?.id || null,
						suburbId: filteredLocationIds.find(location => location.type === 'suburb')?.id || null,
					}}
				/>
			</Suspense>
		</HydrationBoundary>
	);
};

export default Map;
