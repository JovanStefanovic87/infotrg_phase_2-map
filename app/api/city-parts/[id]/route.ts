// /app/api/city-parts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// PUT request for updating a city part
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const cityPartId = parseInt(params.id, 10);

	try {
		const { labelName, cityId, postCode, translationData } = await req.json();
		const { name } = labelName;

		// Update city part, label, and translations in a transaction
		const updatedCityPart = await prisma.$transaction(async prisma => {
			// Update the label name and translations
			const updatedLabel = await prisma.label.update({
				where: {
					id: (await prisma.cityPart.findUnique({ where: { id: cityPartId } }))?.labelId || 0,
				},
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

			// Update the city part
			return await prisma.cityPart.update({
				where: { id: cityPartId },
				data: {
					labelId: updatedLabel.id,
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

		return NextResponse.json(updatedCityPart);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update city part' }, { status: 500 });
	}
};

// DELETE request for deleting a city part
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const cityPartId = parseInt(params.id, 10);

	try {
		// Find the city part with its associated label ID
		const cityPart = await prisma.cityPart.findUnique({
			where: { id: cityPartId },
			include: {
				label: true,
			},
		});

		if (!cityPart) {
			return NextResponse.json({ error: 'City part not found' }, { status: 404 });
		}

		// Delete the city part and its label in a transaction
		await prisma.$transaction(async prisma => {
			// Delete the label and related translations
			await prisma.label.delete({
				where: { id: cityPart.labelId },
			});

			// Delete the city part
			await prisma.cityPart.delete({
				where: { id: cityPartId },
			});
		});

		return NextResponse.json({ message: 'City part deleted successfully' });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete city part' }, { status: 500 });
	}
};
