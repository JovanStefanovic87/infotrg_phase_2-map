// api/categories
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { CategoryWithTranslations, SimplifiedCategory } from '@/utils/helpers/types';

const serializeData = (data: any) => {
	return JSON.parse(JSON.stringify(data));
};

const validateCategoryData = (data: any) => {
	if (!data.labelId || typeof data.labelId !== 'number') {
		throw new Error('LabelId is required and must be a number.');
	}
	if (data.iconId !== null && typeof data.iconId !== 'number') {
		throw new Error('IconId must be a number or null.');
	}
	if (data.parentIds && !Array.isArray(data.parentIds)) {
		throw new Error('ParentIds must be an array of numbers.');
	}
	if (data.relatedIds && !Array.isArray(data.relatedIds)) {
		throw new Error('RelatedIds must be an array of numbers.');
	}
};

function sanitizeCategory(category: CategoryWithTranslations): CategoryWithTranslations {
	console.log('Sanitizing category:', category); // Provera pre sanitizacije

	const sanitizedCategory = {
		...category,
		advertisingId: category.advertisingId || 1,
		name: category.name || 'Unnamed category',
		translations: category.translations.map(translation => ({
			name: translation.name || 'No translation available',
			languageId: translation.languageId,
			labelId: translation.labelId,
			categoryId: translation.categoryId,
		})),
		icon: category.icon
			? {
					...category.icon,
					createdAt: category.icon.createdAt ? category.icon.createdAt : new Date().toISOString(),
			  }
			: {
					id: 0,
					name: 'default',
					url: '/default-icon.png',
					createdAt: new Date().toISOString(),
			  },
		children: category.children.map(child => sanitizeCategory(child as CategoryWithTranslations)),
		createdAt: category.createdAt ? category.icon.createdAt : new Date().toISOString(), // Pretvori u string
	};

	console.log('Sanitized category:', sanitizedCategory); // Provera nakon sanitizacije

	return sanitizedCategory;
}

function hasCycle(categoryId: number, visited: Set<number>): boolean {
	// Ako je kategorija već posetena, znači imamo ciklus
	if (visited.has(categoryId)) {
		return true;
	}

	// Dodajemo kategoriju u set posetjenih
	visited.add(categoryId);
	return false;
}

function validateCategories(categories: any[]) {
	const errors: string[] = [];

	function validateCategory(category: any, path: string) {
		if (typeof category.id !== 'number') errors.push(`${path}.id is not a number`);
		if (typeof category.labelId !== 'number') errors.push(`${path}.labelId is not a number`);
		if (category.iconId !== null && typeof category.iconId !== 'number')
			errors.push(`${path}.iconId is not a number or null`);
		if (typeof category.name !== 'string') errors.push(`${path}.name is not a string`);

		if (!Array.isArray(category.translations)) errors.push(`${path}.translations is not an array`);

		category.translations.forEach((translation: any, index: number) => {
			if (typeof translation.name !== 'string')
				errors.push(`${path}.translations[${index}].name is not a string`);
			if (typeof translation.languageId !== 'number')
				errors.push(`${path}.translations[${index}].languageId is not a number`);
			if (typeof translation.labelId !== 'number')
				errors.push(`${path}.translations[${index}].labelId is not a number`);
			if (typeof translation.categoryId !== 'number')
				errors.push(`${path}.translations[${index}].categoryId is not a number`);
		});

		if (category.icon) {
			if (typeof category.icon.id !== 'number') errors.push(`${path}.icon.id is not a number`);
			if (typeof category.icon.name !== 'string') errors.push(`${path}.icon.name is not a string`);
			if (typeof category.icon.url !== 'string') errors.push(`${path}.icon.url is not a string`);
			const iconCreatedAt = new Date(category.icon.createdAt);
			if (isNaN(iconCreatedAt.getTime())) {
				errors.push(`${path}.icon.createdAt is not a valid Date object`);
			}
		}

		const createdAt = new Date(category.createdAt);
		if (isNaN(createdAt.getTime())) {
			errors.push(`${path}.createdAt is not a valid Date object`);
		}

		if (Array.isArray(category.children)) {
			category.children.forEach((child: any, index: number) =>
				validateCategory(child, `${path}.children[${index}]`)
			);
		} else {
			errors.push(`${path}.children is not an array`);
		}
	}

	categories.forEach((category, index) => validateCategory(category, `categories[${index}]`));

	return errors;
}

// Function to fetch parent categories
const fetchParents = async (childId: number): Promise<SimplifiedCategory[]> => {
	const parentCategories = await prisma.parentCategory.findMany({
		where: { childId },
		include: {
			parent: {
				include: {
					icon: true,
					label: {
						include: {
							translations: true,
						},
					},
				},
			},
		},
	});

	const sortedParentCategories = parentCategories.sort((a, b) => {
		const aName =
			a.parent.label.translations.length > 0
				? a.parent.label.translations[0].translation.toLowerCase()
				: '';
		const bName =
			b.parent.label.translations.length > 0
				? b.parent.label.translations[0].translation.toLowerCase()
				: '';
		return aName.localeCompare(bName);
	});

	const parents = sortedParentCategories.map(({ parent }) => ({
		id: parent.id,
		name:
			parent.label.translations.length > 0
				? parent.label.translations[0].translation || 'Unnamed parent'
				: 'Unnamed parent',
		iconId: parent.iconId,
		labelId: parent.labelId,
		icon: parent.icon
			? {
					id: parent.icon.id,
					name: parent.icon.name || 'unknown',
					url: parent.icon.url || '/default-icon.png',
					createdAt: parent.icon.createdAt,
			  }
			: null,
	}));

	return serializeData(parents);
};

