// /app/api/filteredRetailStores/route.ts

import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const categoryId = searchParams.get('categoryId');
	const countryId = searchParams.get('countryId');
	const cityId = searchParams.get('cityId');
	const cityPartId = searchParams.get('cityPartId');
	const marketplaceId = searchParams.get('marketplaceId');
	const languageId = parseInt(searchParams.get('languageId') ?? '1');

	// Dinamički kreiramo where objekat na osnovu prosleđenih parametara
	const where: any = {};

	if (categoryId) {
		where.OR = [
			{ articleCategories: { some: { id: parseInt(categoryId) } } },
			{ activityCategories: { some: { id: parseInt(categoryId) } } },
			{ objectTypeCategories: { some: { id: parseInt(categoryId) } } },
		];
	}
	if (countryId) {
		where.countryId = parseInt(countryId);
	}
	if (cityId) {
		where.cityId = parseInt(cityId);
	}
	if (cityPartId) {
		where.cityPartId = parseInt(cityPartId);
	}
	if (marketplaceId && marketplaceId !== '0') {
		where.marketplaceId = parseInt(marketplaceId);
	}

	try {
		const retailStores = await prisma.retailStore.findMany({
			where,
			include: {
				country: {
					include: {
						label: {
							include: {
								translations: {
									where: { languageId },
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
									where: { languageId },
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
									where: { languageId },
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
									where: { languageId },
								},
							},
						},
					},
				},
				coordinates: {
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
									where: { languageId },
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
									where: { languageId },
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
									where: { languageId },
								},
							},
						},
					},
				},
			},
		});

		return NextResponse.json(retailStores);
	} catch (error) {
		console.error('Error fetching filtered retail stores:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
