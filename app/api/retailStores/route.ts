// /app/api/retailStores/route.ts

import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			name,
			locationId,
			newLocation,
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

		// Proverite da li svi ID-ovi kategorija postoje u bazi
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

		// Handle location creation or selection
		let location;
		if (locationId) {
			location = await prisma.location.findUnique({ where: { id: locationId } });
			if (!location) {
				return NextResponse.json({ error: 'Location not found' }, { status: 400 });
			}
		} else if (newLocation) {
			location = await prisma.location.create({
				data: {
					countryId: newLocation.countryId,
					cityId: newLocation.cityId,
					// Uslovno dodavanje cityPartId ako postoji
					...(newLocation.cityPartId && { cityPartId: newLocation.cityPartId }),
					// Uslovno dodavanje marketplaceId ako postoji
					...(newLocation.marketplaceId && { marketplaceId: newLocation.marketplaceId }),
					address: newLocation.address,
				},
			});
		}

		const coordinatesRecord = coordinates
			? await prisma.coordinates.create({
					data: {
						latitude: coordinates.latitude,
						longitude: coordinates.longitude,
						locationDescription: coordinates.locationDescription,
					},
			  })
			: undefined;

		const retailStore = await prisma.retailStore.create({
			data: {
				name,
				location: location
					? { connect: { id: location.id } }
					: {
							create: {
								countryId: newLocation.countryId,
								cityId: newLocation.cityId,
								...(newLocation.cityPartId && { cityPartId: newLocation.cityPartId }),
								...(newLocation.marketplaceId && { marketplaceId: newLocation.marketplaceId }),
								address: newLocation.address,
							},
					  },
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
				location: {
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
