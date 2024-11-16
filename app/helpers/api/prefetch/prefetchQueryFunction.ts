import { QueryClient } from '@tanstack/react-query';

interface PrefetchOptions<T> {
	queryClient: QueryClient;
	queryKey: Array<any>; // Allows a flexible query key
	url: string; // The URL used for the API call
	params?: Record<string, any>; // URL parameters
	useCash?: boolean; // Boolean to toggle caching
}

// Function to fetch data with no caching
async function fetchWithNoCache<T>(url: string, params: Record<string, any>) {
	const queryParams = new URLSearchParams(params).toString();
	const response = await fetch(`${url}?${queryParams}`, {
		cache: 'no-store', // Prevent caching
	});
	if (!response.ok) {
		throw new Error(`Error fetching data: ${response.statusText}`);
	}
	return response.json() as Promise<T>;
}

// Prefetch query function with caching options
export const prefetchQueryFunction = async <T>({
	queryClient,
	queryKey,
	url,
	params = {},
	useCash = true,
}: PrefetchOptions<T>) => {
	// Prefetches data with or without cache
	if (useCash) {
		return queryClient.prefetchQuery({
			queryKey,
			queryFn: async () => {
				const queryParams = new URLSearchParams(params).toString();
				const response = await fetch(`${url}?${queryParams}`, { cache: 'no-store' });
				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.statusText}`);
				}
				return response.json() as Promise<T>;
			},
		});
	} else {
		// No caching
		return fetchWithNoCache<T>(url, params);
	}
};
