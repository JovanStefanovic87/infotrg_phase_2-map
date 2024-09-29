//app\api\translation\translations\route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
	try {
		const data = await request.json();
		const translations = data.translations;

		// Process each translation update
		for (const translation of translations) {
			await prisma.translation.update({
				where: { id: translation.translationId },
				data: {
					languageId: translation.languageId,
					translation: translation.translation,
				},
			});
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error updating translations:', error);
		return NextResponse.json({ error: 'Failed to update translations' }, { status: 500 });
	}
}
