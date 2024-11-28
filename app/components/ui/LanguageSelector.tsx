'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageFlag from './LanguageFlag';

interface Language {
	id: number;
	code: string;
	name: string;
}

interface LanguageSelectorProps {
	languages: Language[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages }) => {
	const [selectedLanguage, setSelectedLanguage] = useState<string>('rs');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Proveri da li postoji jezik u localStorage prilikom učitavanja
		const savedLanguage = localStorage.getItem('languageCode') || 'rs';
		setSelectedLanguage(savedLanguage);
	}, []);

	const handleLanguageChange = (language: string) => {
		// Sačuvaj jezik u localStorage
		localStorage.setItem('languageCode', language);
		setSelectedLanguage(language);

		// Preusmeri na novu stranicu sa izabranim jezikom
		router.push(`/gde-da-kupim/${language}`);
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
								className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full'>
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
