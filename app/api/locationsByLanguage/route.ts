//app\api\locationsByLanguage\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { State, County, City, Suburb } from '@/utils/helpers/types';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const prefix = searchParams.get('prefix');
	const languageId = parseInt(searchParams.get('languageId') || '1');

	try {
		let locations = await prisma.state.findMany({
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
				counties: {
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
				},
			},
		});

		const filterTranslationsByLanguage = (translations: any[], languageId: number) => {
			const translation = translations.find(t => t.languageId === languageId) || translations[0];
			return {
				name: translation?.translation || '',
				slug: translation?.slug || '',
			};
		};

		const transformLocation = (location: any, type: string) => {
			const { name, slug } = filterTranslationsByLanguage(location.label.translations, languageId);

			return {
				id: location.id,
				name,
				slug,
				icon: location.icon,
				type,
				children: location.counties
					? location.counties.map((county: County) => transformLocation(county, 'county'))
					: location.cities
					? location.cities.map((city: City) => transformLocation(city, 'city'))
					: location.suburbs
					? location.suburbs.map((suburb: Suburb) => transformLocation(suburb, 'suburb'))
					: [],
			};
		};

		const filteredLocations = locations.map(state => transformLocation(state, 'state'));

		return NextResponse.json(filteredLocations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
