//app\api\labels\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const languageId = parseInt(url.searchParams.get('languageId') || '', 10);
		const prefix = url.searchParams.get('prefix') || '';

		if (isNaN(languageId)) {
			return NextResponse.json({ error: 'Invalid languageId' }, { status: 400 });
		}
		// Fetch labels filtered by prefix and language
		const labels = await prisma.label.findMany({
			where: {
				name: {
					startsWith: prefix,
				},
				translations: {
					some: {
						languageId,
					},
				},
			},
		});

		return NextResponse.json(labels);
	} catch (error) {
		console.error('Error fetching labels:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const { name, prefix } = await request.json();
		// Validate required fields
		if (!name || !prefix) {
			return NextResponse.json({ error: 'Name and prefix are required' }, { status: 400 });
		}
		// Combine prefix and name in lowercase
		const fullName = `${prefix}${name}`.toLowerCase();
		// Check for existing label with the same name
		const existingLabel = await prisma.label.findFirst({
			where: { name: fullName },
		});

		if (existingLabel) {
			return NextResponse.json(
				{ error: 'Kategorija sa ovim imenom već postoji.' },
				{ status: 409 }
			);
		}
		// Create new label if no duplicates
		const newLabel = await prisma.label.create({
			data: {
				name: fullName,
			},
		});

		return NextResponse.json(newLabel);
	} catch (error) {
		console.error('Error creating label:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
