// app\api\locations\route.ts
import { NextResponse } from 'next/server';
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
}

interface City {
	label: Label;
	parts: Part[];
}

interface Country {
	label: Label;
	cities: City[];
}

type Location = Country | City | Part;

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
	const prefix = searchParams.get('prefix'); // Prefiks za filtriranje
	const languageId = searchParams.get('languageId') ? Number(searchParams.get('languageId')) : null; // Dinamički prosleđeni jezik

	console.log('Prefix received:', prefix); // Loguje primljen prefiks
	console.log('Language ID received:', languageId); // Loguje primljen jezik

	try {
		let locations: any[] = [];

		// Prvo, pronalazimo sve države
		locations = await prisma.country.findMany({
			where: {
				label: {
					name: {
						startsWith: prefix ? `${prefix}` : '', // Prefiks je ključan ovde
					},
				},
			},
			include: {
				label: {
					include: {
						translations: true, // Vraća sve prevode, bez obzira na `languageId`
					},
				},
				icon: true, // Fetch the icon for the location
				cities: {
					include: {
						label: {
							include: {
								translations: true, // Vraća sve prevode za gradove
							},
						},
						icon: true, // Fetch the icon for the city
						parts: {
							include: {
								label: {
									include: {
										translations: true, // Vraća sve prevode za delove grada
									},
								},
								icon: true, // Fetch the icon for the city part
							},
						},
					},
				},
			},
		});

		// Formatiramo lokacije, uklanjamo prefiks i postavljamo prevode
		locations = locations.map((location: Location) => {
			// Provera da li je `location` country sa `cities`
			if ('cities' in location) {
				return {
					...location,
					label: {
						...location.label,
						// Koristi prevode za sve jezike, fallback na originalni naziv
						name:
							location.label.translations
								.map((translation: Translation) => translation.translation)
								.join(', ') || location.label.name,
					},
					cities: location.cities.map((city: City) => ({
						...city,
						label: {
							...city.label,
							name:
								city.label.translations
									.map((translation: Translation) => translation.translation)
									.join(', ') || city.label.name,
						},
						parts: city.parts.map((part: Part) => ({
							...part,
							label: {
								...part.label,
								name:
									part.label.translations
										.map((translation: Translation) => translation.translation)
										.join(', ') || part.label.name,
							},
						})),
					})),
				};
			}

			// Ako `location` nema `cities`, vraćamo samo lokaciju
			return {
				...location,
				label: {
					...location.label,
					name:
						location.label.translations
							.map((translation: Translation) => translation.translation)
							.join(', ') || location.label.name,
				},
			};
		});

		return NextResponse.json(locations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
