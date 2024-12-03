'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BreadcrumbsContainer from '../containers/BreadcrumbsContainer';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const languageCodes = ['hu', 'rs'];
const staticPages = ['gde-da-kupim']; // Definicija statičnih stranica

const staticPageTranslations: { [key: string]: { [key: string]: string } } = {
	'gde-da-kupim': {
		hu: 'Hol vásároljak',
		rs: 'Gde da kupim',
	},
}; // Mapa prevoda za statične stranice

interface BreadcrumbProps {
	initialPathname: string; // Pathname sa servera
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ initialPathname }) => {
	const [currentPath, setCurrentPath] = useState(initialPathname);
	const [translations, setTranslations] = useState<{ [key: string]: string }>({});
	const pathname = usePathname();

	// Funkcija za dobijanje trenutnog jezika
	const getActiveLanguage = (pathname: string): string => {
		const segments = pathname.split('/').filter(Boolean); // Razbijamo URL na segmente
		const foundLanguage = segments.find(segment => languageCodes.includes(segment.toLowerCase())); // Tražimo jezik u svim segmentima
		return foundLanguage ? foundLanguage.toLowerCase() : 'rs'; // Ako postoji, vratimo ga, inače default je 'rs'
	};

	const activeLanguage = getActiveLanguage(currentPath);

	console.log('activeLanguage:', activeLanguage);

	// Ažuriraj putanju na klijentskoj strani pri promeni rute
	useEffect(() => {
		if (pathname) {
			setCurrentPath(pathname);
		}
	}, [pathname]);

	// Povlačenje prevoda za segmente
	useEffect(() => {
		const fetchTranslations = async () => {
			const pathSegments = currentPath.split('/').filter(Boolean);

			// Filtriramo jezike i statične stranice
			const dynamicSegments = pathSegments.filter(
				segment => !languageCodes.includes(segment.toLowerCase()) && !staticPages.includes(segment)
			);

			// Povlačenje prevoda za dinamičke segmente
			const translationPromises = dynamicSegments.map(async segment => {
				const response = await fetch(`/api/translation/${segment}`);
				if (response.ok) {
					const data = await response.json();
					return { [segment]: data.translation };
				}
				return { [segment]: segment }; // Ako prevod ne postoji, zadrži slug
			});

			const results = await Promise.all(translationPromises);
			const translationMap = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
			setTranslations(translationMap);
		};

		fetchTranslations();
	}, [currentPath]);

	if (currentPath === '/') {
		return null; // Ako je root stranica, ne prikazuj breadcrumbs
	}

	const pathSegments = currentPath.split('/').filter(Boolean);

	// Filtriramo jezike iz URL-a
	const filteredSegments = pathSegments.filter(
		segment => !languageCodes.includes(segment.toLowerCase())
	);

	// Kreiramo breadcrumbs putanju
	const breadcrumbPath = [
		{ href: '/', label: <AiOutlineHome className='text-xl' /> }, // Ikonica umesto teksta
		...filteredSegments.map((segment, index) => {
			const href = `/${filteredSegments.slice(0, index + 1).join('/')}`;
			const label = staticPages.includes(segment)
				? staticPageTranslations[segment]?.[activeLanguage] ||
				  capitalize(segment.replace(/-/g, ' ')) // Prikaz prevoda za statične stranice
				: translations[segment] || capitalize(segment.replace(/-/g, ' ')); // Dinamički segmenti sa prevodima
			return { href, label };
		}),
	];

	return (
		<BreadcrumbsContainer>
			{breadcrumbPath.map((route, index) => (
				<React.Fragment key={route.href}>
					{index > 0 && <span className='mx-1 text-bgMain font-bold'>/</span>}
					{index === breadcrumbPath.length - 1 ? (
						// Poslednji segment: statičan tekst
						<span className='text-black font-bold'>{route.label}</span>
					) : (
						// Ostali segmenti: klikabilni linkovi
						<Link href={route.href}>
							<span className='text-bgMain hover:text-sky-600'>{route.label}</span>
						</Link>
					)}
				</React.Fragment>
			))}
		</BreadcrumbsContainer>
	);
};

export default Breadcrumb;
