'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BreadcrumbsContainer from '../containers/BreadcrumbsContainer';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { HiChevronRight } from 'react-icons/hi';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const languageCodes = ['hu', 'rs'];
const staticPages = [
	'ulaganje',
	'posao',
	'o-nama',
	'plan-i-program-poslovanja',
	'platforma',
	'poslovna-saradnja',
	'tim',
	'usluzne-delatnosti',
	'investicioni-fond',
	'investicioni-fondovi',
	'investitori',
	'kljucne-informacije',
];

const staticPageTranslations: { [key: string]: { [key: string]: string } } = {
	'gde-da-kupim': {
		hu: 'Hol vásároljak',
		rs: 'Gde da kupim',
	},
};

interface BreadcrumbProps {
	initialPathname: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ initialPathname }) => {
	const [currentPath, setCurrentPath] = useState(initialPathname);
	const [translations, setTranslations] = useState<{ [key: string]: string }>({});
	const pathname = usePathname();
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	const getActiveLanguage = (pathname: string): string => {
		const segments = pathname.split('/').filter(Boolean);
		const foundLanguage = segments.find(segment => languageCodes.includes(segment.toLowerCase()));
		return foundLanguage ? foundLanguage.toLowerCase() : 'rs';
	};

	const activeLanguage = getActiveLanguage(currentPath);

	useEffect(() => {
		if (pathname) {
			setCurrentPath(pathname);
		}
	}, [pathname]);

	useEffect(() => {
		const fetchTranslations = async () => {
			const pathSegments = currentPath.split('/').filter(Boolean);

			// Ako bilo koji segment sadrži 'admin', ne izvršavamo fetch
			if (pathSegments.includes('admin')) {
				setTranslations({});
				return;
			}

			// Proveravamo da li je URL statička stranica ili njena podstranica
			const isStaticPage = staticPages.some(
				page => pathSegments[0]?.toLowerCase() === page.toLowerCase()
			);

			// Ako je statička stranica ili podstranica, preskačemo prevod
			if (isStaticPage) {
				setTranslations({});
				return;
			}

			// Filtriramo dinamičke segmente koji zahtevaju prevod
			const dynamicSegments = pathSegments.filter(
				segment =>
					!languageCodes.includes(segment.toLowerCase()) && // Ignorisanje jezika
					!staticPages.includes(segment.toLowerCase()) // Ignorisanje statičkih stranica
			);

			const translationPromises = dynamicSegments.map(async segment => {
				try {
					const response = await fetch(`/api/translation/${segment}`);
					if (response.ok) {
						const data = await response.json();
						return { [segment]: data.translation };
					}
					console.warn(`Translation not found for segment: ${segment}`);
					return { [segment]: segment };
				} catch (error) {
					console.error(`Error fetching translation for segment: ${segment}`, error);
					return { [segment]: segment };
				}
			});

			const results = await Promise.all(translationPromises);
			const translationMap = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
			setTranslations(translationMap);
		};

		fetchTranslations();
	}, [currentPath]);

	// Proveravamo da li je početna stranica
	const shouldRenderBreadcrumb = !(
		currentPath === '/' ||
		currentPath === '/rs' ||
		currentPath === '/hu'
	);

	const pathSegments = currentPath.split('/').filter(Boolean);
	const filteredSegments = pathSegments.filter(
		segment => !languageCodes.includes(segment.toLowerCase())
	);

	const breadcrumbPath = [
		{ href: '/', label: <AiOutlineHome className='text-xl' /> },
		...filteredSegments.map((segment, index) => {
			const href = `/${filteredSegments.slice(0, index + 1).join('/')}`;
			const label = staticPages.includes(segment)
				? staticPageTranslations[segment]?.[activeLanguage] ||
				  capitalize(segment.replace(/-/g, ' '))
				: translations[segment] || capitalize(segment.replace(/-/g, ' '));
			return { href, label };
		}),
	];

	const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setStartX(e.pageX - e.currentTarget.offsetLeft);
		setScrollLeft(e.currentTarget.scrollLeft);
	};

	const stopDrag = () => setIsDragging(false);

	const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - e.currentTarget.offsetLeft;
		const walk = (x - startX) * 1.5; // Adjust scroll speed
		e.currentTarget.scrollLeft = scrollLeft - walk;
	};

	return (
		<>
			{shouldRenderBreadcrumb && (
				<BreadcrumbsContainer>
					<div
						className='flex items-center space-x-2 text-sm overflow-x-auto scrollbar-hide whitespace-nowrap p-2 select-none'
						aria-label='Breadcrumb'
						onMouseDown={startDrag}
						onMouseMove={handleDrag}
						onMouseUp={stopDrag}
						onMouseLeave={stopDrag}>
						{breadcrumbPath.map((route, index) => (
							<React.Fragment key={route.href}>
								{index > 0 && <HiChevronRight className='text-gray-400 text-lg flex-shrink-0' />}
								{index === breadcrumbPath.length - 1 ? (
									<span className='text-gray-900 font-semibold'>{route.label}</span>
								) : (
									<Link href={route.href}>
										<span className='text-sky-600 hover:text-sky-800 transition'>
											{route.label}
										</span>
									</Link>
								)}
							</React.Fragment>
						))}
					</div>
				</BreadcrumbsContainer>
			)}
		</>
	);
};

export default Breadcrumb;
