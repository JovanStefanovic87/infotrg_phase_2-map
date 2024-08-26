//app\api\translation\labels\[labelId]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const { pathname } = new URL(req.url);
	const parts = pathname.split('/');
	const labelId = parseInt(parts[parts.length - 1], 10);

	if (isNaN(labelId)) {
		return NextResponse.json({ error: 'Invalid labelId parameter' }, { status: 400 });
	}

	try {
		const translations = await prisma.translation.findMany({
			where: { labelId },
			include: { synonyms: true },
		});

		if (translations.length === 0) {
			return NextResponse.json({ error: 'No translations found' }, { status: 404 });
		}

		return NextResponse.json(
			translations.map(translation => ({
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
			}))
		);
	} catch (error) {
		console.error('Error fetching translations:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