// Function to build the category tree
const buildCategoryTree = async (
	parentId: number | null,
	prefix: string,
	visited: Set<number> = new Set()
): Promise<CategoryWithTranslations[]> => {
	if (parentId !== null && hasCycle(parentId, visited)) {
		throw new Error(`Cycle detected in category tree for categoryId: ${parentId}`);
	}

	const categories = await prisma.category.findMany({
		where: {
			...(parentId === null
				? { childCategories: { none: {} } }
				: { childCategories: { some: { parentId } } }),
			label: {
				name: {
					startsWith: prefix,
				},
			},
		},
		include: {
			icon: true,
			label: {
				include: {
					translations: true, // Ostaje ako su prevodi potrebni
				},
			},
		},
	});

	visited.add(parentId ?? -1);

	return Promise.all(
		categories.map(async category => ({
			...category,
			translations: category.label.translations.map(translation => ({
				languageId: translation.languageId || 1,
				name: translation.translation || 'No translation available',
				labelId: category.labelId || 1,
				categoryId: category.id || 1,
			})),
			name:
				category.label.translations.length > 0
					? category.label.translations[0].translation
					: 'Unnamed category',
			icon: category.icon || {
				id: 0,
				name: 'default',
				url: '/default-icon.png',
				createdAt: new Date().toISOString(),
			},
			parents: await fetchParents(category.id),
			children: await buildCategoryTree(category.id, prefix),
			label: 'Nedefinisana kategorija',
			createdAt: category.createdAt || '2021-01-01T00:00:00.000Z',
		}))
	);
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const prefix = searchParams.get('prefix') || 'article_category_';

	try {
		const topLevelCategories: CategoryWithTranslations[] = await buildCategoryTree(null, prefix);
		const sanitizedCategories = topLevelCategories.map(sanitizeCategory);
		const validationErrors = validateCategories(sanitizedCategories);
		console.log('Sanitized categories:', sanitizedCategories);
		console.log('Validation errors:', validationErrors);
		// Validacija kategorija

		if (validationErrors.length > 0) {
			console.error('Validation errors in categories:', validationErrors);
			return NextResponse.json(
				{
					error: 'Invalid categories data',
					details: validationErrors,
				},
				{ status: 400 }
			);
		}

		// Serializacija podataka
		const serializedData = serializeData(sanitizedCategories);
		/* console.log('Sanitized Data:', JSON.stringify(sanitizedCategories, null, 2)); */
		// Provera veličine podataka
		const jsonSize = Buffer.byteLength(JSON.stringify(serializedData), 'utf8'); // Velicina JSON-a u bajtovima
		const maxJsonSize = 1 * 1024 * 1024; // Ograničenje na 1 MB

		if (jsonSize > maxJsonSize) {
			console.error(`JSON data exceeds size limit: ${jsonSize} bytes`);
			return NextResponse.json(
				{ error: 'The requested data is too large. Please refine your query.' },
				{ status: 413 } // HTTP status code 413: Payload Too Large
			);
		}

		// Vraćamo podatke ako su validni i veličina je u granicama
		return NextResponse.json(serializedData);
	} catch (error) {
		console.error('Error fetching categories:', error);
		return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	const { parentIds, labelId, iconId, relatedIds } = await request.json();

	try {
		// Fetch categoryId from labelId
		let parentCategoryIds: number[] = [];
		if (parentIds && parentIds.length > 0) {
			const parentCategories = await prisma.category.findMany({
				where: {
					labelId: { in: parentIds }, // Use labelId to find the corresponding category
				},
			});

			// Map the found parent categories to their categoryId
			parentCategoryIds = parentCategories.map(category => category.id);

			if (parentCategoryIds.length !== parentIds.length) {
				throw new Error('Some parent categories do not exist');
			}
		}

		// Create the new category
		const newCategory = await prisma.category.create({
			data: {
				labelId,
				iconId,
			},
		});

		// Add parent categories
		if (parentCategoryIds.length > 0) {
			await prisma.parentCategory.createMany({
				data: parentCategoryIds.map((parentId: number) => ({
					parentId,
					childId: newCategory.id,
				})),
			});
		}

		// Add related categories
		if (relatedIds && relatedIds.length > 0) {
			await prisma.relatedCategory.createMany({
				data: relatedIds.map((relatedId: number) => ({
					categoryId: newCategory.id,
					relatedId,
				})),
			});
		}
		const sterilizedData = serializeData(newCategory);
		return NextResponse.json(sterilizedData);
	} catch (error) {
		console.error('Failed to create category', error);
		return NextResponse.json({ error: 'Failed to create category.' }, { status: 500 });
	}
}

// Edit PUT request for updating categories
export async function PUT(request: Request) {
	const { id, parentIds, labelId, iconId, relatedIds } = await request.json();

	try {
		validateCategoryData({ parentIds, labelId, iconId, relatedIds });
		// Update the category
		await prisma.category.update({
			where: { id },
			data: { iconId, labelId },
		});

		// Update parent categories
		await prisma.parentCategory.deleteMany({ where: { childId: id } });
		if (parentIds && parentIds.length > 0) {
			await prisma.parentCategory.createMany({
				data: parentIds.map((parentId: number) => ({
					parentId,
					childId: id,
				})),
			});
		}

		// Update related categories
		await prisma.relatedCategory.deleteMany({ where: { categoryId: id } });
		if (relatedIds && relatedIds.length > 0) {
			await prisma.relatedCategory.createMany({
				data: relatedIds.map((relatedId: number) => ({
					categoryId: id,
					relatedId,
				})),
			});
		}

		return NextResponse.json(serializeData({ message: 'Category updated successfully' }));
	} catch (error) {
		console.error('Failed to update category', error);
		return NextResponse.json({ error: 'Failed to update category.' }, { status: 500 });
	}
}
