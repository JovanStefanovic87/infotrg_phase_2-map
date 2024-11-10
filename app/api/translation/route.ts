//app\api\translation\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const labelIdsParam = url.searchParams.get('labelIds');
	const languageIdParam = url.searchParams.get('languageId');

	const languageId = parseInt(languageIdParam || '', 10);
	if (!labelIdsParam || isNaN(languageId)) {
		return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
	}

	const labelIds = labelIdsParam
		.split(',')
		.map(id => parseInt(id, 10))
		.filter(id => !isNaN(id));
	if (labelIds.length === 0) {
		return NextResponse.json({ error: 'No valid labelIds provided' }, { status: 400 });
	}

	try {
		const translations = await prisma.translation.findMany({
			where: {
				labelId: { in: labelIds },
				languageId,
			},
			include: {
				synonyms: true,
			},
		});

		if (translations.length === 0) {
			return NextResponse.json([]);
		}

		// Mapiramo `translations` u željeni format
		const response = translations.map(translation => ({
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
		}));

		return NextResponse.json(response);
	} catch (error) {
		console.error('Error in GET /api/translation:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
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
				continue;
			}

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
					labelId,
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
