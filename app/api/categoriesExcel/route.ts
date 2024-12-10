import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { prisma } from '@/app/lib/prisma';
import slugify from 'slugify';

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
			const slug1 = slugify(`${translation1}-rs`, { lower: true, strict: true });
			const slug2 = slugify(`${translation2}-hu`, { lower: true, strict: true });

			// Proveri da li labela već postoji
			let label = await prisma.label.findFirst({
				where: { name: labelName },
			});

			// Ako labela ne postoji, kreiraj novu
			if (!label) {
				label = await prisma.label.create({
					data: {
						name: labelName,
						translations: {
							create: [
								{
									languageId: 1,
									translation: translation1,
									slug: slug1,
								},
								{
									languageId: 2,
									translation: translation2,
									slug: slug2,
								},
							],
						},
					},
				});
			} else {
				// Ako labela postoji, ažuriraj prevode
				await prisma.translation.upsert({
					where: {
						labelId_languageId: {
							labelId: label.id,
							languageId: 1,
						},
					},
					update: {
						translation: translation1,
						slug: slug1,
						labelId: label.id,
					},
					create: {
						languageId: 1,
						translation: translation1,
						slug: slug1,
						labelId: label.id,
					},
				});

				await prisma.translation.upsert({
					where: {
						labelId_languageId: {
							labelId: label.id,
							languageId: 2,
						},
					},
					update: {
						translation: translation2,
						slug: slug2,
						labelId: label.id,
					},
					create: {
						languageId: 2,
						translation: translation2,
						slug: slug2,
						labelId: label.id,
					},
				});
			}

			// Kreiranje ikonice, ako ne postoji
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

			// Pronalaženje ili kreiranje kategorije
			let category = await prisma.category.findFirst({
				where: { labelId: label.id },
			});

			// Ako kategorija postoji, ažuriraj je
			if (category) {
				category = await prisma.category.update({
					where: { id: category.id },
					data: {
						iconId: icon?.id || null,
					},
				});
			} else {
				// Ako kategorija ne postoji, kreiraj novu
				category = await prisma.category.create({
					data: {
						labelId: label.id,
						iconId: icon?.id || null,
					},
				});
			}

			// Poveži roditeljske kategorije, ako postoje
			let parentCategoryNames = parentCategoryName ? parentCategoryName.split(',') : [];

			// Prvo, proveri postojeće veze
			for (const parentCategoryName of parentCategoryNames) {
				let parentCategory = await prisma.category.findFirst({
					where: { label: { name: `${prefix}${parentCategoryName}` } },
				});

				// Automatsko kreiranje roditeljske kategorije ako ne postoji
				if (!parentCategory) {
					const parentLabel = await prisma.label.create({
						data: {
							name: `${prefix}${parentCategoryName}`,
							translations: {
								create: [
									{
										languageId: 1,
										translation: parentCategoryName,
									},
									{
										languageId: 2,
										translation: parentCategoryName,
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

				// Pronađi sve postojeće roditeljske kategorije povezane sa ovom kategorijom
				const existingParentCategories = await prisma.parentCategory.findMany({
					where: { childId: category.id },
				});

				// Ukloni one roditeljske kategorije koje nisu više povezane
				for (const existingParentCategory of existingParentCategories) {
					// Prvo pronađi roditeljsku kategoriju pomoću parentId
					const parentCategoryFromDB = await prisma.category.findUnique({
						where: { id: existingParentCategory.parentId },
						include: { label: true },
					});

					// Proveri ako ime roditeljske kategorije nije u listi novih roditeljskih kategorija
					if (
						parentCategoryFromDB &&
						!parentCategoryNames.includes(parentCategoryFromDB.label.name)
					) {
						// Ako ne postoji veza između parentId i childId, briši vezu
						await prisma.parentCategory.delete({
							where: {
								parentId_childId: {
									parentId: existingParentCategory.parentId,
									childId: category.id,
								},
							},
						});
					}
				}

				// Dodaj nove roditeljske kategorije
				const existingParentCategory = await prisma.parentCategory.findFirst({
					where: {
						parentId: parentCategory.id,
						childId: category.id,
					},
				});

				// Ako ne postoji, kreiraj novu vezu
				if (!existingParentCategory) {
					await prisma.parentCategory.create({
						data: {
							parentId: parentCategory.id,
							childId: category.id,
						},
					});
				}
			}
		}

		return NextResponse.json({ message: 'Data imported successfully' });
	} catch (error) {
		console.error('Error importing data:', error);
		return NextResponse.json({ error: 'Failed to import data' }, { status: 500 });
	}
}
