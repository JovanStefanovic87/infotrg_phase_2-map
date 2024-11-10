import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request to fetch all languages
export async function GET(request: NextRequest) {
	try {
		const languages = await prisma.language.findMany();
		return NextResponse.json(languages);
	} catch (error) {
		console.error('Greška prilikom dohvatanja jezika:', error);
		return NextResponse.json(
			{ error: 'Došlo je do greške prilikom dohvatanja jezika. Molimo pokušajte ponovo.' },
			{ status: 500 }
		);
	}
}

// Handle POST request to add a new language
export async function POST(request: NextRequest) {
	try {
		const { code, name } = await request.json();

		// Provera da li su polja popunjena
		if (!code || !name) {
			return NextResponse.json({ error: 'Šifra i naziv jezika su obavezni.' }, { status: 400 });
		}

		// Provera da li već postoji jezik sa istom šifrom
		const existingLanguage = await prisma.language.findUnique({
			where: { code },
		});

		if (existingLanguage) {
			return NextResponse.json(
				{ error: `Jezik sa šifrom "${code}" već postoji.` },
				{ status: 409 }
			);
		}

		// Kreiranje novog jezika
		const newLanguage = await prisma.language.create({
			data: {
				code,
				name,
			},
		});

		return NextResponse.json(newLanguage, { status: 201 });
	} catch (error: any) {
		console.error('Greška prilikom dodavanja jezika:', error.message || error);
		const errorMessage =
			error.message || 'Došlo je do greške prilikom dodavanja jezika. Molimo pokušajte ponovo.';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
