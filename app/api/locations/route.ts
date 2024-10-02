// app\api\locations\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import moment from 'moment-timezone';
import { Translation, City } from '@/utils/helpers/types';

// POST: Create a new location
export async function POST(req: Request) {
	try {
		const { countryId, cityId, labelId, type, iconId, postCode, cityPartId, address } =
			await req.json();
		console.log('cityPartId:', cityPartId);
		console.log('address:', address);
		console.log('labelId:', labelId);
		console.log('type:', type);
		console.log('iconId:', iconId);
		console.log('postCode:', postCode);
		console.log('countryId:', countryId);
		console.log('cityId:', cityId);

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
					postCode, // Add postal code for city part creation
					iconId,
					createdAt: new Date(),
				},
			});
		}
		// Handle the creation of a marketplace
		else if (type === 'marketplace') {
			if (!cityPartId || !address || !labelId) {
				return NextResponse.json(
					{ error: 'CityPart ID, address, and label ID are required for creating a marketplace.' },
					{ status: 400 }
				);
			}

			const cityPart = await prisma.cityPart.findUnique({ where: { id: cityPartId } });
			if (!cityPart) throw new Error(`Parent city part with id ${cityPartId} not found`);

			locationData = await prisma.marketplace.create({
				data: {
					labelId, // Add the labelId for the marketplace
					cityPartId, // Use cityPartId for the marketplace
					name: address, // Set name to address or provide a separate name if needed
					address, // Include address for the marketplace
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

// GET: Retrieve all locations (countries, cities, city parts, and marketplaces) with their translations
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const prefix = searchParams.get('prefix');
	const languageId = parseInt(searchParams.get('languageId') || '1'); // Dodajemo languageId iz query parametara

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
						icon: true,
						cityParts: {
							include: {
								label: {
									include: {
										translations: true,
									},
								},
								icon: true,
								marketplaces: {
									include: {
										label: {
											include: {
												translations: true,
											},
										},
										icon: true,
									},
								},
							},
						},
					},
				},
			},
		});

		// Filtriranje prevoda po languageId za svaku lokaciju, grad, deo grada i pijacu
		const filterTranslationsByLanguage = (translations: Translation[], languageId: number) => {
			return translations.find(t => t.languageId === languageId) || translations[0];
		};

		// Mapiramo lokacije i filtriramo prevode
		const filteredLocations = locations.map(location => ({
			...location,
			label: {
				...location.label,
				name:
					filterTranslationsByLanguage(location.label.translations, languageId)?.translation ||
					location.label.name,
			},
			type: 'country',
			cities: location.cities.map((city: City) => ({
				...city,
				label: {
					...city.label,
					name:
						filterTranslationsByLanguage(city.label.translations, languageId)?.translation ||
						city.label.name,
				},
				type: 'city',
				cityParts: city.cityParts.map(part => ({
					...part,
					label: {
						...part.label,
						name:
							filterTranslationsByLanguage(part.label.translations, languageId)?.translation ||
							part.label.name,
					},
					type: 'cityPart',
					marketplaces: part.marketplaces.map(marketplace => ({
						...marketplace,
						label: {
							...marketplace.label,
							name:
								filterTranslationsByLanguage(marketplace.label.translations, languageId)
									?.translation || marketplace.label.name,
						},
						type: 'marketplace',
					})),
				})),
			})),
		}));

		return NextResponse.json(filteredLocations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
