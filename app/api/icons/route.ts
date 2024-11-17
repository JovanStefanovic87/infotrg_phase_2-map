// app\api\icons\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// Handle file upload, resizing if necessary, and saving to the database
const uploadFile = async (
	file: Blob,
	uploadDirectory: string,
	fileName: string
): Promise<number> => {
	try {
		// Dodavanje ekstenzije .webp za konvertovane fajlove
		const fileBaseName = path.parse(fileName).name; // Ime fajla bez ekstenzije
		const webpFileName = `${fileBaseName}.webp`;
		const finalFilePath = path.join(uploadDirectory, webpFileName);

		// Proveri da li fajl sa istim imenom već postoji
		const existingIcon = await prisma.icon.findFirst({
			where: { url: { contains: `/icons/${path.basename(uploadDirectory)}/${webpFileName}` } },
		});

		if (existingIcon) {
			throw new Error(`Ikona sa nazivom "${webpFileName}" već postoji u ovom direktorijumu.`);
		}

		// Pretvaranje Blob u Buffer
		const arrayBuffer = await file.arrayBuffer();
		const fileBuffer = Buffer.from(arrayBuffer);

		// Konvertovanje u WebP format koristeći sharp
		await sharp(fileBuffer)
			.resize({ width: 128 }) // Promena veličine, ako je potrebno
			.toFormat('webp', { quality: 80 }) // Konvertovanje u WebP sa kvalitetom od 80
			.toFile(finalFilePath);

		// Generisanje URL-a za fajl
		const relativeFilePath = path.relative(process.cwd(), finalFilePath);
		const urlPath = `/icons/${path.basename(path.dirname(relativeFilePath))}/${path.basename(
			relativeFilePath
		)}`;

		// Čuvanje informacija o ikoni u bazi
		const icon = await prisma.icon.create({
			data: {
				name: webpFileName,
				url: urlPath,
			},
		});

		return icon.id;
	} catch (error: any) {
		console.error('Greška pri učitavanju fajla:', error);
		throw new Error(error.message || 'Neuspešno učitavanje fajla');
	}
};

// GET method to retrieve icons filtered by directory
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const directory = searchParams.get('directory');

		// Fetch icons only from specified directory
		const icons = await prisma.icon.findMany({
			where: {
				url: {
					contains: `/icons/${directory}`,
				},
			},
		});

		return NextResponse.json(icons);
	} catch (error) {
		console.error('Greška pri preuzimanju ikona:', error);
		return NextResponse.json({ error: 'Neuspešno preuzimanje ikona' }, { status: 500 });
	}
}

// POST method for uploading a new icon
export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('icon') as Blob | null;
		const directory = formData.get('directory') as string;
		const iconId = formData.get('iconId') as string | null;

		// Check if iconId is required but not provided, and file is not provided
		if (!iconId && !file) {
			return NextResponse.json({ error: 'Ikonica je obavezna.' }, { status: 400 });
		}

		if (!directory) {
			return NextResponse.json({ error: 'Direktorijum nije specificiran' }, { status: 400 });
		}

		// If a file is provided, proceed with the upload process
		if (file) {
			const uploadDirectory = path.join(process.cwd(), `public/icons/${directory}`);
			await fs.promises.mkdir(uploadDirectory, { recursive: true });

			const fileName = file instanceof File ? file.name : 'uploaded_icon.png';

			let newIconId;
			try {
				newIconId = await uploadFile(file, uploadDirectory, fileName);
			} catch (error: any) {
				const errorMessage = error instanceof Error ? error.message : 'Neuspešno učitavanje fajla';
				return NextResponse.json({ error: errorMessage }, { status: 500 });
			}

			return NextResponse.json({ message: 'Fajl uspešno učitan', iconId: newIconId });
		}

		// If iconId is provided but no file, return a success response with the provided iconId
		return NextResponse.json({
			message: 'Postojeći iconId je prosleđen',
			iconId: parseInt(iconId ?? '0'),
		});
	} catch (error) {
		console.error('Greška pri učitavanju fajla:', error);
		const errorMessage = error instanceof Error ? error.message : 'Neuspešno učitavanje fajla';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
