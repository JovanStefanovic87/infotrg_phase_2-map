'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BreadcrumbsContainer from '../containers/BreadcrumbsContainer';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { HiChevronRight } from 'react-icons/hi';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const languageCodes = ['hu', 'rs'];
const parentPagesWithoutTranslation = [
	'ulaganje',
	'o-nama',
	'investicioni-fond',
	'investicioni-plan-i-program',
	'usluzne-delatnosti',
	'plan-i-program-poslovanja',
	'tim',
	'poslovna-saradnja',
	'admin',
	'auth',
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

			// Ignorišemo podstranice roditeljskih stranica bez prevoda
			const isChildOfParentWithoutTranslation = pathSegments.some((segment, index) => {
				return parentPagesWithoutTranslation.includes(segment.toLowerCase()) && index > 0;
			});

			if (isChildOfParentWithoutTranslation) {
				setTranslations({});
				return;
			}

			const dynamicSegments = pathSegments.filter(
				segment =>
					!languageCodes.includes(segment.toLowerCase()) &&
					!parentPagesWithoutTranslation.includes(segment.toLowerCase()) &&
					!staticPageTranslations[segment] // Ignorišemo stranice koje imaju statične prevode
			);

			const translationPromises = dynamicSegments.map(async segment => {
				try {
					const response = await fetch(`/api/translation/${segment}`);
					if (response.ok) {
						const data = await response.json();
						return { [segment]: data.translation };
					}
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
			const label =
				staticPageTranslations[segment]?.[activeLanguage] || // Koristimo statični prevod ako postoji
				translations[segment] || // Dinamički prevod iz API-ja
				capitalize(segment.replace(/-/g, ' ')); // Ako nema prevoda, koristimo capitalized slug
			return { href, label };
		}),
	];

	return (
		<>
			{shouldRenderBreadcrumb && (
				<BreadcrumbsContainer>
					<div
						className='flex items-center space-x-2 text-sm overflow-x-auto scrollbar-hide whitespace-nowrap p-2 select-none'
						aria-label='Breadcrumb'>
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
