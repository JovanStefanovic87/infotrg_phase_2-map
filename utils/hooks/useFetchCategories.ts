import { useState, useEffect } from 'react';
import { fetchCategories } from '@/utils/helpers/apiHandlers';
import { Category } from '@/utils/helpers/types';

const useFetchCategories = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const loadCategories = async () => {
			setLoading(true);
			try {
				const data = await fetchCategories();
				setCategories(data);
			} catch {
				setError('Failed to fetch categories.');
			} finally {
				setLoading(false);
			}
		};

		loadCategories();
	}, []);

	return { categories, loading, error };
};

export default useFetchCategories;
