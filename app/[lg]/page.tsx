import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import PageContent from '../home/PageContent';
import { prefixAticleCategory } from '../api/prefix';
import LanguageSelector from '@/app/components/ui/LanguageSelector';
import { cookies } from 'next/headers';
import { Synonym } from '@/utils/helpers/types';

export const metadata = {
	title: 'Infotrg',
	description: 'servis za objavljivanje informacija i posredovanje u trgovini',
};

export interface Language {
	id: number;
	code: string;
	name: string;
}

interface Category {
	id: number;
	name: string;
	iconId?: number;
	parents: Category[];
	children: Category[];
	synonyms: Synonym[];
}

// Definišemo pomoćnu funkciju unutar istog fajla
const prefetchData = async ({
	queryClient,
	queryKey,
	url,
	params = {},
}: {
	queryClient: QueryClient;
	queryKey: string[];
	url: string;
	params?: Record<string, string>;
}) => {
	await prefetchQueryFunction({
		queryClient,
		queryKey,
		url,
		params,
	});
};

const Home = async () => {
	// Napravi novi Query Client
	const queryClient = new QueryClient();

	// Proveri kolačiće

	// Prefetch jezika
	await prefetchData({
		queryClient,
		queryKey: ['languages'],
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`,
	});

	const savedLanguage = cookies().get('languageCode')?.value || 'rs';

	const defaultLanguage = { id: 1, code: 'rs', name: 'Srpski' };
	const languages = queryClient.getQueryData<Language[]>(['languages']) || [defaultLanguage];

	const languageId = savedLanguage
		? languages.find(lang => lang.code === savedLanguage)?.id || 1
		: languages[0]?.id || 1;

	console.log('Saved language from cookies:', savedLanguage);
	console.log('Detected languages:', languages);
	console.log('Selected languageId:', languageId);

	// Prefetch kategorija
	await prefetchData({
		queryClient,
		queryKey: ['categories'],
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/categoriesByLanguage`,
		params: { languageId: languageId.toString(), prefix: prefixAticleCategory },
	});

	const categories = queryClient.getQueryData<Category[]>(['categories']) || [];

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<LanguageSelector languages={languages} />
			<div className='mt-6 lg:-mt-8'>
				<PageContent categories={categories} />
			</div>
		</HydrationBoundary>
	);
};

export default Home;
