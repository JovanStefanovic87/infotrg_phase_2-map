//app\api\locations\[id]\route.ts
import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

async function findAndDeleteLocation(id: number, type: string) {
	let location;
	let deleteLocationOperation;
	let labelId;

	switch (type) {
		case 'state':
			location = await prisma.state.findUnique({
				where: { id },
				select: { id: true, labelId: true },
			});
			deleteLocationOperation = () => prisma.state.delete({ where: { id } });
			break;
		case 'county':
			location = await prisma.county.findUnique({
				where: { id },
				select: { id: true, labelId: true },
			});
			deleteLocationOperation = () => prisma.county.delete({ where: { id } });
			break;
		case 'city':
			location = await prisma.city.findUnique({
				where: { id },
				select: { id: true, labelId: true },
			});
			deleteLocationOperation = () => prisma.city.delete({ where: { id } });
			break;
		case 'suburb':
			location = await prisma.suburb.findUnique({
				where: { id },
				select: { id: true, labelId: true },
			});
			deleteLocationOperation = () => prisma.suburb.delete({ where: { id } });
			break;
		default:
			throw new Error('Nevažeći tip lokacije');
	}

	if (!location) {
		throw new Error(
			`${type.charAt(0).toUpperCase() + type.slice(1)} sa ID-jem ${id} nije pronađena`
		);
	}

	labelId = location.labelId;

	return await prisma.$transaction([
		deleteLocationOperation(),
		prisma.label.delete({ where: { id: labelId } }),
	]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');

	if (!id || !type) {
		return NextResponse.json({ error: 'Nedostaje parametar ID ili tip' }, { status: 400 });
	}

	try {
		const deletedLocation = await findAndDeleteLocation(Number(id), type);
		return NextResponse.json({ message: 'Lokacija je uspešno obrisana', deletedLocation });
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Greška prilikom brisanja lokacije (tip: ${type}, id: ${id}):`, error.message);
			const status = error.message.includes('nije pronađena') ? 404 : 400;
			return NextResponse.json({ error: error.message }, { status });
		} else {
			console.error(`Neočekivana greška: ${error}`);
			return NextResponse.json({ error: 'Došlo je do neočekivane greške' }, { status: 500 });
		}
	}
}

async function findAndUpdateLocation(id: number, type: string, data: any) {
	let location;
	let updateOperation;

	switch (type) {
		case 'state':
			location = await prisma.state.findUnique({ where: { id } });
			updateOperation = () => prisma.state.update({ where: { id }, data });
			break;
		case 'county':
			location = await prisma.county.findUnique({ where: { id } });
			updateOperation = () => prisma.county.update({ where: { id }, data });
			break;
		case 'city':
			location = await prisma.city.findUnique({ where: { id } });
			updateOperation = () => prisma.city.update({ where: { id }, data });
			break;
		case 'suburb':
			location = await prisma.suburb.findUnique({ where: { id } });
			updateOperation = () => prisma.suburb.update({ where: { id }, data });
			break;
		default:
			throw new Error('Nevažeći tip lokacije');
	}

	if (!location) {
		throw new Error(
			`${type.charAt(0).toUpperCase() + type.slice(1)} sa ID-jem ${id} nije pronađena`
		);
	}

	return updateOperation();
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');

	if (!id || !type) {
		return NextResponse.json({ error: 'Nedostaje parametar ID ili tip' }, { status: 400 });
	}

	try {
		const data = await req.json();
		const { iconId, postCode } = data;

		const updatedLocation = await findAndUpdateLocation(Number(id), type, {
			iconId: iconId,
			postCode: postCode || undefined,
		});

		return NextResponse.json({ message: 'Lokacija je uspešno ažurirana', updatedLocation });
	} catch (error) {
		if (error instanceof Error) {
			console.error(
				`Greška prilikom ažuriranja lokacije (tip: ${type}, id: ${id}):`,
				error.message
			);
			const status = error.message.includes('nije pronađena') ? 404 : 400;
			return NextResponse.json({ error: error.message }, { status });
		} else {
			console.error(`Neočekivana greška: ${error}`);
			return NextResponse.json({ error: 'Došlo je do neočekivane greške' }, { status: 500 });
		}
	}
}

async function getLocationByIdAndType(id: number, type: string, languageId: number) {
	let location;

	const selectFields = {
		id: true,
		icon: true,
		label: {
			select: {
				translations: {
					where: { languageId },
					select: { translation: true },
				},
			},
		},
	};

	switch (type) {
		case 'state':
			location = await prisma.state.findUnique({
				where: { id },
				select: selectFields,
			});
			break;
		case 'county':
			location = await prisma.county.findUnique({
				where: { id },
				select: selectFields,
			});
			break;
		case 'city':
			location = await prisma.city.findUnique({
				where: { id },
				select: selectFields,
			});
			break;
		case 'suburb':
			location = await prisma.suburb.findUnique({
				where: { id },
				select: selectFields,
			});
			break;
		default:
			throw new Error('Nevažeći tip lokacije');
	}

	return location;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const { searchParams } = new URL(req.url);
	const type = searchParams.get('type');
	const languageId = parseInt(searchParams.get('languageId') || '1');

	if (!id || !type) {
		return NextResponse.json({ error: 'Nedostaje parametar ID ili tip' }, { status: 400 });
	}

	try {
		const location = await getLocationByIdAndType(Number(id), type, languageId);

		if (!location || !location.label.translations[0]) {
			return NextResponse.json(
				{ error: 'Prevod nije pronađen ili lokacija ne postoji' },
				{ status: 404 }
			);
		}

		const response = {
			id: location.id,
			name: location.label.translations[0].translation || 'Nedefinisano ime',
			icon: location.icon || null,
		};

		return NextResponse.json(response);
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Greška pri dohvatanju lokacije (tip: ${type}, id: ${id}):`, error.message);
			const status = error.message.includes('Nevažeći tip') ? 400 : 500;
			const userMessage =
				status === 400
					? 'Nevažeći tip lokacije. Molimo proverite parametar tip.'
					: 'Došlo je do greške prilikom dohvatanja lokacije. Pokušajte ponovo kasnije.';
			return NextResponse.json({ error: userMessage }, { status });
		} else {
			console.error(`Neočekivana greška: ${error}`);
			return NextResponse.json({ error: 'Došlo je do neočekivane greške' }, { status: 500 });
		}
	}
}
