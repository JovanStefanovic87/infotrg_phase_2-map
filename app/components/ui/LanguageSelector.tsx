'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LanguageFlag from './LanguageFlag';

interface Language {
	id: number;
	code: string;
	name: string;
}

interface LanguageSelectorProps {
	languages: Language[];
	onLanguageChange?: (newLanguage: string) => void; // Callback za promenu jezika
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onLanguageChange }) => {
	const pathname = usePathname();
	const router = useRouter();

	// Ekstraktujte trenutni jezik iz URL-a
	const extractLanguageFromUrl = (): string => {
		const otherSegments = pathname?.split('/') || [];
		const validLanguages = languages.map(lang => lang.code); // Validni jezici

		for (let i = 1; i < otherSegments.length; i++) {
			if (validLanguages.includes(otherSegments[i])) {
				return otherSegments[i];
			}
		}

		return 'rs'; // Podrazumevani jezik
	};

	const [selectedLanguage, setSelectedLanguage] = useState<string>(extractLanguageFromUrl());
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Funkcija za promenu jezika
	const handleLanguageChange = async (newLanguage: string) => {
		setSelectedLanguage(newLanguage);

		// Preusmerite korisnika na početnu stranu sa izabranim jezikom
		const updatedPath = `/${newLanguage}`; // Početna stranica sa jezičkim prefiksom
		router.push(updatedPath); // Preusmeri korisnika na početnu stranu sa novim jezikom

		// Postavite kolačić sa novim jezikom
		document.cookie = `languageCode=${newLanguage}; path=/;`;

		// Pozovite callback za promenu jezika
		onLanguageChange?.(newLanguage);
	};

	return (
		<div className='relative inline-block text-left'>
			{/* Prikaz trenutno selektovanog jezika */}
			<button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className='flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'>
				<LanguageFlag code={selectedLanguage} />
				<span className='ml-2 capitalize'>{selectedLanguage.toUpperCase()}</span>
				<span className='ml-2'>&#x25BC;</span>
			</button>

			{/* Padajući meni za izbor jezika */}
			{isDropdownOpen && (
				<div className='absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
					<div
						className='py-1'
						role='menu'
						aria-orientation='vertical'
						aria-labelledby='options-menu'>
						{languages.map(lang => (
							<button
								key={lang.id}
								onClick={() => {
									handleLanguageChange(lang.code);
									setIsDropdownOpen(false); // Zatvaramo dropdown
								}}
								className={`flex items-center px-4 py-2 text-sm ${
									selectedLanguage === lang.code
										? 'bg-gray-300 text-black'
										: 'text-gray-700 hover:bg-gray-100'
								} w-full`}>
								<LanguageFlag code={lang.code} />
								<span className='ml-2'>{lang.name}</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default LanguageSelector;
