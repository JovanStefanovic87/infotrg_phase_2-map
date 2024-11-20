import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import CategoriesAdmin from '../../components/pageContent/CategoriesAdmin';
import { prefixObjectTypeCategory } from '@/app/api/prefix';
import { CategoryWithTranslations, Language } from '@/utils/helpers/types';

export default async function ObjectTypesAdminPage() {
	const queryClient = new QueryClient();
	const languageId = 1;

	await prefetchData(queryClient, languageId);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<CategoriesAdmin
				prefix={prefixObjectTypeCategory}
				title='KATEGORIJE TIPOVA OBJEKATA'
				initialData={{
					categories: queryClient.getQueryData(['categories', 'article', languageId]) || [],
					languages: queryClient.getQueryData(['languages']) || [{ id: 1, name: 'srpski' }],
					icons: queryClient.getQueryData(['icons', 'articles']) || [],
				}}
			/>
		</HydrationBoundary>
	);
}

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
				params: { prefix: prefixObjectTypeCategory },
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

		// Sortiranje kategorija
		function sortCategories(categories: CategoryWithTranslations[]): CategoryWithTranslations[] {
			return categories
				.map(category => ({
					...category,
					children: sortCategories(category.children as CategoryWithTranslations[]),
				}))
				.sort((a, b) => a.name.localeCompare(b.name, 'sr', { sensitivity: 'base' }));
		}

		// Preuzimanje i sortiranje podataka
		const categories =
			(queryClient.getQueryData([
				'categories',
				'article',
				languageId,
			]) as CategoryWithTranslations[]) || [];
		const sortedCategories = sortCategories(categories);
		queryClient.setQueryData(['categories', 'article', languageId], sortedCategories);

		const languages = (queryClient.getQueryData(['languages']) as Language[]) || [];
		queryClient.setQueryData(['languages'], languages);

		const icons = queryClient.getQueryData(['icons', 'articles']) || [];
		queryClient.setQueryData(['icons', 'articles'], icons);
	} catch (error) {
		console.error('Greška prilikom prefetch podataka:', error);
		throw error;
	}
}
