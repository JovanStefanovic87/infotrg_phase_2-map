import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { City, CityPart, Country, Marketplace } from '@/utils/helpers/types';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const prefix = searchParams.get('prefix');
	const languageId = parseInt(searchParams.get('languageId') || '1');

	try {
		let locations = await prisma.country.findMany({
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
						cityParts: {
							include: {
								label: {
									include: {
										translations: true,
									},
								},
								icon: true,
								marketplaces: {
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
				},
			},
		});

		const filterTranslationsByLanguage = (translations: any[], languageId: number) => {
			return (
				translations.find(t => t.languageId === languageId)?.translation ||
				translations[0]?.translation ||
				''
			);
		};

		const transformLocation = (location: any, type: string) => ({
			name: filterTranslationsByLanguage(location.label.translations, languageId),
			icon: location.icon,
			type,
			children: location.cities?.length
				? location.cities.map((city: City) => transformLocation(city, 'city'))
				: location.cityParts?.length
				? location.cityParts.map((part: CityPart) => transformLocation(part, 'cityPart'))
				: location.marketplaces?.length
				? location.marketplaces.map((marketplace: Marketplace) =>
						transformLocation(marketplace, 'marketplace')
				  )
				: [],
		});

		const filteredLocations = locations.map(country => transformLocation(country, 'country'));

		return NextResponse.json(filteredLocations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
