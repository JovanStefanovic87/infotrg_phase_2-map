import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

interface Category {
	id: number;
	parentId: number | null;
	labelId: number;
	iconId: number | null;
	subcategories: Category[];
}

const buildCategoryTree = async (parentId: number | null): Promise<Category[]> => {
	const categories = await prisma.category.findMany({
		where: { parentId },
		include: {
			subcategories: true, // Correctly set based on your schema
			icon: true, // Include the icon if needed
		},
	});

	return Promise.all(
		categories.map(async category => ({
			...category,
			subcategories: await buildCategoryTree(category.id),
		}))
	);
};

export async function GET() {
	const topLevelCategories: Category[] = await buildCategoryTree(null);
	return NextResponse.json(topLevelCategories);
}

export async function POST(request: Request) {
	const { parentId, labelId, iconId } = await request.json();
	const newCategory = await prisma.category.create({
		data: {
			parentId,
			labelId,
			iconId,
		},
	});
	return NextResponse.json(newCategory);
}
