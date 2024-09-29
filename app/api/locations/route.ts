// app\api\locations\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import moment from 'moment-timezone';

interface Translation {
	translation: string;
}

interface Label {
	name: string;
	translations: Translation[];
}

interface Part {
	label: Label;
	postCode?: string;
}

interface City {
	label: Label;
	parts: Part[];
	postCode?: string;
}

interface Country {
	label: Label;
	cities: City[];
}

type Location = Country | City | Part;

// POST: Create a new location
export async function POST(req: Request) {
	try {
		const { countryId, cityId, labelId, type, iconId, postCode } = await req.json();

		// Validation
		if (!labelId) {
			return NextResponse.json({ error: 'Label ID is missing' }, { status: 400 });
		}

		console.log('postCode:', postCode);

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

		// Handle the creation of a city (requires countryId)
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
					countryId, // Use countryId for the city
					postCode, // Add postal code for city creation
					iconId,
					createdAt: new Date(),
				},
			});
		}

		// Handle the creation of a city part (requires cityId)
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
					cityId, // Use cityId for the city part
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
	const prefix = searchParams.get('prefix');
	const languageId = searchParams.get('languageId') ? Number(searchParams.get('languageId')) : null;

	try {
		let locations: any[] = [];

		// Fetch all countries
		locations = await prisma.country.findMany({
			where: {
				label: {
					name: {
						startsWith: prefix ? `${prefix}` : '',
					},
				},
			},
			include: {
				label: {
					include: {
						translations: true,
					},
				},
				icon: true,
				cities: {
					include: {
						label: {
							include: {
								translations: true,
							},
						},
						// No need for postCode: true here, postCode will be fetched automatically
						icon: true,
						parts: {
							include: {
								label: {
									include: {
										translations: true,
									},
								},
								// No need for postCode: true here, postCode will be fetched automatically
								icon: true,
							},
						},
					},
				},
			},
		});

		// Add 'type' to each location
		locations = locations.map((location: any) => {
			const countryWithCities = {
				...location,
				type: 'country',
				cities: location.cities.map((city: any) => ({
					...city,
					type: 'city',
					parts: city.parts.map((part: any) => ({
						...part,
						type: 'cityPart',
					})),
				})),
			};

			return countryWithCities;
		});

		return NextResponse.json(locations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
