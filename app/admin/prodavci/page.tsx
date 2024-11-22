import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import RetailsAdmin from '@/app/components/pageContent/RetailsAdmin';
import {
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';

const serializeData = (data: any) => {
	return JSON.parse(JSON.stringify(data));
};

const CategoriesAdminPage = async () => {
	const queryClient = new QueryClient();
	const languageId = 1;

	await prefetchData(queryClient, languageId);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<RetailsAdmin
				title='PRODAVCI'
				initialData={{
					locations: serializeData(queryClient.getQueryData(['locations', '']) || []),
					articleCategories: serializeData(
						queryClient.getQueryData(['categories', 'article', languageId]) || []
					),
					activityCategories: serializeData(
						queryClient.getQueryData(['categories', 'activity', languageId]) || []
					),
					objectTypeCategories: serializeData(
						queryClient.getQueryData(['categories', 'objectType', languageId]) || []
					),
					retails: serializeData(queryClient.getQueryData(['retailStores', languageId]) || []),
				}}
			/>
		</HydrationBoundary>
	);
};

// Funkcija za prefetch podataka
async function prefetchData(queryClient: QueryClient, languageId: number) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	if (!baseUrl) {
		throw new Error('NEXT_PUBLIC_BASE_URL nije definisan u .env datoteci');
	}

	await Promise.all([
		prefetchQueryFunction({
			queryClient,
			queryKey: ['retailStores', 1],
			url: `${baseUrl}/api/retailStores`,
			params: { languageId: 1 },
		}),
		prefetchQueryFunction({
			queryClient,
			queryKey: ['locations', ''],
			url: `${baseUrl}/api/locations`,
			params: { prefix: '', languageId: 1 },
		}),
		prefetchQueryFunction({
			queryClient,
			queryKey: ['categories', 'article', languageId],
			url: `${baseUrl}/api/categoriesByLanguage`,
			params: { prefix: prefixAticleCategory, languageId: 1 },
		}),
		prefetchQueryFunction({
			queryClient,
			queryKey: ['categories', 'activity', languageId],
			url: `${baseUrl}/api/categoriesByLanguage`,
			params: { prefix: prefixActivityCategory, languageId: 1 },
		}),
		prefetchQueryFunction({
			queryClient,
			queryKey: ['categories', 'objectType', languageId],
			url: `${baseUrl}/api/categoriesByLanguage`,
			params: { prefix: prefixObjectTypeCategory, languageId: 1 },
		}),
	]);
}

export default CategoriesAdminPage;
