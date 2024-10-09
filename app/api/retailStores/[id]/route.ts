import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		// Extract the retail store ID from the params
		const retailStoreId = parseInt(params.id, 10);

		if (isNaN(retailStoreId)) {
			return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
		}

		const body = await req.json();
		const {
			name,
			locationId,
			updatedLocation,
			phoneNumber,
			email,
			website,
			viewCount,
			isSubscribedForAds,
			adType,
			isPhoneConfirmed,
			isEmailConfirmed,
			coordinates,
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

		// Update the location only if locationId is valid
		let updatedLocationRecord;
		if (updatedLocation && locationId) {
			updatedLocationRecord = await prisma.location.update({
				where: { id: locationId },
				data: {
					countryId: updatedLocation.countryId,
					cityId: updatedLocation.cityId,
					cityPartId: updatedLocation.cityPartId,
					marketplaceId: updatedLocation.marketplaceId,
					address: updatedLocation.address,
				},
			});
		}

		// Update coordinates if they exist
		let updatedCoordinatesRecord;
		if (coordinates && retailStore.coordinatesId !== null) {
			updatedCoordinatesRecord = await prisma.coordinates.update({
				where: { id: retailStore.coordinatesId },
				data: {
					latitude: coordinates.latitude,
					longitude: coordinates.longitude,
					locationDescription: coordinates.locationDescription,
				},
			});
		}

		// Update retail store data
		const updatedRetailStore = await prisma.retailStore.update({
			where: { id: retailStoreId },
			data: {
				name,
				phoneNumber,
				email,
				website,
				viewCount,
				isSubscribedForAds,
				adType,
				isPhoneConfirmed,
				isEmailConfirmed,
				coordinates: updatedCoordinatesRecord
					? { connect: { id: updatedCoordinatesRecord.id } }
					: undefined,
				articleCategories: { set: articleCategoryIds.map((id: number) => ({ id })) },
				activityCategories: { set: activityCategoryIds.map((id: number) => ({ id })) },
				objectTypeCategories: { set: objectTypeCategoryIds.map((id: number) => ({ id })) },
			},
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

		// Proveri da li postoji prodavnica sa datim ID-om
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
