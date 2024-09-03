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
				},
			},
		},
	});

	return Promise.all(
		parentCategories.map(async ({ parent }) => ({
			id: parent.id,
			name: parent.name, // Use the name fetched from the parent
			iconId: parent.iconId,
			labelId: parent.labelId,
			parents: await fetchParents(parent.id), // Recursively fetch parent categories
			children: [], // This is not required here
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
		include: {
			icon: true,
			childCategories: {
				include: {
					child: true,
				},
			},
		},
		where: {
			name: {
				startsWith: prefix,
			},
			...(parentId === null
				? { NOT: { childCategories: { some: {} } } }
				: { childCategories: { some: { parentId } } }),
		},
	});

	// Recursively build the tree structure
	return Promise.all(
		categories.map(async category => ({
			id: category.id,
			name: category.name, // Use the name fetched from the category
			iconId: category.iconId,
			labelId: category.labelId,
			parents: await fetchParents(category.id), // Fetch and populate parents
			children: await buildCategoryTree(category.id, prefix), // Recursively build children
			icon: category.icon
				? {
						id: category.icon.id,
						name: category.icon.name,
						url: category.icon.url,
						createdAt: category.icon.createdAt,
				  }
				: null,
		}))
	);
};

export async function GET(request: Request) {
	const url = new URL(request.url);
	const prefix = url.searchParams.get('prefix') || ''; // Fetch the prefix from query params
	const topLevelCategories: Category[] = await buildCategoryTree(null, prefix);
	return NextResponse.json(topLevelCategories);
}

export async function POST(request: Request) {
	const { parentIds, labelId, iconId, newIcon, name } = await request.json(); // Destructure `name` from the request body

	let categoryIconId = iconId;

	// If a new icon is being uploaded, save it first
	if (newIcon) {
		try {
			const createdIcon = await prisma.icon.create({
				data: {
					name: newIcon.name,
					url: newIcon.url,
				},
			});

			categoryIconId = createdIcon.id; // Update iconId to the newly created icon
		} catch (error) {
			return NextResponse.json({ error: 'Failed to create icon.' }, { status: 500 });
		}
	}

	try {
		// Create a new category with either an existing iconId or the newly created iconId
		const newCategory = await prisma.category.create({
			data: {
				labelId,
				iconId: categoryIconId,
				name: name, // Add the prefixed name here
			},
		});

		// Create entries in ParentCategory join table for each parentId
		if (parentIds && parentIds.length > 0) {
			await prisma.parentCategory.createMany({
				data: parentIds.map((parentId: number) => ({
					parentId,
					childId: newCategory.id,
				})),
			});
		}

		return NextResponse.json(newCategory);
	} catch (error) {
		console.error('Failed to create category', error);
		return NextResponse.json({ error: 'Failed to create category.' }, { status: 500 });
	}
}
