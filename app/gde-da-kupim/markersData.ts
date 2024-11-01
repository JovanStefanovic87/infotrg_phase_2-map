export interface Marker {
	id: string;
	position: google.maps.LatLngLiteral;
	title: string;
	description: string;
}

export const markers: Marker[] = [
	{
		id: '1',
		position: { lat: 46.08898824178309, lng: 19.646583762456302 },
		title: 'Ilona str.',
		description:
			'Ilona STR je osnovana 2022. godine. Ilona STR je osnovana 2022. godine. Ilona STR je osnovana 2022. godine. Ilona STR je osnovana 2022. godine.',
	},
	{
		id: '2',
		position: { lat: 46.088823583253536, lng: 19.646913332355243 },
		title: 'Mirko str.',
		description: 'Mirko STR je osnovan 2020. godine.',
	},
];

export const markers2: Marker[] = [
	{
		id: '3',
		position: { lat: 46.08727030109271, lng: 19.649737696534714 },
		title: 'Marker 3',
		description: 'Ilona STR je osnovana 2022. godine.',
	},
	{
		id: '4',
		position: { lat: 46.08663687745134, lng: 19.651300287463243 },
		title: 'Marker 4',
		description: 'Mirko STR je osnovan 2020. godine.',
	},
];
