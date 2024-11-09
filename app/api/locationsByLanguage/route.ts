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
			return (
				translations.find(t => t.languageId === languageId)?.translation ||
				translations[0]?.translation ||
				''
			);
		};

		const transformLocation = (location: any, type: string) => ({
			id: location.id,
			name: filterTranslationsByLanguage(location.label.translations, languageId),
			icon: location.icon,
			type,
			children: location.cities?.length
				? location.counties.map((county: County) => transformLocation(county, 'county'))
				: location.city?.length
				? location.city.map((city: City) => transformLocation(city, 'city'))
				: location.suburb?.length
				? location.suburb.map((suburb: Suburb) => transformLocation(suburb, 'suburb'))
				: [],
		});

		const filteredLocations = locations.map(state => transformLocation(state, 'state'));

		return NextResponse.json(filteredLocations);
	} catch (error) {
		console.error('Error fetching locations:', error);
		return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
	}
}
