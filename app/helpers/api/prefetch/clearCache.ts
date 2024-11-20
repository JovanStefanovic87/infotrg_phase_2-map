import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const invalidateAllQueries = () => {
	queryClient.invalidateQueries();
};
