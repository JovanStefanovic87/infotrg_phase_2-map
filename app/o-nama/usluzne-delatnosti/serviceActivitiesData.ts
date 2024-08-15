import { BasicInformation } from '@/utils/helpers/types';

export const contentData: BasicInformation[] = [
	{
		id: 'prihodovanje-od-objavljivanja-reklama',
		title: '1.) OBJAVLJIVANJE REKLAMA',
		description: 'Postavljanje reklama na najistaknutijim mestima Infotrg platforme.',
		coverImage: '/images/usluzne-delatnosti/UD01.png',
	},
	{
		id: 'prihodovanje-od-izrade-reklama',
		title: '2.) IZRADA REKLAMA',
		description: 'Grafička priprema reklama shodno svim zahtevima oglašivača.',
		coverImage: '/images/usluzne-delatnosti/UD02.png',
	},
	{
		id: 'prihodovanje-od-usluznog-odrzavanja-veb-izloga',
		title: '3.) USLUŽNO ODRŽAVANJE VEB IZLOGA',
		description:
			'Privremeno ili stalno održavanje i uređivanje personalnih elektronskih prodajnih objekata (veb izloga).',
		coverImage: '/images/usluzne-delatnosti/UD03.png',
	},
	{
		id: 'prihodovanje-od-affiliate-posrednistva',
		title: '4.) AFFILIATE POSREDNIŠTVO',
		description:
			'Privremeno posredovanje u plasmanu i prodaji svih proizvoda u dogovoru sa prodavcima.',
		coverImage: '/images/usluzne-delatnosti/UD04.png',
	},
	{
		id: 'prihodovanje-od-starter-posrednistva',
		title: '5.) STARTER PROGRAM',
		description:
			'Prikupljanje sredstava za plasiranje na tržiište određenih proizvoda ili pokretanje proizvodnje.',
		coverImage: '/images/usluzne-delatnosti/UD05.png',
	},
	{
		id: 'prihodovanje-od-aukcija',
		title: '6.) AUKCIJE',
		description: 'Izlaganje proizvoda javnom nadmetanju u svrsi postizanja veće cene.',
		coverImage: '/images/usluzne-delatnosti/UD06.png',
	},
	{
		id: 'prihodovanje-od-dostave',
		title: '7.) DOSTAVA',
		description: 'Razvoz i dostava svih vrsta proizvoda na kućne adrese kupaca.',
		coverImage: '/images/usluzne-delatnosti/UD07.png',
	},
	{
		id: 'prihodovanje-na-osnovu-odlozenog-placanja',
		title: '8.) USLUGA ODLOŽENOG PLAĆANJA',
		description: 'Dostava proizvoda uz mogućnost odloženog plaćanja ili plaćanja na rate.',
		coverImage: '/images/usluzne-delatnosti/UD08.png',
	},
];

export const mapIdToPath = (id: string): string => {
	return `/o-nama/usluzne-delatnosti/${id}`;
};
