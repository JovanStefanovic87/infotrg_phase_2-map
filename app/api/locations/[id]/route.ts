import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');

	if (!id || !type) {
		return Response.json({ error: 'Missing id or type parameter' }, { status: 400 });
	}

	try {
		let deletedLocation;

		if (type === 'country') {
			deletedLocation = await prisma.country.delete({
				where: { id: Number(id) },
			});
		} else if (type === 'city') {
			deletedLocation = await prisma.city.delete({
				where: { id: Number(id) },
			});
		} else if (type === 'cityPart') {
			deletedLocation = await prisma.cityPart.delete({
				where: { id: Number(id) },
			});
		} else if (type === 'marketplace') {
			deletedLocation = await prisma.marketplace.delete({
				where: { id: Number(id) },
			});
		} else {
			return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
		}

		return Response.json({ message: 'Location deleted successfully', deletedLocation });
	} catch (error) {
		console.error('Error deleting location:', error);
		return Response.json({ error: 'Failed to delete location' }, { status: 500 });
	}
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');

	if (!id || !type) {
		return Response.json({ error: 'Missing id or type parameter' }, { status: 400 });
	}

	try {
		const data = await req.json();
		const { iconId, postCode, address } = data;

		let updatedLocation;

		if (type === 'country') {
			updatedLocation = await prisma.country.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
				},
			});
		} else if (type === 'city') {
			updatedLocation = await prisma.city.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
					postCode: postCode || undefined, // Add postCode only if provided
				},
			});
		} else if (type === 'cityPart') {
			updatedLocation = await prisma.cityPart.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
					postCode: postCode || undefined, // Add postCode only if provided
				},
			});
		} else if (type === 'marketplace') {
			updatedLocation = await prisma.marketplace.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
				},
			});
		} else {
			return Response.json({ error: 'Invalid type parameter' }, { status: 400 });
		}

		return Response.json({ message: 'Location updated successfully', updatedLocation });
	} catch (error) {
		console.error('Error updating location:', error);
		return Response.json({ error: 'Failed to update location' }, { status: 500 });
	}
}
