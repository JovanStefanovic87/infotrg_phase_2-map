import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params;
		const { code, name } = await request.json();

		if (!code || !name) {
			return NextResponse.json({ error: 'Šifra i naziv jezika su obavezni.' }, { status: 400 });
		}

		const existingLanguage = await prisma.language.findFirst({
			where: { code, NOT: { id: Number(id) } },
		});

		if (existingLanguage) {
			return NextResponse.json(
				{ error: `Jezik sa šifrom "${code}" već postoji.` },
				{ status: 409 }
			);
		}

		const updatedLanguage = await prisma.language.update({
			where: { id: Number(id) },
			data: { code, name },
		});

		return NextResponse.json(updatedLanguage, { status: 200 });
	} catch (error: any) {
		console.error('Greška prilikom ažuriranja jezika:', error.message || error);
		const errorMessage =
			error.message || 'Došlo je do greške prilikom ažuriranja jezika. Molimo pokušajte ponovo.';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params;

		const existingLanguage = await prisma.language.findUnique({
			where: { id: Number(id) },
		});

		if (!existingLanguage) {
			return NextResponse.json(
				{ error: `Jezik sa ID-jem "${id}" nije pronađen.` },
				{ status: 404 }
			);
		}

		await prisma.language.delete({
			where: { id: Number(id) },
		});

		return NextResponse.json({ message: 'Jezik je uspešno obrisan.' }, { status: 200 });
	} catch (error: any) {
		console.error('Greška prilikom brisanja jezika:', error.message || error);
		const errorMessage =
			error.message || 'Došlo je do greške prilikom brisanja jezika. Molimo pokušajte ponovo.';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
