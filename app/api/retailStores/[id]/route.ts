import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const retailStoreId = parseInt(params.id, 10);

		if (isNaN(retailStoreId)) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}

		const body = await req.json();
		const {
			name,
			phoneNumber,
			email,
			website,
			viewCount,
			isSubscribedForAds,
			adType,
			isPhoneConfirmed,
			isEmailConfirmed,
			countryId,
			cityId,
			cityPartId,
			marketplaceId,
			latitude, // Use latitude from the body directly
			longitude, // Use longitude from the body directly
			articleCategoryIds,
			activityCategoryIds,
			objectTypeCategoryIds,
		} = body;

		// Check if the retail store exists
		const retailStore = await prisma.retailStore.findUnique({
			where: { id: retailStoreId },
		});

		if (!retailStore) {
			return NextResponse.json({ error: 'Retail Store not found' }, { status: 404 });
		}

		const updateData: any = {
			name,
			phoneNumber,
			email,
			website,
			viewCount,
			isSubscribedForAds,
			adType,
			isPhoneConfirmed,
			isEmailConfirmed,
			countryId: countryId || retailStore.countryId,
			cityId: cityId || retailStore.cityId,
			cityPartId: cityPartId || null,
			marketplaceId: marketplaceId || null,
			articleCategories: { set: articleCategoryIds.map((id: number) => ({ id })) },
			activityCategories: { set: activityCategoryIds.map((id: number) => ({ id })) },
			objectTypeCategories: { set: objectTypeCategoryIds.map((id: number) => ({ id })) },
		};

		// Handle latitude and longitude updates
		if (latitude && longitude) {
			// If coordinates already exist, update them
			if (retailStore.coordinatesId !== null) {
				await prisma.coordinates.update({
					where: { id: retailStore.coordinatesId },
					data: {
						latitude,
						longitude,
					},
				});
			} else {
				// If coordinates don't exist, create new ones
				const newCoordinates = await prisma.coordinates.create({
					data: {
						latitude,
						longitude,
					},
				});
				// Update the retail store with the new coordinates ID
				updateData.coordinatesId = newCoordinates.id;
			}
		}

		const updatedRetailStore = await prisma.retailStore.update({
			where: { id: retailStoreId },
			data: updateData,
		});

		return NextResponse.json(updatedRetailStore, { status: 200 });
	} catch (error) {
		console.error('Error updating Retail Store:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params;

		const retailStore = await prisma.retailStore.findUnique({
			where: { id: Number(id) },
		});

		if (!retailStore) {
			return NextResponse.json({ error: 'Retail Store not found' }, { status: 404 });
		}

		// Brisanje prodavnice
		await prisma.retailStore.delete({
			where: { id: Number(id) },
		});

		return NextResponse.json({ message: 'Retail Store deleted successfully' }, { status: 200 });
	} catch (error) {
		console.error('Error deleting Retail Store:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
