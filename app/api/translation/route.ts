//app\api\translation\route.ts
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

	const response = {
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
	};

	return NextResponse.json(response);
}

export async function POST(request: Request) {
	try {
		const { translations } = await request.json();

		if (!Array.isArray(translations)) {
			return NextResponse.json(
				{ error: 'Invalid request body. Must be an array.' },
				{ status: 400 }
			);
		}

		const createdOrUpdatedTranslations = [];

		for (const translation of translations) {
			const { labelId, languageId, translation: translationText } = translation;

			if (typeof labelId !== 'number' || typeof languageId !== 'number') {
				continue; // Ensure labelId and languageId are numbers
			}

			// Upsert to create or update translation
			const upsertedTranslation = await prisma.translation.upsert({
				where: {
					labelId_languageId: {
						labelId,
						languageId,
					},
				},
				update: {
					translation: translationText,
				},
				create: {
					labelId, // Prosledite samo labelId
					languageId,
					translation: translationText,
				},
			});

			createdOrUpdatedTranslations.push(upsertedTranslation);
		}

		return NextResponse.json(createdOrUpdatedTranslations);
	} catch (error) {
		console.error('Error in POST /api/translation:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
