import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { prisma } from '@/app/lib/prisma';
import { prefixActivityCategory, prefixAticleCategory, prefixObjectTypeCategory } from '../prefix';

export async function POST(request: Request) {
	try {
		// Primanje fajla
		const formData = await request.formData();
		const file = formData.get('file') as File;

		if (!file || file.size === 0) {
			return NextResponse.json({ error: 'File is empty or not provided' }, { status: 400 });
		}

		// Čitanje Excel fajla
		const buffer = await file.arrayBuffer();
		const workbook = xlsx.read(buffer, { type: 'array' });
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];

		// Konvertovanje podataka u JSON i normalizacija ključeva
		const rawData = xlsx.utils.sheet_to_json<any>(sheet);
		const data = rawData.map(row => ({
			name: row['Name']?.toString(),
			stateId: Number(row['StateId']),
			countyId: row['CountyId'] ? Number(row['CountyId']) : undefined,
			cityId: row['CityId'] ? Number(row['CityId']) : undefined,
			suburbId: row['SuburbId'] ? Number(row['SuburbId']) : undefined,
			phoneNumber: row['PhoneNumber']?.toString(),
			email: row['Email']?.toString(),
			website: row['Website']?.toString(),
			viewCount: row['ViewCount'] ? Number(row['ViewCount']) : 0,
			isPhoneConfirmed: row['IsPhoneConfirmed'] === 'TRUE' || row['IsPhoneConfirmed'] === true,
			isEmailConfirmed: row['IsEmailConfirmed'] === 'TRUE' || row['IsEmailConfirmed'] === true,
			latitude: row['Latitude'] ? Number(row['Latitude']) : undefined,
			longitude: row['Longitude'] ? Number(row['Longitude']) : undefined,
			locationDescription: row['LocationDescription']?.toString(),
			articleCategories: row['ArticleCategories']?.toString(),
			activityCategories: row['ActivityCategories']?.toString(),
			objectTypeCategories: row['ObjectTypeCategories']?.toString(),
			address: row['Address']?.toString(),
		}));

		// Procesiranje podataka
		for (const row of data) {
			if (!row.name || !row.stateId || !row.address) {
				console.error('Invalid normalized row:', row);
				throw new Error('Mandatory fields: name, stateId, and address are required.');
			}

			// Pronalaženje kategorija po nazivima sa dodavanjem prefiksa
			const findCategoryIds = async (categoryNames: string | undefined, prefix: string) => {
				if (!categoryNames) return [];
				const namesArray = categoryNames.split(',').map(name => `${prefix}${name.trim()}`);
				const categories = await prisma.category.findMany({
					where: {
						label: {
							name: { in: namesArray },
						},
					},
				});
				return categories.map(category => category.id);
			};

			const articleCategoryIds = await findCategoryIds(row.articleCategories, prefixAticleCategory);
			const activityCategoryIds = await findCategoryIds(
				row.activityCategories,
				prefixActivityCategory
			);
			const objectTypeCategoryIds = await findCategoryIds(
				row.objectTypeCategories,
				prefixObjectTypeCategory
			);

			// Kreiranje koordinata ako postoje
			const coordinates =
				row.latitude && row.longitude
					? await prisma.coordinates.create({
							data: {
								latitude: row.latitude,
								longitude: row.longitude,
								locationDescription: row.locationDescription || null,
							},
					  })
					: null;

			// Kreiranje RetailStore zapisa
			await prisma.retailStore.create({
				data: {
					name: row.name,
					stateId: row.stateId,
					countyId: row.countyId || null,
					cityId: row.cityId || null,
					suburbId: row.suburbId || null,
					phoneNumber: row.phoneNumber || null,
					email: row.email || null,
					website: row.website || null,
					viewCount: row.viewCount,
					isPhoneConfirmed: row.isPhoneConfirmed,
					isEmailConfirmed: row.isEmailConfirmed,
					address: row.address,
					coordinatesId: coordinates?.id || null,
					articleCategories: {
						connect: articleCategoryIds.map(id => ({ id })),
					},
					activityCategories: {
						connect: activityCategoryIds.map(id => ({ id })),
					},
					objectTypeCategories: {
						connect: objectTypeCategoryIds.map(id => ({ id })),
					},
				},
			});
		}

		return NextResponse.json({ message: 'Retail store data imported successfully' });
	} catch (error) {
		console.error('Error importing retail store data:', error);
		return NextResponse.json({ error: 'Failed to import retail store data' }, { status: 500 });
	}
}
