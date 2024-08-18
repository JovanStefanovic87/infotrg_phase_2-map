import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const languageId = parseInt(url.searchParams.get('languageId') || '', 10);

	if (isNaN(languageId)) {
		return NextResponse.json({ error: 'Invalid languageId' }, { status: 400 });
	}

	try {
		const labels = await prisma.label.findMany({
			where: {
				name: {
					startsWith: 'article_category_',
				},
				translations: {
					some: {
						languageId,
					},
				},
			},
		});

		// Ensure labels is an array
		return NextResponse.json(labels);
	} catch (error) {
		console.error('Error fetching labels:', error);
		return NextResponse.error();
	}
}

export async function POST(request: NextRequest) {
	try {
		const { name } = await request.json();
		const labelName = `article_category_${name}`;

		const label = await prisma.label.create({
			data: {
				name: labelName,
				createdAt: new Date(),
			},
		});
		return NextResponse.json({ id: label.id });
	} catch (error) {
		console.error('Error creating label:', error);
		return NextResponse.error();
	}
}
