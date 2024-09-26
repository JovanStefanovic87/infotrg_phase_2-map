// /app/api/countries/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// PUT request for updating a country
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const countryId = parseInt(params.id, 10);

	try {
		const { labelName, translations } = await req.json();
		const { name, translationData } = labelName;

		// Update country, label, and translations in a transaction
		const updatedCountry = await prisma.$transaction(async prisma => {
			// Update label name
			const updatedLabel = await prisma.label.update({
				where: {
					id: (await prisma.country.findUnique({ where: { id: countryId } }))?.labelId || 0,
				},
				data: {
					name: name,
					translations: {
						// Delete old translations and add new ones
						deleteMany: {},
						create: translationData.map((t: any) => ({
							language: { connect: { id: t.languageId } },
							translation: t.translation,
							description: t.description || null,
						})),
					},
				},
			});

			// Update the country
			return await prisma.country.update({
				where: { id: countryId },
				data: {
					labelId: updatedLabel.id,
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

		return NextResponse.json(updatedCountry);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update country' }, { status: 500 });
	}
};

// DELETE request for deleting a country
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const countryId = parseInt(params.id, 10);

	try {
		// Find the country with its associated label ID
		const country = await prisma.country.findUnique({
			where: { id: countryId },
			include: {
				label: true,
			},
		});

		if (!country) {
			return NextResponse.json({ error: 'Country not found' }, { status: 404 });
		}

		// Delete country and its label in a transaction
		await prisma.$transaction(async prisma => {
			// Delete the label and related translations
			await prisma.label.delete({
				where: { id: country.labelId },
			});

			// Delete the country
			await prisma.country.delete({
				where: { id: countryId },
			});
		});

		return NextResponse.json({ message: 'Country deleted successfully' });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete country' }, { status: 500 });
	}
};
