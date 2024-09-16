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

	// Find a single translation
	const translation = await prisma.translation.findFirst({
		where: {
			labelId,
			languageId,
		},
		include: {
			synonyms: true,
		},
	});

	// If no translation is found, return a 404 error
	if (!translation) {
		return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
	}

	// Format the response (for a single object)
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

		const createdTranslations = [];

		for (const translation of translations) {
			const { labelId, languageId, translation: translationText } = translation;

			if (typeof labelId !== 'number' || typeof languageId !== 'number') {
				// Ensure labelId and languageId are numbers
				continue;
			}

			const newTranslation = await prisma.translation.create({
				data: {
					labelId,
					languageId,
					translation: typeof translationText === 'string' ? translationText : '', // Ensure translationText is a string
				},
			});

			createdTranslations.push(newTranslation);
		}

		return NextResponse.json(createdTranslations);
	} catch (error) {
		console.error('Error in POST /api/translation:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
