import { useState, useEffect } from 'react';
import { fetchLanguages } from '@/utils/helpers/apiHandlers';
import { Language } from '@/utils/helpers/types';

const useFetchLanguages = () => {
	const [languages, setLanguages] = useState<Language[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchLanguagesData = async () => {
			setLoading(true);
			try {
				const data = await fetchLanguages();
				setLanguages(data);
			} catch {
				setError('Failed to fetch languages.');
			} finally {
				setLoading(false);
			}
		};

		fetchLanguagesData();
	}, []);

	return { languages, loading, error };
};

export default useFetchLanguages;
