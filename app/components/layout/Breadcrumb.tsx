'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import BreadcrumbsContainer from '../containers/BreadcrumbsContainer';
import { usePathname } from 'next/navigation';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const truncateLabel = (label: string, maxLength: number) => {
	if (label.length > maxLength) {
		return `${label.slice(0, maxLength)}...`;
	}
	return label;
};

const languageCodes = ['hu', 'en', 'rs'];

interface BreadcrumbProps {
	initialPathname: string; // Pathname sa servera
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ initialPathname }) => {
	const [currentPath, setCurrentPath] = useState(initialPathname);
	const pathname = usePathname();

	// Ažuriraj putanju na klijentskoj strani pri promeni rute
	useEffect(() => {
		if (pathname) {
			setCurrentPath(pathname);
		}
	}, [pathname]);

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
		{ href: '/', label: 'Početna' },
		...filteredSegments.map((segment, index) => {
			const href = `/${filteredSegments.slice(0, index + 1).join('/')}`;
			const label = capitalize(segment.replace(/-/g, ' '));
			return { href, label };
		}),
	];

	return (
		<BreadcrumbsContainer>
			{breadcrumbPath.map((route, index) => (
				<React.Fragment key={route.href}>
					{index > 0 && <span className='mx-1 text-bgMain font-bold'>/</span>}
					<Link href={route.href}>
						<span
							className={
								index === breadcrumbPath.length - 1
									? 'text-black font-bold'
									: 'text-bgMain hover:text-sky-600'
							}>
							{truncateLabel(route.label, 10)}
						</span>
					</Link>
				</React.Fragment>
			))}
		</BreadcrumbsContainer>
	);
};

export default Breadcrumb;
