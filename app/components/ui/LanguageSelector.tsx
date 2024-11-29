//app\components\ui\LanguageSelector.tsx
'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LanguageFlag from './LanguageFlag';
import Cookies from 'js-cookie';

interface Language {
	id: number;
	code: string;
	name: string;
}

interface LanguageSelectorProps {
	languages: Language[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages }) => {
	const pathname = usePathname();
	const router = useRouter();

	// Ekstraktujte jezik iz URL-a
	const extractLanguageFromUrl = () => {
		const segments = pathname?.split('/') || [];
		const validLanguages = ['rs', 'hu'];

		// Pronađi prvi validni jezik u segmentima
		for (let i = 1; i < segments.length; i++) {
			if (validLanguages.includes(segments[i])) {
				return segments[i];
			}
		}

		return 'rs';
	};

	const [selectedLanguage, setSelectedLanguage] = useState<string>(extractLanguageFromUrl());
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLanguageChange = (language: string) => {
		// Preusmeri samo ako se jezik menja
		if (language !== selectedLanguage) {
			Cookies.set('languageCode', language, { path: '/', expires: 365 });
			const newPath = pathname.replace(`/${selectedLanguage}`, `/${language}`);
			router.push(newPath);
		}
	};

	return (
		<div className='relative inline-block text-left'>
			{/* Aktivni jezik */}
			<button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className='flex items-center px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'>
				<LanguageFlag code={selectedLanguage} />
				<span className='ml-2 capitalize'>{selectedLanguage.toUpperCase()}</span>
				<span className='ml-2'>&#x25BC;</span>
			</button>

			{/* Padajući meni */}
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
