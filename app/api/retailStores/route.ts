// /app/api/retailStores/route.ts

import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			name,
			countryId,
			cityId,
			cityPartId,
			marketplaceId,
			phoneNumber,
			email,
			website,
			viewCount,
			isSubscribedForAds,
			adType,
			isPhoneConfirmed,
			isEmailConfirmed,
			coordinates,
			articleCategoryIds,
			activityCategoryIds,
			objectTypeCategoryIds,
		} = body;

		// Validate categories
		const articleCategories = await prisma.category.findMany({
			where: { id: { in: articleCategoryIds } },
		});
		if (articleCategories.length !== articleCategoryIds.length) {
			return NextResponse.json(
				{ error: 'One or more article categories not found' },
				{ status: 400 }
			);
		}

		const activityCategories = await prisma.category.findMany({
			where: { id: { in: activityCategoryIds } },
		});
		if (activityCategories.length !== activityCategoryIds.length) {
			return NextResponse.json(
				{ error: 'One or more activity categories not found' },
				{ status: 400 }
			);
		}

		const objectTypeCategories = await prisma.category.findMany({
			where: { id: { in: objectTypeCategoryIds } },
		});
		if (objectTypeCategories.length !== objectTypeCategoryIds.length) {
			return NextResponse.json(
				{ error: 'One or more object type categories not found' },
				{ status: 400 }
			);
		}

		// Kreiraj koordinate ako postoje
		const coordinatesRecord = coordinates
			? await prisma.coordinates.create({
					data: {
						latitude: coordinates.latitude,
						longitude: coordinates.longitude,
						locationDescription: coordinates.locationDescription,
					},
			  })
			: undefined;

		// Kreiraj retail store sa direktnim vezama ka country, city, itd.
		const retailStore = await prisma.retailStore.create({
			data: {
				name,
				country: {
					connect: { id: countryId },
				},
				city: {
					connect: { id: cityId },
				},
				cityPart: cityPartId ? { connect: { id: cityPartId } } : undefined,
				marketplace: marketplaceId ? { connect: { id: marketplaceId } } : undefined,
				phoneNumber,
				email,
				website,
				viewCount,
				isSubscribedForAds,
				adType,
				isPhoneConfirmed,
				isEmailConfirmed,
				coordinates: coordinatesRecord ? { connect: { id: coordinatesRecord.id } } : undefined,
				articleCategories: { connect: articleCategories.map(category => ({ id: category.id })) },
				activityCategories: { connect: activityCategories.map(category => ({ id: category.id })) },
				objectTypeCategories: {
					connect: objectTypeCategories.map(category => ({ id: category.id })),
				},
			},
		});

		return NextResponse.json(retailStore, { status: 201 });
	} catch (error) {
		console.error('Server error:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const languageId = parseInt(searchParams.get('languageId') ?? '1');

	try {
		const retailStores = await prisma.retailStore.findMany({
			include: {
				country: {
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
				cityPart: {
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
				marketplace: {
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
					// Uključi koordinate da dobiješ latitude i longitude
					select: {
						latitude: true,
						longitude: true,
					},
				},
				articleCategories: {
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
				activityCategories: {
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
				objectTypeCategories: {
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
			},
		});

		return NextResponse.json(retailStores);
	} catch (error) {
		console.error('Error fetching retail stores:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
