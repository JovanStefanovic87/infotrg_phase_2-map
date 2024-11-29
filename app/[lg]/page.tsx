import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { prefetchQueryFunction } from '@/app/helpers/api/prefetch/prefetchQueryFunction';
import PageContent from '../home/PageContent';
import LanguageSelector from '@/app/components/ui/LanguageSelector';
import { cookies } from 'next/headers';

export const metadata = {
	title: 'Infotrg',
	description: 'servis za objavljivanje informacija i posredovanje u trgovini',
};

export interface Language {
	id: number;
	code: string;
	name: string;
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
	const savedLanguage = cookies().get('languageCode')?.value || 'rs';

	// Prefetch jezika
	await prefetchData({
		queryClient,
		queryKey: ['languages'],
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`,
	});

	// Dohvati jezike iz Query Client-a
	const languages = queryClient.getQueryData<Language[]>(['languages']) || [];

	// Prefetch kategorija
	await prefetchData({
		queryClient,
		queryKey: ['categories'],
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
		params: { language: savedLanguage },
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className='flex justify-end w-full pr-2'>
				{/* Prosledi jezike u LanguageSelector */}
				<LanguageSelector languages={languages} />
			</div>
			<div className='lg:-mt-8'>
				<PageContent />
			</div>
		</HydrationBoundary>
	);
};

export default Home;
