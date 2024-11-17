import { NextPage } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import CategoriesAdmin from '../../components/pageContent/CategoriesAdmin';
import { prefixAticleCategory } from '@/app/api/prefix';

const AticleCategoriesAdminPage: NextPage = async () => {
	const queryClient = new QueryClient();
	const languageId = 1;

	await prefetchData(queryClient, languageId);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CategoriesAdmin
				prefix={prefixAticleCategory}
				title='KATEGORIJE PROIZVODA'
				initialData={{
					categories: queryClient.getQueryData(['categories', 'article', languageId]) || [],
					languages: queryClient.getQueryData(['languages']) || [{ id: 1, name: 'srpski' }],
					icons: queryClient.getQueryData(['icons', 'articles']) || [],
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

	try {
		await Promise.all([
			prefetchQueryFunction({
				queryClient,
				queryKey: ['categories', 'article', languageId],
				url: `${baseUrl}/api/categories`,
				params: { prefix: prefixAticleCategory },
			}),
			prefetchQueryFunction({
				queryClient,
				queryKey: ['languages'],
				url: `${baseUrl}/api/languages`,
			}),
			prefetchQueryFunction({
				queryClient,
				queryKey: ['icons', 'articles'],
				url: `${baseUrl}/api/icons`,
				params: { directory: 'articles' },
			}),
		]);
		console.log('Prefetch podaci uspešno povučeni.');
	} catch (error) {
		console.error('Greška prilikom prefetch podataka:', error);
		throw error;
	}
}

export default AticleCategoriesAdminPage;
