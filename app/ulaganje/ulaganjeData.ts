import { ContentBlocksData } from '@/utils/helpers/types';

const padding16 = 16;
const padding32 = 32;

export interface BasicInformation {
	id: string;
	title: string;
	description: string;
	coverImage?: string;
}

export const contentData: BasicInformation[] = [
	{
		id: 'projekat-infotrg',
		title: 'PROJEKAT INFOTRG',
		description:
			'Infotrg je ekonomski projekat namenjen posredovanju između prodavaca i kupaca, direktnom plasiranju proizvoda i objavljavljivanju informacija iz oblasti trgovine putem specijalizovane digitalne platforme.',
		coverImage: '/images/home/NA01.jpg',
	},
	{
		id: 'plan-i-program-poslovanja',
		title: 'PLAN I PROGRAM POSLOVANJA',
		description:
			'Prema planu i programu poslovanja, Infotrg će se tehnički i kapacitetno razvijati do 31.03.2026. godine, nakon čega se očekuje period profitabilnog i samoodrživog poslovanja.',
		coverImage: '/images/ulaganje/UL02.jpg',
	},
	{
		id: 'investicioni-fond',
		title: 'INVESTICIONI FOND',
		description:
			'Tokom neprofitabilnog perioda (do 31.03.2026. godine), svi troškovi razvoja Infotrga biće pokriveni iz investicionog fonda, čija ukupna projektovana vrednost iznosi 50.000 evra. Sredstva iz fonda biće raspoređena i uložena u više razvojnih etapa projekta.',
		coverImage: '/images/ulaganje/UL03.jpg',
	},
	{
		id: 'investicioni-plan-i-program',
		title: 'INVESTICIONI PLAN I PROGRAM',
		description:
			'Investicioni fond obezbeđuju investitori svojim finansijskim ulozima, u skladu sa investicionim planom i programom koji propisuje njihovo suvlasništvo u projektu, nadležnosti upravljanja, garancije prihoda i druga prava i obaveze.',
		coverImage: '/images/ulaganje/UL04.jpg',
	},
	{
		id: 'prihodi-od-investicija',
		title: 'PRIHODI OD INVESTICIJA',
		description:
			'Tokom neprofitabilnog perioda, investitori ne mogu očekivati prihode, ali nakon 31.03.2026. godine garantuje im se minimalna mesečna zarada od 10% na sva dotadašnja uložena sredstva, plus dodatni prihodi, plus bonus procenti na sve investicije tokom ranog perioda ulaganja (do kraja 2024. godine).',
		coverImage: '/images/ulaganje/UL05.jpg',
	},
	{
		id: 'povrat-ulozenih-sredstava',
		title: 'POVRAT ULOŽENIH SREDSTAVA',
		description:
			'Investitori mogu u svakom trenutku zatražiti povrat sredstava uloženih u investicioni fond. U tom slučaju, dobijaju nazad svoj novac u razumnom vremenskom roku i u tačnom iznosu, ali nakon toga gube pravo na suvlasništvo u projektu i pravo na dalja prihodovanja.',
		coverImage: '/images/ulaganje/UL06.jpg',
	},
	{
		id: 'investitori',
		title: 'INVESTITORI',
		description:
			'Svi investitori su zvanično registrovani kao suvlasnici Infotrga u procentu koji odgovara visini uloženih sredstava. Njihova imena i kontakti javno su dostupni svim ostalim investitorima radi međusobne komunikacije.',
		coverImage: '/images/ulaganje/UL07.jpg',
	},
];

