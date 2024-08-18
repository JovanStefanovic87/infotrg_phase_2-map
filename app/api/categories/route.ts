// app/api/categories/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
			},
		});
		return NextResponse.json(categories);
	} catch (error) {
		console.error('Error fetching categories:', error);
		return NextResponse.error();
	}
}

export async function POST(request: NextRequest) {
	const data = await request.json();
	const { parentId, labelId } = data;

	// Log the received parentId and labelId
	console.log('Received parentId:', parentId);
	console.log('Received labelId:', labelId);

	try {
		// Validate parentId
		if (parentId) {
			const parentCategoryId = parseInt(parentId, 10);
			if (isNaN(parentCategoryId)) {
				return new NextResponse('Invalid parentId', { status: 400 });
			}

			const parentCategory = await prisma.category.findUnique({
				where: { id: parentCategoryId },
			});
			if (!parentCategory) {
				return new NextResponse('Parent category not found', { status: 404 });
			}
		}

		// Validate labelId
		const label = await prisma.label.findUnique({
			where: { id: labelId },
		});
		if (!label) {
			return new NextResponse('Label not found', { status: 404 });
		}

		// Create new category
		const newCategory = await prisma.category.create({
			data: {
				parentId: parentId ? parseInt(parentId, 10) : null,
				labelId,
			},
		});

		return new NextResponse(JSON.stringify(newCategory), { status: 201 });
	} catch (error) {
		console.error('Error creating category:', error);
		return new NextResponse('Error creating category', { status: 500 });
	}
}
