import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { City, Suburb } from '@/utils/helpers/types';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const prefix = searchParams.get('prefix');
	const languageId = parseInt(searchParams.get('languageId') || '1');

	try {
		// Fetch counties directly, along with nested cities and suburbs
		let counties = await prisma.county.findMany({
			where: {
				label: {
					name: {
						startsWith: prefix ? `${prefix}` : '',
					},
				},
			},
			include: {
				label: {
					include: {
						translations: true,
					},
				},
				icon: true,
				cities: {
					include: {
						label: {
							include: {
								translations: true,
							},
						},
						icon: true,
						suburbs: {
							include: {
								label: {
									include: {
										translations: true,
									},
								},
								icon: true,
							},
						},
					},
				},
			},
		});

		// Helper to filter translations by language
		const filterTranslationsByLanguage = (translations: any[], languageId: number) => {
			return (
				translations.find(t => t.languageId === languageId)?.translation ||
				translations[0]?.translation ||
				''
			);
		};

		// Transform function for county, city, and suburb
		const transformLocation = (location: any, type: string) => ({
			id: location.id,
			name: filterTranslationsByLanguage(location.label.translations, languageId),
			icon: location.icon,
			type,
			children:
				type === 'county'
					? location.cities.map((city: City) => transformLocation(city, 'city'))
					: type === 'city'
					? location.suburbs.map((suburb: Suburb) => transformLocation(suburb, 'suburb'))
					: [],
		});

		// Map through the counties to structure the response
		const filteredLocations = counties.map(county => transformLocation(county, 'county'));

		return NextResponse.json(filteredLocations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
