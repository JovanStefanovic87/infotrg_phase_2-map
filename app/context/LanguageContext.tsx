'use client';

import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({
	language: 'rs',
	setLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
	const [language, setLanguage] = useState('rs');

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);
