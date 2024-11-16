import { QueryClient } from '@tanstack/react-query';
import { fetchJson } from '@/app/helpers/fetchJson';

interface PrefetchQueryParams {
	queryClient: QueryClient;
	queryKey: any[];
	url: string;
	params?: Record<string, any>;
}

export const prefetchQueryFunction = async ({
	queryClient,
	queryKey,
	url,
	params = {},
}: PrefetchQueryParams) => {
	try {
		// Construct query string manually from the params object
		const queryString = new URLSearchParams(params).toString();
		const fullUrl = queryString ? `${url}?${queryString}` : url;

		// Fetch the latest data from the API with no-store
		const response = await fetch(fullUrl, { cache: 'no-store' });

		// Ensure response is valid
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		// Parse the JSON response
		const data = await response.json();

		// Optionally, avoid caching data in queryClient
		return data;
	} catch (error) {
		console.error('Error fetching data for prefetching:', error);
		throw error; // Handle error appropriately
	}
};
