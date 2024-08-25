import { useState, useEffect } from 'react';
import { fetchIcons } from '@/utils/helpers/apiHandlers';
import { Icon } from '@/utils/helpers/types';

const useFetchIcons = () => {
	const [icons, setIcons] = useState<Icon[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const loadIcons = async () => {
			setLoading(true);
			try {
				const data = await fetchIcons();
				setIcons(data);
			} catch {
				setError('Failed to fetch icons.');
			} finally {
				setLoading(false);
			}
		};

		loadIcons();
	}, []);

	return { icons, loading, error };
};

export default useFetchIcons;
