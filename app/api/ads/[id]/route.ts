import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import path from 'path';
import { uploadImage } from '@/utils/helpers/file-utils';

export async function DELETE(req: any, { params }: any) {
	const adId = parseInt(params.id); // Uzimanje ID iz parametara

	if (isNaN(adId)) {
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	try {
		await prisma.advertising.delete({
			where: { id: adId },
		});
		// Umesto 204, vraćamo 200 sa porukom
		return NextResponse.json({ message: 'Ad deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting ad:', error);
		return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	const adId = parseInt(params.id);

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

export const config = {
	api: {
		bodyParser: false, // Disable default body parsing to handle multipart/form-data
	},
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const adId = parseInt(params.id);
	console.log('Parsed adId:', adId); // Log parsed adId

	if (isNaN(adId)) {
		console.error('Invalid ID:', params.id); // Log invalid ID
		return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
	}

	try {
		const form = await req.formData();
		console.log('Form Data:', Object.fromEntries(form)); // Log form data

		const name = form.get('name')?.toString() || '';
		const description = form.get('description')?.toString() || '';
		const adType = form.get('adType')?.toString() || '';
		const url = form.get('url')?.toString() || '';
		const validTo = form.get('validTo')?.toString() || '';
		console.log('Extracted values:', { name, description, adType, url, validTo }); // Log extracted values

		const articleCategoryIds = JSON.parse(form.get('articleCategoryIds')?.toString() || '[]');
		const activityCategoryIds = JSON.parse(form.get('activityCategoryIds')?.toString() || '[]');
		const objectTypeCategoryIds = JSON.parse(form.get('objectTypeCategoryIds')?.toString() || '[]');
		const file = form.get('image') as File;

		console.log('Category IDs:', {
			articleCategoryIds,
			activityCategoryIds,
			objectTypeCategoryIds,
		}); // Log category IDs

		if (!name || !adType) {
			console.error('Missing required fields:', { name, adType, url }); // Log missing fields
			return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
		}

		let imageId: number | null = null;

		if (file) {
			console.log('Uploading file:', file); // Log file upload
			const uploadDirectory = path.join(process.cwd(), 'public/images/advertisments');
			await uploadImage(file, uploadDirectory);

			const createdImage = await prisma.image.create({
				data: {
					name: file.name,
					url: `/images/advertisments/${file.name}`,
				},
			});

			imageId = createdImage.id;
			console.log('Created image ID:', imageId); // Log created image ID
		}

		const updateData: any = {
			name,
			description,
			adType,
			url,
			articleCategories: {
				connect: articleCategoryIds.map((id: number) => ({ id })),
			},
			activityCategories: {
				connect: activityCategoryIds.map((id: number) => ({ id })),
			},
			objectTypeCategories: {
				connect: objectTypeCategoryIds.map((id: number) => ({ id })),
			},
			...(imageId && { imageId }),
		};

		// Only update validTo if it is not 'null'
		if (validTo !== 'null') {
			updateData.validTo = new Date(validTo);
			console.log('Updated validTo:', updateData.validTo); // Log validTo
		} else {
			console.log('No validTo update'); // Log when validTo is not updated
		}

		const updatedAd = await prisma.advertising.update({
			where: { id: adId },
			data: updateData,
		});

		console.log('Updated ad:', updatedAd); // Log updated ad
		return NextResponse.json(updatedAd, { status: 200 });
	} catch (error) {
		console.error('Error updating ad:', error); // Log the error
		return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
	}
}
