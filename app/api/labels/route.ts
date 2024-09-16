//app\api\labels\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const languageId = parseInt(url.searchParams.get('languageId') || '', 10);
		const prefix = url.searchParams.get('prefix') || ''; // Get the prefix from the query

		if (isNaN(languageId)) {
			return NextResponse.json({ error: 'Invalid languageId' }, { status: 400 });
		}

		const labels = await prisma.label.findMany({
			where: {
				name: {
					startsWith: prefix, // Filter labels by prefix
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

		if (!name || !prefix) {
			return NextResponse.json({ error: 'Name and prefix are required' }, { status: 400 });
		}

		// Combine prefix and name to create the full label name
		const fullName = `${prefix}${name}`;

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
