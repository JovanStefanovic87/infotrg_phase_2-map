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
					cityPartId: newLocation.cityPartId,
					marketplaceId: newLocation.marketplaceId,
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

		// Try creating the retail store without categories to isolate the problem
		const retailStore = await prisma.retailStore.create({
			data: {
				name,
				location: location
					? { connect: { id: location.id } }
					: {
							create: {
								countryId: newLocation.countryId,
								cityId: newLocation.cityId,
								cityPartId: newLocation.cityPartId,
								marketplaceId: newLocation.marketplaceId,
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
		console.error('Server error:', error); // Logovanje detaljne greške
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const languageId = parseInt(searchParams.get('languageId') ?? '1'); // Default to 1 if not provided

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
												languageId: 1,
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
												languageId: 1,
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
												languageId: 1,
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
												languageId: 1,
											},
										},
									},
								},
							},
						},
					},
				},
				articleCategories: {
					include: {
						label: {
							include: {
								translations: {
									where: {
										languageId: 1,
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
										languageId: 1,
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
										languageId: 1,
									},
								},
							},
						},
					},
				},
			},
		});

		console.log(JSON.stringify(retailStores, null, 2));

		return NextResponse.json(retailStores);
	} catch (error) {
		console.error('Error fetching retail stores:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
