import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
	const pagesDirectory = path.join(process.cwd(), 'app');
	const staticPages: string[] = [];

	// Funkcija za rekurzivni prolaz kroz direktorijum
	const traverseDirectory = (dir: string) => {
		const files = fs.readdirSync(dir, { withFileTypes: true });
		for (const file of files) {
			if (file.isDirectory()) {
				traverseDirectory(path.join(dir, file.name));
			} else if (file.name === 'page.tsx') {
				// Dodajemo ime direktorijuma kao stranicu
				const relativePath = path.relative(pagesDirectory, dir);
				staticPages.push(relativePath);
			}
		}
	};

	traverseDirectory(pagesDirectory);

	return NextResponse.json(staticPages);
}
