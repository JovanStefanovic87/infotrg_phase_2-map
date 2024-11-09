import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { uploadImage } from '@/utils/helpers/file-utils';

export const config = {
	api: {
		bodyParser: false,
	},
};

const convertKeysToLowerCase = (obj: any): any => {
	if (Array.isArray(obj)) {
		return obj.map(convertKeysToLowerCase);
	} else if (obj !== null && obj.constructor === Object) {
		return Object.keys(obj).reduce((acc, key) => {
			acc[key.charAt(0).toLowerCase() + key.slice(1)] = convertKeysToLowerCase(obj[key]);
			return acc;
		}, {} as any);
	}
	return obj;
};

export async function POST(req: NextRequest) {
	try {
		const form = await req.formData();
		const file = form.get('image') as File;
		const imageIdFromForm = form.get('imageId')?.toString() || null;
		const name = form.get('name')?.toString() || '';
		const description = form.get('description')?.toString() || '';
		const adType = form.get('adType')?.toString() || 'SMALL';
		const url = form.get('url')?.toString() || '';
		const stateId = form.get('stateId') ? parseInt(form.get('stateId') as string, 10) : null;
		const countyId = form.get('countyId') ? parseInt(form.get('countyId') as string, 10) : null;
		const cityId = form.get('cityId') ? parseInt(form.get('cityId') as string, 10) : null;
		const suburbId = form.get('suburbId') ? parseInt(form.get('suburbId') as string, 10) : null;
		const retailStoreId = form.get('retailStoreId')
			? parseInt(form.get('retailStoreId') as string, 10)
			: null;
		const articleCategoryIds = JSON.parse(form.get('articleCategoryIds') as string);
		const activityCategoryIds = JSON.parse(form.get('activityCategoryIds') as string);
		const objectTypeCategoryIds = JSON.parse(form.get('objectTypeCategoryIds') as string);

		let imageId: number | null = null;

		if (file) {
			const uploadDirectory = path.join(process.cwd(), 'public/images/advertisments');
			imageId = await uploadImage(file, uploadDirectory);

			// Koristimo ID slike za kreiranje veze u bazi
			const newImage = await prisma.image.create({
				data: {
					name: file.name,
					url: `/images/advertisments/${file.name}`, // URL sačuvan u bazi
				},
			});

			imageId = newImage.id;
		} else if (imageIdFromForm) {
			imageId = parseInt(imageIdFromForm, 10);
		}

		if (!imageId) {
			return NextResponse.json({ error: 'Image ID is required.' }, { status: 400 });
		}

		const articleCategories = await prisma.category.findMany({
			where: { id: { in: articleCategoryIds } },
		});
		if (articleCategories.length !== articleCategoryIds.length) {
			return NextResponse.json(
				{ error: 'Jedna ili više kategorija proizvoda nisu pronađene' },
				{ status: 400 }
			);
		}

		const activityCategories = await prisma.category.findMany({
			where: { id: { in: activityCategoryIds } },
		});
		if (activityCategories.length !== activityCategoryIds.length) {
			return NextResponse.json(
				{ error: 'Jedna ili više kategorija aktivnosti nisu pronađene' },
				{ status: 400 }
			);
		}

		const objectTypeCategories = await prisma.category.findMany({
			where: { id: { in: objectTypeCategoryIds } },
		});
		if (objectTypeCategories.length !== objectTypeCategoryIds.length) {
			return NextResponse.json(
				{ error: 'Jedna ili više kategorija tipa objekata nisu pronađene' },
				{ status: 400 }
			);
		}

		const validTo = new Date();
		validTo.setDate(validTo.getDate() + 30);

		const data: any = {
			name,
			description,
			adType,
			url,
			validTo,
			articleCategories: { connect: articleCategories.map(category => ({ id: category.id })) },
			activityCategories: { connect: activityCategories.map(category => ({ id: category.id })) },
			objectTypeCategories: {
				connect: objectTypeCategories.map(category => ({ id: category.id })),
			},
			Image: { connect: { id: imageId } },
		};

		if (retailStoreId) data.RetailStore = { connect: { id: retailStoreId } };

		if (stateId) data.stateId = { connect: { id: stateId } };
		if (countyId) data.countyId = { connect: { id: countyId } };
		if (cityId) data.cityId = { connect: { id: cityId } };
		if (suburbId) data.suburb = { connect: { id: suburbId } };

		const advertising = await prisma.advertising.create({ data });

		return NextResponse.json(advertising, { status: 201 });
	} catch (error) {
		console.error('Server error:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function GET() {
	try {
		const advertisings = await prisma.advertising.findMany({
			select: {
				id: true,
				name: true,
				description: true,
				adType: true,
				viewCount: true,
				url: true,
				createdAt: true,
				validTo: true,
				imageId: true,
				Image: {
					select: {
						id: true,
						name: true,
						url: true,
					},
				},
				RetailStore: {
					select: {
						id: true,
						name: true,
					},
				},
				state: {
					select: {
						id: true,
						label: {
							select: {
								translations: true,
							},
						},
					},
				},
				county: {
					select: {
						id: true,
						label: {
							select: {
								translations: true,
							},
						},
					},
				},
				city: {
					select: {
						id: true,
						label: {
							select: {
								translations: true,
							},
						},
					},
				},
				suburb: {
					select: {
						id: true,
						label: {
							select: {
								translations: true,
							},
						},
					},
				},
				articleCategories: {
					select: {
						id: true,
						label: {
							select: {
								translations: true,
							},
						},
					},
				},
				activityCategories: {
					select: {
						id: true,
						label: {
							select: {
								translations: true,
							},
						},
					},
				},
				objectTypeCategories: {
					select: {
						id: true,
						label: {
							select: {
								translations: true,
							},
						},
					},
				},
			},
		});
		const normalizedResponse = convertKeysToLowerCase(advertisings);
		return NextResponse.json(normalizedResponse, { status: 200 });
	} catch (error) {
		console.error('Error fetching advertisings:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
