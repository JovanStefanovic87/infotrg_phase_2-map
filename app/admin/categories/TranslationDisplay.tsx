'use client';

import { useEffect, useState } from 'react';

interface Translation {
	id: number;
	labelId: number;
	languageId: number;
	translation: string;
}

const TranslationDisplay = ({ labelId }: { labelId: number }) => {
	const [translations, setTranslations] = useState<Translation[]>([]);

	useEffect(() => {
		const fetchTranslations = async () => {
			try {
				const response = await fetch(`/api/translations?labelId=${labelId}`);
				const data = await response.json();
				setTranslations(data);
			} catch (error) {
				console.error('Error fetching translations:', error);
			}
		};

		fetchTranslations();
	}, [labelId]);

	return (
		<div>
			{translations.length > 0 ? (
				translations.map(translation => (
					<p key={translation.id}>
						{translation.translation} (Language ID: {translation.languageId})
					</p>
				))
			) : (
				<p>No translations available.</p>
			)}
		</div>
	);
};

export default TranslationDisplay;
