'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BreadcrumbsContainer from '../containers/BreadcrumbsContainer';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const truncateLabel = (label: string, maxLength: number) => {
	if (label.length > maxLength) {
		return `${label.slice(0, maxLength)}...`;
	}
	return label;
};

const Breadcrumb: React.FC = () => {
	const currentPath = usePathname();
	const [breadcrumbPath, setBreadcrumbPath] = useState<{ href: string; label: string }[]>([]);
	const [isNotFound, setIsNotFound] = useState(false);

	useEffect(() => {
		const checkPageExists = async () => {
			try {
				const response = await fetch(currentPath, { method: 'HEAD' });
				if (!response.ok) {
					setIsNotFound(true);
				} else {
					setIsNotFound(false);
				}
			} catch (error) {
				setIsNotFound(true);
			}
		};

		if (currentPath === '/') {
			setBreadcrumbPath([]);
		} else {
			const pathSegments = currentPath.split('/').filter(Boolean);
			let pathArray = pathSegments.map((segment, index) => {
				const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
				const label = capitalize(segment.replace(/-/g, ' '));
				return { href, label };
			});

			// Ako je stranica nepostojeća, ukloni poslednji segment
			if (isNotFound) {
				pathArray = pathArray.slice(0, -1);
			}

			setBreadcrumbPath([{ href: '/', label: 'Početna' }, ...pathArray]);
		}

		checkPageExists();
	}, [currentPath, isNotFound]);

	if (breadcrumbPath.length === 0) {
		return null;
	}

	return (
		<BreadcrumbsContainer>
			{breadcrumbPath.map((route, index) => (
				<React.Fragment key={route.href}>
					{index > 0 && <span className='mx-1 text-bgMain font-bold'>/</span>}
					{index === breadcrumbPath.length - 1 && !isNotFound ? (
						<Link href={route.href}>
							<span className='text-black font-bold'>{truncateLabel(route.label, 10)}</span>
						</Link>
					) : (
						<Link href={route.href}>
							<span className='text-bgMain hover:text-sky-600'>
								{truncateLabel(route.label, 10)}
							</span>
						</Link>
					)}
				</React.Fragment>
			))}
			{isNotFound && <span className='text-red-600 font-bold'>Nepostojeća stranica</span>}
		</BreadcrumbsContainer>
	);
};

export default Breadcrumb;
