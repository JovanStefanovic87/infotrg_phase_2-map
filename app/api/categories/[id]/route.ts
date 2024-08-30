//app\api\categories\[id]\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Category } from '@/utils/helpers/types';
import { Prisma } from '@prisma/client';

const buildCategoryTree = async (parentId: number | null): Promise<Category[]> => {
	const categories = await prisma.category.findMany({
		where:
			parentId === null
				? { parentCategories: { none: {} } } // Fetch categories with no parents if parentId is null
				: { parentCategories: { some: { parentId } } }, // Fetch categories with specific parentId
		include: {
			parentCategories: { include: { parent: true } }, // Fetch parent categories to get parents
			childCategories: { include: { child: true } }, // Fetch child categories to get children
			icon: true, // Include icon details if any
		},
	});

	return Promise.all(
		categories.map(async category => {
			const children = await buildCategoryTree(category.id); // Recursively fetch children

			return {
				id: category.id,
				iconId: category.iconId,
				labelId: category.labelId,
				icon: category.icon
					? {
							id: category.icon.id,
							name: category.icon.name,
							url: category.icon.url,
							createdAt: category.icon.createdAt,
					  }
					: null,
				parents: category.parentCategories.map(pc => ({
					id: pc.parent.id,
					iconId: pc.parent.iconId,
					labelId: pc.parent.labelId,
					parents: [], // To avoid recursion loop
					children: [], // To avoid recursion loop
				})),
				children,
			} as Category;
		})
	);
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	try {
		if (id === 'all') {
			const categories = await buildCategoryTree(null); // Fetch the whole tree structure
			return NextResponse.json(categories);
		} else {
			const category = await prisma.category.findUnique({
				where: { id: Number(id) },
				include: {
					parentCategories: { include: { parent: true } }, // Fetch parent details
					childCategories: { include: { child: true } }, // Fetch child details
					// No need to include icon details if you are only using iconId
				},
			});

			if (!category) {
				return NextResponse.json({ error: 'Category not found' }, { status: 404 });
			}

			// Transform the fetched data to match the Category interface without icon details
			const transformedCategory: Category = {
				id: category.id,
				iconId: category.iconId, // Keep only iconId
				labelId: category.labelId,
				parents: category.parentCategories.map(pc => ({
					id: pc.parent.id,
					iconId: pc.parent.iconId,
					labelId: pc.parent.labelId,
					parents: [],
					children: [],
				})),
				children: category.childCategories.map(cc => ({
					id: cc.child.id,
					iconId: cc.child.iconId,
					labelId: cc.child.labelId,
					parents: [],
					children: [],
				})),
			};

			return NextResponse.json(transformedCategory);
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
			// Recursively find and delete child categories
			const subcategories = await prisma.category.findMany({
				where: { childCategories: { some: { parentId: id } } }, // Fetch child categories
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

	try {
		const body = await request.json();
		const { parentIds, labelId, iconId } = body;
		console.log('iconId:', iconId);

		if (!Array.isArray(parentIds)) {
			return NextResponse.json({ error: 'parentIds should be an array' }, { status: 400 });
		}

		if (labelId === undefined || typeof labelId !== 'number') {
			return NextResponse.json({ error: 'Invalid labelId' }, { status: 400 });
		}

		if (iconId !== null && iconId !== undefined && typeof iconId !== 'number') {
			return NextResponse.json({ error: 'Invalid iconId' }, { status: 400 });
		}

		const updatedCategory = await prisma.$transaction(async prisma => {
			const dataToUpdate: { labelId: number; iconId?: number | null } = { labelId };

			if (iconId !== undefined) {
				// Only update iconId if it's explicitly provided
				dataToUpdate.iconId = iconId;
			}

			const category = await prisma.category.update({
				where: { id: Number(id) },
				data: dataToUpdate,
			});

			await prisma.parentCategory.deleteMany({
				where: { childId: Number(id) },
			});

			await prisma.parentCategory.createMany({
				data: parentIds.map((parentId: number) => ({
					parentId: parentId,
					childId: Number(id),
				})),
			});

			return category;
		});

		return NextResponse.json(updatedCategory);
	} catch (error) {
		console.error('Error updating category:', error);
		return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
	}
}
