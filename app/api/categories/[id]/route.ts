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
			subcategories: true,
			icon: true,
		},
	});

	return Promise.all(
		categories.map(async category => ({
			...category,
			subcategories: await buildCategoryTree(category.id),
		}))
	);
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	try {
		if (id === 'all') {
			const categories = await prisma.category.findMany();
			return NextResponse.json(categories);
		} else {
			const category = await prisma.category.findUnique({
				where: { id: Number(id) },
			});
			return NextResponse.json(category);
		}
	} catch (error) {
		console.error('Error fetching category:', error);
		return NextResponse.json({ error: 'Error fetching category' }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const url = new URL(request.url);
	const id = url.pathname.split('/').pop();

	if (!id || isNaN(Number(id))) {
		return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
	}

	try {
		const categoryId = Number(id);

		const deleteCategoryAndRelatedData = async (id: number) => {
			const subcategories = await prisma.category.findMany({
				where: { parentId: id },
			});

			for (const subcategory of subcategories) {
				await deleteCategoryAndRelatedData(subcategory.id);
			}

			const label = await prisma.category.findUnique({
				where: { id },
				select: { labelId: true },
			});

			if (label?.labelId) {
				await prisma.translation.deleteMany({
					where: { labelId: label.labelId },
				});

				await prisma.label.delete({
					where: { id: label.labelId },
				});
			}

			await prisma.category.delete({ where: { id } });
		};

		const category = await prisma.category.findUnique({ where: { id: categoryId } });
		if (!category) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		await deleteCategoryAndRelatedData(categoryId);

		return NextResponse.json({
			message: 'Category, subcategories, and related data deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting category and related data:', error);
		return NextResponse.json(
			{ error: 'Error deleting category and related data' },
			{ status: 500 }
		);
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const { parentId, labelId, iconId, languageId, translation } = await request.json();

	try {
		const updatedCategory = await prisma.category.update({
			where: { id: Number(id) },
			data: {
				parentId,
				labelId,
				iconId,
			},
		});

		if (languageId && translation) {
			await prisma.translation.upsert({
				where: {
					labelId_languageId: {
						labelId: labelId,
						languageId: languageId,
					},
				},
				update: { translation },
				create: {
					labelId,
					languageId,
					translation,
				},
			});
		}

		return NextResponse.json(updatedCategory);
	} catch (error) {
		console.error('Error updating category:', error);
		return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
	}
}
