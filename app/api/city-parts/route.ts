// /app/api/city-parts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// GET: Retrieve all city parts with labels, translations, and associated cities
export const GET = async () => {
	try {
		const cityParts = await prisma.cityPart.findMany({
			include: {
				label: {
					include: {
						translations: true,
					},
				},
				city: {
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
		return NextResponse.json(cityParts);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch city parts' }, { status: 500 });
	}
};

// POST: Create a new city part with associated label and translations
export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json(); // Read the body once
		const { labelName, cityId, postCode, translationData } = body; // Use the parsed body

		console.log('Incoming request body:', body);

		const { name } = labelName;

		const newCityPart = await prisma.$transaction(async prisma => {
			const newLabel = await prisma.label.create({
				data: {
					name: name,
					translations: {
						create: translationData
							? translationData.map((t: any) => ({
									language: {
										connect: { id: t.languageId },
									},
									translation: t.translation,
									description: t.description || null,
							  }))
							: [],
					},
				},
			});

			return await prisma.cityPart.create({
				data: {
					labelId: newLabel.id,
					cityId: cityId,
					postCode: postCode || null,
				},
				include: {
					label: {
						include: {
							translations: true,
						},
					},
					city: true,
				},
			});
		});

		return NextResponse.json(newCityPart);
	} catch (error) {
		console.error('Error creating city part:', error);
		return NextResponse.json({ error: 'Failed to create city part' }, { status: 500 });
	}
};
