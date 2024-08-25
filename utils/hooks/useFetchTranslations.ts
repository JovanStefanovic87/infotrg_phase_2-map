import { useState, useEffect } from 'react';
import axios from 'axios';
import { Translation } from '@/utils/helpers/types';

const useFetchTranslations = (languageId: number) => {
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		if (!languageId) return;

		const fetchTranslationsData = async () => {
			setLoading(true);
			try {
				const labelsResponse = await axios.get('/api/labels', { params: { languageId } });
				const labels = Array.isArray(labelsResponse.data) ? labelsResponse.data : [];

				const translationsPromises = labels.map(async (label: { id: number }) => {
					const translationResponse = await axios.get('/api/translation', {
						params: { languageId, labelId: label.id },
					});
					return translationResponse.data;
				});

				const translationsData = await Promise.all(translationsPromises);
				setTranslations(translationsData.flat());
			} catch {
				setError('Failed to fetch translations.');
			} finally {
				setLoading(false);
			}
		};

		fetchTranslationsData();
	}, [languageId]);

	return { translations, loading, error };
};

export default useFetchTranslations;
