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
			name: '', // Fetch or provide the name for each parent category
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
const buildCategoryTree = async (parentId: number | null): Promise<Category[]> => {
	const categories = await prisma.category.findMany({
		include: {
			icon: true,
			childCategories: {
				include: {
					child: true,
				},
			},
		},
		where:
			parentId === null
				? { NOT: { childCategories: { some: {} } } }
				: { childCategories: { some: { parentId } } },
	});

	// Recursively build the tree structure
	return Promise.all(
		categories.map(async category => ({
			id: category.id,
			name: '', // Fetch or provide the name for each category
			iconId: category.iconId,
			labelId: category.labelId,
			parents: await fetchParents(category.id), // Fetch and populate parents
			children: await buildCategoryTree(category.id), // Recursively build children
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

export async function GET() {
	const topLevelCategories: Category[] = await buildCategoryTree(null);
	return NextResponse.json(topLevelCategories);
}

export async function POST(request: Request) {
	const { parentIds, labelId, iconId } = await request.json();

	// Create a new category
	const newCategory = await prisma.category.create({
		data: {
			labelId,
			iconId,
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
}
