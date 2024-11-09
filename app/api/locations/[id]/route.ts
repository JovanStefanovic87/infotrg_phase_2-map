//app\api\locations\[id]\route.ts
import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');

	if (!id || !type) {
		return NextResponse.json({ error: 'Missing id or type parameter' }, { status: 400 });
	}

	try {
		let deletedLocation;

		if (type === 'state') {
			const existingState = await prisma.state.findUnique({ where: { id: Number(id) } });
			if (!existingState) {
				return NextResponse.json({ error: `State with id ${id} not found` }, { status: 404 });
			}
			deletedLocation = await prisma.state.delete({
				where: { id: Number(id) },
			});
		} else if (type === 'county') {
			const existingCounty = await prisma.county.findUnique({ where: { id: Number(id) } });
			if (!existingCounty) {
				return NextResponse.json({ error: `County with id ${id} not found` }, { status: 404 });
			}
			deletedLocation = await prisma.county.delete({
				where: { id: Number(id) },
			});
		} else if (type === 'city') {
			const existingCity = await prisma.city.findUnique({ where: { id: Number(id) } });
			if (!existingCity) {
				return NextResponse.json({ error: `City with id ${id} not found` }, { status: 404 });
			}
			deletedLocation = await prisma.city.delete({
				where: { id: Number(id) },
			});
		} else if (type === 'suburb') {
			const existingSuburb = await prisma.suburb.findUnique({ where: { id: Number(id) } });
			if (!existingSuburb) {
				return NextResponse.json({ error: `Suburb with id ${id} not found` }, { status: 404 });
			}
			deletedLocation = await prisma.suburb.delete({
				where: { id: Number(id) },
			});
		} else {
			return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
		}

		return NextResponse.json({ message: 'Location deleted successfully', deletedLocation });
	} catch (error) {
		console.error('Error deleting location:', error);
		return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 });
	}
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');

	if (!id || !type) {
		return NextResponse.json({ error: 'Missing id or type parameter' }, { status: 400 });
	}

	try {
		const data = await req.json();
		const { iconId, postCode, address } = data;

		let updatedLocation;

		if (type === 'state') {
			const existingState = await prisma.state.findUnique({
				where: { id: Number(id) },
			});

			if (!existingState) {
				return NextResponse.json({ error: `State with id ${id} not found` }, { status: 404 });
			}

			updatedLocation = await prisma.state.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
				},
			});
		} else if (type === 'county') {
			const existingCounty = await prisma.county.findUnique({
				where: { id: Number(id) },
			});

			if (!existingCounty) {
				return NextResponse.json({ error: `County with id ${id} not found` }, { status: 404 });
			}

			updatedLocation = await prisma.county.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
					postCode: postCode || undefined,
				},
			});
		} else if (type === 'city') {
			const existingCity = await prisma.city.findUnique({
				where: { id: Number(id) },
			});

			if (!existingCity) {
				return NextResponse.json({ error: `City with id ${id} not found` }, { status: 404 });
			}

			updatedLocation = await prisma.city.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
					postCode: postCode || undefined,
				},
			});
		} else if (type === 'suburb') {
			const existingSuburb = await prisma.suburb.findUnique({
				where: { id: Number(id) },
			});

			if (!existingSuburb) {
				return NextResponse.json({ error: `Suburb with id ${id} not found` }, { status: 404 });
			}

			updatedLocation = await prisma.suburb.update({
				where: { id: Number(id) },
				data: {
					iconId: iconId,
				},
			});
		} else {
			return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
		}

		return NextResponse.json({ message: 'Location updated successfully', updatedLocation });
	} catch (error) {
		console.error('Error updating location:', error);
		return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
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
		if (type === 'state') {
			location = await prisma.state.findUnique({
				where: { id: Number(id) },
				select: {
					id: true,
					icon: true,
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
		} else if (type === 'county') {
			location = await prisma.county.findUnique({
				where: { id: Number(id) },
				select: {
					id: true,
					icon: true,
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
					icon: true,
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
		} else if (type === 'suburb') {
			location = await prisma.suburb.findUnique({
				where: { id: Number(id) },
				select: {
					id: true,
					icon: true,
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

		const response = {
			id: location.id,
			name: location.label.translations[0].translation || 'Nedefinisano ime',
			icon: location.icon || null,
		};

		// Vraćamo `id`, `name`, i `icon`
		return NextResponse.json(response);
	} catch (error) {
		console.error('Error fetching location by ID and language ID:', error);
		return NextResponse.json({ error: 'Failed to fetch location' }, { status: 500 });
	}
}
