'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
	children: React.ReactNode;
}

const isDev = process.env.NODE_ENV === 'development';

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnMount: false,
				refetchOnReconnect: true,
				refetchOnWindowFocus: false,
				staleTime: 60 * 1000 * 5,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (typeof window === 'undefined') {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

const QueryProvider: React.FC<Props> = ({ children }) => {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{isDev && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
};

export default QueryProvider;
