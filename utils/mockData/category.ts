import { CategoryData } from '@/utils/helpers/types';

export const mockCategories: CategoryData[] = [
	{
		id: 1,
		name: 'Electronics',
		language: 'English',
		description: 'Category for electronic devices and gadgets.',
		parentIds: [],
		children: [],
		synonyms: ['gadgets', 'devices', 'tech'],
		iconUrl: '/icons/electronics.png',
	},
	{
		id: 2,
		name: 'Furniture',
		language: 'English',
		description: 'Category for furniture items like tables and chairs.',
		parentIds: [],
		children: [],
		synonyms: ['chairs', 'tables', 'sofa'],
		iconUrl: '/icons/furniture.png',
	},
	{
		id: 3,
		name: 'Clothing',
		language: 'English',
		description: 'Category for clothing, fashion, and apparel.',
		parentIds: [],
		children: [],
		synonyms: ['apparel', 'fashion', 'garments'],
		iconUrl: '/icons/clothing.png',
	},
	{
		id: 4,
		name: 'Smartphones',
		language: 'English',
		description: 'Category for smartphones and mobile devices.',
		parentIds: ['1'], // Electronics is the parent category
		children: [],
		synonyms: ['mobiles', 'phones', 'smart devices'],
		iconUrl: '/icons/smartphones.png',
	},
	{
		id: 5,
		name: 'Laptops',
		language: 'English',
		description: 'Category for laptops and notebooks.',
		parentIds: ['1'], // Electronics is the parent category
		children: [],
		synonyms: ['notebooks', 'computers'],
		iconUrl: '/icons/laptops.png',
	},
	{
		id: 6,
		name: 'Sofas',
		language: 'English',
		description: 'Category for sofas and couches.',
		parentIds: ['2'], // Furniture is the parent category
		children: [],
		synonyms: ['couches', 'seating'],
		iconUrl: '/icons/sofas.png',
	},
];
