import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import { NextPage } from 'next';
import MapProvider from '../MapProvider';
import { Suspense } from 'react';
import { prefixAticleCategory } from '@/app/api/prefix';
import { cookies } from 'next/headers';
import LanguageSelector from '@/app/components/ui/LanguageSelector';

export function generateMetadata({ params }: { params: { segments: string[] } }) {
	const currentUrl = `https://infotrg.com/gde-da-kupim/${params.segments.join('/')}`;
	return {
		title: 'Infotrg | Gde da kupim?',
		alternates: {
			canonical: currentUrl,
			languages: {
				rs: `https://infotrg.com/gde-da-kupim/rs`,
				hu: `https://infotrg.com/gde-da-kupim/hu`,
			},
		},
	};
}

const serializeData = (data: any) => JSON.parse(JSON.stringify(data));

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
	const categorySlug = segments[segments.length - 1];
	const categories = queryClient.getQueryData<{ id: number; slug: string }[]>([
		'categories',
		'article',
		languageId,
	]);
	console.log('categories:', categories);
	if (!segments || !Array.isArray(segments) || segments.length === 0) {
		throw new Error('Segments array is empty or undefined in prefetchData.');
	}
	const category = categories?.find(cat => cat.slug === categorySlug);
	if (!category) {
		console.warn(`Category with slug "${categorySlug}" not found in prefetchData.`);
	}
	const categoryId = category ? category.id.toString() : null;

	// Dodajemo filtriranje za lokaciju i prodavce
	await prefetchQueryFunction({
		queryClient,
		queryKey: ['retailStores', languageId],
		url: `${baseUrl}/api/filteredRetailStores`,
		params: {
			languageId,
			categoryId,
			stateId: segments.find(segment => segment.includes('state')) || null,
			countyId: segments.find(segment => segment.includes('county')) || null,
			cityId: segments.find(segment => segment.includes('city')) || null,
			suburbId: segments.find(segment => segment.includes('suburb')) || null,
		},
	});
};

const Map: NextPage<{ params: { segments: string[] } }> = async ({ params }) => {
	const queryClient = new QueryClient();
	const segments = params.segments;

	const languageCode = segments[0] || cookies().get('languageCode')?.value || 'rs';

	// Prefetch data
	await prefetchData(queryClient, languageCode, segments);

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
	const categoryId = category ? category.id.toString() : null;

	const stateSlug = segments.find(segment => segment.includes('state'));
	const state = locations?.find(loc => loc.slug === stateSlug)?.id;
	const stateId = state ? state.toString() : null;

	const countySlug = segments.find(segment => segment.includes('county'));
	const countyId = countySlug ? countySlug.split('-')[1] : null;
	const citySlug = segments.find(segment => segment.includes('city'));
	const cityId = citySlug ? citySlug.split('-')[1] : null;
	const suburbSlug = segments.find(segment => segment.includes('suburb'));
	const suburbId = suburbSlug ? suburbSlug.split('-')[1] : null;

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
						categoryId,
						stateId,
						countyId,
						cityId,
						suburbId,
					}}
				/>
			</Suspense>
		</HydrationBoundary>
	);
};

export default Map;
