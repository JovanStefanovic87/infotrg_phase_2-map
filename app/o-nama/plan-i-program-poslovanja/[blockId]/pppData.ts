import { ContentBlocksData, PppLinksData } from '@/utils/helpers/types';

const bolderLine = 4;

const marginLeftSmall = '2vw';
const marginLeftMedium = '4vw';

export const pppLinksData: PppLinksData[] = [
	{
		id: 'septembar-2022',
		label: 'SEPTEMBAR 2022.',
		amount: 'planirani fond: 7,5 EUR',
	},
	{
		id: 'oktobar-2022-avgust-2023',
		label: 'Oktobar 2022. - avgust 2023.',
		amount: 'planirani fond: 1.456,5 EUR',
	},
	{
		id: 'septembar-2023',
		label: 'Septembar 2023.',
		amount: 'planirani fond: 200 EUR',
	},
	{
		id: 'oktobar-2023',
		label: 'Oktobar 2023.',
		amount: 'planirani fond: 116,5 EUR',
	},
	{
		id: 'januar-2024',
		label: 'Januar 2024.',
		amount: 'planirani fond: 57 EUR',
	},
	{
		id: 'februar-2024',
		label: 'Februar 2024.',
		amount: 'planirani fond: 200 EUR',
	},
	{
		id: 'mart-2024',
		label: 'Mart - April 2024.',
		amount: 'planirani fond: 300 EUR',
	},
	{
		id: 'maj-2024',
		label: 'Maj 2024.',
		amount: 'planirani fond: 95 EUR',
	},
	{
		id: 'jun-2024',
		label: 'Jun 2024.',
		amount: 'planirani fond: 1.806 EUR',
	},
	{
		id: 'jul-2024',
		label: 'Jul 2024.',
		amount: 'planirani fond: 1.522 EUR',
	},
	{
		id: 'avgust-2024',
		label: 'Avgust 2024.',
		amount: 'planirani fond: 1.859,5 EUR',
	},
	{
		id: 'septembar-2024',
		label: 'Septembar 2024.',
		amount: 'planirani fond: 2.376,5 EUR',
	},
	{
		id: 'oktobar-2024',
		label: 'Oktobar 2024.',
		amount: 'planirani fond: 2.254 EUR',
	},
	{
		id: 'novembar-2024',
		label: 'Novembar 2024.',
		amount: 'planirani fond: 3.755 EUR',
	},
	{
		id: 'decembar-2024',
		label: 'Decembar 2024.',
		amount: 'planirani fond: 2.964 EUR',
	},
	{
		id: 'januar-2025',
		label: 'Januar 2025.',
		amount: 'planirani fond: 1.857 EUR',
	},
	{
		id: 'februar-2025',
		label: 'Februar 2025.',
		amount: 'planirani fond: 2.726,5 EUR',
	},
	{
		id: 'mart-2025',
		label: 'Mart 2025.',
		amount: 'planirani fond: 2.645 EUR',
	},
	{
		id: 'april-2025',
		label: 'April 2025.',
		amount: 'planirani fond: 2.269 EUR',
	},
	{
		id: 'maj-2025',
		label: 'Maj 2025.',
		amount: 'planirani fond: 2.991,5 EUR',
	},
	{
		id: 'jun-2025',
		label: 'Jun 2025.',
		amount: 'planirani fond: 3.577,5 EUR',
	},
	{
		id: 'jul-2025',
		label: 'Jul 2025.',
		amount: 'planirani fond: 2.747 EUR',
	},
	{
		id: 'avgust-2025',
		label: 'Avgust 2025.',
		amount: 'planirani fond: 2.393 EUR',
	},
	{
		id: 'septembar-2025',
		label: 'Septembar 2025.',
		amount: 'planirani fond: 3.776,5 EUR',
	},
	{
		id: 'oktobar-2025',
		label: 'Oktobar 2025.',
		amount: 'planirani fond: 1.157 EUR',
	},
	{
		id: 'novembar-2025-mart-2026',
		label: 'Novembar 2025. - Mart 2026.',
		amount: 'planirani fond: 5.006 EUR',
	},
];
export const contentBlocksData: ContentBlocksData = {
	'septembar-2022': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.3.) RAZMATRANJE NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator razmatra predloženi nacrt tehničkog plana i odlučuje o njegovim eventualnim izmenama ili dopunama. ',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2022/09',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 7,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.1.1.)  GRAFIČKA PRIPREMA NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Autor izrađuje nacrt tehničkog plana projekta čija centralna tema je veb platforma namenjena oglašavanju proizvoda. U tehničkom planu je predstavljeno funkcionisanje platforme i njen dizajn.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2022/09',
				optimum: '1 plan',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.1.2.) ŠTAMPANJE NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Autor priprema nacrt tehničkog plana u štampanoj formi, pogodan za pokazivanje i deljenje potencijalnim saradnicima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2022/09',
				optimum: '5 nacrta',
				angažman: '0 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.2.1.) ZAŠTITA AUTORSKIH PRAVA',
		},
		{
			type: 'pNormal',
			content: 'Autor određuje ime projekta i na isti vrši zaštitu autorskih prava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2022/09',
				optimum: '1 projekat',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.3.1.) OKUPLJANJE SARADNIKA',
		},
		{
			type: 'pNormal',
			content:
				'Autor okuplja oko sebe petoricu saradnika kojima poverava realizaciju tehničkog plana: koordinatora projekta, vebmastera, administratora, marketing menadžera i PR menadžera. ',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2022/09',
				optimum: '1 sastanak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.1.) RAZMATRANJE NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator razmatra predloženi nacrt tehničkog plana i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2022/09',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.4.) RAZMATRANJE NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer razmatra predloženi nacrt tehničkog plana i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2022/09',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.5.) RAZMATRANJE NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer razmatra predloženi nacrt tehničkog plana i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'pr menadžer',
				period: '2022/09',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.2.) RAZMATRANJE NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster razmatra predloženi nacrt tehničkog plana i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2022/09',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
	],
	'oktobar-2022-avgust-2023': [
		{
			type: 'h2',
			content: 'OKTOBAR 2022.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (1/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2022/10',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'NOVEMBAR 2022.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (2/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2022/11',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'DECEMBAR 2022.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (3/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2022/12',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'JANUAR 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (4/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/01',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'FEBRUAR 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 286,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 171 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.3.2.) NABAVKA RAČUNARA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer obezbeđuje računar za potrebe svog rada, putem sredstava iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2023/02',
				optimum: '1 računar',
				angažman: '0 h',
				fond: '171 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (5/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/02',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'MART 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (6/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/03',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'APRIL 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (7/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/04',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},

		{
			type: 'h2',
			content: 'MAJ 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 130,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 15 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.2.3.) OBNOVA INTERNET DOMENA (1/3)',
		},
		{
			type: 'pNormal',
			content: 'Autor vrši godišnju obnovu internet domena sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2023/05',
				optimum: '1 domen',
				angažman: '0 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'APRIL 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (8/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/05',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'JUN 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (9/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/06',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'JUL 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 115,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(11,5 h - 115,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.8.) IZRADA PROBNE PLATFORME (10/10)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu nacrta tehničkog plana, vebmaster izrađuje probnu verziju platforme koja je pogodna za pregled na mobilnim telefonima. Na probnoj platformi je prikazan dizajn njenih stranica, sve njene funkcije i relacije između stranica, kao i drugi elementi neophodni da bi se moglo sprovesti testiranje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/07',
				optimum: '1,5 relacija',
				angažman: '11,5 h',
				fond: '115,5 EUR',
			},
		},
		{
			type: 'hr',
			height: bolderLine,
		},
		{
			type: 'h2',
			content: 'AVGUST 2023.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 0 EUR',
			color: 'black',
		},
		{
			type: 'hr',
			height: bolderLine,
		},
	],
	'septembar-2023': [
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20,5 h - 200 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.12.) ANKETA TEHNIČKOG PLANA (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster u više navrata sprovodi testiranje tehničkog plana tako što obavlja anketu sa nasumičnim ispitanicima, pokazujući im probnu platformu na osnovu čega se procenjuje kako se ispitanici snalaze u upotrebi platforme i kako ocenjuju njenu svrhu, funkcionalnost i dizajn, a rezultati ankete se upisuju u anketni formular.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/09',
				optimum: '5 ispitanika',
				angažman: '8,5 h',
				fond: '83,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.4.14.) DORADA PROBNE PLATFORME (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko rezultati ankete nisu zadovoljavajući, vebmaster u saradnji sa autorom vrši određene izmene u samoj strukturi funkcionisanja ili dizajna platforme, pripremajući je za ponovnu anketu, sve dok rezultati ne budu zadovoljavajući.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/09',
				optimum: '7,5 relacija',
				angažman: '12 h',
				fond: '116,5 EUR',
			},
		},
		{
			type: 'hr',
		},
	],
	'oktobar-2023': [
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(12 h - 116,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.14.) DORADA PROBNE PLATFORME (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko rezultati ankete nisu zadovoljavajući, vebmaster u saradnji sa autorom vrši određene izmene u samoj strukturi funkcionisanja ili dizajna platforme, pripremajući je za ponovnu anketu, sve dok rezultati ne budu zadovoljavajući.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2023/10',
				optimum: '7,5 relacija',
				angažman: '12 h',
				fond: '116,5 EUR',
			},
		},
		{
			type: 'hr',
		},
	],
	'januar-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(10 h - 57 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.9.) IZRADA I ŠTAMPANJE ANKETNOG FORMULARA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator grafički priprema i štampa formular u koji će se upisivati rezultati prilikom testiranja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/01',
				optimum: '4 formulara',
				angažman: '10 h',
				fond: '57 EUR',
			},
		},
		{
			type: 'hr',
		},
	],
	'februar-2024': [
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(8,5 h - 50 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.13.) ANKETA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Grafički dizajner sprovodi testiranje tehničkog plana tako što obavlja anketu sa nasumičnim ispitanicima, pokazujući im probnu platformu na osnovu čega se procenjuje kako se ispitanici snalaze u upotrebi platforme i kako ocenjuju njenu svrhu, funkcionalnost i dizajn, a rezultati ankete se upisuju u anketni formular.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/02',
				optimum: '5 ispitanika',
				angažman: '8,5 h',
				fond: '50 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(8,5 h - 50 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.11.) ANKETA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer sprovodi testiranje tehničkog plana tako što obavlja anketu sa nasumičnim ispitanicima, pokazujući im probnu platformu na osnovu čega se procenjuje kako se ispitanici snalaze u upotrebi platforme i kako ocenjuju njenu svrhu, funkcionalnost i dizajn, a rezultati ankete se upisuju u anketni formular.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing dizajner',
				period: '2024/02',
				optimum: '5 ispitanika',
				angažman: '8,5 h',
				fond: '50 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(8,5 h - 50 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.10.) ANKETA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer sprovodi testiranje tehničkog plana tako što obavlja anketu sa nasumičnim ispitanicima, pokazujući im probnu platformu na osnovu čega se procenjuje kako se ispitanici snalaze u upotrebi platforme i kako ocenjuju njenu svrhu, funkcionalnost i dizajn, a rezultati ankete se upisuju u anketni formular.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'pr dizajner',
				period: '2024/02',
				optimum: '5 ispitanika',
				angažman: '8,5 h',
				fond: '50 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(17 h - 50 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.12.) ANKETA TEHNIČKOG PLANA (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster u više navrata sprovodi testiranje tehničkog plana tako što obavlja anketu sa nasumičnim ispitanicima, pokazujući im probnu platformu na osnovu čega se procenjuje kako se ispitanici snalaze u upotrebi platforme i kako ocenjuju njenu svrhu, funkcionalnost i dizajn, a rezultati ankete se upisuju u anketni formular.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'pr dizajner',
				period: '2024/02',
				optimum: '5 ispitanika',
				angažman: '17 h',
				fond: '50 EUR',
			},
		},
		{
			type: 'hr',
		},
	],
	'mart-2024': [
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(30 h - 300 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.7.) DORADA NACRTA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Shodno studiji tehničke izvodljivosti, vebmaster vrši doradu ili dopunu nacrta tehničkog plana.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/03',
				optimum: '1 nacrt',
				angažman: '30 h',
				fond: '300 EUR',
			},
		},
		{
			type: 'hr',
		},
	],
	'maj-2024': [
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 15 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.2.3.) OBNOVA INTERNET DOMENA (2/3)',
		},
		{
			type: 'pNormal',
			content: 'Autor vrši godišnju obnovu internet domena sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/05',
				optimum: '1 domen',
				angažman: '0 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(8 h - 80 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.6.) STUDIJA TEHNIČKE IZVODLJIVOSTI',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster sprovodi studiju tehničke izvodljivosti na osnovu nacrta tehničkog plana i idejnih rešenja autora, testirajući opcije i mogućnosti tehničke realizacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/05',
				optimum: '1 test',
				angažman: '8 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'hr',
		},
	],
	'jun-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(6 h - 30 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.20.) POTPISIVANJE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje odštampani Tehnički plan.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.4.) PRIPREMA PLANA RADA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator podnosi izveštaj u kojem procenjuje sve svoje planirane aktivnosti oko projekta, predviđa svoj angažman i utrošeno vreme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '6 h',
				fond: '30 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.11.) RAZMATRANJE NACRTA PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator razmatra predloženi nacrt plana i programa poslovanja i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.18.) POTPISIVANJE PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Plan i program poslovanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.4.) RAZMATRANJE NACRTA UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator razmatra predloženi nacrt ugovora o saradnji i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.11.) POTPISIVANJE UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/06',
				optimum: '4 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.3.) POTPISIVANJE UGOVORA O DELU ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Ugovor o delu za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(96 h - 511 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.15.) IZRADA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko su rezultati ankete zadovoljavajući, autor pristupa izradi Tehničkog plana kao zvaničnog dokumenta na osnovu kojeg će se izrađivati veb platforma.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '7,5 relacija',
				angažman: '45 h',
				fond: '225 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.4.16.) ŠTAMPANJE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Pored izrade u elektronskom obliku, autor priprema Tehnički plan i u formi štampanog dokumenta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '60 stranica',
				angažman: '0 h',
				fond: '15,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.4.17.) POTPISIVANJE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Autor potpisuje odštampani Tehnički plan.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.1.) PRIPREMA PLANA RADA',
		},
		{
			type: 'pNormal',
			content:
				'Autor podnosi izveštaj u kojem procenjuje sve svoje planirane aktivnosti oko projekta, predviđa svoj angažman i utrošeno vreme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '6 h',
				fond: '30 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.8.) IZRADA NACRTA PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu dostavljenih planova rada svih članova upravnog tima, autor izrađuje nacrt plana i programa poslovanja u kojem sažeto predstavlja redosled svih poslovnih koraka i vremenske rokove potrebne za njihovu realizaciju.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '60 stranica',
				angažman: '30 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.14.) IZRADA PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu odobrenog nacrta, autor sastavlja sveobuhvatni raspored rada, potom u elektronskom obliku izrađuje Plan i program poslovanja koji, kao zvanični dokument, određuje periode razvoja u realizaciji projekta, vremenske rokove i propisuje sve dalje korake kojih će se pridržavati svi članovi upravnog tima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '60 stranica',
				angažman: '15 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.15.) ŠTAMPANJE PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade u elektronskom obliku, autor priprema Plan i program poslovanja u formi štampanog dokumenta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '60 stranica',
				angažman: '0 h',
				fond: '15,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.16.) POTPISIVANJE PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content: 'Autor potpisuje Plan i program poslovanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.2.) RAZMATRANJE NACRTA UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content:
				'Autor razmatra predloženi nacrt ugovora o saradnji i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.8.) POTPISIVANJE UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content: 'Autor potpisuje Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/06',
				optimum: '4 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(6 h - 30 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.5.7.) PRIPREMA PLANA RADA',
		},
		{
			type: 'pNormal',
			content:
				'Grafički dizajner podnosi izveštaj u kojem procenjuje sve svoje planirane aktivnosti oko projekta, predviđa svoj angažman i utrošeno vreme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '6 h',
				fond: '30 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(38 h - 299 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.18.) POTPISIVANJE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje odštampani Tehnički plan.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.2.) PRIPREMA PLANA RADA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator podnosi izveštaj u kojem procenjuje sve svoje planirane aktivnosti oko projekta, predviđa svoj angažman i utrošeno vreme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '6 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.9.) RAZMATRANJE NACRTA PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator razmatra predloženi nacrt plana i programa poslovanja i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.17.) POTPISIVANJE PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Plan i program poslovanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.22.) IZRADA TABELE ZA BELEŽENJE OSTVARENIH CILJEVA',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Plana i programa poslovanja, koordinator izrađuje u elektronskom obliku tabelu koja prikazuje sve zadate radne ciljeve i u kojoj se evidentiraju realizovani koraci u razvoju projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '30 stranica',
				angažman: '6 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.1.) IZRADA NACRTA UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Plana i programa poslovanja, koordinator izrađuje nacrt ugovora o saradnji u kojem u kratkim crtama opisuje sva prava i obaveze svih lica uključenih u projekat.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '30 stranica',
				angažman: '10 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.7.) IZRADA I ŠTAMPANJE UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu odobrenog nacrta, koordinator izrađuje i štampa Ugovor o saradnji kao zvanični dokument koji reguliše prava i obaveze svih lica uključenih u projekat.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '30 stranica',
				angažman: '10 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.9.) POTPISIVANJE UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '4 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.1.) PRIPREMA DOKUMENTA ZA EVIDENCIJU INVENTARA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator priprema elektronski dokument u kojem se vodi popis i evidencija sve opreme potrebne za osposobljavanje i funkcionisanje projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 dokument',
				angažman: '2 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.3.) PRIPREMA DOKUMENTA ZA EVIDENCIJU BUDŽETA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator priprema elektronski dokument u kojem se vodi evidencija svih novčanih transakcija vezanih za projekat i stanje budžeta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 dokument',
				angažman: '2 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.5.) PRIPREMA BUDŽETNE KASE',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator uspostavlja bezbedan sistem odlaganja, čuvanja i upotrebe uloženih novčanih sredstava, i o tome upoznaje samo svog imenovanog zamenika.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 budžetna kasa',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.6.) IZRADA PRIZNANICA ZA INTERNE NOVČANE TRANSAKCIJE',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator priprema u elektronskom obliku šablon priznanica za sve interne novčane transakcije, prihode i rashode.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 šablon',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi njegovi radni zadaci, rokovi i naknade za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.2.) POTPISIVANJE UGOVORA O DELU ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.19.) PRIPREMA OBRASCA ZA IZVEŠTAVANJE O REZULTATIMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator priprema elektronski obrazac namenjen prezentaciji poslovnih rezultata, pogodan za periodično dostavljanje na uvid svim investitorima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '1 obrazac',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.2.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA VEBMASTEROM ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi vebmasterovi radni zadaci, rokovi i naknade za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.2.2.) POTPISIVANJE UGOVORA O DELU SA VEBMASTEROM ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa vebmasterom za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA ADMINISTRATOROM ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi administratorovi radni zadaci, rokovi i naknade za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '0 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.2.) POTPISIVANJE UGOVORA O DELU SA ADMINISTRATOROM ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa administratorom za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(6 h - 30 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.21.) POTPISIVANJE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje odštampani Tehnički plan.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.5.) PRIPREMA PLANA RADA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer podnosi izveštaj u kojem procenjuje sve svoje planirane aktivnosti oko projekta, predviđa svoj angažman i utrošeno vreme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/06',
				optimum: '6 stranica',
				angažman: '6 h',
				fond: '30 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.12.) RAZMATRANJE NACRTA PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer razmatra predloženi nacrt plana i programa poslovanja i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.19.) POTPISIVANJE PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje Plan i program poslovanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.5.) RAZMATRANJE NACRTA UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer razmatra predloženi nacrt ugovora o saradnji i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.12.) POTPISIVANJE UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/06',
				optimum: '4 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(3 h - 18 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.22.) POTPISIVANJE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje odštampani Tehnički plan.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'pr menadžer',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.6.) PRIPREMA PLANA RADA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer podnosi izveštaj u kojem procenjuje sve svoje planirane aktivnosti oko projekta, predviđa svoj angažman i utrošeno vreme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/06',
				optimum: '3 stranice',
				angažman: '3 h',
				fond: '18 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.13.) RAZMATRANJE NACRTA PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer razmatra predloženi nacrt plana i programa poslovanja i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.20.) POTPISIVANJE PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje Plan i program poslovanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.6.) RAZMATRANJE NACRTA UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer razmatra predloženi nacrt ugovora o saradnji i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.13.) POTPISIVANJE UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/06',
				optimum: '4 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(89 h - 888 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.4.19.) POTPISIVANJE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje odštampani Tehnički plan.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.3.) PRIPREMA PLANA RADA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster podnosi izveštaj u kojem procenjuje sve svoje planirane aktivnosti oko projekta, predviđa svoj angažman i utrošeno vreme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '4,5 stranice',
				angažman: '4,5 h',
				fond: '43 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.10.) RAZMATRANJE NACRTA PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster razmatra predloženi nacrt plana i programa poslovanja i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.5.21.) POTPISIVANJE PLANA I PROGRAMA POSLOVANJA',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Plan i program poslovanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.3.) RAZMATRANJE NACRTA UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster razmatra predloženi nacrt ugovora o saradnji i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.6.10.) POTPISIVANJE UGOVORA O SARADNJI',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '4 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.3.) POTPISIVANJE UGOVORA O DELU SA KOORDINATOROM ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o delu sa koordinatorom za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.2.3.) POTPISIVANJE UGOVORA O DELU ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o delu za prvu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.2.4.) IZRADA PLATFORME ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu tehničkog plana, vebmaster izrađuje platformu za prvu etapu razvoja, osposobljavajući je za objavljivanje investicionog plana i programa, kao i svih drugih neophodnih informacija koji se tiču početnog investiranja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '1/3 platforme',
				angažman: '84,5 h',
				fond: '845 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.2.7.) TESTIRANJE PLATFORME ZA PRVU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster testira platformu i uverava se u njeno efikasno funkcionisanje predviđeno za prvu etapu razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/06',
				optimum: '1 test',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
	],
	'jul-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 37,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.1.7.) RAZMATRANJE NACRTA INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator razmatra predloženi nacrt investicionog plana i programa i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/07',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.15.) POTPISIVANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Investicioni plan i program.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/07',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.5.) POPUNJAVANJE PLATFORME ZA PROMOCIJU INVESTICIONOG FONDA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator na stranice platforme ubacuje sve potrebne elektronske dokumente koji se tiču Investicionog plana i programa i povezuje ih linkovima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/07',
				optimum: '1 platforma',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.6.) POPUNJAVANJE STRANICE “O NAMA”',
		},
		{
			type: 'pNormal',
			content:
				'Administrator popunjava stranicu “O nama” sa opštim informacijama o projektu i informacijama o članovima upravnog tima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/07',
				optimum: '5 podstranica',
				angažman: '0 h',
				fond: '37,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.7.) OGLAŠAVANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Nakon unosa svih potrebnih dokumenata i informacija, administrator preko platforme oglašava Investicioni plan i program, čineći ga dostupnim na uvid svim potencijalnim finansijskim ulagačima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/07',
				optimum: '1 datoteka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(22,5 h - 120 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.1.4.) IZRADA NACRTA INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Plana i programa poslovanja i visine potrebnih sredstava za njegovu realizaciju, autor izrađuje nacrt investicionog plana i programa u kojem predlaže strategiju privlačenja investitora.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/07',
				optimum: '30 stranica',
				angažman: '15 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.10.) IZRADA INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu odobrenog nacrta, autor izrađuje Investicioni plan i program kao zvanični dokument koji reguliše prava i obaveze finansijskih ulagača, garancije njihovog kapitala i predviđene prihode.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/07',
				optimum: '30 stranica',
				angažman: '7,5 h',
				fond: '37,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.11.) ŠTAMPANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Pored elektronskog oblika, autor priprema Investicioni plan i program i u štampanoj formi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/07',
				optimum: '30 stranica',
				angažman: '0 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.12.) POTPISIVANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content: 'Autor potpisuje Investicioni plan i program.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/07',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(4 h - 20 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.1.23.) GRAFIČKA PRIPREMA PRIZNANICE ZA ULOŽENA SREDSTVA',
		},
		{
			type: 'pNormal',
			content:
				'Grafički dizajner priprema šablon priznanice za potvrdu iznosa uloženih finansijskih sredstava u projekat.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/07',
				optimum: '1 šablon',
				angažman: '1 h',
				fond: '5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.25.) GRAFIČKA PRIPREMA OBAVEŠTAJNIH FLAJERA ZA INVESTITORE',
		},
		{
			type: 'pNormal',
			content:
				'Grafički dizajner priprema obaveštajne flajere za upućivanje potencijalnih investitora na veb stranice Plana i programa investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/07',
				optimum: '1 obrazac',
				angažman: '3 h',
				fond: '15 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(22 h - 203 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.5.) RAZMATRANJE NACRTA INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator razmatra predloženi nacrt investicionog plana i programa i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.13.) POTPISIVANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Investicioni plan i program.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.18.) PRIPREMA REGISTRA INVESTITORA I NJIHOVIH SUVLASNIČKIH UDELA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator priprema dokument u elektronskoj formi namenjen upisu i evidenciji uloženih sredstava, kao i evidenciju suvlasničkih udela projekta, na osnovu čega se računa visina prihoda svakog pojedinačnog investitora.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 registar',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.21.) PRIPREMA UGOVORA O INVESTICIJI',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Investicionog plana i programa, koordinator priprema u elektronskoj formi Ugovor o investiranju sa budućim ulagačima finansijskih sredstava u projekat, kojim se regulišu sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '6 stranica',
				angažman: '9 h',
				fond: '67,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.22.) GRAFIČKA PRIPREMA PRIZNANICE ZA ULOŽENA SREDSTVA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator daje instrukcije grafičkom dizajneru kako treba da izgledaju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 šablon',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.24.) GRAFIČKA PRIPREMA OBAVEŠTAJNIH FLAJERA ZA INVESTITORE',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator priprema tekst i daje instrukcije grafičkom dizajneru kako treba da izgledaju obaveštajni flajeri za investitore.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 obrazac',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.26.) ŠTAMPANJE OBAVEŠTAJNIH FLAJERA ZA INVESTITORE',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator štampa obaveštajne flajere za investitore i predaje ih članovima upravnog tima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '100 flajera',
				angažman: '0 h',
				fond: '34 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (1/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (1/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (1/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (1/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (1/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (1/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA VEBMASTEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi vebmasterovi radni zadaci, rokovi i naknade za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.2.) POTPISIVANJE UGOVORA O DELU SA VEBMASTEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa vebmasterom za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/07',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.1.8.) RAZMATRANJE NACRTA INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer razmatra predloženi nacrt investicionog plana i programa i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/07',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.16.) POTPISIVANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje Investicioni plan i program.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/07',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.1.17.) POTPISIVANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje Investicioni plan i program.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/07',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.9.) RAZMATRANJE NACRTA INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer razmatra predloženi nacrt investicionog plana i programa i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/07',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(113,5 h - 1.141,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.1.6.) RAZMATRANJE NACRTA INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster razmatra predloženi nacrt investicionog plana i programa i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/07',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.14.) POTPISIVANJE INVESTICIONOG PLANA I PROGRAMA',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Investicioni plan i program.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/07',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.2.5.) USPOSTAVLJANJE SSL SERTIFIKATA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster uspostavlja SSL sertifikat u cilju obezbeđivanja sigurne interakcije sa korisnicima platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/07',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (1/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/07',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (1/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.3.) POTPISIVANJE UGOVORA O DELU ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o delu za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/07',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.15.) IZRADA PLATFORME ZA DRUGU ETAPU (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za drugu etapu razvoja, osposobljavajući je za funkciju pretraživanja proizvoda uz pomoć pokazivača na mapama, kao i za mogućnost postavljanja reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/07',
				optimum: '1/3 platforme',
				angažman: '113,5 h',
				fond: '1.135 EUR',
			},
		},
		{ type: 'hr' },
	],
	'avgust-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(97 h - 611,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.7.) RAZMATRANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator razmatra predloženu dopunu Tehničkog plana, i odlučuje o eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '5 stranica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.12.) POTPISIVANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje dopunu Tehničkog plana.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.20.) POTPISIVANJE UGOVORA O DELU ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Ugovor o delu za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.1.) POPISIVANJE PRODAJNIH OBJEKATA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator obilazi buvljak i letimično popisuje sve tezge, lokale i betonske površine koje se koriste za prodaju pijačne robe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '2.800 objekata',
				angažman: '15,5 h',
				fond: '77,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.2.) ADMINISTRATIVNA PRIPREMA PRODAJNIH OBJEKATA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator popisane prodajne objekte zavodi u administrativne datoteke, upisuje im nazive, evidentira druge informacije i određuje im geografske koordinate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '2.800 objekata',
				angažman: '46,5 h',
				fond: '232,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.5.) ADMINISTRATIVNA PRIPREMA KATEGORIJA PROIZVODA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator određuje kategorije proizvoda koji se prodaju na buvljaku i sortira ih u odgovarajući poredak.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '2.000 kategorija',
				angažman: '0 h',
				fond: '115 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.6.) PRIPREMA SLIKA KATEGORIJA PROIZVODA NA BUVLJAKU (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije proizvoda, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '666 sličica',
				angažman: '33 h',
				fond: '166,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.15.) IZRADA POČETNE STRANICE FUNKCIJE “VODIČ ZA KUPOVINU”',
		},
		{
			type: 'pNormal',
			content:
				'Administrator izrađuje stranicu na kojoj su opisane osnovne osobine funkcije preglednika proizvoda po mapama i uspostavljene smernice ka drugim stranicama te funkcije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/08',
				optimum: '1 stranica',
				angažman: '2 h',
				fond: '20 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.5.) DOPUNA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Zajedno sa vebmasterom, autor kao konsultant učestvuje u dopuni Tehničkog plana.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/08',
				optimum: '5 stranica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(1 h - 5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '2.3.2.) GRAFIČKA PRIPREMA ŠABLONA PRIZNANICE ZA PLAĆENU REKLAMU',
		},
		{
			type: 'pNormal',
			content:
				'Po instrukciji koordinatora, grafički dizajner priprema uniformni šablon priznanica kojima se potvrđuju uplaćeni iznosi na ime reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/08',
				optimum: '1 šablon',
				angažman: '1 h',
				fond: '5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(13 h - 101,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (2/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (2/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (2/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (2/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (2/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (2/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.6.) RAZMATRANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator razmatra predloženu dopunu Tehničkog plana, i odlučuje o eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '5 stranica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.10.) POTPISIVANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje dopunu Tehničkog plana.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.18.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA ADMINISTRATOROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi administratorovi radni zadaci, rokovi i naknade za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.19.) POTPISIVANJE UGOVORA O DELU SA ADMINISTRATOROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa administratorom za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.3.1.) GRAFIČKA PRIPREMA ŠABLONA PRIZNANICE ZA PLAĆENU REKLAMU',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator daje grafičkom dizajneru instrukciju za uniformni šablon priznanica kojima se potvrđuju uplaćeni iznosi na ime reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/08',
				optimum: '1 šablon',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.8.) RAZMATRANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer razmatra predloženu dopunu Tehničkog plana, i odlučuje o eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/08',
				optimum: '5 stranica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.13.) POTPISIVANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje dopunu Tehničkog plana.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/08',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.9.) RAZMATRANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer razmatra predloženu dopunu Tehničkog plana, i odlučuje o eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/08',
				optimum: '5 stranica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.14.) POTPISIVANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje dopunu Tehničkog plana.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/08',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(113,5 h - 1.141,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (2/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/08',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (2/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.4.) DOPUNA TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster aneksom dopunjava Tehnički plan sa idejnim rešenjima administrativnog i korisničkog panela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/08',
				optimum: '5 stranica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.11.) POTPISIVANJE DOPUNE TEHNIČKOG PLANA',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje dopunu Tehničkog plana.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/08',
				optimum: '1 primerak',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.15.) IZRADA PLATFORME ZA DRUGU ETAPU (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za drugu etapu razvoja, osposobljavajući je za funkciju pretraživanja proizvoda uz pomoć pokazivača na mapama, kao i za mogućnost postavljanja reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/08',
				optimum: '1/3 platforme',
				angažman: '113,5 h',
				fond: '1.135 EUR',
			},
		},
		{ type: 'hr' },
	],
	'septembar-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(178,5 h - 1.109 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.21.) POPUNJAVANJE STRANICE “OGLAŠAVANJE” NA PLATFORMI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator popunjava stranicu “Oglašavanje” na platformi, sa svim potrebnim informacijama o proceduri oglašavanja, cenama reklama, pravima i obavezama oglašivača.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/09',
				optimum: '10 podstranica',
				angažman: '1,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.22.) POPUNJAVANJE STRANICE “POMOĆ” NA PLATFORMI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator popunjava stranicu “Pomoć” na platformi, sa svim potrebnim informacijama koje mogu doprineti boljem snalaženju korisnika na platformi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/09',
				optimum: '20 podstranica',
				angažman: '1,5 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.23.) POPUNJAVANJE STRANICA “USLOVI KORIŠĆENJA” I “POLITIKA PRIVATNOSTI”',
		},
		{
			type: 'pNormal',
			content:
				'Administrator popunjava stranice “Uslovi korišćenja” i “Politika privatnosti” na platformi po standardnom obrascu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/09',
				optimum: '2 podstranice',
				angažman: '1,5 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.6.) PRIPREMA SLIKA KATEGORIJA PROIZVODA NA BUVLJAKU (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije proizvoda, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/09',
				optimum: '666 sličica',
				angažman: '33,5 h',
				fond: '166,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.9.) POPISIVANJE PROIZVODA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator obilazi buvljak i popisuje sve vrste proizvoda koji se nalaze u prodaji na tezgama, lokalima i betonskim površinama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/09',
				optimum: '2.800 objekata',
				angažman: '15,5 h',
				fond: '77,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.11.) ADMINISTRATIVNA PRIPREMA POPISANIH PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator zavodi spisak proizvoda na buvljaku u administrativne datoteke i priprema spisak za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/09',
				optimum: '2.500 objekata',
				angažman: '125 h',
				fond: '625 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '2.4.3.) POTPISIVANJE UGOVORA O DELU ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Grafički dizajner potpisuje Ugovor o delu za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(17 h - 125,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (3/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (3/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (3/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (3/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (3/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (3/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.3.3.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA PR MENADŽEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade PR menadžera za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.3.4.) POTPISIVANJE UGOVORA O DELU SA PR MENADŽEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa PR menadžerom za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '1 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA GRAFIČKIM DIZAJNEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade grafičkog dizajnera za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.2.) POTPISIVANJE UGOVORA O DELU SA GRAFIČKIM DIZAJNEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Kooridnator potpisuje Ugovor o delu sa grafičkim dizajnerom za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.1.) IZRADA I ŠTAMPANJE UGOVORA SA MARKETING MENADŽEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade PR menadžera za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.2.) POTPISIVANJE UGOVORA SA MARKETING MENADŽEROM ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa marketing menadžerom za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.1.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA VEBMASTEROM ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi vebmasterovi radni zadaci, rokovi i naknade za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.1.2.) POTPISIVANJE UGOVORA O DELU SA VEBMASTEROM ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa vebmasterom za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.3.) POTPISIVANJE UGOVORA O DELU ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje Ugovor o delu za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.3.5.) POTPISIVANJE UGOVORA O DELU ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje Ugovor o delu za drugu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(113,5 h - 1.142 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (3/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/09',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '7 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (3/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.15.) IZRADA PLATFORME ZA DRUGU ETAPU (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za drugu etapu razvoja, osposobljavajući je za funkciju pretraživanja proizvoda uz pomoć pokazivača na mapama, kao i za mogućnost postavljanja reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/09',
				optimum: '1/3 platforme',
				angažman: '113,5 h',
				fond: '1.135 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.24.) TESTIRANJE PLATFORME ZA DRUGU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster testira platformu i uverava se u njeno efikasno funkcionisanje predviđeno za drugu etapu razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/09',
				optimum: '1 test',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.1.3.) POTPISIVANJE UGOVORA O DELU ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o delu za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
	],
	'oktobar-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(138 h - 689,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{ type: 'hr' },
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.3.) UNOS PRODAJNIH OBJEKATA NA PLATFORMU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator priprema spisak pojedinačnih prodajnih objekata i informacije o njima za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/10',
				optimum: '2.800 objekata',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.6.) PRIPREMA SLIKA KATEGORIJA PROIZVODA NA BUVLJAKU (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije proizvoda, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/10',
				optimum: '666 sličica',
				angažman: '33,5 h',
				fond: '167 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.8.) POVEZIVANJE SRODNIH STRANICA PREGLEDNIKA PO MAPAMA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator priprema ikonice na dnu svake stranice i umeće linkove ka drugim stranicama koje on proizvoljno odredi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/10',
				optimum: '2.000 kategorija',
				angažman: '83,5 h',
				fond: '417,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.13.) UNOS PROIZVODA NA PLATFORMU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator putem otvorenih naloga prodajnih objekata u panelu, unosi spiskove proizvoda i vrši objavljivanje njihovih lokacija na mapi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/10',
				optimum: '2.500 objekata',
				angažman: '21 h',
				fond: '105 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(4 h - 20 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '2.5.9.) GRAFIČKA PRIPREMA OBAVEŠTAJNIH FLAJERA ZA POSETIOCE BUVLJAKA',
		},
		{
			type: 'pNormal',
			content:
				'Po instrukciji marketing menadžera, grafički dizajner priprema obaveštajne flajere za posetioce buvljaka.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/10',
				optimum: '1 obrazac',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20,5 h - 153,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transakcije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (1/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (4/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (4/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (4/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (4/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (4/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (4/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/10',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(53,5 h - 520,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.4.) ANGAŽOVANJE PROMOTERA NA DRUŠTVENIM MREŽAMA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer angažuje lice pogodno za komunikaciju na društvenim mrežama na srpskom i mađarskom jeziku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '1 promoter',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.5.) OTVARANJE NALOGA NA DRUŠTVENIM MREŽAMA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer uz pomoć angažovanog asistenta otvara naloge na društvenim mrežama za Infotrg, zasebno na srpskom i mađarskom jeziku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '4 naloga',
				angažman: '2 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.6.) OBJAVLJIVANJE INFORMACIJA SA BUVLJAKA NA DRUŠTVENIM MREŽAMA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer, uz pomoć angažovanog asistenta, putem društvenih mreža objavljuje informacije o buvljaku u Subotici, informacije o Infotrg platformi i linkove za direktno prebacivanje na pojedinačne stranice platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '4 naloga',
				angažman: '18 h',
				fond: '90 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.8.) OSMIŠLJAVANJE OBAVEŠTAJNIH FLAJERA ZA POSETIOCE BUVLJAKA',
		},
		{
			type: 'pNormal',
			content:
				'U saradnji sa grafičkim dizajnerom, marketing menadžer grafički priprema obaveštajne flajere sa svim neophodnim informacijama za upućivanje posetilaca na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '1 obrazac',
				angažman: '2 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.10.) ŠTAMPANJE OBAVEŠTAJNIH FLAJERA ZA POSETIOCE BUVLJAKA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer štampa obaveštajne flajere za posetioce buvljaka i drži ih spremne za deljenje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '5.400 flajera',
				angažman: '0,5 h',
				fond: '118,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.11.) ORGANIZOVANJE PROMOTERKI',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer pronalazi i angažuje nekoliko promoterki Infotrg platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '4 promoterke',
				angažman: '16 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.12.) IZRADA MAJICA ZA PROMOTERKE',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer priprema u potrebnom broju majice sa simbolom Infotrga, a koje će nositi angažovane promoterke.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '8 majica',
				angažman: '2 h',
				fond: '147 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (1/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/10',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(78,5 h - 870,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (4/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/10',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (4/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (1/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/10',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (1/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/10',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.4.) UNOS PRODAJNIH OBJEKATA SA BUVLJAKA NA PLATFORMU',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster otvara naloge pojedinačnih prodajnih objekata, unosi pripremljene informacije o objektima i priprema naloge za unos informacija o proizvodima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/10',
				optimum: '2.800 objekata',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.7.) ELEKTRONSKA PRIPREMA KATEGORIJA PROIZVODA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster vrši unos pripremljenog spiska kategorija proizvoda na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/10',
				optimum: '2.000 kategorija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.1.4.) IZRADA PLATFORME ZA TREĆU ETAPU (1/5)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za treću etapu razvoja, dodatno je osposobljavajući za uvođenje veb izloga i samostalnog unošenja proizvoda od strane pojedinačnih prodavaca.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/10',
				optimum: '1/5 platforme',
				angažman: '78,5 h',
				fond: '784 EUR',
			},
		},
		{ type: 'hr' },
	],
	'novembar-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(159 h - 795 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.10.) PERIODIČNO PONOVNO POPISIVANJE PROIZVODA NA BUVLJAKU (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom naredna dva meseca ponovo obilazi buvljak i iznova popisuje sve vrste proizvoda kako bi mogao obnoviti spisak i izvršiti neke eventualne izmene u asortimanu ukoliko za tim ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/11',
				optimum: '2.800 objekata',
				angažman: '15,5 h',
				fond: '77,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.12.) PERIODIČNO ADMINISTRATIVNO AŽURIRANJE POPISANIH PROIZVODA (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom naredna dva meseca obnavlja spisak popisanih vrsta proizvoda kako ne bi došlo do zastarelosti informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/11',
				optimum: '2.500 objekata',
				angažman: '125 h',
				fond: '625 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.3.8.) NAKNADNO OZNAČAVANJE PROIZVODA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator, na spisku dostavljenom od strane PR menadžera, uočava vrste artikala koje je tokom letimičnog popisa izostavio i vrši njihov dodatni unos na platformu, označavajući njihovu lokaciju prodaje na buvljaku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/11',
				optimum: '400 objekata',
				angažman: '8,5 h',
				fond: '42,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.4.) SELEKCIJA PROIZVODA ZA BESPLATNO OGLAŠAVANJE',
		},
		{
			type: 'pNormal',
			content:
				'Administrator bira nekoliko proizvoda na buvljaku, snima ih, upisuje njihove cene i beleži lokacije na kojima se prodaju.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/11',
				optimum: '50 proizvoda',
				angažman: '10 h',
				fond: '50 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(50 h - 250 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '2.4.6.) IZRADA BESPLATNIH REKLAMA ZA BUVLJAK',
		},
		{
			type: 'pNormal',
			content: 'Po nalogu administratora, grafički dizajner priprema reklame odabranih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2024/11',
				optimum: '50 reklama',
				angažman: '50 h',
				fond: '250 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20 h - 153,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transakcije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transakcije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (2/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (5/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (5/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (5/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (5/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (5/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (5/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/11',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(191 h - 1.086 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.6.) OBJAVLJIVANJE INFORMACIJA SA BUVLJAKA NA DRUŠTVENIM MREŽAMA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer, uz pomoć angažovanog asistenta, putem društvenih mreža objavljuje informacije o buvljaku u Subotici, informacije o Infotrg platformi i linkove za direktno prebacivanje na pojedinačne stranice platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '4 naloga',
				angažman: '18 h',
				fond: '90 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.7.) ANGAŽOVANO POVEZIVANJE NA DRUŠTVENIM MREŽAMA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Po nadzorom marketing menadžera, asistent na društvenim mrežama ostvaruje kontakte sa svim onim licima koji su aktivni posetioci buvljaka ili imaju potencijal da to postanu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '4 naloga',
				angažman: '4,5 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.10.) ŠTAMPANJE OBAVEŠTAJNIH FLAJERA ZA POSETIOCE BUVLJAKA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer štampa obaveštajne flajere za posetioce buvljaka i drži ih spremne za deljenje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '5.400 flajera',
				angažman: '0,5 h',
				fond: '118,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.13.) DISTRIBUCIJA PROMOTIVNIH FLAJERA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Pod kontrolom marketing menadžera, promoterke na ulazu u buvljak dele obaveštajne flajere posetiocima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '5.400 flajera',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.14.) USMENA PROMOCIJA PLATFORME POSETIOCIMA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko je potrebno, po instrukciji marketing menadžera promoterke daju dodatna usmena objašnjenja svim zainteresovanim posetiocima buvljaka.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '1.500 posetilaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.15.) ODVOĐENJE KUPACA NA MESTO PRODAJE (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko posetioci buvljaka pokažu interesovanje za određeni proizvod, promoterke ih odvode na tačno mesto prodaje određenih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '250 kupaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.16.) NAVOĐENJE NA PRAĆENJE PREKO DRUŠTVENIH MREŽA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Pod kontrolom marketing menadžera, promoterke koriste svaku priliku da, kroz neposrednu komunikaciju ili putem teksta na flajerima, navedu većinu posetilaca buvljaka na uspostavljanje kontakta putem društvenih mreža.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '1.500 posetilaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (2/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/11',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(100 h - 600 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'2.3.6.) KOMUNIKACIJA SA PRODAVCIMA NA BUVLJAKU U SVRSI ODOBRAVANJA OZNAČENIH PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer na buvljaku nasumično odabira pojedine prodavce kojima pokazuje na koji način su njegovi proizvodi označeni na Infotrg platformi, tražeći od njega odobrenje za održavanje postojećih informacija i dodavanja novih.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/11',
				optimum: '250 prodavaca',
				angažman: '50 h',
				fond: '300 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.3.7.) POPISIVANJE DOPUNSKOG ASORTIMANA PROIZVODA POJEDINIH PRODAJNIH OBJEKATA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavac pristane na to da se svi njegovi proizvodi označavaju na Infotrg platformi, PR menadžer vrši detaljan popis celokupnog asortimana proizvoda i te informacije dostavlja administratoru.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/11',
				optimum: '250 prodavaca',
				angažman: '50 h',
				fond: '300 EUR',
			},
		},

		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(78,5 h - 870,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (5/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/11',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (5/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (2/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/11',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (2/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/11',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.1.4.) IZRADA PLATFORME ZA TREĆU ETAPU (2/5)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za treću etapu razvoja, dodatno je osposobljavajući za uvođenje veb izloga i samostalnog unošenja proizvoda od strane pojedinačnih prodavaca.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/11',
				optimum: '1/5 platforme',
				angažman: '78,5 h',
				fond: '784 EUR',
			},
		},
		{ type: 'hr' },
	],
	'decembar-2024': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(142,5 h - 764,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.14.) PERIODIČAN UNOS AŽURIRANOG SPISKA PROIZVODA NA PLATFORMU (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon unosa prvog spiska proizvoda na platformu, administrator tokom naredna dva meseca iznova unosi ažurirane spiskove proizvoda, da bi informacije na platformi mogle biti periodično obnovljene.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/12',
				optimum: '2.500 objekata',
				angažman: '21 h',
				fond: '157,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.5.) PERIODIČNO PROVERAVANJE PROIZVODA ZA BESPLATNO OGLAŠAVANJE (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator vrši periodičnu kontrolu odabranih proizvoda, proveravajući da li se i dalje prodaju na istim lokacijama i po istim cenama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/12',
				optimum: '50 proizvoda',
				angažman: '5 h',
				fond: '25 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.7.) OBJAVLJIVANJE BESPLATNIH REKLAMA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator objavljuje reklame odabranih proizvoda na odgovarajućim stranicama platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/12',
				optimum: '50 reklama',
				angažman: '3,5 h',
				fond: '16,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.2.) POTPISIVANJE UGOVORA O DELU ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Ugovor o delu za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/12',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.10.) ADMINISTRATIVNA DOPUNA KATEGORIJA PROIZVODA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator uvodi sve nove kategorije proizvoda koji se prodaju u Subotici i sortira ih u odgovarajući poredak.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/12',
				optimum: '4.000 kategorija',
				angažman: '46,5 h',
				fond: '232,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.11.) PRIPREMA SLIKA KATEGORIJA PROIZVODA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije proizvoda, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2024/12',
				optimum: '1.333 sličice',
				angažman: '66,5 h',
				fond: '333 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2024/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(21,5 h - 161,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transakcije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transakcije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (3/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (6/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (6/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (6/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (6/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (6/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (6/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA ADMINISTRATOROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi administratorovi radni zadaci, rokovi i naknade za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.3.) POTPISIVANJE UGOVORA O DELU SA ADMINISTRATOROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa administratorom za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2024/12',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(191,5 h - 967,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.6.) OBJAVLJIVANJE INFORMACIJA SA BUVLJAKA NA DRUŠTVENIM MREŽAMA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer, uz pomoć angažovanog asistenta, putem društvenih mreža objavljuje informacije o buvljaku u Subotici, informacije o Infotrg platformi i linkove za direktno prebacivanje na pojedinačne stranice platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '4 naloga',
				angažman: '18 h',
				fond: '90 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.7.) ANGAŽOVANO POVEZIVANJE NA DRUŠTVENIM MREŽAMA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Po nadzorom marketing menadžera, asistent na društvenim mrežama ostvaruje kontakte sa svim onim licima koji su aktivni posetioci buvljaka ili imaju potencijal da to postanu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '4 naloga',
				angažman: '4,5 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.13.) DISTRIBUCIJA PROMOTIVNIH FLAJERA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Pod kontrolom marketing menadžera, promoterke na ulazu u buvljak dele obaveštajne flajere posetiocima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '5.400 flajera',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.14.) USMENA PROMOCIJA PLATFORME POSETIOCIMA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko je potrebno, po instrukciji marketing menadžera promoterke daju dodatna usmena objašnjenja svim zainteresovanim posetiocima buvljaka.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '1.500 posetilaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.15.) ODVOĐENJE KUPACA NA MESTO PRODAJE (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko posetioci buvljaka pokažu interesovanje za određeni proizvod, promoterke ih odvode na tačno mesto prodaje određenih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '250 kupaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.16.) NAVOĐENJE NA PRAĆENJE PREKO DRUŠTVENIH MREŽA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Pod kontrolom marketing menadžera, promoterke koriste svaku priliku da, kroz neposrednu komunikaciju ili putem teksta na flajerima, navedu većinu posetilaca buvljaka na uspostavljanje kontakta putem društvenih mreža.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '1.500 posetilaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (3/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2024/12',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(33,5 h - 199,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.9.) KOMUNIKACIJA SA PRODAVCIMA ZA DOZVOLJENO BESPLATNO REKLAMIRANJE',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi prodavce čiji proizvodi su implementirani u besplatne reklame i traži od njih dozvolu da iste reklame ostanu na platformi izvesno vreme u cilju promovisanja takvog modela oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/12',
				optimum: '10 prodavaca',
				angažman: '2 h',
				fond: '12 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.1.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI PLAĆENOG OGLAŠAVANJA (1/4)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi one prodavce na buvljaku koji su prethodno odobrili označavanje njihovih proizvoda i pokazuje im objavljene promotivne reklame, navodeći ih da i oni učine isto sa svojim proizvodima uz određenu mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/12',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.2.) PROMOVISANJE IZRADE REKLAMA (1/4)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci na buvljaku iz nekog razloga nisu u mogućnosti da samostalno pripremaju reklame za svoje proizvode, PR menadžer iznosi ponudu u uslužnoj izradi reklama uz odgovarajuću naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/12',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.3.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI AFFILIATE POSREDNIŠTVA (1/4)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer može postići dogovor sa prodavcima u vezi postavljanja besplatne reklame, u zamenu za procenat ostvarene prodaje u slučaju da se prodaja proizvoda realizuje preko te reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2024/12',
				optimum: '65 prodavaca',
				angažman: '6,5 h',
				fond: '37,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(78,5 h - 871 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (6/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/12',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '7 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (6/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (3/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/12',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (3/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/12',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.1.4.) IZRADA PLATFORME ZA TREĆU ETAPU (3/5)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za treću etapu razvoja, dodatno je osposobljavajući za uvođenje veb izloga i samostalnog unošenja proizvoda od strane pojedinačnih prodavaca.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2024/12',
				optimum: '1/5 platforme',
				angažman: '78,5 h',
				fond: '784 EUR',
			},
		},
		{ type: 'hr' },
	],
	'januar-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(113,5 h - 570 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.5.) PERIODIČNO PROVERAVANJE PROIZVODA ZA BESPLATNO OGLAŠAVANJE (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator vrši periodičnu kontrolu odabranih proizvoda, proveravajući da li se i dalje prodaju na istim lokacijama i po istim cenama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/01',
				optimum: '50 proizvoda',
				angažman: '5 h',
				fond: '25 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.8.) PERIODIČNO OBJAVLJIVANJE BESPLATNIH REKLAMA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom vremena reklamirani proizvodi promene lokaciju prodaje ili cene, administrator vrši obnovu takvih besplatnih reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/01',
				optimum: '5 reklama',
				angažman: '0 h',
				fond: '1,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.3.) POTPISIVANJE UGOVORA O DELU ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Ugovor o delu za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/01',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.4.) ADMINISTRATIVNA KATEGORIZACIJA PRODAJNIH OBJEKATA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator grupiše sve tipove prodajnih objekata na buvljaku i određuje njihovu pripadnost u određenim kategorijama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/01',
				optimum: '2.500 objekata',
				angažman: '29 h',
				fond: '145 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.5.) PRIPREMA SLIKA KATEGORIJA PRODAJNIH OBJEKATA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije prodajnih objekata, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/01',
				optimum: '130 sličica',
				angažman: '13 h',
				fond: '65 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.11.) PRIPREMA SLIKA KATEGORIJA PROIZVODA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije proizvoda, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/01',
				optimum: '1.333 sličice',
				angažman: '66,5 h',
				fond: '333,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(21 h - 161,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transakcije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (4/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (7/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (7/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (7/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (7/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (7/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (7/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA ADMINISTRATOROM ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi administratorovi radni zadaci, rokovi i naknade za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.2.) POTPISIVANJE UGOVORA O DELU SA ADMINISTRATOROM ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa administratorom za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/01',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(13,5 h - 67,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.7.) ANGAŽOVANO POVEZIVANJE NA DRUŠTVENIM MREŽAMA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Po nadzorom marketing menadžera, asistent na društvenim mrežama ostvaruje kontakte sa svim onim licima koji su aktivni posetioci buvljaka ili imaju potencijal da to postanu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/01',
				optimum: '4 naloga',
				angažman: '4,5 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (4/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/01',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(31,5 h - 187,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.1.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI PLAĆENOG OGLAŠAVANJA (2/4)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi one prodavce na buvljaku koji su prethodno odobrili označavanje njihovih proizvoda i pokazuje im objavljene promotivne reklame, navodeći ih da i oni učine isto sa svojim proizvodima uz određenu mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/01',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.2.) PROMOVISANJE IZRADE REKLAMA (2/4)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci na buvljaku iz nekog razloga nisu u mogućnosti da samostalno pripremaju reklame za svoje proizvode, PR menadžer iznosi ponudu u uslužnoj izradi reklama uz odgovarajuću naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/01',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.3.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI AFFILIATE POSREDNIŠTVA (2/4)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer može postići dogovor sa prodavcima u vezi postavljanja besplatne reklame, u zamenu za procenat ostvarene prodaje u slučaju da se prodaja proizvoda realizuje preko te reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/01',
				optimum: '65 prodavaca',
				angažman: '6,5 h',
				fond: '37,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(78,5 h - 870,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (7/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/01',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (7/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (4/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/01',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (4/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/01',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.1.4.) IZRADA PLATFORME ZA TREĆU ETAPU (4/5)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za treću etapu razvoja, dodatno je osposobljavajući za uvođenje veb izloga i samostalnog unošenja proizvoda od strane pojedinačnih prodavaca.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/01',
				optimum: '1/5 platforme',
				angažman: '78,5 h',
				fond: '784 EUR',
			},
		},
	],
	'februar-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(267 h - 1.335 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.10.) PERIODIČNO PONOVNO POPISIVANJE PROIZVODA NA BUVLJAKU (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom naredna dva meseca ponovo obilazi buvljak i iznova popisuje sve vrste proizvoda kako bi mogao obnoviti spisak i izvršiti neke eventualne izmene u asortimanu ukoliko za tim ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '2.800 objekata',
				angažman: '15,5 h',
				fond: '77,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.2.12.) PERIODIČNO ADMINISTRATIVNO AŽURIRANJE POPISANIH PROIZVODA (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator obnavlja spisak popisanih vrsta proizvoda kako ne bi došlo do zastarelosti informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '2.500 objekata',
				angažman: '125 h',
				fond: '625 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.5.) PERIODIČNO PROVERAVANJE PROIZVODA ZA BESPLATNO OGLAŠAVANJE (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator vrši periodičnu kontrolu odabranih proizvoda, proveravajući da li se i dalje prodaju na istim lokacijama i po istim cenama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '50 proizvoda',
				angažman: '5 h',
				fond: '25 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.4.8.) PERIODIČNO OBJAVLJIVANJE BESPLATNIH REKLAMA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom vremena reklamirani proizvodi promene lokaciju prodaje ili cene, administrator vrši obnovu takvih besplatnih reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '5 reklama',
				angažman: '0,5 h',
				fond: '1,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.7.) POVEZIVANJE SRODNIH STRANICA PREGLEDNIKA PO PRODAJNIM OBJEKTIMA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator priprema ikonice na dnu svake stranice i umeće linkove ka drugim stranicama koje on proizvoljno odredi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '2.000 stranica',
				angažman: '16,5 h',
				fond: '82,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.17.) PRIPREMA POČETNE STRANICE FUNKCIJE “VEB IZLOG”',
		},
		{
			type: 'pNormal',
			content:
				'Administrator priprema stranicu na kojoj su opisane osnovne osobine funkcije veb izloga. Na istoj stranici su uspostavljene i smernice ka drugim stranicama te funkcije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '1 stranica',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.6.) ADMINISTRATIVNA DOPUNA KATEGORIJA PRODAJNIH OBJEKATA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator grupiše sve tipove prodajnih objekata u Subotici koji nemaju veb izloge i pridodaje ih određenim kategorijama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '1.800 objekata',
				angažman: '21 h',
				fond: '105 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.7.) PRIPREMA SLIKA KATEGORIJA PRODAJNIH OBJEKATA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije prodajnih objekata, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '130 sličica',
				angažman: '13 h',
				fond: '65 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.11.) PRIPREMA SLIKA KATEGORIJA PROIZVODA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator pronalazi slike odgovarajuće tematike za kategorije proizvoda, a potom ih grafički priprema za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/02',
				optimum: '1.333 sličice',
				angažman: '66,5 h',
				fond: '333,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(22,5 h - 169,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (5/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (8/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (8/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (8/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (8/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (8/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},

		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA PR MENADŽEROM ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade PR menadžera za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.2.) POTPISIVANJE UGOVORA O DELU SA PR MENADŽEROM ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa PR menadžerom za treću etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.1.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA VEBMASTEROM ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi vebmasterovi radni zadaci, rokovi i naknade za četvrtu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.1.3.) POTPISIVANJE UGOVORA O DELU SA VEBMASTEROM ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa vebmasterom za četvrtu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/02',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(10 h - 164 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.5.10.) ŠTAMPANJE OBAVEŠTAJNIH FLAJERA ZA POSETIOCE BUVLJAKA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer štampa obaveštajne flajere za posetioce buvljaka i drži ih spremne za deljenje.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/02',
				optimum: '5.400 flajera',
				angažman: '1 h',
				fond: '119 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/02',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(31,5 h - 187,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.6.1.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI PLAĆENOG OGLAŠAVANJA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi one prodavce na buvljaku koji su prethodno odobrili označavanje njihovih proizvoda i pokazuje im objavljene promotivne reklame, navodeći ih da i oni učine isto sa svojim proizvodima uz određenu mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/02',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.6.2.) PROMOVISANJE IZRADE REKLAMA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci na buvljaku iz nekog razloga nisu u mogućnosti da samostalno pripremaju reklame za svoje proizvode, PR menadžer iznosi ponudu u uslužnoj izradi reklama uz odgovarajuću naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/02',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.6.3.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI AFFILIATE POSREDNIŠTVA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer može postići dogovor sa prodavcima u vezi postavljanja besplatne reklame, u zamenu za procenat ostvarene prodaje u slučaju da se prodaja proizvoda realizuje preko te reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/02',
				optimum: '65 prodavaca',
				angažman: '6,5 h',
				fond: '37,5 EUR',
			},
		},

		{
			type: 'h4',
			content: '3.3.3.) POTPISIVANJE UGOVORA O DELU ZA TREĆU ETAPU',
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/02',
				optimum: 'primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(78,5 h - 870,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},

		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},

		{
			type: 'h4',
			content: '3.1.4.) IZRADA PLATFORME ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za treću etapu razvoja, dodatno je osposobljavajući za uvođenje veb izloga i samostalnog unošenja proizvoda od strane pojedinačnih prodavaca.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '1/5 platforme',
				angažman: '78,5 h',
				fond: '784 EUR',
			},
		},

		{
			type: 'h4',
			content: '3.1.5.) TESTIRANJE PLATFORME ZA TREĆU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster testira platformu i uverava se u njeno efikasno funkcionisanje predviđeno za treću etapu razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '1 test',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.6.) ELEKTRONSKA PRIPREMA KATEGORIJA PRODAJNIH OBJEKATA - VEB IZLOGA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster vrši unos pripremljenog spiska kategorija prodajnih objekata na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '130 kategorija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{
			type: 'h4',
			content: '4.1.2.) POTPISIVANJE UGOVORA O DELU ZA ČETVRTU ETAPU',
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/02',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
	],
	'mart-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(138,5 h - 746 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.2.14.) PERIODIČAN UNOS AŽURIRANOG SPISKA PROIZVODA NA PLATFORMU',
		},
		{
			type: 'pNormal',
			content:
				'Nakon unosa prvog spiska proizvoda na platformu, administrator iznova unosi ažurirane spiskove proizvoda, da bi informacije na platformi mogle biti periodično obnovljene.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '2.500 objekata',
				angažman: '21 h',
				fond: '157,5 EUR',
			},
		},

		{
			type: 'h4',
			content: '2.4.8.) PERIODIČNO OBJAVLJIVANJE BESPLATNIH REKLAMA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom vremena reklamirani proizvodi promene lokaciju prodaje ili cene, administrator vrši obnovu takvih besplatnih reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '5 reklama',
				angažman: '0,5 h',
				fond: '1,5 EUR',
			},
		},

		{
			type: 'h4',
			content: '3.2.9.) OTVARANJE PROBNIH VEB IZLOGA PRODAJNIH OBJEKATA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Po preporuci PR menadžera, administrator otvara probne veb izloge prodajnih objekata na buvljaku i priprema ih za unos svih potrebnih informacija o probnim artiklima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '1 veb izlog',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{
			type: 'h4',
			content:
				'3.2.10.) SLIKANJE I PRIKUPLJANJE INFORMACIJA O PROBNIM ARTIKLIMA ZA VEB IZLOGE NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Odlaskom na teren ili preko interneta, administrator pribavlja slike probnih artikala i prikuplja sve neophodne informacije o njima (opis proizvoda, karakteristika, cena, itd…).',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.12.) ADMINISTRATIVNA PRIPREMA PROBNIH ARTIKALA ZA VEB IZLOGE NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator sortira prikupljene informacije o proizvodima za probne veb izloge i priprema ih za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.15.) UNOS ARTIKALA SA BUVLJAKA U PROBNE VEB IZLOGE',
		},
		{
			type: 'pNormal',
			content:
				'Administrator unosi slike i druge podatke o proizvodima u probne veb izloge odabranih prodajnih objekata na buvljaku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},

		{
			type: 'h4',
			content: '5.2.13.) DOPUNA VEZA SRODNIH STRANICA SVIH PREGLEDNIKA ZA SUBOTICU',
		},
		{
			type: 'pNormal',
			content:
				'Administrator na već postavljenim smernicama dorađuje linkove ka drugim stranicama koje on proizvoljno odredi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '12.000 stranica',
				angažman: '100 h',
				fond: '500 EUR',
			},
		},

		{
			type: 'h4',
			content:
				'5.2.19.) SLIKANJE I PRIKUPLJANJE INFORMACIJA O ARTIKLIMA ZA PROBNE VEB IZLOGE U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Odlaskom na teren ili preko interneta, administrator pribavlja slike artikala i prikuplja sve neophodne informacije o njima (opis proizvoda, karakteristika, cena, itd…), za potrebe izrade privremenih veb izloga koje prodavci nisu samostalno pokrenuli.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},

		{
			type: 'h4',
			content: '5.2.21.) ADMINISTRATIVNA PRIPREMA ARTIKALA ZA PROBNE VEB IZLOGE U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator sortira prikupljene informacije o proizvodima za probne veb izloge i priprema ih za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},

		{
			type: 'h4',
			content: '5.2.24.) UNOS ARTIKALA U PRIVREMENE VEB IZLOGE PRODAJNIH OBJEKATA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator unosi slike i druge podatke o proizvodima u privremene veb izloge odabranih privremenih prodajnih objekata u Subotici.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(8 h - 40 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '3.2.13.) GRAFIČKA PRIPREMA PROBNIH ARTIKALA ZA VEB IZLOGE NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content: 'Grafički dizajner obrađuje slike proizvoda za probne veb izloge.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.22.) GRAFIČKA PRIPREMA PROBNIH ARTIKALA VEB IZLOGA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content: 'Grafički dizajner obrađuje slike proizvoda za probne veb izloge.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/03',
				optimum: '20 artikala',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(21 h - 161,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (6/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (9/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (9/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (9/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (9/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (9/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (9/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.1.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA VEBMASTEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi vebmasterovi radni zadaci, rokovi i naknade za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.1.3.) POTPISIVANJE UGOVORA O DELU SA VEBMASTEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa vebmasterom za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/03',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(169 h - 855 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.13.) DISTRIBUCIJA PROMOTIVNIH FLAJERA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Pod kontrolom marketing menadžera, promoterke na ulazu u buvljak dele obaveštajne flajere posetiocima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/03',
				optimum: '5.400 flajera',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.14.) USMENA PROMOCIJA PLATFORME POSETIOCIMA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko je potrebno, po instrukciji marketing menadžera promoterke daju dodatna usmena objašnjenja svim zainteresovanim posetiocima buvljaka.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/03',
				optimum: '1.500 posetilaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.15.) ODVOĐENJE KUPACA NA MESTO PRODAJE (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko posetioci buvljaka pokažu interesovanje za određeni proizvod, promoterke ih odvode na tačno mesto prodaje određenih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/03',
				optimum: '250 kupaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.16.) NAVOĐENJE NA PRAĆENJE PREKO DRUŠTVENIH MREŽA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Pod kontrolom marketing menadžera, promoterke koriste svaku priliku da, kroz neposrednu komunikaciju ili putem teksta na flajerima, navedu većinu posetilaca buvljaka na uspostavljanje kontakta putem društvenih mreža.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/03',
				optimum: '1.500 posetilaca',
				angažman: '40 h',
				fond: '202,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (6/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/03',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(69,5 h - 414,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.1.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI PLAĆENOG OGLAŠAVANJA (4/4)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi one prodavce na buvljaku koji su prethodno odobrili označavanje njihovih proizvoda i pokazuje im objavljene promotivne reklame, navodeći ih da i oni učine isto sa svojim proizvodima uz određenu mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.2.) PROMOVISANJE IZRADE REKLAMA (4/4)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci na buvljaku iz nekog razloga nisu u mogućnosti da samostalno pripremaju reklame za svoje proizvode, PR menadžer iznosi ponudu u uslužnoj izradi reklama uz odgovarajuću naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '65 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.6.3.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI AFFILIATE POSREDNIŠTVA (4/4)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer može postići dogovor sa prodavcima u vezi postavljanja besplatne reklame, u zamenu za procenat ostvarene prodaje u slučaju da se prodaja proizvoda realizuje preko te reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '65 prodavaca',
				angažman: '6,5 h',
				fond: '37,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.8.) PREPORUKA ZA OTVARANJE PROBNIH VEB IZLOGA PRODAJNIH OBJEKATA NA BUVLJAKU',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer određuje koji prodajni objekti na buvljaku su podobni za izradu njihovih probnih veb izloga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '1 objekat',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.4.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI DOZVOLJENOG OTVARANJA VEB IZLOGA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer posećuje prodavce čiji prodajni objekti su uvršteni u probne veb izloge, i traži od njih dozvolu da se isti veb izlozi upotrebe za promociju drugim prodavcima na buvljaku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '1 prodavac',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.5.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI SAMOSTALNOG ODRŽAVANJA VEB IZLOGA (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi sve prodavce na buvljaku koji su prethodno dali saglasnost da njihovi proizvodi budu označeni u pregledniku po mapama, pokazuje probne veb izloge i navodi prodavce na samostalno održavanje sopstvenih veb izloga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '125 prodavaca',
				angažman: '25 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.6.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI USLUŽNOG ODRŽAVANJA VEB IZLOGA (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci na buvljaku iz nekog razloga nisu u mogućnosti da samostalno održavaju veb izloge, PR menadžer iznosi ponudu u uslužnom održavanju veb izloga uz odgovarajuću mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/03',
				optimum: '125 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(34 h - 428 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (9/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '7 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (9/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (6/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (6/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.1.4.) IZRADA PLATFORME ZA ČETVRTU ETAPU (1/4)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za četvrtu etapu razvoja, dodatno je osposobljavajući za uvođenje enciklopedije proizvoda i preglednika po slikama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '1/4 platforme',
				angažman: '34 h',
				fond: '341 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.1.2.) POTPISIVANJE UGOVORA O DELU ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o delu za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.1.4.) IZRADA PLATFORME ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za petu etapu razvoja, dodatno je osposobljavajući za unos svih informacija o proizvodima i prodajnim objektima na teritoriji cele Subotice.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '0/0 platforme',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.1.5.) TESTIRANJE PLATFORME ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster testira platformu i uverava se u njeno efikasno funkcionisanje predviđeno za petu etapu razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '1 test',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.8.) ELEKTRONSKA DOPUNA KATEGORIJA PRODAJNIH OBJEKATA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster vrši unos pripremljenog spiska kategorija proizvoda na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '130 kategorija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.12.) ELEKTRONSKA DOPUNA KATEGORIJA PROIZVODA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster vrši unos pripremljenog spiska kategorija proizvoda na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/03',
				optimum: '4.000 kategorija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
	],
	'april-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(300 h - 1.402,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.11.) PERIODIČNA PROVERA INFORMACIJA O PROBNIM ARTIKLIMA ZA VEB IZLOGE',
		},
		{
			type: 'pNormal',
			content:
				'Administrator vrši periodičnu kontrolu odabranih proizvoda, proveravajući da li se i dalje prodaju na istim lokacijama i po istim cenama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '20 artikala',
				angažman: '2 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'3.2.14.) PERIODIČNA GRAFIČKA I ADMINISTRATIVNA DOPUNA PROBNIH ARTIKALA ZA VEB IZLOGE',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom održavanja probnih veb izloga dođe do promene asortimana proizvoda, administrator u saradnji sa grafičkim dizajnerom priprema slike novih  proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '20 artikala',
				angažman: '0,5 h',
				fond: '3 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.2.16.) PERIODIČNI UNOS ARTIKALA SA BUVLJAKA U PROBNE VEB IZLOGE',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom održavanja probnih veb izloga nastupe neke promene koji se tiču njihovih artikala, administrator ažurira sve potrebne informacije u tim veb izlozima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '20 artikala',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (1/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.4.) POPISIVANJE PRODAJNIH OBJEKATA I PROIZVODA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator obilazi Suboticu, popisuje sve prodajne objekte i asortiman njihovih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '600 objekata',
				angažman: '150 h',
				fond: '750 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.9.) OTVARANJE SVIH VEB IZLOGA PRODAJNIH OBJEKATA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator dopunjuje otvaranje veb izloga svih prodajnih objekata u Subotici i priprema ih za unos svih potrebnih informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '600 veb izloga',
				angažman: '60 h',
				fond: '300 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.14.) ADMINISTRATIVNA DOPUNA POPISANIH PROIZVODA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator zavodi spisak proizvoda u Subotici u već postojeće administrativne datoteke iz prethodnih etapa i priprema spisak za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '600 objekata',
				angažman: '30 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.16.) UNOS NA PLATFORMU SPISKA PROIZVODA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator putem otvorenih naloga prodajnih objekata u panelu, unosi spiskove proizvoda i vrši objavljivanje njihovih lokacija na mapi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '600 objekata',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.17.) OGLAŠAVANJE LOKACIJA PRODAJE ZA SVE VRSTE PROIZVODA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Bez obzira na to da li su veb izloge samostalno otvorili prodavci ili ne, administrator u veb izloge svih prodajnih objekata u Subotici unosi vrste proizvoda koji oni prodaju i objavljuje njihove lokacije prodaje na nivou celog grada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '600 objekata',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.20.) PERIODIČNA PROVERA INFORMACIJA O PROBNIM ARTIKLIMA ZA VEB IZLOG',
		},
		{
			type: 'pNormal',
			content:
				'Administrator vrši periodičnu kontrolu odabranih proizvoda, proveravajući da li se i dalje prodaju na istim lokacijama i po istim cenama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '20 artikala',
				angažman: '2 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.2.23.) PERIODIČNA GRAFIČKA I ADMINISTRATIVNA DOPUNA PROBNIH ARTIKALA ZA VEB IZLOG',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom održavanja probnih veb izloga dođe do promene asortimana proizvoda, administrator u saradnji sa grafičkim dizajnerom priprema slike novih  proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '3 artikla',
				angažman: '0,5 h',
				fond: '3 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.25.) PERIODIČNI UNOS ARTIKALA IZ SUBOTICE U PROBNE VEB IZLOGE',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom održavanja probnih veb izloga nastupe neke promene koji se tiču njihovih artikala, administrator ažurira sve potrebne informacije u tim veb izlozima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/04',
				optimum: '3 proizvoda',
				angažman: '0 h',
				fond: '0,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/04',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(3 h - 15 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '5.3.5.) GRAFIČKA PRIPREMA FLAJERA ZA PROMOCIJU PLATFORME PRODAVCIMA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content: 'Po instrukciji PR menadžera, grafički dizajner priprema dizajn promotivnih letaka.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/04',
				optimum: '1 šablon',
				angažman: '3 h',
				fond: '15 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(21,5 h - 153,3 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (7/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (10/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (10/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (10/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (10/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (10/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '18,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (10/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/04',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(9 h - 45 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/04',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (7/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/04',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(37,5 h - 225 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/04',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.5.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI SAMOSTALNOG ODRŽAVANJA VEB IZLOGA (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi sve prodavce na buvljaku koji su prethodno dali saglasnost da njihovi proizvodi budu označeni u pregledniku po mapama, pokazuje probne veb izloge i navodi prodavce na samostalno održavanje sopstvenih veb izloga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/04',
				optimum: '125 prodavaca',
				angažman: '25 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.6.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI USLUŽNOG ODRŽAVANJA VEB IZLOGA (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci na buvljaku iz nekog razloga nisu u mogućnosti da samostalno održavaju veb izloge, PR menadžer iznosi ponudu u uslužnom održavanju veb izloga uz odgovarajuću mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/04',
				optimum: '125 prodavaca',
				angažman: '12,5 h',
				fond: '75 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(34 h - 428 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (10/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/04',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (10/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/04',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (7/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/04',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (7/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/04',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.1.4.) IZRADA PLATFORME ZA ČETVRTU ETAPU (2/4)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za četvrtu etapu razvoja, dodatno je osposobljavajući za uvođenje enciklopedije proizvoda i preglednika po slikama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/04',
				optimum: '1/4 platforme',
				angažman: '34 h',
				fond: '341,5 EUR',
			},
		},
	],
	'maj-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(284 h - 1.376 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (2/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.2.) POTPISIVANJE UGOVORA O DELU ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Ugovor o delu za četvrtu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.4.) ADMINISTRATIVNA PRIPREMA KATEGORIJA ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator određuje kategorije pojedinačnih proizvoda koji se prodaju na buvljaku i sortira ih u odgovarajući poredak.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '2.000 kategorija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.5.) PRIPREMA SLIKA KATEGORIJA ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'U saradnji sa vebmasterom, administrator na platformi priprema sve sličice za kategorije enciklopedije proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '0 sličica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.4.) POPISIVANJE PRODAJNIH OBJEKATA I PROIZVODA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator obilazi Suboticu, popisuje sve prodajne objekte i asortiman njihovih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '600 objekata',
				angažman: '150 h',
				fond: '750 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.9.) OTVARANJE SVIH VEB IZLOGA PRODAJNIH OBJEKATA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator dopunjuje otvaranje veb izloga svih prodajnih objekata u Subotici i priprema ih za unos svih potrebnih informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '600 veb izloga',
				angažman: '60 h',
				fond: '300 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.14.) ADMINISTRATIVNA DOPUNA POPISANIH PROIZVODA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator zavodi spisak proizvoda u Subotici u već postojeće administrativne datoteke iz prethodnih etapa i priprema spisak za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '600 objekata',
				angažman: '30 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.16.) UNOS NA PLATFORMU SPISKA PROIZVODA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator putem otvorenih naloga prodajnih objekata u panelu, unosi spiskove proizvoda i vrši objavljivanje njihovih lokacija na mapi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '600 objekata',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.17.) OGLAŠAVANJE LOKACIJA PRODAJE ZA SVE VRSTE PROIZVODA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Bez obzira na to da li su veb izloge samostalno otvorili prodavci ili ne, administrator u veb izloge svih prodajnih objekata u Subotici unosi vrste proizvoda koji oni prodaju i objavljuje njihove lokacije prodaje na nivou celog grada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/05',
				optimum: '600 objekata',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 16 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.2.3.) OBNOVA INTERNET DOMENA (3/3)',
		},
		{
			type: 'pNormal',
			content: 'Autor vrši godišnju obnovu internet domena sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/05',
				optimum: '1 domen',
				angažman: '0 h',
				fond: '16 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/05',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(22 h - 170 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator vrši ažuriranje dokumenta za evidenciju inventara tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator vrši evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa priznanice za svaku novčanu transakciju, beležeći razloge transakcije, komintente, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transakcije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator izveštava investitore svakog meseca o napretku projekta, realizovanim ciljevima i zadatim ciljevima za naredni period, što se sprovodi neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (8/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema propusta i vrši korekcije po potrebi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (11/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora, regulišući njihova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (11/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (11/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, navodeći podatke o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (11/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (11/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator unosi podatke o svakom investitoru, vrednosti njihovih uloženih sredstava i određuje visinu suvlasničkih udela u elektronski registar.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (11/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta i odlaže gotov novac u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA ADMINISTRATOROM ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator izrađuje i štampa Ugovor o delu sa administratorom za četvrtu etapu na osnovu Tehničkog plana i Plana i programa poslovanja, specificirajući radne zadatke, rokove i naknade.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.3.) POTPISIVANJE UGOVORA O DELU SA ADMINISTRATOROM ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa administratorom za četvrtu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA PR MENADŽEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator izrađuje i štampa Ugovor o delu sa PR menadžerom za petu etapu na osnovu Tehničkog plana i Plana i programa poslovanja, specificirajući radne zadatke, rokove i naknade.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.2.) POTPISIVANJE UGOVORA O DELU SA PR MENADŽEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa PR menadžerom za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/05',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(9 h - 45 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/05',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (8/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/05',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(123,5 h - 957 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/05',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.3.) POTPISIVANJE UGOVORA O DELU ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje Ugovor o delu za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/05',
				optimum: '2 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.3.4.) PRIPREMA I ŠTAMPANJE FLAJERA ZA PROMOCIJU PLATFORME PRODAVCIMA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer osmišljava sadržaj promotivnih flajera preko kojih prodavci u Subotici treba da budu upoznati da su njihovi proizvodi označeni na platformi i da imaju mogućnost daljeg samostalnog uređivanja veb izloga. Pored toga, PR menadžer je zadužen za štampanje flajera.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/05',
				optimum: '600 flajera',
				angažman: '3,5 h',
				fond: '237 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.3.6.) DOSTAVLJANJE FLAJERA PRODAVCIMA U SUBOTICI U SVRSI PROMOVISANJA PLATFORME (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer dostavlja flajere svim onim prodajnim objektima u Subotici koji se nisu oglašavali na Infotrgu, navodeći ih na samostalno otvaranje veb izloga, a preko njih i na oglašavanje proizvoda, a sve po uzoru na već uspostavljen model koji se primenjuje na buvljaku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/05',
				optimum: '600 objekata',
				angažman: '120 h',
				fond: '720 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.7.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI USLUŽNOG ODRŽAVANJA VEB IZLOGA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer putem dopisa navodi prodavce u Subotici na samostalno održavanje veb izloga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/05',
				optimum: '600 prodavaca',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(34 h - 427,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (11/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/05',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (11/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/05',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (8/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/05',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (8/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/05',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.1.4.) IZRADA PLATFORME ZA ČETVRTU ETAPU (3/4)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za četvrtu etapu razvoja, dodatno je osposobljavajući za uvođenje enciklopedije proizvoda i preglednika po slikama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/05',
				optimum: '1/4 platforme',
				angažman: '34 h',
				fond: '341 EUR',
			},
		},
	],
	'jun-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(335,5 h - 1.678,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (12/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (3/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator proverava svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.7.) POVEZIVANJE SRODNIH STRANICA PREGLEDNIKA PO SLIKAMA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator priprema ikonice na dnu svake stranice i umeće linkove ka drugim stranicama koje on proizvoljno odredi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '2.000 stranica',
				angažman: '16,5 h',
				fond: '82,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.10.) SLIKANJE I PRIKUPLJANJE INFORMACIJA O PROBNIM ARTIKLIMA',
		},
		{
			type: 'pNormal',
			content:
				'Odlaskom na teren ili preko interneta, administrator pribavlja slike probnih artikala i prikuplja sve neophodne informacije o njima (opis proizvoda, karakteristika, cena, itd…).',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: 'artikala',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.12.) ADMINISTRATIVNA PRIPREMA PROBNIH ARTIKALA ZA ENCIKLOPEDIJU PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator sortira prikupljene informacije o proizvodima za probne stranice enciklopedije proizvoda i priprema ih za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '100 artikala',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.17.) IZRADA POČETNE STRANICE FUNKCIJE “ENCIKLOPEDIJA PROIZVODA”',
		},
		{
			type: 'pNormal',
			content:
				'Administrator izrađuje stranicu na kojoj su opisane osnovne osobine funkcije enciklopedije proizvoda. Na istoj stranici su uspostavljene i smernice ka drugim stranicama te funkcije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '1 stranica',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.4.) POPISIVANJE PRODAJNIH OBJEKATA I PROIZVODA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator obilazi Suboticu, popisuje sve prodajne objekte i asortiman njihovih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '600 objekata',
				angažman: '150 h',
				fond: '750 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.9.) OTVARANJE SVIH VEB IZLOGA PRODAJNIH OBJEKATA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator dopunjuje otvaranje veb izloga svih prodajnih objekata u Subotici i priprema ih za unos svih potrebnih informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '600 veb izloga',
				angažman: '60 h',
				fond: '300 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.14.) ADMINISTRATIVNA DOPUNA POPISANIH PROIZVODA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator zavodi spisak proizvoda u Subotici u već postojeće administrativne datoteke iz prethodnih etapa i priprema spisak za unos na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '600 objekata',
				angažman: '30 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.16.) UNOS NA PLATFORMU SPISKA PROIZVODA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator putem otvorenih naloga prodajnih objekata u panelu, unosi spiskove proizvoda i vrši objavljivanje njihovih lokacija na mapi.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '600 objekata',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.17.) OGLAŠAVANJE LOKACIJA PRODAJE ZA SVE VRSTE PROIZVODA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Bez obzira na to da li su veb izloge samostalno otvorili prodavci ili ne, administrator u veb izloge svih prodajnih objekata u Subotici unosi vrste proizvoda koji oni prodaju i objavljuje njihove lokacije prodaje na nivou celog grada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '600 objekata',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.3.) RAZMATRANJE NACRTA UGOVORA O SARADNJI SA INKASANTIMA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator razmatra predloženi nacrt ugovora sa inkasantima i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.4.2.) POTPISIVANJE UGOVORA O DELU ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Administrator potpisuje Ugovor o delu za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (12/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/06',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(24 h - 120 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '4.2.13.) GRAFIČKA PRIPREMA PROBNIH ARTIKALA ZA ENCIKLOPEDIJU',
		},
		{
			type: 'pNormal',
			content:
				'Grafički dizajner obrađuje slike proizvoda za probne stranice enciklopedije proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/06',
				optimum: '100 artikala',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.3.) POTPISIVANJE UGOVORA O DELU ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Grafički dizajner potpisuje Ugovor o delu za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.8.) IZRADA OGLASA ZA ANGAŽOVANJE MEĐUGRADSKIH INKASANATA',
		},
		{
			type: 'pNormal',
			content:
				'Grafički dizajner digitalno priprema dokument za oglašavanje radne pozicije međugradskih inkasanata.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/06',
				optimum: '1 obrazac',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(28,5 h - 348 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA PR MENADŽEROM ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade PR menadžera za četvrtu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.3.) POTPISIVANJE UGOVORA O DELU SA PR MENADŽEROM ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa PR menadžerom za četvrtu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA GRAFIČKIM DIZAJNEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade grafičkog dizajnera za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.2.) POTPISIVANJE UGOVORA O DELU SA GRAFIČKIM DIZAJNEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa grafičkim dizajnerom za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.1.) IZRADA UGOVORA SA MARKETING MENADŽEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade marketing menadžera za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.2.) POTPISIVANJE UGOVORA SA MARKETING MENADŽEROM ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa marketing menadžerom za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.1.) IZRADA UGOVORA O DELU SA KOORDINATOROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi njegovi radni zadaci, rokovi i naknade za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.2.) POTPISIVANJE UGOVORA O DELU ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.1.) IZRADA NACRTA UGOVORA O SARADNJI SA INKASANTIMA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator izrađuje nacrt ugovora o saradnji u kojem, u kratkim crtama, opisuje sve aspekte potencijalne saradnje sa inkasantima zaduženima za prikupljanje prihoda van teritorije opštine Subotice.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '7 stranica',
				angažman: '0 h',
				fond: '131 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.6.) IZRADA UGOVORA O SARADNJI SA INKASANTIMA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator izrađuje u elektronskoj formi Ugovor o saradnji u kojem se navode svi radni zadaci, prava i obaveze budućih inkasanata zaduženih za prikupljanje uplata od oglašivača širom Srbije i prosleđivanje istih tih uplata na račun Infotrga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '6 stranica',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.7.) OSMIŠLJAVANJE OGLASA ZA ANGAŽOVANJE MEĐUGRADSKIH INKASANATA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator osmišljava dokument za oglašavanje radne pozicije međugradskih inkasanata, sa sadržajem predloga ugovora, opisa posla, prava i obaveza inkasanata.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '1 obrazac',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.4.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA ADMINISTRATOROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi administratorovi radni zadaci, rokovi i naknade za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.4.3.) POTPISIVANJE UGOVORA O DELU SA ADMINISTRATOROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa administratorom za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(9 h - 45 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (12/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/06',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (9/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/06',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.3.) POTPISIVANJE UGOVORA O DELU ZA PETU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje Ugovor o delu za petu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.4.) RAZMATRANJE NACRTA UGOVORA O SARADNJI SA INKASANTIMA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer razmatra predloženi nacrt ugovora sa inkasantima i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(123,5 h - 957,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (12/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/06',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.8.) PREPORUKA ZA OTVARANJE PROBNIH STRANICA ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer određuje koji prodajni objekti na buvljaku su podobni da njihovi proizvodi budu objavljeni u enciklopediji proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/06',
				optimum: '20 prodavaca',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.2.) POTPISIVANJE UGOVORA O DELU ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje Ugovor o delu za četvrtu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.3.4.) PRIPREMA I ŠTAMPANJE FLAJERA ZA PROMOCIJU PLATFORME PRODAVCIMA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer osmišljava sadržaj promotivnih flajera preko kojih prodavci u Subotici treba da budu upoznati da su njihovi proizvodi označeni na platformi i da imaju mogućnost daljeg samostalnog uređivanja veb izloga. Pored toga, PR menadžer je zadužen za štampanje flajera.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/06',
				optimum: '600 flajera',
				angažman: '3,5 h',
				fond: '237,5 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.3.6.) DOSTAVLJANJE FLAJERA PRODAVCIMA U SUBOTICI U SVRSI PROMOVISANJA PLATFORME (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer dostavlja flajere svim onim prodajnim objektima u Subotici koji se nisu oglašavali na Infotrgu, navodeći ih na samostalno otvaranje veb izloga, a preko njih i na oglašavanje proizvoda, a sve po uzoru na već uspostavljen model koji se primenjuje na buvljaku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/06',
				optimum: '600 objekata',
				angažman: '120 h',
				fond: '720 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.7.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI USLUŽNOG ODRŽAVANJA VEB IZLOGA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer putem dopisa navodi prodavce u Subotici na samostalno održavanje veb izloga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/06',
				optimum: '600 prodavaca',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.5.) RAZMATRANJE NACRTA UGOVORA O SARADNJI SA INKASANTIMA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer razmatra predloženi nacrt ugovora sa inkasantima i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(34 h - 428,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'grayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (12/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '7 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (12/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (9/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (9/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.1.4.) IZRADA PLATFORME ZA ČETVRTU ETAPU (4/4)',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za četvrtu etapu razvoja, dodatno je osposobljavajući za uvođenje enciklopedije proizvoda i preglednika po slikama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '1/4 platforme',
				angažman: '34 h',
				fond: '341,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.1.5.) TESTIRANJE PLATFORME ZA ČETVRTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster testira platformu i uverava se u njeno efikasno funkcionisanje predviđeno za četvrtu etapu razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '1 test',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.6.) ELEKTRONSKA PRIPREMA KATEGORIJA ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster vrši unos pripremljenog spiska kategorija prodajnih objekata na platformu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '2.000 kategorija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.3.) POTPISIVANJE UGOVORA O DELU SA KOORDINATOROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o delu sa koordinatorom za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.2.) RAZMATRANJE NACRTA UGOVORA O SARADNJI SA MEĐUGRADSKIM INKASANTIMA',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster razmatra predloženi nacrt ugovora sa inkasantima i odlučuje o njegovim eventualnim izmenama ili dopunama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/06',
				optimum: '1 nacrt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
	],
	'jul-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(253 h - 1.265 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (4/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.9.) OTVARANJE PROBNIH STRANICA ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Po preporuci PR menadžera, administrator otvara nekoliko nasumično odabranih stranica enciklopedije proizvoda na buvljaku i priprema ih za unos svih potrebnih informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '100 stranica',
				angažman: '5 h',
				fond: '25 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'4.2.11.) PERIODIČNA PROVERA INFORMACIJA O PROBNIM ARTIKLIMA ZA ENCIKLOPEDIJU PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator vrši periodičnu kontrolu odabranih proizvoda, proveravajući da li se i dalje prodaju na istim lokacijama i po istim cenama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '100 artikala',
				angažman: '10 h',
				fond: '50 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'4.2.14.) PERIODIČNA GRAFIČKA I ADMINISTRATIVNA DOPUNA PROBNIH ARTIKALA ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom održavanja probnih stranica enciklopedije proizvoda dođe do određenih promena, administrator u saradnji sa grafičkim dizajnerom priprema slike novih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '20 artikala',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.15.) UNOS ARTIKALA NA PROBNE STRANICE ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator unosi slike i druge podatke o proizvodima na probne stranice enciklopedije proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '100 stranica',
				angažman: '3,5 h',
				fond: '17,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (1/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.5.) PERIODIČNO PONOVNO POPISIVANJE PROIZVODA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom narednog meseca ponovo obilazi Suboticu i iznova popisuje sve vrste proizvoda kako bi mogao obnoviti spisak i izvršiti neke eventualne izmene u asortimanu ukoliko za tim ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '600 objekata',
				angažman: '150 h',
				fond: '750 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.2.15.) PERIODIČNO ADMINISTRATIVNO AŽURIRANJE POPISANIH PROIZVODA U SUBOTICI (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom sledećeg meseca obnavlja spisak popisanih vrsta proizvoda kako ne bi došlo do zastarelosti informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '600 objekata',
				angažman: '30 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.18.) PERIODIČAN UNOS AŽURIRANOG SPISKA PROIZVODA NA PLATFORMU (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon unosa prvog spiska proizvoda na platformu, administrator tokom sledećeg meseca iznova unosi ažurirane spiskove proizvoda, da bi informacije na platformi mogle biti periodično obnovljene.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '600 objekata',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.9.) OGLAŠAVANJE POZICIJE MEĐUGRADSKIH INKASANATA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator na platformi Infotrga oglašava dokument u kojem se opisuje posao međugradskog inkasanta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/07',
				optimum: '1 oglas',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(27 h - 244,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (10/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (13/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (13/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (13/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (13/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (13/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (13/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.10.) ANGAŽOVANJE MEĐUGRADSKIH INKASANATA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator uspostavlja neposrednu komunikaciju sa svim zainteresovanim inkasantima i odlučuje o njihovom angažovanju.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '30 inkasanata',
				angažman: '5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.11.) POPUNJAVANJE ELEKTRONSKIH UGOVORA O SARADNJI SA INKASANTIMA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator uzima lične podatke od angažovanih inkasanata i unosi ih u kopije unapred pripremljene elektronske matrice Ugovora o saradnji sa inkasantima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '30 ugovora',
				angažman: '2 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.12.) ELEKTRONSKO POTPISIVANJE UGOVORA O SARADNJI SA INKASANTIMA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator i angažovani inkasanti elektronskim potpisima overavaju Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/07',
				optimum: '30 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(31,5 h - 157,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (10/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/07',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.5.4.) OBJAVLJIVANJE INFORMACIJA O PROIZVODIMA U SUBOTICI NA DRUŠTVENIM MREŽAMA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer uz pomoć angažovanog asistenta i putem društvenih mreža objavljuje informacije o proizvodima u Subotici i postavlja linkove za direktno prebacivanje na pojedinačne stranice Infotrg platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/07',
				optimum: '4 naloga',
				angažman: '18 h',
				fond: '90 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.5.) USPOSTAVLJANJE I ŠIRENJE KONTAKTA PUTEM DRUŠTVENIH MREŽA (1/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer koristi uspostavljene kontakte na društvenim mrežama i preko njih širi kontakte u pravcu ciljne grupe, birajući za prijatelje i pratioce na mrežama sva ona lica za koja postoji uverenje da su potencijalni korisnici platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/07',
				optimum: '4 naloga',
				angažman: '4,5 h',
				fond: '22,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(129,5 h - 993,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'4.3.4.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI DOZVOLJENOG OBJAVLJIVANJA PROIZVODA U ENCIKLOPEDIJI',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer posećuje na buvljaku prodavce čiji artikli su uvršteni u enciklopediju proizvoda, i traži od njih dozvolu da se isti artikli upotrebe za promovisanje enciklopedije proizvoda drugim prodavcima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/07',
				optimum: '20 prodavaca',
				angažman: '2 h',
				fond: '12 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'4.3.5.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI SAMOSTALNOG ODRŽAVANJA ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi sve prodavce na buvljaku koji su do tada podržali objavljivanje pojedinačnih proizvoda i, pokazujući im prethodne primere, promoviše enciklopediju proizvoda navodeći prodavce na samostalno održavanje iste.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/07',
				optimum: '20 prodavaca',
				angažman: '4 h',
				fond: '24 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.3.4.) PRIPREMA I ŠTAMPANJE FLAJERA ZA PROMOCIJU PLATFORME PRODAVCIMA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer osmišljava sadržaj promotivnih flajera preko kojih prodavci u Subotici treba da budu upoznati da su njihovi proizvodi označeni na platformi i da imaju mogućnost daljeg samostalnog uređivanja veb izloga. Pored toga, PR menadžer je zadužen za štampanje flajera.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/07',
				optimum: '600 flajera',
				angažman: '3,5 h',
				fond: '237,5 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.3.6.) DOSTAVLJANJE FLAJERA PRODAVCIMA U SUBOTICI U SVRSI PROMOVISANJA PLATFORME (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer dostavlja flajere svim onim prodajnim objektima u Subotici koji se nisu oglašavali na Infotrgu, navodeći ih na samostalno otvaranje veb izloga, a preko njih i na oglašavanje proizvoda, a sve po uzoru na već uspostavljen model koji se primenjuje na buvljaku.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/07',
				optimum: '600 objekata',
				angažman: '120 h',
				fond: '720 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.7.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI USLUŽNOG ODRŽAVANJA VEB IZLOGA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer putem dopisa navodi prodavce u Subotici na samostalno održavanje veb izloga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/07',
				optimum: '600 prodavaca',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 86,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (13/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/07',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (13/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/07',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (10/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/07',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (10/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/07',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{ type: 'hr' },
	],
	'avgust-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(244,5 h - 1.223 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (5/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.2.16.) PERIODIČNI UNOS ARTIKALA NA PROBNE STRANICE ENCIKLOPEDIJE PROIZVODA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom održavanja probnih stranica enciklopedije proizvoda nastupe neke promene koje se tiču artikala, administrator ažurira sve potrebne informacije na stranicama enciklopedije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '20 stranica',
				angažman: '0,5 h',
				fond: '3,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (2/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.5.) PERIODIČNO PONOVNO POPISIVANJE PROIZVODA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom narednog meseca ponovo obilazi Suboticu i iznova popisuje sve vrste proizvoda kako bi mogao obnoviti spisak i izvršiti neke eventualne izmene u asortimanu ukoliko za tim ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '600 objekata',
				angažman: '150 h',
				fond: '750 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.2.15.) PERIODIČNO ADMINISTRATIVNO AŽURIRANJE POPISANIH PROIZVODA U SUBOTICI (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom sledećeg meseca obnavlja spisak popisanih vrsta proizvoda kako ne bi došlo do zastarelosti informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '600 objekata',
				angažman: '30 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.18.) PERIODIČAN UNOS AŽURIRANOG SPISKA PROIZVODA NA PLATFORMU (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon unosa prvog spiska proizvoda na platformu, administrator tokom sledećeg meseca iznova unosi ažurirane spiskove proizvoda, da bi informacije na platformi mogle biti periodično obnovljene.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '600 objekata',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.4.) SELEKCIJA PROIZVODA ZA BESPLATNO OGLAŠAVANJE',
		},
		{
			type: 'pNormal',
			content:
				'Administrator bira nekoliko proizvoda u Subotici, snima ih, upisuje njihove cene i beleži lokacije na kojima se prodaju.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '50 proizvoda',
				angažman: '10 h',
				fond: '50 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.7.) OBJAVLJIVANJE BESPLATNIH REKLAMA',
		},
		{
			type: 'pNormal',
			content:
				'Administrator objavljuje reklame odabranih proizvoda na odgovarajućim stranicama platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/08',
				optimum: '50 proizvoda',
				angažman: '3,5 h',
				fond: '16,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'GRAFIČKI DIZAJNER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(8 h - 40 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '5.4.6.) IZRADA BESPLATNIH REKLAMA ZA SUBOTICU',
		},
		{
			type: 'pNormal',
			content: 'Po nalogu administratora, grafički dizajner priprema reklame odabranih proizvoda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/08',
				optimum: '50 proizvoda',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.7.) GRAFIČKA PRIPREMA BILBORDA',
		},
		{
			type: 'pNormal',
			content:
				'U saradnji sa marketing menadžerom, grafički dizajner grafički priprema dizajn bilborda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/08',
				optimum: '1 šablon',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.12.) GRAFIČKA PRIPREMA OBAVEŠTAJNIH FLAJERA ZA KORISNIKE U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Grafički dizajner priprema za štampu obaveštajne flajere sa svim neophodnim informacijama za upućivanje posetilaca na platformu i sa upustvima za njenu upotrebu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'graphic-designer',
			circleContent: {
				realizator: 'grafički dizajner',
				period: '2025/08',
				optimum: '1 obrazac',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(27,5  h - 244,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (11/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},

		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (14/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (14/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (14/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (14/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (14/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (14/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.10.) ANGAŽOVANJE MEĐUGRADSKIH INKASANATA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator uspostavlja neposrednu komunikaciju sa svim zainteresovanim inkasantima i odlučuje o njihovom angažovanju.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '30 inkasanata',
				angažman: '5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.11.) POPUNJAVANJE ELEKTRONSKIH UGOVORA O SARADNJI SA INKASANTIMA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator uzima lične podatke od angažovanih inkasanata i unosi ih u kopije unapred pripremljene elektronske matrice Ugovora o saradnji sa inkasantima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '30 ugovora',
				angažman: '2 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.12.) ELEKTRONSKO POTPISIVANJE UGOVORA O SARADNJI SA INKASANTIMA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator i angažovani inkasanti elektronskim potpisima overavaju Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/08',
				optimum: '30 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(39,5 h - 781 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (11/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.5.4.) OBJAVLJIVANJE INFORMACIJA O PROIZVODIMA U SUBOTICI NA DRUŠTVENIM MREŽAMA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer uz pomoć angažovanog asistenta i putem društvenih mreža objavljuje informacije o proizvodima u Subotici i postavlja linkove za direktno prebacivanje na pojedinačne stranice Infotrg platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '4 naloga',
				angažman: '18 h',
				fond: '90 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.5.) USPOSTAVLJANJE I ŠIRENJE KONTAKTA PUTEM DRUŠTVENIH MREŽA (2/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer koristi uspostavljene kontakte na društvenim mrežama i preko njih širi kontakte u pravcu ciljne grupe, birajući za prijatelje i pratioce na mrežama sva ona lica za koja postoji uverenje da su potencijalni korisnici platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '4 naloga',
				angažman: '4,5 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.6.) OSMIŠLJAVANJE I NADGLEDANJE IZRADE BILBORDA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer osmišljava koncept, vizuelni motiv i tekstulni slogan bilborda putem kojeg će se reklamirati Infotrg platforma.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '1 šablon',
				angažman: '2 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.8.) ŠTAMPANJE BILBORDA',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer štampa bilborde koristeći sredstva iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '2 bilborda',
				angažman: '2 h',
				fond: '166 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.5.11.) OSMIŠLJAVANJE I NADGLEDANJE IZRADE OBAVEŠTAJNIH FLAJERA ZA KORISNIKE U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer osmišljava koncept obaveštajnih flajera koji treba da sadrže sve neophodne informacije za upućivanje posetilaca na platformu i uputstva za njenu upotrebu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '1 obrazac',
				angažman: '2 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.13.) ŠTAMPANJE OBAVEŠTAJNIH FLAJERA ZA KORISNIKE U SUBOTICI',
		},
		{
			type: 'pNormal',
			content: 'Grafički dizajner štampa obaveštajne flajere.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/08',
				optimum: '20.000 flajera',
				angažman: '2 h',
				fond: '437,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(3 h - 18 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.8.) KOMUNIKACIJA SA PRODAVCIMA ZA DOZVOLJENO BESPLATNO REKLAMIRANJE',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi prodavce čiji proizvodi su implementirani u besplatne reklame i traži od njih dozvolu da iste reklame ostanu na platformi izvesno vreme u cilju promovisanja takvog modela oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/08',
				optimum: '10 prodavaca',
				angažman: '3 h',
				fond: '18 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 86,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (14/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/08',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (14/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/08',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (11/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/08',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (11/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/08',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{ type: 'hr' },
	],
	'septembar-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(252,5 h - 1.261,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (6/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator proverava svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (3/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator proverava svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.5.) PERIODIČNO PONOVNO POPISIVANJE PROIZVODA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom narednog meseca ponovo obilazi Suboticu i iznova popisuje sve vrste proizvoda kako bi mogao obnoviti spisak i izvršiti neke eventualne izmene u asortimanu ukoliko za tim ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '600 objekata',
				angažman: '150 h',
				fond: '750 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.2.15.) PERIODIČNO ADMINISTRATIVNO AŽURIRANJE POPISANIH PROIZVODA U SUBOTICI (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon prvog popisa, administrator tokom sledećeg meseca obnavlja spisak popisanih vrsta proizvoda kako ne bi došlo do zastarelosti informacija.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '600 objekata',
				angažman: '30 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.2.18.) PERIODIČAN UNOS AŽURIRANOG SPISKA PROIZVODA NA PLATFORMU (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon unosa prvog spiska proizvoda na platformu, administrator tokom sledećeg meseca iznova unosi ažurirane spiskove proizvoda, da bi informacije na platformi mogle biti periodično obnovljene.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '600 objekata',
				angažman: '20 h',
				fond: '100 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.5.) PERIODIČNO OBNAVLJANJE PROIZVODA ZA BESPLATNO OGLAŠAVANJE',
		},
		{
			type: 'pNormal',
			content:
				'Administrator vrši periodičnu kontrolu odabranih proizvoda, proveravajući da li se i dalje prodaju na istim lokacijama i po istim cenama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '50 proizvoda',
				angažman: '5 h',
				fond: '25 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.4.9.) PERIODIČNO PONOVNO OBJAVLJIVANJE BESPLATNIH REKLAMA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko tokom vremena reklamirani proizvodi promene lokaciju prodaje ili cene, administrator vrši obnovu takvih besplatnih reklama.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '5 reklama',
				angažman: '0,5 h',
				fond: '1,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.4.4.) POPISIVANJE PRODAJNIH OBJEKATA U SRBIJI',
		},
		{
			type: 'pNormal',
			content:
				'Administrator putem interneta pribavlja spisak i kontakte svih registrovanih prodajnih objekata u Srbiji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/09',
				optimum: '1.000 objekata',
				angažman: '16,5 h',
				fond: '82,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (12/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (15/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (15/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (15/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (15/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (15/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (15/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (15/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.1.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA VEBMASTEROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi vebmasterovi radni zadaci, rokovi i naknade za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.1.3.) POTPISIVANJE UGOVORA O DELU SA VEBMASTEROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa vebmasterom za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.4.) REGISTRACIJA DRUŠTVA SA OGRANIČENOM ODGOVORNOŠĆU',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator samostalno ili preko drugog pravnog lica registruje agenciju za posredovanje u trgovini Infotrg d.o.o.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 registracija',
				angažman: '0 h',
				fond: '107 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.5.) OTVARANJE RAČUNA',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko to nije učinio prilikom osnivanja budžetne kase, koordinator otvara račun u banci i pribavlja sve pogodnosti e-bankinga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 račun',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.7.) ANGAŽOVANJE KNJIGOVOĐE',
		},
		{
			type: 'pNormal',
			content: 'Koordintor angažuje lice zaduženo za vođenje svih knjigovodtvenih usluga.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 knjigovođa',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.12.) OPREMANJE KANCELARIJSKIM PRIBOROM I MATERIJALOM',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator oprema kancelariju agencije sa svim neophodnim kancelarijskim priborom i materijalom.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '0 pribora',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.13.) PRIJAVA KOMUNALNIH TROŠKOVA KANCELARIJE',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator prijavljuje sve komunalne troškove nastale zbog potrebe projekta na ime registrovane agencije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.10.) ANGAŽOVANJE MEĐUGRADSKIH INKASANATA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator uspostavlja neposrednu komunikaciju sa svim zainteresovanim inkasantima i odlučuje o njihovom angažovanju.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '30 inkasanata',
				angažman: '5 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.11.) POPUNJAVANJE ELEKTRONSKIH UGOVORA O SARADNJI SA INKASANTIMA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator uzima lične podatke od angažovanih inkasanata i unosi ih u kopije unapred pripremljene elektronske matrice Ugovora o saradnji sa inkasantima.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '30 ugovora',
				angažman: '2 h',
				fond: '15 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.3.12.) ELEKTRONSKO POTPISIVANJE UGOVORA O SARADNJI SA INKASANTIMA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator i angažovani inkasanti elektronskim potpisima overavaju Ugovor o saradnji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '30 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.5.1.) IZRADA PREZENTACIONOG MATERIJALA O INFOTRGU',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator izrađuje prezentacioni materijal u elektronskom obliku za sve prodajne objekte u Srbiji, u kojem sažeto objašnjava svrhu Infotrg platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 obrazac',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.5.2.) IZRADA PREZENTACIONOG MATERIJALA O PREDNOSTI OGLAŠAVANJA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator izrađuje prezentacioni materijal u elektronskom obliku za sve prodajne objekte u Srbiji, u kojem sažeto navodi primere dobre prakse oglašavanja preko Infotrg platforme, po uzoru na pojedine prodajne objekte u Subotici.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '1 obrazac',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.6.1.) IZRADA I ŠTAMPANJE UGOVORA O DELU SA PR MENADŽEROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade PR menadžera za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.6.3.) POTPISIVANJE UGOVORA O DELU SA PR MENADŽEROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa PR menadžerom za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.1.) IZRADA UGOVORA SA MARKETING MENADŽEROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana i Plana i programa poslovanja, koordinator izrađuje i štampa Ugovor o delu u kojem se posebno navode svi radni zadaci, rokovi i naknade marketing menadžera za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '6 stranica',
				angažman: '1 h',
				fond: '8 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.2.) POTPISIVANJE UGOVORA SA MARKETING MENADŽEROM ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Koordinator potpisuje Ugovor o delu sa marketing menadžerom za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(210,5 h - 2.032,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.5.17.) EVIDENCIJA PORASTA PREGLEDA (12/12)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer periodično beleži broj pregleda pojedinačnih stranica na platformi, sačinjava grafikon njihovih porasta i o tome izveštava koordinatora projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '4,5 izveštaja',
				angažman: '9 h',
				fond: '45 EUR',
			},
		},
		{
			type: 'h4',
			content:
				'5.5.4.) OBJAVLJIVANJE INFORMACIJA O PROIZVODIMA U SUBOTICI NA DRUŠTVENIM MREŽAMA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer uz pomoć angažovanog asistenta i putem društvenih mreža objavljuje informacije o proizvodima u Subotici i postavlja linkove za direktno prebacivanje na pojedinačne stranice Infotrg platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '4 naloga',
				angažman: '18 h',
				fond: '90 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.5.) USPOSTAVLJANJE I ŠIRENJE KONTAKTA PUTEM DRUŠTVENIH MREŽA (3/3)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer koristi uspostavljene kontakte na društvenim mrežama i preko njih širi kontakte u pravcu ciljne grupe, birajući za prijatelje i pratioce na mrežama sva ona lica za koja postoji uverenje da su potencijalni korisnici platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '4 naloga',
				angažman: '4,5 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.9.) POSTAVLJANJE BILBORDA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer organizuje postavljanje bilborda na pogodnim lokacijama u Subotici.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '2 bilborda',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.10.) ODRŽAVANJE BILBORDA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer organizuje održavanje bilborda na pogodnim lokacijama tokom određenog vremenskog perioda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '2 bilborda',
				angažman: '0 h',
				fond: '780 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.5.14.) DISTRIBUCIJA PROMOTIVNIH FLAJERA U SUBOTICI',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer putem distributera realizuje dostavu promotivnih letaka na adrese građana Subotice.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '20.000 flajera',
				angažman: '171 h',
				fond: '855 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.3.) POTPISIVANJE UGOVORA O DELU ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer potpisuje Ugovor o delu za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.4.) OSMIŠLJAVANJE VIDEO REKLAME',
		},
		{
			type: 'pNormal',
			content: 'Marketing menadžer osmišljava koncept, scenario i tekst video reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '1 video reklama',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.5.) IZRADA VIDEO REKLAME',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer angažuje eksternog stručnjaka za izradu planirane video reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/09',
				optimum: '1 video reklama',
				angažman: '4 h',
				fond: '220 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.6.2.) POTPISIVANJE UGOVORA O DELU ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'PR menadžer potpisuje Ugovor o delu za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 107 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (15/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '7 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (15/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (12/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (12/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '1 server',
				angažman: '0 h',
				fond: '80 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.1.2.) POTPISIVANJE UGOVORA O DELU ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster potpisuje Ugovor o delu za šestu etapu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.1.4.) IZRADA PLATFORME ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu Tehničkog plana, vebmaster izrađuje platformu za šestu etapu razvoja, dodatno je osposobljavajući za unos svih informacija o proizvodima i prodajnim objektima na teritoriji cele Srbije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '0/0 platforme',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.1.5.) TESTIRANJE PLATFORME ZA ŠESTU ETAPU',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster testira platformu i uverava se u njeno efikasno funkcionisanje predviđeno za šestu etapu razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '1 test',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.11.) UVOĐENJE BIZNIS MEJLA',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator otvara biznis mejl i uspostavlja sve pogodnosti komunikacije preko istog.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/09',
				optimum: '1 mejl',
				angažman: '0 h',
				fond: '20 EUR',
			},
		},
		{ type: 'hr' },
	],
	'oktobar-2025': [
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(30,5 h - 153 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (7/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/10',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (4/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/10',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20,5 h - 284,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transakcije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (13/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (16/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (16/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (16/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (16/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (16/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (16/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.6.) ODRŽAVANJE RAČUNA (1/6)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator održava račun u banci tokom čitvog perioda rada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 račun',
				angažman: '0 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.8.) PERIODIČNE KNJIGOVODSTVENE USLUGE (1/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator finansira sve knjigovodstvene usluge tokom šest meseci razvojnog perioda sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 knjigovođa',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.9.) REGULISANJE UPLATE ZA PIO NA TERET ZAPOSLENIH (1/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator nudi mogućnost svim članovima upravnog tima, njihovim asistentima i investitorima mogućnost prijave njihovih prihoda ostvarenih radom na projektu, uz odbijanja svih naknada na ime uplate za PIO fond i poreza na plate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.10.) PRIJAVA PRIHODA I POREZA NA PLATE (1/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator prijavljuje poreskoj upravi sve prihode koji su nastali pre registracije firme i vrši njihovu uplatu regulišući sve naknade koji idu na ime poreza na profit i poreza na plate zaposlenih.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/10',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(4 h - 20 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.6.) OGLAŠAVANJE VIDEO REKLAME PUTEM MEDIJA',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer realizuje objavljivanje video reklame putem medija uz pomoć sredstava iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/10',
				optimum: '1 video reklama',
				angažman: '4 h',
				fond: '20 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(108 h - 573 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.6.1.) PROMOVISANJE OSTVARENOG BROJA PREGLEDA PROBNIH REKLAMA U SUBOTICI (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi prodavce u Subotici, pokazuje im objavljene promotivne reklame, predočava ostvarene preglede i navodi prodavce na dalje reklamiranje proizvoda uz određenu mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/10',
				optimum: '125 prodavaca',
				angažman: '37,5 h',
				fond: '225 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.6.2.) PROMOVISANJE IZRADE REKLAMA ZA PODRUČJE SUBOTICE (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci u Subotici iz nekog razloga nisu u mogućnosti da samostalno pripreme reklame za svoje proizvode, PR menadžer iznosi ponudu u uslužnoj izradi reklama uz odgovarajuću naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/10',
				optimum: '125 prodavaca',
				angažman: '25 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.6.3.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI AFFILIATE POSREDNIŠTVA U SUBOTICI (1/2)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer može sa prodavcima u Subotici ugovoriti postavljanje besplatne reklame u zamenu za procenat ostvarene prodaje u slučaju da se prodaja proizvoda realizuje preko te reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/10',
				optimum: '125 prodavaca',
				angažman: '25 h',
				fond: '75 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.6.4.) KOMUNIKACIJA SA PRODAVCIMA ŠIROM SRBIJE U SVRSI PROMOVISANJA PLATFORME',
		},
		{
			type: 'pNormal',
			content:
				'Na osnovu dostavljenog spiska, PR menadžer uspostavlja cirkularnu on-lajn komunikaciju sa svim onim prodajnim objektima u Srbiji koji se nisu oglašavali na Infotrgu, navodeći ih na samostalno otvaranje veb izloga, a preko njih i na oglašavanje proizvoda, po uzoru na već uspostavljen model koji se primenjuje u Subotici.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/10',
				optimum: '1 cirkularni dopis',
				angažman: '20,5 h',
				fond: '123 EUR',
			},
		},

		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 126,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (16/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/10',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (16/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/10',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (13/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/10',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (13/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/10',
				optimum: '1 server',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{ type: 'hr' },
	],
	'novembar-2025-mart-2026': [
		{
			type: 'h2',
			content: 'NOVEMBAR 2025.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 1.337,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(61,5 h - 305,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (8/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/11',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (5/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/11',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.8.) PERIODIČNA MODERACIJA VEB IZLOGA VEĆEG OBIMA (1/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/11',
				optimum: '1.800 veb izloga',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.9.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA VEĆEG OBIMA (1/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/11',
				optimum: '4.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20 h - 284,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (14/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (17/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (17/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (17/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (17/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (17/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (17/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.6.) ODRŽAVANJE RAČUNA (2/6)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator održava račun u banci tokom čitvog perioda rada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 račun',
				angažman: '0 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.8.) PERIODIČNE KNJIGOVODSTVENE USLUGE (2/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator finansira sve knjigovodstvene usluge tokom šest meseci razvojnog perioda sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 knjigovođa',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.9.) REGULISANJE UPLATE ZA PIO NA TERET ZAPOSLENIH (2/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator nudi mogućnost svim članovima upravnog tima, njihovim asistentima i investitorima mogućnost prijave njihovih prihoda ostvarenih radom na projektu, uz odbijanja svih naknada na ime uplate za PIO fond i poreza na plate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.10.) PRIJAVA PRIHODA I POREZA NA PLATE (2/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator prijavljuje poreskoj upravi sve prihode koji su nastali pre registracije firme i vrši njihovu uplatu regulišući sve naknade koji idu na ime poreza na profit i poreza na plate zaposlenih.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/11',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 171 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.7.) ODRŽAVANJE VIDEO REKLAME PUTEM MEDIJA (1/5)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer realizuje održavanje video reklame u određenom vremenskom periodu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/11',
				optimum: '1 video reklama',
				angažman: '0 h',
				fond: '171 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(87,5 h - 450 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.6.1.) PROMOVISANJE OSTVARENOG BROJA PREGLEDA PROBNIH REKLAMA U SUBOTICI (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer obilazi prodavce u Subotici, pokazuje im objavljene promotivne reklame, predočava ostvarene preglede i navodi prodavce na dalje reklamiranje proizvoda uz određenu mesečnu naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/11',
				optimum: '125 prodavaca',
				angažman: '37,5 h',
				fond: '225 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.6.2.) PROMOVISANJE IZRADE REKLAMA ZA PODRUČJE SUBOTICE (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko prodavci u Subotici iz nekog razloga nisu u mogućnosti da samostalno pripreme reklame za svoje proizvode, PR menadžer iznosi ponudu u uslužnoj izradi reklama uz odgovarajuću naknadu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/11',
				optimum: '125 prodavaca',
				angažman: '25 h',
				fond: '150 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.6.3.) KOMUNIKACIJA SA PRODAVCIMA U SVRSI AFFILIATE POSREDNIŠTVA U SUBOTICI (2/2)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer može sa prodavcima u Subotici ugovoriti postavljanje besplatne reklame u zamenu za procenat ostvarene prodaje u slučaju da se prodaja proizvoda realizuje preko te reklame.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/11',
				optimum: '125 prodavaca',
				angažman: '25 h',
				fond: '75 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 126,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (17/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/11',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (17/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/11',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (14/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/11',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (14/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/11',
				optimum: '1 server',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{ type: 'hr', height: bolderLine },
		{
			type: 'h2',
			content: 'DECEMBAR 2025.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 888,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(61,5 h - 306 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (9/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/12',
				optimum: '2.500 veb izloga',
				angažman: '15 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (6/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/12',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.8.) PERIODIČNA MODERACIJA VEB IZLOGA VEĆEG OBIMA (2/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/12',
				optimum: '1.800 veb izloga',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.9.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA VEĆEG OBIMA (2/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2025/12',
				optimum: '4.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},

		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2025/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20,5 h - 284,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (15/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (18/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (18/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (18/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (18/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 ugovor',
				angažman: '0,5 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (18/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (18/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.6.) ODRŽAVANJE RAČUNA (3/6)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator održava račun u banci tokom čitvog perioda rada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 račun',
				angažman: '0 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.8.) PERIODIČNE KNJIGOVODSTVENE USLUGE (3/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator finansira sve knjigovodstvene usluge tokom šest meseci razvojnog perioda sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 knjigovođa',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.9.) REGULISANJE UPLATE ZA PIO NA TERET ZAPOSLENIH (3/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator nudi mogućnost svim članovima upravnog tima, njihovim asistentima i investitorima mogućnost prijave njihovih prihoda ostvarenih radom na projektu, uz odbijanja svih naknada na ime uplate za PIO fond i poreza na plate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.10.) PRIJAVA PRIHODA I POREZA NA PLATE (3/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator prijavljuje poreskoj upravi sve prihode koji su nastali pre registracije firme i vrši njihovu uplatu regulišući sve naknade koji idu na ime poreza na profit i poreza na plate zaposlenih.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2025/12',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 171 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.7.) ODRŽAVANJE VIDEO REKLAME PUTEM MEDIJA (2/5)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer realizuje održavanje video reklame u određenom vremenskom periodu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2025/12',
				optimum: '1 video reklama',
				angažman: '0 h',
				fond: '171 EUR',
			},
		},

		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(2 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2025/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 127 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (18/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/12',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '7 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (18/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/12',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (15/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/12',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (15/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2025/12',
				optimum: '1 server',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{ type: 'hr', height: bolderLine },
		{
			type: 'h2',
			content: 'JANUAR 2026.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 887,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(62 h - 305,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (10/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/01',
				optimum: '2.500 veb izloga',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (7/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/01',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.8.) PERIODIČNA MODERACIJA VEB IZLOGA VEĆEG OBIMA (3/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/01',
				optimum: '1.800 veb izloga',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.9.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA VEĆEG OBIMA (3/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/01',
				optimum: '4.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2026/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20 h - 284,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (16/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (19/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (19/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (19/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '8,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (19/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (19/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (19/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.6.) ODRŽAVANJE RAČUNA (4/6)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator održava račun u banci tokom čitvog perioda rada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 račun',
				angažman: '0 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.8.) PERIODIČNE KNJIGOVODSTVENE USLUGE (4/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator finansira sve knjigovodstvene usluge tokom šest meseci razvojnog perioda sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 knjigovođa',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.9.) REGULISANJE UPLATE ZA PIO NA TERET ZAPOSLENIH (4/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator nudi mogućnost svim članovima upravnog tima, njihovim asistentima i investitorima mogućnost prijave njihovih prihoda ostvarenih radom na projektu, uz odbijanje svih naknada na ime uplate za PIO fond i poreza na plate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.10.) PRIJAVA PRIHODA I POREZA NA PLATE (4/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator prijavljuje poreskoj upravi sve prihode koji su nastali pre registracije firme i vrši njihovu uplatu regulišući sve naknade koji idu na ime poreza na profit i poreza na plate zaposlenih.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/01',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},

		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 171 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2026/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.7.) ODRŽAVANJE VIDEO REKLAME PUTEM MEDIJA (3/5)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer realizuje održavanje video reklame u određenom vremenskom periodu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2026/01',
				optimum: '1 video reklama',
				angažman: '0 h',
				fond: '171 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2026/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 126,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (19/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/01',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (19/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/01',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (16/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/01',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (16/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/01',
				optimum: '1 server',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{ type: 'hr', height: bolderLine },
		{
			type: 'h2',
			content: 'FEBRUAR 2026.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 888,5 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},

		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(62 h - 306 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '3.3.7.) PERIODIČNA MODERACIJA VEB IZLOGA (11/11)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/02',
				optimum: '2.500 veb izloga',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '4.3.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA (8/8)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/02',
				optimum: '2.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.8.) PERIODIČNA MODERACIJA VEB IZLOGA VEĆEG OBIMA (4/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/02',
				optimum: '1.800 veb izloga',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.9.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA VEĆEG OBIMA (4/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/02',
				optimum: '4.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2026/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(20 h - 285 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '23,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (17/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.7.) POPUNJAVANJE I ŠTAMPANJE UGOVORA O INVESTICIJI (20/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne ugovore o investiciji za svakog zainteresovanog investitora. Ugovor reguliše sva investitorova prava i obaveze.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 ugovor',
				angažman: '0 h',
				fond: '2 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.8.) POTPISIVANJE UGOVORA SA INVESTITORIMA (20/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitor potpisuju Ugovor o investiciji.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '2 primerka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.9.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (20/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator popunjava i štampa zasebne priznanice za uložena sredstva, u kojima se navode podaci o investitoru i vrednost uloženih sredstava.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '10 priznanica',
				angažman: '1 h',
				fond: '9 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.10.) POTPISIVANJE PRIZNANICA O ULOŽENIM SREDSTVIMA (20/20)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator i zainteresovani investitori potpisuju priznanice za uložena sredstva.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '20 primeraka',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.11.) ZAVOĐENJE VLASNIČKOG UDELA U REGISTAR (20/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator u elektronski registar unosi podatke o svakom investitoru, vrednost njihovih uloženih sredstava i određuje visinu suvlasničkih udela.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '10 ažuriranja',
				angažman: '2,5 h',
				fond: '19 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.12.) ZAVOĐENJE ULOŽENIH FINANSIJA U BUDŽETNI FOND (20/20)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator zavodi prihod od investicionog ulaganja u elektronski dokument za evidenciju budžeta, a gotov novac odlaže u budžetnu kasu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '10 ažuriranja',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.6.) ODRŽAVANJE RAČUNA (5/6)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator održava račun u banci tokom čitvog perioda rada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 račun',
				angažman: '0 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.8.) PERIODIČNE KNJIGOVODSTVENE USLUGE (5/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator finansira sve knjigovodstvene usluge tokom šest meseci razvojnog perioda sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 knjigovođa',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.9.) REGULISANJE UPLATE ZA PIO NA TERET ZAPOSLENIH (5/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator nudi mogućnost svim članovima upravnog tima, njihovim asistentima i investitorima mogućnost prijave njihovih prihoda ostvarenih radom na projektu, uz odbijanje svih naknada na ime uplate za PIO fond i poreza na plate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.10.) PRIJAVA PRIHODA I POREZA NA PLATE (5/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator prijavljuje poreskoj upravi sve prihode koji su nastali pre registracije firme i vrši njihovu uplatu regulišući sve naknade koji idu na ime poreza na profit i poreza na plate zaposlenih.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/02',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 171 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2026/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.7.) ODRŽAVANJE VIDEO REKLAME PUTEM MEDIJA (4/5)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer realizuje održavanje video reklame u određenom vremenskom periodu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2026/02',
				optimum: '1 video reklama',
				angažman: '0 h',
				fond: '171 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2026/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 126,5 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (20/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/02',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '6,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (20/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/02',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (17/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/02',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (17/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/02',
				optimum: '1 server',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{ type: 'hr', height: bolderLine },
		{
			type: 'h2',
			content: 'MART 2026.',
			color: 'black',
		},
		{
			type: 'h2',
			content: 'planirani fond: 1.004 EUR',
			color: 'black',
		},
		{
			type: 'hr',
		},
		{
			type: 'h2',
			content: 'ADMINISTRATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(92 h - 458 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.4.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.8.) PERIODIČNA MODERACIJA VEB IZLOGA VEĆEG OBIMA (5/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/03',
				optimum: '1.800 veb izloga',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '5.3.9.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA VEĆEG OBIMA (5/5)',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/03',
				optimum: '4.000 stranica',
				angažman: '15,5 h',
				fond: '76,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.6.5.) PERIODIČNA MODERACIJA VEB IZLOGA NA NIVOU SRBIJE',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu u otvorenim veb izlozima i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/03',
				optimum: '1.000 veb izloga',
				angažman: '30,5 h',
				fond: '152,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.6.6.) PERIODIČNA MODERACIJA ENCIKLOPEDIJE PROIZVODA NA NIVOU SRBIJE',
		},
		{
			type: 'pNormal',
			content:
				'Administrator provera svaku novu objavu na stranicama enciklopedije proizvoda i sprovodi cenzuru ukoliko objave nisu u skladu sa uslovima oglašavanja.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'administrator',
			circleContent: {
				realizator: 'administrator',
				period: '2026/03',
				optimum: '1.000 stranica',
				angažman: '30,5 h',
				fond: '152,5 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'AUTOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.1.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Autor kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'autor',
			circleContent: {
				realizator: 'autor',
				period: '2026/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'KOORDINATOR',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(15,5 h - 248 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '0.7.2.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU INVENTARA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Ukoliko dođe do bilo kakve promene stanja opreme i materijala neophodnih za funkcionisanje projekta, koordinator to beleži u dokumentu za evidenciju. Ažuriranje dokumenta za evidenciju se obavlja tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '2 ažuriranja',
				angažman: '0,5 h',
				fond: '4 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.4.) AŽURIRANJE DOKUMENTA ZA EVIDENCIJU BUDŽETA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Usled bilo koje promene novčanog stanja u fondovima, koordinator obavlja evidenciju prihoda ili rashoda finansijskih sredstava i objavljuje trenutno stanje budžeta. Evidencija budžeta se sprovodi neprestano tokom celokupnog trajanja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '30 ažuriranja',
				angažman: '3 h',
				fond: '22,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.7.) POPUNJAVANJE I ŠTAMPANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Prilikom svake novčane transakcije (prihoda ili rashoda), koordinator pored beleške u dokumentu za evidenciju budžeta popunjava i štampa priznanicu na kojoj su naznačeni razlozi transkacije, komintenti, iznos i datum.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '30 priznanica',
				angažman: '3 h',
				fond: '24 EUR',
			},
		},
		{
			type: 'h4',
			content: '0.7.8.) POTPISIVANJE PRIZNANICA ZA NOVČANE TRANSAKCIJE (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Svaka odštampana priznanica za novčane transkacije se potpisuje u dva primerka koji se prilažu potpisnicima i čuvaju u arhivi kao dokaz uplate ili isplate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '30 priznanica',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.1.20.) PERIODIČNO IZVEŠTAVANJE INVESTITORIMA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator ima obavezu da svakog meseca izveštava investitore o tome kako projekat napreduje, da predoči realizovane ciljeve u proteklom periodu i zadate ciljeve u narednom periodu. Izveštavanje traje neprekidno tokom svih faza razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '1 izveštaj',
				angažman: '1 h',
				fond: '7,5 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.3.4.) RUTINSKA KONTROLA KOORDINATORA (18/18)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator povremeno sprovodi kontrolu ugovora, evidencionih dokumenata, priznanica, finansijskog stanja, uverava se da nema nikakvih propusta i vrši eventualne korekcije ukoliko za njima ima potrebe.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '1 kontrola',
				angažman: '8 h',
				fond: '60 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.2.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.6.) ODRŽAVANJE RAČUNA (6/6)',
		},
		{
			type: 'pNormal',
			content: 'Koordinator održava račun u banci tokom čitvog perioda rada.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '1 račun',
				angažman: '0 h',
				fond: '10 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.8.) PERIODIČNE KNJIGOVODSTVENE USLUGE (6/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator finansira sve knjigovodstvene usluge tokom šest meseci razvojnog perioda sredstvima iz investicionog fonda.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '1 knjigovođa',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.9.) REGULISANJE UPLATE ZA PIO NA TERET ZAPOSLENIH (6/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator nudi mogućnost svim članovima upravnog tima, njihovim asistentima i investitorima mogućnost prijave njihovih prihoda ostvarenih radom na projektu, uz odbijanja svih naknada na ime uplate za PIO fond i poreza na plate.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.2.10.) PRIJAVA PRIHODA I POREZA NA PLATE (6/6)',
		},
		{
			type: 'pNormal',
			content:
				'Koordinator prijavljuje poreskoj upravi sve prihode koji su nastali pre registracije firme i vrši njihovu uplatu regulišući sve naknade koji idu na ime poreza na profit i poreza na plate zaposlenih.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'koordinator',
			circleContent: {
				realizator: 'koordinator',
				period: '2026/03',
				optimum: '1 prijava',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'MARKETING MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 171 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.5.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2026/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '6.7.7.) ODRŽAVANJE VIDEO REKLAME PUTEM MEDIJA (5/5)',
		},
		{
			type: 'pNormal',
			content:
				'Marketing menadžer realizuje održavanje video reklame u određenom vremenskom periodu.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'marketing-manager',
			circleContent: {
				realizator: 'marketing menadžer',
				period: '2026/03',
				optimum: '1 video reklama',
				angažman: '0 h',
				fond: '171 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'PR MENADŽER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 0 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.4.6.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'PR menadžer kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'pr',
			circleContent: {
				realizator: 'PR menadžer',
				period: '2026/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{ type: 'hr' },
		{
			type: 'h2',
			content: 'VEBMASTER',
			color: 'black',
		},
		{
			type: 'h2',
			content: '(0 h - 127 EUR)',
			weight: 'bold',
			align: 'center',
			color: 'gayMedium',
		},
		{
			type: 'h4',
			content: '1.2.6.) ODRŽAVANJE SSL SERTIFIKATA (21/21)',
		},
		{
			type: 'pNormal',
			content: 'Vebmaster održava SSL sertifikat tokom celokupnog perioda razvoja projekta.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/03',
				optimum: '1 sertifikat',
				angažman: '0 h',
				fond: '7 EUR',
			},
		},
		{
			type: 'h4',
			content: '1.4.3.) KONTAKTIRANJE POTENCIJALNIH INVESTITORA (21/21)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster kontaktira sva lica za koja smatra da su podobna za finansijsko ulaganje u projekat, deleći im promotivne flajere koji ih upućuju na stranice platforme gde su objavljene sve detaljne informacije.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/03',
				optimum: '1 kontakt',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.16.) ODRŽAVANJE PLATFORME (18/18)',
		},
		{
			type: 'pNormal',
			content:
				'Nakon izrade, vebmaster ima obavezu da u narednom periodu održava platformu u stabilnom stanju i da interveniše u slučaju da nastupe tehnički problemi koji mogu izazvati delimični ili potpuni zastoj rada platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/03',
				optimum: '1 intervencija',
				angažman: '0 h',
				fond: '0 EUR',
			},
		},
		{
			type: 'h4',
			content: '2.1.17.) ODRŽAVANJE SERVERA (18/18)',
		},
		{
			type: 'pNormal',
			content:
				'Vebmaster nadgleda i reguliše sve troškove servera tokom ukupnog perioda funkcionisanja platforme.',
			paddingLeft: marginLeftMedium,
		},
		{
			type: 'listEvenly',
			owner: 'webmaster',
			circleContent: {
				realizator: 'vebmaster',
				period: '2026/03',
				optimum: '1 server',
				angažman: '0 h',
				fond: '120 EUR',
			},
		},
		{ type: 'hr', height: bolderLine },
	],
};
