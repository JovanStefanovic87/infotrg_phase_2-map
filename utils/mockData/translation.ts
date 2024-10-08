import { Translation, Label, Category, CategoryData } from '@/utils/helpers/types';
import {
	prefixAticleCategory,
	prefixActivityCategory,
	prefixObjectTypeCategory,
	location,
} from '@/app/api/prefix';

const mockTranslations: Translation[] = [
	{
		translationId: 1,
		id: 1,
		labelId: 1,
		languageId: 1,
		translation: 'Electronics',
		description: 'Category for electronic devices',
		createdAt: new Date(),
		synonyms: [],
	},
	{
		translationId: 2,
		id: 2,
		labelId: 2,
		languageId: 1,
		translation: 'Furniture',
		description: 'Category for furniture items',
		createdAt: new Date(),
		synonyms: [],
	},
	{
		translationId: 3,
		id: 3,
		labelId: 3,
		languageId: 1,
		translation: 'Clothing',
		description: 'Category for clothing and apparel',
		createdAt: new Date(),
		synonyms: [],
	},
];

const mockLabels: Label[] = [
	{
		id: 1,
		name: 'electronics',
		translations: [mockTranslations[0]],
	},
	{
		id: 2,
		name: 'furniture',
		translations: [mockTranslations[1]],
	},
	{
		id: 3,
		name: 'clothing',
		translations: [mockTranslations[2]],
	},
];

const mockCategories: CategoryData[] = [
	{
		id: 1,
		name: 'Electronics',
		language: 'English',
		description: 'Category for electronic devices',
		parentIds: [],
		children: [],
		synonyms: ['gadgets', 'devices'],
		iconUrl: '/icons/electronics.png',
	},
	{
		id: 2,
		name: 'Furniture',
		language: 'English',
		description: 'Category for furniture items',
		parentIds: [],
		children: [],
		synonyms: ['chairs', 'tables'],
		iconUrl: '/icons/furniture.png',
	},
	{
		id: 3,
		name: 'Clothing',
		language: 'English',
		description: 'Category for clothing and apparel',
		parentIds: [],
		children: [],
		synonyms: ['apparel', 'garments'],
		iconUrl: '/icons/clothing.png',
	},
];

const mockRetailStoreCategories = [mockCategories[0], mockCategories[2]];
