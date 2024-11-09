// app\api\locations\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import moment from 'moment-timezone';
import { Translation, County } from '@/utils/helpers/types';

// POST: Create a new location
export async function POST(req: Request) {
	try {
		const { stateId, countyId, labelId, type, iconId, postCode, cityId, address } =
			await req.json();

		// Validation
		if (!labelId) {
			return NextResponse.json({ error: 'Label ID is missing' }, { status: 400 });
		}

		let locationData;

		// Handle the creation of a state
		if (type === 'state') {
			locationData = await prisma.state.create({
				data: {
					labelId,
					iconId,
					createdAt: new Date(),
				},
			});
		}
		// Handle the creation of a county (requires stateId)
		else if (type === 'county') {
			if (!stateId) {
				return NextResponse.json(
					{ error: 'Parent state ID is required for creating a county.' },
					{ status: 400 }
				);
			}

			const state = await prisma.state.findUnique({ where: { id: stateId } });
			if (!state) {
				return NextResponse.json(
					{ error: `Parent state with id ${stateId} not found.` },
					{ status: 404 }
				);
			}

			locationData = await prisma.county.create({
				data: {
					labelId,
					stateId,
					postCode,
					iconId,
					createdAt: new Date(),
				},
			});
		}
		// Handle the creation of a city (requires countyId)
		else if (type === 'city') {
			if (!countyId) {
				return NextResponse.json(
					{ error: 'Parent county ID is required for creating a city.' },
					{ status: 400 }
				);
			}

			const county = await prisma.county.findUnique({ where: { id: countyId } });
			if (!county) {
				return NextResponse.json(
					{ error: `Parent county with id ${countyId} not found.` },
					{ status: 404 }
				);
			}

			locationData = await prisma.city.create({
				data: {
					labelId,
					countyId,
					postCode,
					iconId,
					createdAt: new Date(),
				},
			});
		}
		// Handle the creation of a suburb (requires cityId)
		else if (type === 'suburb') {
			if (!cityId) {
				return NextResponse.json(
					{ error: 'Parent city ID is required for creating a suburb.' },
					{ status: 400 }
				);
			}

			const city = await prisma.city.findUnique({ where: { id: cityId } });
			if (!city) {
				return NextResponse.json(
					{ error: `Parent city with id ${cityId} not found.` },
					{ status: 404 }
				);
			}

			locationData = await prisma.suburb.create({
				data: {
					labelId,
					cityId,
					name: address,
					iconId,
					createdAt: new Date(),
				},
			});
		} else {
			return NextResponse.json({ error: 'Invalid type parameter.' }, { status: 400 });
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

// GET: Retrieve all locations
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const prefix = searchParams.get('prefix');
	const languageId = parseInt(searchParams.get('languageId') || '1');

	try {
		let locations: any[] = [];

		// Fetch all states
		locations = await prisma.state.findMany({
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
				counties: {
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
								suburbs: {
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
			type: 'state',
			counties: location.counties.map((county: County) => ({
				...county,
				label: {
					...county.label,
					name:
						filterTranslationsByLanguage(county.label.translations, languageId)?.translation ||
						county.label.name,
				},
				type: 'county',
				cities: county.cities.map(city => ({
					...city,
					label: {
						...city.label,
						name:
							filterTranslationsByLanguage(city.label.translations, languageId)?.translation ||
							city.label.name,
					},
					type: 'city',
					suburbs: city.suburbs.map(suburb => ({
						...suburb,
						label: {
							...suburb.label,
							name:
								filterTranslationsByLanguage(suburb.label.translations, languageId)?.translation ||
								suburb.label.name,
						},
						type: 'suburb',
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
