// app\api\locations\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import moment from 'moment-timezone';
import { Translation, County } from '@/utils/helpers/types';

// POST: Create a new location
async function createLocationByType(type: string, data: any) {
	switch (type) {
		case 'state':
			return await prisma.state.create({ data });
		case 'county':
			return await prisma.county.create({ data });
		case 'city':
			return await prisma.city.create({ data });
		case 'suburb':
			return await prisma.suburb.create({ data });
		default:
			throw new Error('Nevažeći tip lokacije');
	}
}

async function validateParent(type: string, parentId: number | undefined) {
	if (!parentId) {
		const missingParentMsg = {
			county: 'ID države je obavezan za kreiranje okruga.',
			city: 'ID okruga je obavezan za kreiranje grada.',
			suburb: 'ID grada je obavezan za kreiranje predgrađa.',
		};
		throw new Error(
			missingParentMsg[type as keyof typeof missingParentMsg] || 'Nedostaje roditeljski ID.'
		);
	}

	const parentCheck = {
		county: async () => await prisma.state.findUnique({ where: { id: parentId } }),
		city: async () => await prisma.county.findUnique({ where: { id: parentId } }),
		suburb: async () => await prisma.city.findUnique({ where: { id: parentId } }),
	}[type];

	if (parentCheck) {
		const parent = await parentCheck();
		if (!parent) {
			throw new Error(`Nadredjena lokacija sa ID-jem ${parentId} nije pronađena.`);
		}
	}
}

export async function POST(req: Request) {
	try {
		const { stateId, countyId, labelId, type, iconId, postCode, cityId, address } =
			await req.json();

		// Validacija
		if (!labelId) {
			return NextResponse.json({ error: 'Nedostaje ID oznake (labelId).' }, { status: 400 });
		}
		if (!type) {
			return NextResponse.json({ error: 'Nedostaje tip lokacije.' }, { status: 400 });
		}

		let locationData: any = { labelId, iconId, postCode, createdAt: new Date() };

		// Validacija nadređenog ID-a, zavisno od tipa
		if (type === 'county') {
			await validateParent(type, stateId);
			locationData.stateId = stateId;
		} else if (type === 'city') {
			await validateParent(type, countyId);
			locationData.countyId = countyId;
		} else if (type === 'suburb') {
			await validateParent(type, cityId);
			locationData.cityId = cityId;
			locationData.name = address;
		} else if (type !== 'state') {
			return NextResponse.json({ error: 'Nevažeći tip lokacije.' }, { status: 400 });
		}

		// Kreiramo lokaciju na osnovu tipa
		const createdLocation = await createLocationByType(type, locationData);

		return NextResponse.json({ message: 'Lokacija uspešno kreirana.', data: createdLocation });
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Greška prilikom kreiranja lokacije:`, error.message);
			return NextResponse.json({ error: error.message }, { status: 400 });
		} else {
			console.error(`Neočekivana greška: ${error}`);
			return NextResponse.json({ error: 'Došlo je do neočekivane greške.' }, { status: 500 });
		}
	}
}

// GET: Retrieve all locations
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const prefix = searchParams.get('prefix');
	const languageId = parseInt(searchParams.get('languageId') || '1');

	try {
		let locations: any[] = [];

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

		const filterTranslationsByLanguage = (translations: Translation[], languageId: number) => {
			const translation = translations.find(t => t.languageId === languageId);
			return translation
				? translation.translation
				: translations[0]?.translation || 'Nedefinisano ime';
		};

		const filteredLocations = locations.map(location => ({
			...location,
			label: {
				...location.label,
				name: filterTranslationsByLanguage(location.label.translations, languageId),
			},
			type: 'state',
			counties: location.counties.map((county: County) => ({
				...county,
				label: {
					...county.label,
					name: filterTranslationsByLanguage(county.label.translations, languageId),
				},
				type: 'county',
				cities: county.cities.map(city => ({
					...city,
					label: {
						...city.label,
						name: filterTranslationsByLanguage(city.label.translations, languageId),
					},
					type: 'city',
					suburbs: city.suburbs.map(suburb => ({
						...suburb,
						label: {
							...suburb.label,
							name: filterTranslationsByLanguage(suburb.label.translations, languageId),
						},
						type: 'suburb',
					})),
				})),
			})),
		}));

		return NextResponse.json(filteredLocations);
	} catch (error) {
		console.error('Greška prilikom dohvatanja lokacija:', error);
		return NextResponse.json(
			{ error: 'Došlo je do greške prilikom dohvatanja lokacija. Molimo pokušajte ponovo.' },
			{ status: 500 }
		);
	}
}
