import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	try {
		// Povlačenje prevoda za dati slug
		const translation = await prisma.translation.findFirst({
			where: { slug },
			select: { translation: true },
		});

		if (!translation) {
			return NextResponse.json({ translation: slug }, { status: 404 }); // Ako ne postoji, vratite slug
		}

		return NextResponse.json(translation);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch translation' }, { status: 500 });
	}
}
