import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { prisma } from '@/app/lib/prisma';

interface ExcelRow {
	translation1: string;
	translation2: string;
	iconName?: string;
	folderName?: string;
	parentCategoryName?: string;
}

export async function POST(request: Request) {
	try {
		// Primanje fajla
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const prefix = formData.get('prefix') as string;
		console.log(`Fajl ime: ${file.name}, tip: ${file.type}, veličina: ${file.size}`);
		if (file.size === 0) {
			console.error('Fajl je prazan.');
			return NextResponse.json({ error: 'File is empty' }, { status: 400 });
		}

		if (!file) {
			console.error('Fajl nije poslat.');
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Čitanje Excel fajla
		const buffer = await file.arrayBuffer();
		const workbook = xlsx.read(buffer, { type: 'array' });
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];

		// Konvertovanje podataka u JSON
		const data: ExcelRow[] = xlsx.utils.sheet_to_json<ExcelRow>(sheet);

		// Procesiranje podataka
		for (const row of data) {
			const { translation1, translation2, iconName, folderName, parentCategoryName } = row;

			const labelName = `${prefix}${translation1}`;

			// Kreiranje etikete (Label)
			const label = await prisma.label.create({
				data: {
					name: labelName,
					translations: {
						create: [
							{
								languageId: 1,
								translation: translation1,
							},
							{
								languageId: 2,
								translation: translation2,
							},
						],
					},
				},
			});

			// Kreiranje ikonice
			let icon = null;
			if (iconName && folderName) {
				icon = await prisma.icon.upsert({
					where: {
						name_folder: {
							name: iconName,
							folder: folderName,
						},
					},
					create: {
						name: iconName,
						folder: folderName,
						url: `/icons/${folderName}/${iconName}`,
					},
					update: {
						url: `/icons/${folderName}/${iconName}`,
					},
				});
			}

			// Pronalaženje ili kreiranje roditeljske kategorije
			let parentCategory = null;
			if (parentCategoryName) {
				const parentLabelName = `${prefix}${parentCategoryName}`; // Kombinacija prefix i parentCategoryName

				parentCategory = await prisma.category.findFirst({
					where: { label: { name: parentLabelName } }, // Provera sa generisanim imenom
				});

				// Automatsko kreiranje ako ne postoji
				if (!parentCategory) {
					const parentLabel = await prisma.label.create({
						data: {
							name: parentLabelName,
							translations: {
								create: [
									{
										languageId: 1,
										translation: parentCategoryName,
									},
									{
										languageId: 2,
										translation: parentCategoryName, // Opcionalno, možete prilagoditi prevod
									},
								],
							},
						},
					});

					parentCategory = await prisma.category.create({
						data: {
							labelId: parentLabel.id,
						},
					});
				}
			}

			// Kreiranje nove kategorije
			await prisma.category.create({
				data: {
					labelId: label.id,
					iconId: icon?.id || null,
					parentCategories: parentCategory
						? {
								create: [
									{
										child: {
											connect: { id: parentCategory.id },
										},
									},
								],
						  }
						: undefined,
				},
			});
		}

		return NextResponse.json({ message: 'Data imported successfully' });
	} catch (error) {
		console.error('Error importing data:', error);
		return NextResponse.json({ error: 'Failed to import data' }, { status: 500 });
	}
}
