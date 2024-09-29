import { prisma } from '@/app/lib/prisma';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params; // Fetching id from the path
	const { searchParams } = new URL(req.url); // Fetching type from query params
	const type = searchParams.get('type'); // Get the type from the query params

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
		const { iconId } = data; // We are concerned with updating the iconId here

		if (!iconId) {
			return Response.json({ error: 'Missing iconId' }, { status: 400 });
		}

		let updatedLocation;

		// Update based on location type (country, city, cityPart)
		if (type === 'country') {
			updatedLocation = await prisma.country.update({
				where: { id: Number(id) },
				data: {
					icon: { connect: { id: iconId } }, // Ensure the icon connection is always updated
				},
			});
		} else if (type === 'city') {
			updatedLocation = await prisma.city.update({
				where: { id: Number(id) },
				data: {
					icon: { connect: { id: iconId } }, // Ensure the icon connection is always updated
				},
			});
		} else if (type === 'cityPart') {
			updatedLocation = await prisma.cityPart.update({
				where: { id: Number(id) },
				data: {
					icon: { connect: { id: iconId } }, // Ensure the icon connection is always updated
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
