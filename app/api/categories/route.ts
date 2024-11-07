// api/categories
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Category } from '@/utils/helpers/types';

// Function to fetch parent categories
const fetchParents = async (childId: number): Promise<Category[]> => {
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

	return Promise.all(
		parentCategories.map(async ({ parent }) => ({
			id: parent.id,
			name: parent.label.translations.length > 0 ? parent.label.translations[0].translation : '', // Handle no translation case
			iconId: parent.iconId,
			labelId: parent.labelId,
			parents: await fetchParents(parent.id),
			children: [], // Not fetching children here, just parents
			icon: parent.icon
				? {
						id: parent.icon.id,
						name: parent.icon.name,
						url: parent.icon.url,
						createdAt: parent.icon.createdAt,
				  }
				: null,
		}))
	);
};

// Function to build the category tree
const buildCategoryTree = async (parentId: number | null, prefix: string): Promise<Category[]> => {
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
			childCategories: {
				include: {
					child: true,
				},
			},
			label: {
				include: {
					translations: true,
				},
			},
			relatedCategories: {
				include: {
					related: true, // Categories that are related to the current category
				},
			},
			relatedTo: {
				include: {
					category: true, // Categories that the current category is related to
				},
			},
		},
	});

	return Promise.all(
		categories.map(async category => {
			// Combine both directions of related categories (relatedCategories and relatedTo)
			const relatedIds = [
				...(category.relatedCategories?.map(rc => rc.related.id) || []),
				...(category.relatedTo?.map(rt => rt.category.id) || []),
			];

			return {
				id: category.id,
				name:
					category.label.translations.length > 0 ? category.label.translations[0].translation : '', // Ensure we handle empty translations array
				iconId: category.iconId,
				labelId: category.labelId,
				parents: await fetchParents(category.id), // Recursively fetch parent categories
				children: await buildCategoryTree(category.id, prefix), // Recursively fetch child categories
				icon: category.icon
					? {
							id: category.icon.id,
							name: category.icon.name,
							url: category.icon.url,
							createdAt: category.icon.createdAt,
					  }
					: null,
				relatedIds, // Add related category IDs to the category response
			};
		})
	);
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const prefix = searchParams.get('prefix') || 'article_category_';

	try {
		const topLevelCategories: Category[] = await buildCategoryTree(null, prefix);
		return NextResponse.json(topLevelCategories);
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

		return NextResponse.json(newCategory);
	} catch (error) {
		console.error('Failed to create category', error);
		return NextResponse.json({ error: 'Failed to create category.' }, { status: 500 });
	}
}

// Edit PUT request for updating categories
export async function PUT(request: Request) {
	const { id, parentIds, labelId, iconId, relatedIds } = await request.json();

	try {
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

		return NextResponse.json({ message: 'Category updated successfully' });
	} catch (error) {
		console.error('Failed to update category', error);
		return NextResponse.json({ error: 'Failed to update category.' }, { status: 500 });
	}
}
