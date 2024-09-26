// /app/api/cities/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// PUT request for updating a city
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const cityId = parseInt(params.id, 10);

	try {
		const { labelName, countryId, postCode, translationData } = await req.json();
		const { name } = labelName;

		// Update city, label, and translations in a transaction
		const updatedCity = await prisma.$transaction(async prisma => {
			// Update the label name and translations
			const updatedLabel = await prisma.label.update({
				where: { id: (await prisma.city.findUnique({ where: { id: cityId } }))?.labelId || 0 },
				data: {
					name: name,
					translations: {
						// Delete old translations and create new ones
						deleteMany: {},
						create: translationData.map((t: any) => ({
							language: { connect: { id: t.languageId } },
							translation: t.translation,
							description: t.description || null,
						})),
					},
				},
			});

			// Update the city
			return await prisma.city.update({
				where: { id: cityId },
				data: {
					labelId: updatedLabel.id,
					countryId: countryId,
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
		});

		return NextResponse.json(updatedCity);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update city' }, { status: 500 });
	}
};

// DELETE request for deleting a city
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const cityId = parseInt(params.id, 10);

	try {
		// Find the city with its associated label ID
		const city = await prisma.city.findUnique({
			where: { id: cityId },
			include: {
				label: true,
			},
		});

		if (!city) {
			return NextResponse.json({ error: 'City not found' }, { status: 404 });
		}

		// Delete the city and its label in a transaction
		await prisma.$transaction(async prisma => {
			// Delete the label and related translations
			await prisma.label.delete({
				where: { id: city.labelId },
			});

			// Delete the city
			await prisma.city.delete({
				where: { id: cityId },
			});
		});

		return NextResponse.json({ message: 'City deleted successfully' });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete city' }, { status: 500 });
	}
};
