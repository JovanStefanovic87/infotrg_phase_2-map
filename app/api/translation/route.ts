import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const labelId = searchParams.get('labelId');
	const languageId = searchParams.get('languageId');

	const translations = await prisma.translation.findMany({
		where: {
			labelId: labelId ? parseInt(labelId) : undefined,
			languageId: languageId ? parseInt(languageId) : undefined,
		},
	});

	return NextResponse.json(translations);
}
export async function POST(request: Request) {
	try {
		const { labelId, languageId, translation } = await request.json();

		const newTranslation = await prisma.translation.create({
			data: {
				labelId,
				languageId,
				translation,
			},
		});

		return NextResponse.json(newTranslation);
	} catch (error) {
		console.error('Error creating translation:', error);
		return NextResponse.json({ error: 'Failed to create translation' }, { status: 500 });
	}
}
