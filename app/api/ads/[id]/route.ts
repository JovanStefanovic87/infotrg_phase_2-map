//app\api\ads\[id]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import path from 'path';
import { uploadImage } from '@/utils/helpers/file-utils';

export async function DELETE(
	req: NextRequest,
	context: Awaited<{ params: { id: string } }>
): Promise<NextResponse> {
	const adId = parseInt(context.params.id);

	if (isNaN(adId)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	try {
		await prisma.advertising.delete({
			where: { id: adId },
		});

		return NextResponse.json({ message: 'Ad deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting ad:', error);
		return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
	}
}

export async function PATCH(
	req: NextRequest,
	context: Awaited<{ params: { id: string } }>
): Promise<NextResponse> {
	const adId = parseInt(context.params.id);

	if (isNaN(adId)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	try {
		const ad = await prisma.advertising.findUnique({
			where: { id: adId },
		});

		if (!ad) {
			return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
		}

		// Parse the request body to get the new validTo value
		const { validTo } = await req.json();

		if (!validTo) {
			return NextResponse.json({ error: 'validTo is required' }, { status: 400 });
		}

		// Create a new date object from validTo
		const newValidTo = new Date(validTo);

		// Update the ad's validTo field with the new value
		await prisma.advertising.update({
			where: { id: adId },
			data: { validTo: newValidTo },
		});

		return NextResponse.json({ message: 'Ad extended successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error extending ad:', error);
		return NextResponse.json({ error: 'Failed to extend ad' }, { status: 500 });
	}
}

export async function PUT(
	req: NextRequest,
	context: Awaited<{ params: { id: string } }>
): Promise<NextResponse> {
	const { params } = context;
	const adId = parseInt(params.id);

	if (isNaN(adId)) {
		console.error('Invalid ID:', context.params.id);
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	try {
		const form = await req.formData();

		const name = form.get('name')?.toString() || '';
		const description = form.get('description')?.toString() || '';
		const adType = form.get('adType')?.toString() || '';
		const url = form.get('url')?.toString() || '';
		const validTo = form.get('validTo')?.toString() || '';
		const imageIdFromLibrary = form.get('imageId')?.toString() || '';
		const retailStoreId = parseInt(form.get('retailStoreId')?.toString() || '0');

		const articleCategoryIds = JSON.parse(form.get('articleCategoryIds')?.toString() || '[]');
		const activityCategoryIds = JSON.parse(form.get('activityCategoryIds')?.toString() || '[]');
		const objectTypeCategoryIds = JSON.parse(form.get('objectTypeCategoryIds')?.toString() || '[]');
		const file = form.get('image') as File;

		if (!name || !adType) {
			console.error('Missing required fields:', { name, adType });
			return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
		}

		const retailStoreExists = await prisma.retailStore.findUnique({
			where: { id: retailStoreId },
		});

		if (!retailStoreExists) {
			console.error('Retail store not found:', retailStoreId);
			return NextResponse.json({ error: 'Retail store not found' }, { status: 400 });
		}

		let imageId: number | null = null;

		if (file) {
			const uploadDirectory = path.join(process.cwd(), 'public/images/advertisments');
			await uploadImage(file, uploadDirectory);

			const createdImage = await prisma.image.create({
				data: {
					name: file.name,
					url: `/images/advertisments/${file.name}`,
				},
			});
			imageId = createdImage.id;
		} else if (imageIdFromLibrary) {
			imageId = parseInt(imageIdFromLibrary);
		}

		const updateData: any = {
			name,
			description,
			adType,
			url,
			retailStoreId,
			...(imageId && { imageId }),
			...(validTo && validTo !== 'null' && { validTo: new Date(validTo) }),
		};

		if (articleCategoryIds.length) {
			updateData.articleCategories = {
				set: articleCategoryIds.map((id: any) => ({ id })),
			};
		}

		if (activityCategoryIds.length) {
			updateData.activityCategories = {
				set: activityCategoryIds.map((id: any) => ({ id })),
			};
		}

		if (objectTypeCategoryIds.length) {
			updateData.objectTypeCategories = {
				set: objectTypeCategoryIds.map((id: any) => ({ id })),
			};
		}

		const updatedAd = await prisma.advertising.update({
			where: { id: adId },
			data: updateData,
		});

		return NextResponse.json(updatedAd, { status: 200 });
	} catch (error) {
		console.error('Error updating ad:', error);
		return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
	}
}
