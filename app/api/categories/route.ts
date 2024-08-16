import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const search = url.searchParams.get('search')?.toLowerCase() || '';

	try {
		const categories = await prisma.category.findMany({
			where: {
				OR: [{ name: { contains: search, mode: 'insensitive' } }, { synonyms: { has: search } }],
			},
			select: {
				id: true,
				name: true,
				description: true,
				parentId: true,
				synonyms: true,
			},
		});
		return NextResponse.json(categories);
	} catch (error) {
		console.error('Failed to fetch categories:', error);
		return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const { name, description, parentId, synonyms, subcategories } = data;

	try {
		const mainCategory = await prisma.category.create({
			data: {
				name,
				description,
				synonyms,
				parentId: parentId || null,
			},
		});

		if (subcategories && subcategories.length > 0) {
			await Promise.all(
				subcategories.map(async (subcategory: any) => {
					await prisma.category.create({
						data: {
							name: subcategory.name,
							description: subcategory.description,
							synonyms: subcategory.synonyms,
							parentId: mainCategory.id,
						},
					});
				})
			);
		}

		return NextResponse.json({ category: mainCategory });
	} catch (error) {
		console.error('Failed to create category:', error);
		return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	try {
		const { id, name, description, parentId, synonyms } = await request.json();

		if (!id) {
			return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
		}

		const updatedCategory = await prisma.category.update({
			where: { id },
			data: { name, description, parentId, synonyms },
		});

		return NextResponse.json(updatedCategory);
	} catch (error) {
		console.error('Failed to update category:', error);
		return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const { id } = await req.json();

		// Check if the category exists
		const existingCategory = await prisma.category.findUnique({ where: { id } });
		if (!existingCategory) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		// Delete the category
		await prisma.category.delete({ where: { id } });
		return NextResponse.json({ message: 'Category deleted successfully' });
	} catch (error) {
		console.error('Failed to delete category:', error);
		return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
	}
}
