import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function DELETE(request: Request) {
	// Extract the category ID from the URL
	const url = new URL(request.url);
	const id = url.pathname.split('/').pop();

	if (!id || isNaN(Number(id))) {
		return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
	}

	try {
		// Check if the category exists
		const category = await prisma.category.findUnique({ where: { id: Number(id) } });
		if (!category) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		// Delete the category
		await prisma.category.delete({ where: { id: Number(id) } });
		return NextResponse.json({ message: 'Category deleted successfully' });
	} catch (error) {
		console.error('Error deleting category:', error);
		return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
	}
}
