import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function DELETE(request: Request) {
	const url = new URL(request.url);
	const id = url.pathname.split('/').pop();

	if (!id || isNaN(Number(id))) {
		return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
	}

	try {
		// Convert ID to number
		const categoryId = Number(id);

		// Function to delete category, its subcategories, labels, translations, and synonyms recursively
		const deleteCategoryAndRelatedData = async (id: number) => {
			// Find all subcategories
			const subcategories = await prisma.category.findMany({
				where: { parentId: id },
			});

			// Recursively delete each subcategory and related data
			for (const subcategory of subcategories) {
				await deleteCategoryAndRelatedData(subcategory.id);
			}

			// Delete the related label and translations
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

			// Delete the category itself
			await prisma.category.delete({ where: { id } });
		};

		// Check if the category exists
		const category = await prisma.category.findUnique({ where: { id: categoryId } });
		if (!category) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		// Delete the category and its related data
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
