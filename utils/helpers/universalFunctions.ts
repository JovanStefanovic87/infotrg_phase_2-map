'use client';
import { useState, useEffect } from 'react';
import { Category, Icon, LinkData } from './types';

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			const mobileCheck = window.matchMedia('(max-width: 768px)');
			setIsMobile(mobileCheck.matches);
		};

		checkIsMobile();

		window.addEventListener('resize', checkIsMobile);

		return () => window.removeEventListener('resize', checkIsMobile);
	}, []);

	return isMobile;
};

import { MutableRefObject } from 'react';

interface HandleMouseLeaveProps {
	event: React.MouseEvent;
	hasChildren: boolean;
	dropdownRef: MutableRefObject<HTMLDivElement | null>;
	setIsOpen: (isOpen: boolean) => void;
	onMouseLeave?: () => void;
}

export const handleMouseLeave = ({
	event,
	hasChildren,
	dropdownRef,
	setIsOpen,
	onMouseLeave,
}: HandleMouseLeaveProps) => {
	const relatedTarget = event.relatedTarget as Node | null;
	if (
		hasChildren &&
		dropdownRef.current &&
		relatedTarget instanceof Node &&
		!dropdownRef.current.contains(relatedTarget)
	) {
		setIsOpen(false);
		if (onMouseLeave) {
			onMouseLeave();
		}
	}
};

export const isTextHyperlinked = (text: string, hyperlinks: LinkData[]) => {
	const foundLink = hyperlinks.find(link => link.text === text);
	return foundLink ? foundLink.url : undefined;
};

export const getCategoryIconUrl = (iconId: number | null, icons: Icon[]): string => {
	const icon = icons.find(icon => icon.id === iconId);
	return icon ? icon.url : '';
};

export const clearError = (setError: (arg: string) => void) => setError('');

export const handleError = (
	err: unknown,
	setError: (message: string) => void,
	setSuccessMessage: (message: string | null) => void
) => {
	const errorMessage = err instanceof Error ? err.message : 'Obratite se administratoru.';
	setError(errorMessage);
	setSuccessMessage(null);
	console.error('Error:', err);
};

/* export const formatCategoryOptions = (categories: Category[], searchTerm: string): any[] => {
	const categoryMap = new Map<string, any>();
	const lowercasedSearch = searchTerm.toLowerCase();

	categories.forEach(cat => {
		categoryMap.set(cat.id, {
			value: cat.id,
			label: cat.name,
			subcategories: [],
		});
	});

	categories.forEach(cat => {
		if (cat.parentId) {
			const parentCategory = categoryMap.get(cat.parentId);
			if (parentCategory) {
				parentCategory.subcategories.push({
					value: cat.id,
					label: cat.name,
				});
			}
		}
	});

	const filteredCategories = Array.from(categoryMap.values()).filter(cat => {
		const originalCategory = categories.find(c => c.id === cat.value);

		const hasMatchingSynonym =
			originalCategory?.synonyms?.some(synonym =>
				synonym.toLowerCase().includes(lowercasedSearch)
			) ?? false;

		// Include only top-level categories or those with matching synonyms
		return !originalCategory?.parentId || hasMatchingSynonym;
	});

	return filteredCategories;
};
 */
