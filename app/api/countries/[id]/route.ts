// /app/api/countries/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// PUT request for updating a state
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const stateId = parseInt(params.id, 10);

	try {
		const { labelName, translations } = await req.json();
		const { name, translationData } = labelName;

		// Update state, label, and translations in a transaction
		const updatedstate = await prisma.$transaction(async prisma => {
			// Update label name
			const updatedLabel = await prisma.label.update({
				where: {
					id: (await prisma.state.findUnique({ where: { id: stateId } }))?.labelId || 0,
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

			// Update the state
			return await prisma.state.update({
				where: { id: stateId },
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

		return NextResponse.json(updatedstate);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to update state' }, { status: 500 });
	}
};

// DELETE request for deleting a state
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
	const stateId = parseInt(params.id, 10);

	try {
		// Find the state with its associated label ID
		const state = await prisma.state.findUnique({
			where: { id: stateId },
			include: {
				label: true,
			},
		});

		if (!state) {
			return NextResponse.json({ error: 'State not found' }, { status: 404 });
		}

		// Delete state and its label in a transaction
		await prisma.$transaction(async prisma => {
			// Delete the label and related translations
			await prisma.label.delete({
				where: { id: state.labelId },
			});

			// Delete the state
			await prisma.state.delete({
				where: { id: stateId },
			});
		});

		return NextResponse.json({ message: 'State deleted successfully' });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to delete state' }, { status: 500 });
	}
};
