import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const serializeData = (data: any) => {
	return JSON.parse(
		JSON.stringify(data, (key, value) => {
			if (value instanceof Date) {
				return value.toISOString(); // Handle Date objects
			}

			if (value instanceof Buffer) {
				return value.toString('base64'); // Handle Buffer objects
			}

			// Ensure that any non-plain object is serialized properly
			if (value && typeof value === 'object' && value.constructor !== Object) {
				// This ensures non-plain objects are converted to plain objects
				return JSON.parse(JSON.stringify(value));
			}

			return value;
		})
	);
};

// Handle GET request to fetch all languages
export async function GET(request: NextRequest) {
	try {
		// Fetch languages from the database
		const languages = await prisma.language.findMany();

		// Validate languages using the structure defined in validateLanguages

		// Serialize data with proper handling of `Date` and other non-plain objects

		const serializedData = serializeData(languages);
		const errors = validateLanguages(serializedData);
		if (errors.length > 0) {
			// If there are errors, return them as the response
			return NextResponse.json({ error: errors.join(', ') }, { status: 400 });
		}

		// Return the validated and serialized languages data
		return NextResponse.json(serializedData);
	} catch (error) {
		console.error('Error fetching languages:', error);
		return NextResponse.json(
			{ error: 'There was an error fetching the languages. Please try again.' },
			{ status: 500 }
		);
	}
}

function validateLanguages(languages: any[]) {
	const errors: string[] = [];

	languages.forEach((language, index) => {
		if (typeof language.id !== 'number') errors.push(`languages[${index}].id is not a number`);
		if (typeof language.code !== 'string') errors.push(`languages[${index}].code is not a string`);
		if (typeof language.name !== 'string') errors.push(`languages[${index}].name is not a string`);
		if (typeof language.createdAt !== 'string')
			errors.push(`languages[${index}].createdAt is not a string`);
	});

	return errors;
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
