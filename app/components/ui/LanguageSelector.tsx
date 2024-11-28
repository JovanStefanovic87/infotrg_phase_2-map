'use client';

import { useEffect } from 'react';

const useSelectedLanguage = (defaultLanguage: string) => {
	const saveLanguage = (language: string) => {
		localStorage.setItem('selectedLanguage', language);
	};

	const getLanguage = () => {
		return localStorage.getItem('selectedLanguage') || defaultLanguage;
	};

	return { saveLanguage, getLanguage };
};

const LanguageSelector = ({ language }: { language: string }) => {
	const { saveLanguage, getLanguage } = useSelectedLanguage('rs');

	useEffect(() => {
		saveLanguage(language); // Čuvanje jezika
	}, [language]);

	return <div>Trenutni jezik: {getLanguage()}</div>;
};

export default LanguageSelector;
