import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import { NextPage } from 'next';
import MapProvider from '../MapProvider';
import { Suspense } from 'react';
import { prefixAticleCategory } from '@/app/api/prefix';
import LanguageSelector from '@/app/components/ui/LanguageSelector';

export function generateMetadata({ params }: { params: { lg: string } }) {
	const currentUrl = `https://infotrg.com/gde-da-kupim/${params.lg}`;
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

const serializeData = (data: any) => {
	return JSON.parse(JSON.stringify(data));
};

const Map: NextPage<{ params: { lg: string } }> = async ({
	params,
}: {
	params: { lg: string };
}) => {
	const queryClient = new QueryClient();
	const languageCode = params.lg;

	await prefetchData(queryClient, languageCode);

	// Dohvati languageId iz prefetchovanih podataka
	const languages = queryClient.getQueryData<{ id: number; code: string }[]>(['languages']);
	const language = languages?.find(lang => lang.code === languageCode);

	if (!language) {
		throw new Error(`Language with code '${languageCode}' not found.`);
	}

	const languageId = language.id;

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className='flex justify-end w-full pr-2'>
				<LanguageSelector
					languages={serializeData(queryClient.getQueryData(['languages']) || [])}
				/>
			</div>

			<Suspense fallback={<div>Učitavanje mape...</div>}>
				<MapProvider
					initialData={{
						locations: serializeData(queryClient.getQueryData(['locations', '']) || []),
						articleCategories: serializeData(
							queryClient.getQueryData(['categories', 'article', languageId]) || []
						),
						retails: serializeData(queryClient.getQueryData(['retailStores', languageId]) || []),
						lang: serializeData(queryClient.getQueryData(['languages']) || []),
					}}
				/>
			</Suspense>
		</HydrationBoundary>
	);
};

async function prefetchData(queryClient: QueryClient, languageCode: string) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	if (!baseUrl) {
		throw new Error('NEXT_PUBLIC_BASE_URL nije definisan u .env datoteci');
	}

	// Fetch available languages
	await prefetchQueryFunction({
		queryClient,
		queryKey: ['languages'],
		url: `${baseUrl}/api/languages`,
	});

	// Get the list of languages from the queryClient cache
	const languages = queryClient.getQueryData<{ id: number; code: string }[]>(['languages']);

	// Find the corresponding languageId for the given languageCode
	const language = languages?.find(lang => lang.code === languageCode);

	if (!language) {
		throw new Error(`Language with code '${languageCode}' not found.`);
	}

	const languageId = language.id;

	// Prefetch data with the obtained languageId
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
	]);
}

export default Map;
