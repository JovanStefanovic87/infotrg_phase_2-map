import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function DELETE(req: any, { params }: any) {
	const adId = parseInt(params.id); // Uzimanje ID iz parametara

	if (isNaN(adId)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	try {
		await prisma.advertising.delete({
			where: { id: adId },
		});
		// Umesto 204, vraćamo 200 sa porukom
		return NextResponse.json({ message: 'Ad deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting ad:', error);
		return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const adId = parseInt(params.id);

	if (isNaN(adId)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	try {
		const ad = await prisma.advertising.findUnique({
			where: { id: adId },
		});

		if (!ad) {
			return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
		}

		const currentDate = new Date();
		const newValidTo = new Date(ad.validTo); // trenutni datum isteka
		if (newValidTo > currentDate) {
			// Ako reklama nije istekla, dodaj 30 dana na trenutni datum isteka
			newValidTo.setDate(newValidTo.getDate() + 30);
		} else {
			// Ako je reklama istekla, dodaj 30 dana od sada
			newValidTo.setDate(currentDate.getDate() + 30);
		}

		await prisma.advertising.update({
			where: { id: adId },
			data: { validTo: newValidTo },
		});

		return NextResponse.json({ message: 'Ad extended successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error extending ad:', error);
		return NextResponse.json({ error: 'Failed to extend ad' }, { status: 500 });
	}
}
