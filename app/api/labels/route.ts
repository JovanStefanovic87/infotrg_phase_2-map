import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const languageId = parseInt(url.searchParams.get('languageId') || '', 10);
		const prefix = url.searchParams.get('prefix') || ''; // Get the prefix from query parameters

		if (isNaN(languageId)) {
			return NextResponse.json({ error: 'Invalid languageId' }, { status: 400 });
		}

		const labels = await prisma.label.findMany({
			where: {
				name: {
					startsWith: prefix, // Use the prefix from the query parameter
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
		const { name } = await request.json();
		console.log('Received name:', name);
		if (typeof name !== 'string') {
			return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
		}
		const labelName = name;

		const label = await prisma.label.create({
			data: {
				name: labelName,
				createdAt: new Date(),
			},
		});

		return NextResponse.json({ id: label.id });
	} catch (error) {
		console.error('Error creating label:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}
