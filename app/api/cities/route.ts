// /app/api/cities/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export const GET = async () => {
	try {
		const cities = await prisma.city.findMany({
			include: {
				label: {
					include: {
						translations: true,
					},
				},
				country: {
					include: {
						label: {
							include: {
								translations: true,
							},
						},
					},
				},
				parts: {
					include: {
						label: {
							include: {
								translations: true,
							},
						},
					},
				},
			},
		});
		return NextResponse.json(cities);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
	}
};

// POST request for creating a city
export const POST = async (req: NextRequest) => {
	try {
		const { labelId, countryId, postCode } = await req.json();

		const newCity = await prisma.city.create({
			data: {
				labelId,
				countryId,
				postCode: postCode || null,
			},
			include: {
				label: {
					include: {
						translations: true,
					},
				},
				country: true,
			},
		});

		return NextResponse.json(newCity);
	} catch (error) {
		console.error('Error creating city:', error); // Log the error for debugging
		return NextResponse.json({ error: 'Failed to create city' }, { status: 500 });
	}
};
