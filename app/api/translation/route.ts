// app\api\translation\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const labelIdsParam = url.searchParams.get('labelIds');
	const languageIdParam = url.searchParams.get('languageId');

	const languageId = parseInt(languageIdParam || '', 10);
	if (!labelIdsParam || isNaN(languageId)) {
		return NextResponse.json({ error: 'Neispravni parametri' }, { status: 400 });
	}

	// Parse and validate label IDs
	const labelIds = labelIdsParam
		.split(',')
		.map(id => parseInt(id, 10))
		.filter(id => !isNaN(id));

	if (labelIds.length === 0) {
		return NextResponse.json({ error: 'Nema važećih labelIds parametara' }, { status: 400 });
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
		console.error('Greška u GET /api/translation:', error);
		return NextResponse.json({ error: 'Interna greška servera' }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { translations } = await request.json();

		if (!Array.isArray(translations)) {
			return NextResponse.json(
				{ error: 'Neispravan format zahteva. Očekuje se niz.' },
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
					labelId_languageId: { labelId, languageId },
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
		console.error('Greška u POST /api/translation:', error);
		return NextResponse.json({ error: 'Interna greška servera' }, { status: 500 });
	}
}
