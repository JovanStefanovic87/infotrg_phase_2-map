import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const iconId = parseInt(url.searchParams.get('iconId') || '', 10);

	if (isNaN(iconId)) {
		return NextResponse.json({ error: 'Invalid iconId' }, { status: 400 });
	}

	try {
		// Fetch the icon based on the provided iconId
		const icon = await prisma.icon.findUnique({
			where: {
				id: iconId,
			},
		});

		// Handle the case where the icon is not found
		if (!icon) {
			return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
		}

		// Return the icon data
		return NextResponse.json(icon);
	} catch (error) {
		console.error('Error fetching icon:', error);
		return NextResponse.error();
	}
}
