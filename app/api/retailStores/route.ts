// /app/api/retailStores/route.ts

import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			name,
			stateId,
			countyId,
			cityId,
			suburbId,
			phoneNumber,
			email,
			website,
			viewCount,
			isPhoneConfirmed,
			isEmailConfirmed,
			coordinates,
			articleCategoryIds,
			activityCategoryIds,
			objectTypeCategoryIds,
			address,
		} = body;

		const validateCategories = async (categoryIds: number[], categoryType: string) => {
			const categories = await prisma.category.findMany({
				where: { id: { in: categoryIds } },
			});
			if (categories.length !== categoryIds.length) {
				throw new Error(`Jedna ili više kategorija za ${categoryType} nisu pronađene`);
			}
			return categories;
		};

		const articleCategories = await validateCategories(articleCategoryIds, 'artikle');
		const activityCategories = await validateCategories(activityCategoryIds, 'aktivnosti');
		const objectTypeCategories = await validateCategories(objectTypeCategoryIds, 'tipove objekata');

		// Validacija za koordinate
		if (coordinates) {
			if (!coordinates.latitude || !coordinates.longitude) {
				return NextResponse.json(
					{ error: 'Latitude i longitude moraju biti unešeni.' },
					{ status: 400 }
				);
			}
		}

		// Kreiranje zapisa za koordinate ako postoje
		const coordinatesRecord = coordinates
			? await prisma.coordinates.create({
					data: {
						latitude: coordinates.latitude,
						longitude: coordinates.longitude,
						locationDescription: coordinates.locationDescription,
					},
			  })
			: undefined;

		// Kreiranje novog prodajnog objekta
		const retailStore = await prisma.retailStore.create({
			data: {
				name,
				state: { connect: { id: stateId } },
				county: countyId ? { connect: { id: countyId } } : undefined,
				city: cityId ? { connect: { id: cityId } } : undefined,
				suburb: suburbId ? { connect: { id: suburbId } } : undefined,
				phoneNumber,
				email,
				website,
				viewCount,
				isPhoneConfirmed,
				isEmailConfirmed,
				coordinates: coordinatesRecord ? { connect: { id: coordinatesRecord.id } } : undefined,
				articleCategories: { connect: articleCategories.map(({ id }) => ({ id })) },
				activityCategories: { connect: activityCategories.map(({ id }) => ({ id })) },
				objectTypeCategories: { connect: objectTypeCategories.map(({ id }) => ({ id })) },
				address,
			},
		});

		return NextResponse.json(retailStore, { status: 201 });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Došlo je do greške na serveru';
		console.error('Greška na serveru:', error);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const languageId = parseInt(searchParams.get('languageId') ?? '1');

	try {
		const retailStores = await prisma.retailStore.findMany({
			include: {
				state: {
					include: {
						label: {
							include: {
								translations: {
									where: {
										languageId: languageId,
									},
								},
							},
						},
					},
				},
				county: {
					include: {
						label: {
							include: {
								translations: {
									where: {
										languageId: languageId,
									},
								},
							},
						},
					},
				},
				city: {
					include: {
						label: {
							include: {
								translations: {
									where: {
										languageId: languageId,
									},
								},
							},
						},
					},
				},
				suburb: {
					include: {
						label: {
							include: {
								translations: {
									where: {
										languageId: languageId,
									},
								},
							},
						},
					},
				},
				coordinates: {
					select: {
						latitude: true,
						longitude: true,
						locationDescription: true,
					},
				},
				articleCategories: {
					include: { label: { include: { translations: { where: { languageId } } } } },
				},
				activityCategories: {
					include: { label: { include: { translations: { where: { languageId } } } } },
				},
				objectTypeCategories: {
					include: { label: { include: { translations: { where: { languageId } } } } },
				},
			},
		});

		return NextResponse.json(retailStores);
	} catch (error) {
		console.error('Error fetching retail stores:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
