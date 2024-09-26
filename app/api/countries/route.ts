// /app/api/countries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Translation } from '@/utils/helpers/types';

export const GET = async () => {
	try {
		const countries = await prisma.country.findMany({
			include: {
				label: {
					include: {
						translations: true,
					},
				},
				cities: true,
			},
		});
		return NextResponse.json(countries);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const { labelName, translationData } = await req.json();
		const { name } = labelName;

		console.log('Creating country:', name, translationData);

		const newCountry = await prisma.$transaction(async prisma => {
			const newLabel = await prisma.label.create({
				data: {
					name: name,
					translations: translationData
						? {
								create: translationData.map((t: Translation) => ({
									language: {
										connect: { id: t.languageId },
									},
									translation: t.translation,
									description: t.description || null,
								})),
						  }
						: undefined,
				},
			});

			return await prisma.country.create({
				data: {
					labelId: newLabel.id,
				},
				include: {
					label: {
						include: {
							translations: true,
						},
					},
				},
			});
		});

		return NextResponse.json(newCountry);
	} catch (error) {
		console.error('Error creating country:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		return NextResponse.json(
			{ error: 'Failed to create country', details: errorMessage },
			{ status: 500 }
		);
	}
};
