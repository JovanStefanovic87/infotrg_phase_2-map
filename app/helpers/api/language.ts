import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWithParams, postData, putData, deleteData } from '@/app/helpers/api/common/base';

// Hook za dohvatanje jezika sa API-ja
export const useFetchLanguages = () => {
	return useQuery({
		queryKey: ['languages'],
		queryFn: () => getWithParams('/api/languages', {}),
		staleTime: 5 * 60 * 1000, // Keširaj podatke na 5 minuta
		refetchOnWindowFocus: false,
	});
};

// Interfejs za podatke potrebne za kreiranje jezika
interface CreateLanguageData {
	code: string;
	name: string;
}

// Hook za kreiranje novog jezika
export const useCreateLanguage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateLanguageData) => postData('/api/languages', data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['languages'] }); // Refetch jezika nakon uspešnog kreiranja
		},
		onError: (error: any) => {
			if (error?.response?.status === 409) {
				alert('Greška: Jezik sa istim kodom ili nazivom već postoji.');
			} else {
				const message =
					error?.response?.data?.error || 'Došlo je do greške prilikom kreiranja jezika.';
				alert(`Greška prilikom kreiranja jezika: ${message}`);
			}
		},
	});
};

// Interfejs za podatke potrebne za ažuriranje jezika
interface UpdateLanguageData {
	id: number;
	code: string;
	name: string;
}

// Hook za ažuriranje jezika
export const useUpdateLanguage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdateLanguageData) => {
			const { id, ...rest } = data;
			return putData(`/api/languages/${id}`, rest);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['languages'] }); // Refetch jezika nakon uspešnog ažuriranja
		},
		onError: (error: any) => {
			if (error?.response?.status === 409) {
				alert('Greška: Jezik sa istim kodom ili nazivom već postoji.');
			} else {
				const message =
					error?.response?.data?.error || 'Došlo je do greške prilikom ažuriranja jezika.';
				alert(`Greška prilikom ažuriranja jezika: ${message}`);
			}
		},
	});
};

// Hook za brisanje jezika
export const useDeleteLanguage = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => deleteData(`/api/languages/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['languages'] }); // Refetch jezika nakon uspešnog brisanja
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.error || 'Došlo je do greške prilikom brisanja jezika.';
			alert(`Greška prilikom brisanja jezika: ${message}`);
		},
	});
};
