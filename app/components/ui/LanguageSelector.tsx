'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LanguageFlag from './LanguageFlag';

interface Language {
	id: number;
	code: string;
	name: string;
}

interface LanguageSelectorProps {
	languages: Language[];
	onLanguageChange?: (newLanguage: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onLanguageChange }) => {
	const pathname = usePathname();
	const router = useRouter();
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='absolute flex right-0 sm:right-4 top-3 z-30'>
			<div className='relative inline-block text-left' ref={dropdownRef}>
				{/* Prikaz trenutno selektovanog jezika */}
				<button
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					className='flex items-center px-2 py-2 rounded hover:bg-gray-300 shadow-sm shadow-gray-200'>
					<LanguageFlag code={selectedLanguage} />
					<span className='ml-2 text-black'>&#x25BC;</span>
				</button>

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
										setIsDropdownOpen(false);
									}}
									className={`flex items-center px-4 py-2 text-sm ${
										selectedLanguage === lang.code
											? 'bg-gray-300 text-black'
											: 'text-gray-700 hover:bg-gray-100'
									} w-full`}>
									<LanguageFlag code={lang.code} />
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default LanguageSelector;
