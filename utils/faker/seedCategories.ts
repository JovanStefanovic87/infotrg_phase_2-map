import { faker } from '@faker-js/faker'; // Change require to import

// Updated Category interface
export interface Category {
	id: number;
	iconId: number | null;
	labelId: number;
	name: string;
	parents: Category[]; // Array of parent categories
	relatedIds?: number[]; // Add relatedIds to Category interface
	children: Category[]; // Array of child categories
}

// Set seed for deterministic data generation
faker.seed(12345);

const generateTopLevelCategories = (startId: number, count: number): Category[] => {
	const categories: Category[] = [];

	for (let i = startId; i < startId + count; i++) {
		const category: Category = {
			id: i,
			iconId: faker.datatype.boolean() ? faker.number.int(1000) : null, // Updated to faker.number.int
			labelId: i, // LabelId will be the same as id for simplicity
			name: faker.commerce.department(), // Random department name
			parents: [], // No parents, as these are top-level categories
			relatedIds: [], // Empty related categories
			children: [], // No children for top-level categories
		};

		categories.push(category);
	}

	return categories;
};

// Generate 2000 categories and subcategories
const categories = generateTopLevelCategories(1000, 2000);
