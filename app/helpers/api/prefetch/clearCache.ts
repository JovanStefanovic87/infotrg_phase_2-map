import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Funkcija za invalidaciju keša
export const invalidateAllQueries = () => {
	queryClient.invalidateQueries(); // Invalidira sve keširane podatke
	console.log('All queries invalidated!');
};
