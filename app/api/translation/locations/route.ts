import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
	try {
		const data = await request.json();
		const translations = data.translations;
		console.log('Received translations:', translations); // Debugging to check the incoming value

		// Process each translation update or creation
		for (const translation of translations) {
			await prisma.translation.upsert({
				where: {
					labelId_languageId: {
						labelId: translation.labelId,
						languageId: translation.languageId,
					},
				},
				update: {
					translation: translation.translation,
				},
				create: {
					labelId: translation.labelId,
					languageId: translation.languageId,
					translation: translation.translation,
					createdAt: new Date(), // You can set createdAt as needed
				},
			});
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error processing translations:', error);
		return NextResponse.json({ error: 'Failed to process translations' }, { status: 500 });
	}
}
