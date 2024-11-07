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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');
	const languageId = parseInt(searchParams.get('languageId') || '1'); // Podrazumevano je 1 ako nije prosleđeno

	if (!id || !type) {
		return NextResponse.json({ error: 'Missing id or type parameter' }, { status: 400 });
	}

	try {
		let location;

		// Dinamički tražimo entitet na osnovu `type` parametra
		if (type === 'country') {
			location = await prisma.country.findUnique({
				where: { id: Number(id) },
				select: {
					id: true,
					icon: true, // Dodato za vraćanje svih podataka o ikoni
					label: {
						select: {
							translations: {
								where: { languageId },
								select: { translation: true },
							},
						},
					},
				},
			});
		} else if (type === 'city') {
			location = await prisma.city.findUnique({
				where: { id: Number(id) },
				select: {
					id: true,
					icon: true, // Dodato za vraćanje svih podataka o ikoni
					label: {
						select: {
							translations: {
								where: { languageId },
								select: { translation: true },
							},
						},
					},
				},
			});
		} else if (type === 'cityPart') {
			location = await prisma.cityPart.findUnique({
				where: { id: Number(id) },
				select: {
					id: true,
					icon: true, // Dodato za vraćanje svih podataka o ikoni
					label: {
						select: {
							translations: {
								where: { languageId },
								select: { translation: true },
							},
						},
					},
				},
			});
		} else if (type === 'marketplace') {
			location = await prisma.marketplace.findUnique({
				where: { id: Number(id) },
				select: {
					id: true,
					icon: true, // Dodato za vraćanje svih podataka o ikoni
					label: {
						select: {
							translations: {
								where: { languageId },
								select: { translation: true },
							},
						},
					},
				},
			});
		} else {
			return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
		}

		if (!location || !location.label.translations[0]) {
			return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
		}

		// Ekstrakcija id-a, imena (prevoda), i podataka o ikoni
		const response = {
			id: location.id,
			name: location.label.translations[0].translation || 'Nedefinisano ime',
			icon: location.icon || null, // Vraća sve podatke o ikoni, ili `null` ako ikona ne postoji
		};

		// Vraćamo `id`, `name`, i `icon`
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching location by ID and language ID:', error);
		return NextResponse.json({ error: 'Failed to fetch location' }, { status: 500 });
	}
}
