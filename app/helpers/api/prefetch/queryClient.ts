import { QueryClient } from '@tanstack/react-query';

// Kreirajte instancu QueryClient-a sa globalnim opcijama
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 10000, // Podaci se uvek tretiraju kao zastareli
			refetchOnMount: false, // Uvek osveži podatke prilikom mount-a
			refetchOnWindowFocus: true, // Osveži podatke kada korisnik fokusira prozor
		},
	},
});

export default queryClient;
