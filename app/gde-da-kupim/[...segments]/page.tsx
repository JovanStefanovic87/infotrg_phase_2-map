import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import { NextPage } from 'next';
import MapProvider from '../MapProvider';
import { Suspense } from 'react';
import { prefixAticleCategory } from '@/app/api/prefix';
import LanguageSelector from '@/app/components/ui/LanguageSelector';

export function generateMetadata({ params }: { params: { segments: string[] } }) {
	const languageCode = params.segments[0];
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

const prefetchData = async (queryClient: QueryClient, languageCode: string) => {
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

	await Promise.all([
		prefetchQueryFunction({
			queryClient,
			queryKey: ['retailStores', languageId],
			url: `${baseUrl}/api/filteredRetailStores`,
			params: { languageId },
		}),
		prefetchQueryFunction({
			queryClient,
			queryKey: ['locations', ''],
			url: `${baseUrl}/api/locationsByLanguage`,
			params: { prefix: '', languageId },
		}),
		prefetchQueryFunction({
			queryClient,
			queryKey: ['categories', 'article', languageId],
			url: `${baseUrl}/api/categoriesByLanguage`,
			params: { prefix: prefixAticleCategory, languageId },
		}),
	]);
};

const Map: NextPage<{ params: { segments: string[] } }> = async ({ params }) => {
	const queryClient = new QueryClient();
	const segments = params.segments;

	const languageCode = segments[0]; // Prvi segment je jezik (lg)

	// Prefetch data
	await prefetchData(queryClient, languageCode);

	const languages = queryClient.getQueryData<{ id: number; code: string }[]>(['languages']);
	const language = languages?.find(lang => lang.code === languageCode);

	if (!language) {
		throw new Error(`Language with code '${languageCode}' not found.`);
	}

	const languageId = language.id;

	// Ostali parametri
	const categoryId = segments.includes('category')
		? segments[segments.indexOf('category') + 1]
		: null;
	const stateId = segments.includes('state') ? segments[segments.indexOf('state') + 1] : null;
	const countyId = segments.includes('county') ? segments[segments.indexOf('county') + 1] : null;
	const cityId = segments.includes('city') ? segments[segments.indexOf('city') + 1] : null;
	const suburbId = segments.includes('suburb') ? segments[segments.indexOf('suburb') + 1] : null;

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