export const contentBlocksData: ContentBlocksData = {
	'investicioni-fond': [
		{
			type: 'list',
			listContent: [
				{
					type: 'paragraph1',
					text: 'Fond za planiranje i pripremu',
					amount: '4.272 EUR',
					subitems: [
						{ type: 'paragraph2', text: 'Priprema nacrta tehničkog plana', amount: '7,5 EUR' },
						{ type: 'paragraph2', text: 'Nominacija projekta', amount: '46 EUR' },
						{ type: 'paragraph2', text: 'Okupljanje saradnika', amount: '171 EUR' },
						{
							type: 'paragraph2',
							text: 'Testiranje i izrada Tehničkog plana',
							amount: '2.349 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Priprema Plana i programa poslovanja',
							amount: '468,5 EUR',
						},
						{ type: 'paragraph2', text: 'Priprema Ugovora o saradnji', amount: '155 EUR' },
						{ type: 'paragraph2', text: 'Priprema i održavanje budžeta', amount: '1.075 EUR' },
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za prikupljanje finansijskih sredstava',
					amount: '3.261 EUR',
					subitems: [
						{
							type: 'paragraph2',
							text: 'Priprema Investicionog plana i programa',
							amount: '407 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Priprema platforme za investicioni fond',
							amount: '993 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Oglašavanje Investicionog plana i programa',
							amount: '1.125,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Kontaktiranje potencijalnih investitora',
							amount: '735,5 EUR',
						},
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za uvođenje preglednika po mapama za buvljak',
					amount: '15.011 EUR',
					subitems: [
						{
							type: 'paragraph2',
							text: 'Priprema platforme za preglednik po mapama',
							amount: '5.341 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Popis buvljaka i objavljivanje informacija',
							amount: '3.890 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Upoznavanje prodavaca sa platformom',
							amount: '655,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Objavljivanje probnih besplatnih reklama',
							amount: '416 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Navođenje kupaca na veliki broj pregleda',
							amount: '3.958,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Navođenje prodavaca na plaćeno oglašavanje',
							amount: '750 EUR',
						},
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za uvođenje veb izloga za prodajne objekte na buvljaku',
					amount: '5.625 EUR',
					subitems: [
						{ type: 'paragraph2', text: 'Priprema platforme za veb izloge', amount: '3.928 EUR' },
						{ type: 'paragraph2', text: 'Otvaranje promotivnog veb izloga', amount: '397 EUR' },
						{ type: 'paragraph2', text: 'Promocija veb izloga prodavcima', amount: '1.300 EUR' },
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za uvođenje enciklopedije proizvoda na buvljaku',
					amount: '2.553,5 EUR',
					subitems: [
						{
							type: 'paragraph2',
							text: 'Priprema platforme za enciklopediju proizvoda',
							amount: '1.373 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Otvaranje promotivnih stranica enciklopedije proizvoda',
							amount: '526,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Promocija enciklopedije proizvoda prodavcima',
							amount: '654 EUR',
						},
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za ekspanziju projekta u Subotici',
					amount: '16.218,5 EUR',
					subitems: [
						{ type: 'paragraph2', text: 'Priprema platforme za Suboticu', amount: '8 EUR' },
						{
							type: 'paragraph2',
							text: 'Popis Subotice i objavljivanje informacija',
							amount: '8.887,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Navođenje prodavaca na upotrebu veb izloga',
							amount: '3.660 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Objavljivanje probnih besplatnih reklama Subotica',
							amount: '119 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Navođenje kupaca na veliki broj pregleda Subotica',
							amount: '2.644 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Navođenje prodavaca na plaćeno oglašavanje Subotica',
							amount: '900 EUR',
						},
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za ekspanziju projekta izvan Subotice',
					amount: '3.059 EUR',
					subitems: [
						{
							type: 'paragraph2',
							text: 'Priprema platforme za objavljivanje informacija širom Srbije',
							amount: '8 EUR',
						},
						{ type: 'paragraph2', text: 'Osnivanje firme', amount: '958 EUR' },
						{
							type: 'paragraph2',
							text: 'Organizovanje međugradskih inkasanata',
							amount: '443,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Pribavljanje spiska svih prodajnih objekata',
							amount: '90,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Priprema prezentacije uspešnosti oglašavanja',
							amount: '0 EUR',
						},
						{ type: 'paragraph2', text: 'Navođenje prodavaca na oglašavanje', amount: '436 EUR' },
						{ type: 'paragraph2', text: 'Promocija platforme putem medija', amount: '1.123 EUR' },
					],
					listStyle: 'number',
				},
			],
		},
	],
	'Priprema nacrta tehnickog plana': [
		{
			type: 'text',
			content:
				'Investicioni fond obuhvata sva potrebna finansijska sredstva koja se ulažu u razvoj projekta sve do njegovog samostalnog funkcionisanja. Sredstva iz investicionog fonda se raspoređuju i ulažu u više razvojnih etapa projekta.',
		},
		{ type: 'hr', marginY: '4' },
		{
			type: 'h2',
			content: 'VREDNOST INVESTICIONOG FONDA',
		},
		{
			type: 'H2BoldCenter',
			content: '50.000 EUR',
		},
		{ type: 'hr', marginY: '4' },
		{
			type: 'h2',
			content: 'RASPODELA INVESTICIONOG FONDA',
		},
		{
			type: 'list',
			listContent: [
				{
					type: 'paragraph1',
					text: 'Fond za planiranje i pripremu',
					amount: '4.315 EUR',
					subitems: [
						{ type: 'paragraph2', text: 'Priprema nacrta tehničkog plana', amount: '7,5 EUR' },
						{ type: 'paragraph2', text: 'Nominacija projekta', amount: '46 EUR' },
						{ type: 'paragraph2', text: 'Okupljanje saradnika', amount: '171 EUR' },
						{
							type: 'paragraph2',
							text: 'Testiranje i izrada Tehničkog plana',
							amount: '2.349 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Priprema Plana i programa poslovanja',
							amount: '511,5 EUR',
						},
						{ type: 'paragraph2', text: 'Priprema Ugovora o saradnji', amount: '155 EUR' },
						{ type: 'paragraph2', text: 'Priprema i održavanje budžeta', amount: '1.075 EUR' },
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za prikupljanje finansijskih sredstava',
					amount: '3.261 EUR',
					subitems: [
						{
							type: 'paragraph2',
							text: 'Priprema Investicionog plana i programa',
							amount: '407 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Priprema platforme za investicioni fond',
							amount: '993 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Oglašavanje Investicionog plana i programa',
							amount: '1.125,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Kontaktiranje potencijalnih investitora',
							amount: '735,5 EUR',
						},
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za uvođenje veb izloga za prodajne objekte na buvljaku',
					amount: '5.625 EUR',
					subitems: [
						{ type: 'paragraph2', text: 'Priprema platforme za veb izloge', amount: '3.928 EUR' },
						{ type: 'paragraph2', text: 'Otvaranje promotivnog veb izloga', amount: '397 EUR' },
						{ type: 'paragraph2', text: 'Promocija veb izloga prodavcima', amount: '1.300 EUR' },
					],
					listStyle: 'number',
				},
				{
					type: 'paragraph1',
					text: 'Fond za uvođenje enciklopedije proizvoda na buvljaku',
					amount: '2.553,5 EUR',
					subitems: [
						{
							type: 'paragraph2',
							text: 'Priprema platforme za enciklopediju proizvoda',
							amount: '1.373 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Otvaranje promotivnih stranica enciklopedije proizvoda',
							amount: '526,5 EUR',
						},
						{
							type: 'paragraph2',
							text: 'Promocija enciklopedije proizvoda prodavcima',
							amount: '654 EUR',
						},
					],
					listStyle: 'number',
				},
			],
		},
	],
	'prihodi-od-investicija': [
		{
			type: 'h3Block',
			content:
				'Svaki investitor može očekivati stalni mesečni prihod u iznosu od 10% na ukupna uložena sredstva',
		},
		{
			type: 'plus',
		},
		{
			type: 'h3Block',
			content: 'povremeni prihod od dodatnih uslužnih delatnosti',
		},
		{
			type: 'plus',
		},
		{
			type: 'h3Block',
			content: 'mogući prihod od poslovanja u inostranstvu',
		},
		{
			type: 'plus',
		},
		{
			type: 'h3Block',
			content: 'uslovni prihod od bonus procenata',
		},
		{ type: 'hr', height: 2 },
		{
			type: 'h2',
			content: 'OČEKIVANI PRIHOD',
		},
		{
			type: 'h4',
			content: 'Poreklo očekivanog prihoda:',
			align: 'left',
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: '➤ Prihodovanje od plaćenog oglašavanja',
			paddingLeft: padding16,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-objavljivanja-reklama',
		},
		{
			type: 'h4',
			content: 'Parametri očekivanog prihoda:',
			align: 'left',
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: '➤ Cena plaćene reklame: 10 evra + PDV',
			paddingLeft: padding16,
		},
		{
			type: 'pNormal',
			content: 'Tržište plaćenog oglašavanja: 17 reklama / 125.000 stanovnika / 1 mesec',
			paddingLeft: padding32,
		},
		{
			type: 'h4',
			content: 'Dospeće očekivanog prihoda:',
			align: 'left',
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: '➤ Očekivani mesečni prihod do 31.03.2026. godine iznosi 0 evra',
			paddingLeft: padding16,
		},
		{
			type: 'pNormal',
			content: 'Očekivani mesečni prihod od 01.04.2026. godine iznosi 10% od uloženih sredstava.',
			paddingLeft: padding32,
		},
		{
			type: 'h4',
			content: 'Primeri očekivanih prihoda u odnosu na uloge:',
			align: 'left',
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: '➤ Uložena sredstva do 31.03.2026. godine = 100 evra',
			paddingLeft: padding16,
		},
		{
			type: 'pNormal',
			content: 'Mesečni prihod od 01.04.2026. godine = 10 evra',
			paddingLeft: padding32,
		},
		{
			type: 'pNormal',
			content: '➤ Uložena sredstva do 31.03.2026. godine = 1.000 evra',
			paddingLeft: padding16,
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: 'Mesečni prihod od 01.04.2026. godine = 100 evra',
			paddingLeft: padding32,
		},
		{
			type: 'pNormal',
			content: '➤ Uložena sredstva do 31.03.2026. godine = 5.000 evra',
			paddingLeft: padding16,
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: 'Mesečni prihod od 01.04.2026. godine = 500 evra',
			paddingLeft: padding32,
		},
		{
			type: 'h4',
			content:
				'Kalkulacija očekivanog prihoda (na primeru pretpostavljenog uloga u iznosu od 1.000 evra)',
			align: 'left',
			paddingTop: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Populacija ispitane tržišne regije = 125.000 stanovnika',
			bullet: 'a',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Populacija na užem području Srbije = 7.500.000 stanovnika',
			bullet: 'b',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Ukupni tržišni obim Srbije = (b / a) = 60 tržišnih regija',
			bullet: 'c',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Mesečni promet plaćenog oglašavanja po jednoj tržišnoj regiji = 17 reklama',
			bullet: 'd',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content:
				'Ukupni mesečni promet plaćenog oglašavanja svih tržišnih regija = (c x d) = 1.020 reklama',
			bullet: 'e',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Cena objavljivanja jedne reklame tokom jednog meseca = 10 evra',
			bullet: 'f',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Ukupan bruto mesečni prihod od plaćenog oglašavanja = (e x f) = 10.200 evra',
			bullet: 'g',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Predviđeni mesečni odbitak na ime nenaplaćenih reklama = 200 evra',
			bullet: 'h',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Ukupan neto mesečni prihod od plaćenog oglašavanja = (g - h) = 10.000 evra',
			bullet: 'i',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Fond za prihode investitora = 50 % neto prihoda',
			bullet: 'j',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Ukupni mesečni prihod investitora = (i x j) = 5.000 evra',
			bullet: 'k',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Vrednost investicionog fonda = 50.000 evra',
			bullet: 'l',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Pretpostavljen ukupan iznos uloga jednog investitora do 31.03.2026. = 1.000 evra',
			bullet: 'm',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Učešće jednog investitora na uloženih 1.000 evra = (m / l) = 1/50 = 2 % udela',
			bullet: 'n',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldList',
			content: 'Mesečni prihod jednog investitora na uloženih 1.000 evra = (k x n) = 100 evra',
			bullet: 'o',
			paddingLeft: padding16,
		},
		{ type: 'hr', height: 2 },
		{
			type: 'h2',
			content: 'BONUS PRIHODI',
		},
		{
			type: 'h4',
			content: 'Poreklo bonus prihoda:',
			align: 'left',
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: 'Dodatni prihodi stečeni poslovanjima u nepredvidivim obimima',
			paddingLeft: padding16,
		},
		{
			type: 'h4',
			content: 'Mogući bonus prihodi:',
			align: 'left',
			paddingTop: padding16,
		},
		{
			type: 'pNormal',
			content: 'Bonus prihodi od dodatnih uslužnih delatnosti',
			paddingLeft: padding16,
		},
		{
			type: 'pNormal',
			content: 'Prihodi od dodatnog oglašavanja',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-objavljivanja-reklama',
		},
		{
			type: 'pNormal',
			content: 'Prihodi od izrade reklama',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-izrade-reklama',
		},
		{
			type: 'pNormal',
			content: 'Prihodi od održavanja veb izloga',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-usluznog-odrzavanja-veb-izloga',
		},
		{
			type: 'pNormal',
			content: 'Prihodi od affiliate marketinga',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-affiliate-posrednistva',
		},
		{
			type: 'pNormal',
			content: 'Prihodi od starter programa',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-starter-posrednistva',
		},
		{
			type: 'pNormal',
			content: 'Prihodi od aukcija',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-aukcija',
		},
		{
			type: 'pNormal',
			content: 'Prihodi od dostave',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-od-dostave',
		},
		{
			type: 'pNormal',
			content: 'Prihodi od usluge odloženog plaćanja',
			paddingLeft: padding32,
			link: '/o-nama/usluzne-delatnosti/prihodovanje-na-osnovu-odlozenog-placanja',
		},
		{
			type: 'pNormal',
			content: 'Bonus procenti',
			paddingLeft: padding32,
			link: '/ulaganje/investicioni-plan-i-program/bonus-procenti',
		},
		{
			type: 'pNormal',
			content: 'Bonusi iz inostranstva (ukoliko se obim posla proširi van granica Srbije)',
			paddingLeft: padding16,
		},
		{
			type: 'TextBoldCustom',
			label: 'Dospeće bonus prihoda:',
			content: 'povremeno ili uslovno',
			paddingTop: padding16,
		},
		{
			type: 'TextBoldCustom',
			label: 'Kalkulabilnost prihoda:',
			content: 'promenjljiva ili neodređena',
			paddingTop: padding16,
		},
	],
};

export const hyperlinks = [
	{
		text: 'Fond za planiranje i pripremu',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Fond-za-planiranje-i-pripremu'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema nacrta tehničkog plana',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-nacrta-tehnickog-plana'
		).toLowerCase()}`,
	},
	{
		text: 'Nominacija projekta',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent('Nominacija-projekta').toLowerCase()}`,
	},
	{
		text: 'Okupljanje saradnika',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent('Okupljanje-saradnika').toLowerCase()}`,
	},
	{
		text: 'Testiranje i izrada Tehničkog plana',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Testiranje-i-izrada-Tehnickog-plana'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema Plana i programa poslovanja',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'priprema-plana-i-programa-poslovanja'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema Ugovora o saradnji',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'priprema-ugovora-o-saradnji'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema i održavanje budžeta',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'priprema-i-odrzavanje-budzeta'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema Investicionog plana i programa',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-Investicionog-plana-i-programa'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema platforme za investicioni fond',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-platforme-za-investicioni-fond'
		).toLowerCase()}`,
	},
	{
		text: 'Oglašavanje Investicionog plana i programa',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Oglasavanje-Investicionog-plana-i-programa'
		).toLowerCase()}`,
	},
	{
		text: 'Kontaktiranje potencijalnih investitora',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Kontaktiranje-potencijalnih-investitora'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema platforme za preglednik po mapama',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-platforme-za-preglednik-po-mapama'
		).toLowerCase()}`,
	},
	{
		text: 'Popis buvljaka i objavljivanje informacija',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Popis-buvljaka-i-objavljivanje-informacija'
		).toLowerCase()}`,
	},
	{
		text: 'Upoznavanje prodavaca sa platformom',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Upoznavanje-prodavaca-sa-platformom'
		).toLowerCase()}`,
	},
	{
		text: 'Objavljivanje probnih besplatnih reklama',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Objavljivanje-probnih-besplatnih-reklama'
		).toLowerCase()}`,
	},
	{
		text: 'Navođenje kupaca na veliki broj pregleda',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Navodjenje-kupaca-na-veliki-broj-pregleda'
		).toLowerCase()}`,
	},
	{
		text: 'Navođenje prodavaca na plaćeno oglašavanje',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Navodjenje-prodavaca-na-placeno-oglasavanje'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema platforme za veb izloge',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-platforme-za-veb-izloge'
		).toLowerCase()}`,
	},
	{
		text: 'Otvaranje promotivnog veb izloga',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Otvaranje-promotivnog-veb-izloga'
		).toLowerCase()}`,
	},
	{
		text: 'Promocija veb izloga prodavcima',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Promocija-veb-izloga-prodavcima'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema platforme za enciklopediju proizvoda',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-platforme-za-enciklopediju-proizvoda'
		).toLowerCase()}`,
	},
	{
		text: 'Otvaranje promotivnih stranica enciklopedije proizvoda',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Otvaranje-promotivnih-stranica-enciklopedije-proizvoda'
		).toLowerCase()}`,
	},
	{
		text: 'Promocija enciklopedije proizvoda prodavcima',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Promocija-enciklopedije-proizvoda-prodavcima'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema platforme za Suboticu',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-platforme-za-Suboticu'
		).toLowerCase()}`,
	},
	{
		text: 'Popis Subotice i objavljivanje informacija',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Popis-Subotice-i-objavljivanje-informacija'
		).toLowerCase()}`,
	},
	{
		text: 'Navođenje prodavaca na upotrebu veb izloga',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Navodjenje-prodavaca-na-upotrebu-veb-izloga'
		).toLowerCase()}`,
	},
	{
		text: 'Objavljivanje probnih besplatnih reklama Subotica',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Objavljivanje-probnih-besplatnih-reklama-subotica'
		).toLowerCase()}`,
	},
	{
		text: 'Navođenje kupaca na veliki broj pregleda Subotica',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Navodjenje-kupaca-na-veliki-broj-pregleda-subotica'
		).toLowerCase()}`,
	},
	{
		text: 'Navođenje prodavaca na plaćeno oglašavanje',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Navodjenje-prodavaca-na-placeno-oglasavanje'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema platforme za objavljivanje informacija širom Srbije',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-platforme-za-objavljivanje-informacija-sirom-srbije'
		).toLowerCase()}`,
	},
	{
		text: 'Osnivanje firme',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent('Osnivanje-firme').toLowerCase()}`,
	},
	{
		text: 'Organizovanje međugradskih inkasanata',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Organizovanje-medjugradskih-inkasanata'
		).toLowerCase()}`,
	},
	{
		text: 'Pribavljanje spiska svih prodajnih objekata',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Pribavljanje-spiska-svih-prodajnih-objekata'
		).toLowerCase()}`,
	},
	{
		text: 'Priprema prezentacije uspešnosti oglašavanja',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Priprema-prezentacije-uspesnosti-oglasavanja'
		).toLowerCase()}`,
	},
	{
		text: 'Navođenje prodavaca na plaćeno oglašavanje Subotica',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Navodjenje-prodavaca-na-placeno-oglasavanje-subotica'
		).toLowerCase()}`,
	},
	{
		text: 'Navođenje prodavaca na oglašavanje',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Navodjenje-prodavaca-na-oglasavanje'
		).toLowerCase()}`,
	},
	{
		text: 'Promocija platforme putem medija',
		url: `/ulaganje/investicioni-fond/${encodeURIComponent(
			'Promocija-platforme-putem-medija'
		).toLowerCase()}`,
	},
];

const oNamaIds = new Set(['projekat-infotrg']);
const pppIds = new Set(['plan-i-program-poslovanja']);
const povratIds = new Set(['povrat-ulozenih-sredstava']);

export const mapIdToPath = (id: string): string => {
	if (oNamaIds.has(id)) {
		return `/o-nama/`;
	} else if (pppIds.has(id)) {
		return `/o-nama/${id}`;
	} else if (povratIds.has(id)) {
		return `/ulaganje/investicioni-plan-i-program/${id}`;
	} else {
		return `/ulaganje/${id}`;
	}
};
