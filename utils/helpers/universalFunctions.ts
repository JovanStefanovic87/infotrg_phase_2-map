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
import axios from 'axios';

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
	let errorMessage = 'Obratite se administratoru.';

	if (axios.isAxiosError(err) && err.response?.data?.error) {
		// Ako je greška AxiosError i server je poslao specifičnu poruku
		errorMessage = err.response.data.error;
	} else if (err instanceof Error) {
		// Ako je greška običan Error objekat
		errorMessage = err.message;
	}

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

export const getCategoryTranslations = (
	categories:
		| Array<{ label?: { translations: Array<{ translation: string; languageId: number }> } }>
		| undefined,
	languageId: number = 1
): string[] => {
	if (!categories || categories.length === 0) {
		return ['Nije definisano'];
	}

	return categories.map(cat => {
		if (!cat.label || !cat.label.translations) {
			return 'Nije definisano';
		}
		const translation = cat.label.translations.find(t => t.languageId === languageId);
		return translation ? translation.translation : 'Nije definisano';
	});
};

export const getCategoryTranslationString = (
	categories:
		| Array<{ label?: { translations?: Array<{ translation: string; languageId: number }> } }>
		| undefined,
	languageId: number = 1, // Podrazumevani jezik
	limit: number = 3 // Podrazumevano ograničenje na 3 stavke
): string => {
	if (!categories || categories.length === 0) {
		return 'Nije definisano';
	}

	const translations = categories
		.map(cat => {
			if (cat?.label?.translations) {
				const translation = cat.label.translations.find(t => t.languageId === languageId);
				return translation ? translation.translation : 'Nije definisano';
			}
			return 'Nije definisano';
		})
		.slice(0, limit)
		.join(', ');

	return translations.length > 0 ? translations : 'Nije definisano';
};
