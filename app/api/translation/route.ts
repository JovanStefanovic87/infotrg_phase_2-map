import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const labelId = parseInt(url.searchParams.get('labelId') || '', 10);
	const languageId = parseInt(url.searchParams.get('languageId') || '', 10);

	if (isNaN(labelId) || isNaN(languageId)) {
		return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
	}

	const translation = await prisma.translation.findFirst({
		where: {
			labelId,
			languageId,
		},
		include: {
			synonyms: true,
		},
	});

	if (!translation) {
		return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
	}

	return NextResponse.json({
		id: translation.id,
		labelId: translation.labelId,
		languageId: translation.languageId,
		translation: translation.translation,
		createdAt: translation.createdAt,
		synonyms: translation.synonyms.map(synonym => ({
			id: synonym.id,
			translationId: synonym.translationId,
			synonym: synonym.synonym,
			createdAt: synonym.createdAt,
		})),
	});
}

export async function POST(request: Request) {
	const { labelId, languageId, translation } = await request.json();
	const newTranslation = await prisma.translation.create({
		data: {
			labelId,
			languageId,
			translation,
		},
	});
	return NextResponse.json(newTranslation);
}
