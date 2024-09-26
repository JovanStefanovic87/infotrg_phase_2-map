// app\api\locations\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import moment from 'moment-timezone';

// POST: Create a new location
export async function POST(req: Request) {
	try {
		const { countryId, cityId, labelId, type, iconId } = await req.json();
		console.log('Received parentId:', countryId); // Debugging to check the incoming value
		console.log('Received cityId:', cityId); // Debugging to check the incoming value

		// Validation
		if (!labelId) {
			return NextResponse.json({ error: 'Label ID is missing' }, { status: 400 });
		}

		let locationData;

		// Handle the creation of a country
		if (type === 'country') {
			locationData = await prisma.country.create({
				data: {
					labelId,
					iconId,
					createdAt: new Date(),
				},
			});
		}

		// Handle the creation of a city (requires parentId to be countryId)
		else if (type === 'city') {
			if (!countryId) {
				return NextResponse.json(
					{ error: 'Parent country ID is required for creating a city.' },
					{ status: 400 }
				);
			}

			const country = await prisma.country.findUnique({ where: { id: countryId } });
			if (!country) throw new Error(`Parent country with id ${countryId} not found`);

			locationData = await prisma.city.create({
				data: {
					labelId,
					countryId: countryId, // Use countryId as countryId
					iconId,
					createdAt: new Date(),
				},
			});
		}

		// Handle the creation of a city part (requires cityId to be cityId)
		else if (type === 'cityPart') {
			if (!cityId) {
				return NextResponse.json(
					{ error: 'Parent city ID is required for creating a city part.' },
					{ status: 400 }
				);
			}

			const city = await prisma.city.findUnique({ where: { id: cityId } });
			if (!city) throw new Error(`Parent city with id ${cityId} not found`);

			locationData = await prisma.cityPart.create({
				data: {
					labelId,
					cityId: cityId, // Use cityId as cityId
					iconId,
					createdAt: new Date(),
				},
			});
		}

		return NextResponse.json(locationData);
	} catch (error) {
		console.error('Error creating location:', (error as Error).message);
		return NextResponse.json(
			{ error: (error as Error).message || 'Failed to create location' },
			{ status: 500 }
		);
	}
}

// GET: Retrieve all locations (countries, cities, or city parts) with their translations
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');
	const prefix = searchParams.get('prefix');
	const languageId = 1; // Currently active language is hardcoded to 1

	try {
		let locations: any[] = [];

		if (type === 'country') {
			locations = await prisma.country.findMany({
				where: {
					label: {
						name: {
							startsWith: prefix ? `${prefix}_` : '',
						},
					},
				},
				include: {
					label: {
						include: {
							translations: {
								where: {
									languageId, // Filter by the active language
								},
							},
						},
					},
				},
			});
		}

		// Remove the prefix from label names and replace with the active language translation
		locations = locations.map(location => ({
			...location,
			label: {
				...location.label,
				name: location.label.translations[0]?.translation || location.label.name, // Use the translation if available, else fallback to label name
			},
		}));

		return NextResponse.json(locations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
