// app/api/synonyms/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { translationId, synonyms } = body;

		if (!translationId || !Array.isArray(synonyms)) {
			return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
		}

		// Delete existing synonyms for the translation
		await prisma.synonym.deleteMany({
			where: { translationId },
		});

		// Create new synonyms
		if (synonyms.length > 0) {
			await prisma.synonym.createMany({
				data: synonyms.map((synonym: string) => ({
					translationId,
					synonym,
				})),
			});
		}

		return NextResponse.json({ message: 'Synonyms updated successfully' });
	} catch (error) {
		console.error('Error updating synonyms:', error);
		return NextResponse.json({ error: 'Error updating synonyms' }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const translationId = searchParams.get('translationId');

		if (!translationId) {
			return NextResponse.json({ error: 'Translation ID is required' }, { status: 400 });
		}

		// Delete all synonyms for the given translation
		await prisma.synonym.deleteMany({
			where: { translationId: Number(translationId) },
		});

		return NextResponse.json({ message: 'Synonyms deleted successfully' });
	} catch (error) {
		console.error('Error deleting synonyms:', error);
		return NextResponse.json({ error: 'Error deleting synonyms' }, { status: 500 });
	}
}
