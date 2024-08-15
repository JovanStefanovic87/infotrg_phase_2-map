import { BasicInformation } from '@/utils/helpers/types';

export const contentData: BasicInformation[] = [
	{
		id: 'pristupanje-investitora',
		title: 'PRISTUPANJE INVESTITORA',
		description:
			'Pre ulaganja u investicioni fond, investitori se upoznaju sa investicionim planom i programom, nakon čega potpisuju Ugovor o investiciji.',
		coverImage: '/images/investicioni-plan-i-program/IP01.jpg',
	},
	{
		id: 'ulaganje-finansija',
		title: 'ULAGANJE FINANSIJA',
		description:
			'Investitori mogu uložiti finansijska sredstva u bilo kojoj valuti, a minimalan iznos u protivvrednosti je 0,01% od ukupnog fonda, odnosno 5 evra. Koordinator projekta izdaje potpisane priznanice kao potvrde o uloženim sredstvima.',
		coverImage: '/images/investicioni-plan-i-program/IP02.jpg',
	},
	{
		id: 'vlasnicki-udeli',
		title: 'VLASNIČKI UDELI',
		description:
			'Nakon uplate, investitori zvanično postaju suvlasnici projekta srazmerno visini uloženih sredstava. Njihovo učešće se upisuje u registar i javno objavljuje na odgovarajućim stranicama Infotrg platforme.',
		coverImage: '/images/investicioni-plan-i-program/IP03.jpg',
	},
	{
		id: 'upotreba-ulozenih-sredstava',
		title: 'UPOTREBA ULOŽENIH SREDSTAVA',
		description:
			'Uloženi novac prvo odlazi u investicioni fond, a potom se koristi za realizaciju planiranih razvojnih koraka u predviđenom vremenskom periodu. Svaka upotreba sredstava iz investicionog fonda se evidentira i, prema potrebi, dostavlja na uvid investitorima.',
		coverImage: '/images/investicioni-plan-i-program/IP04.jpg',
	},
	{
		id: 'izvestaji-o-rezultatima-poslovanja',
		title: 'IZVEŠTAJI O REZULTATIMA POSLOVANJA',
		description:
			'Koordinator projekta ima obavezu da svakog meseca dostavi investitorima izveštaj o rezultatima poslovanja, koji uključuje uspešnost realizacije zadatih ciljeva i iznos novčanih sredstava upotrebljenih za tu svrhu.',
		coverImage: '/images/investicioni-plan-i-program/IP05.jpg',
	},
	{
		id: 'smenjivanje-clanova-upravnog-tima',
		title: 'SMENJIVANJE ČLANOVA UPRAVNOG TIMA',
		description:
			'Ukoliko nisu zadovoljni izveštajem o rezultatima poslovanja, investitori imaju pravo da smene člana upravnog tima odgovornog za loše rezultate i na njegovo mesto postave osobu u koju imaju poverenje da će adekvatnije izvršavati radne zadatke i obaveze.',
		coverImage: '/images/investicioni-plan-i-program/IP06.jpg',
	},
	{
		id: 'neprofitabilni-i-profitabilni-period',
		title: 'NEPROFITABILNI I PROFITABILNI PERIOD',
		description:
			'Tokom neprofitabilnog perioda, koji traje do 31.03.2026. godine, investitori ne mogu očekivati prihode.',
		coverImage: '/images/investicioni-plan-i-program/IP07.jpg',
	},
	{
		id: 'naknadna-ulaganja-u-investicioni-fond',
		title: 'NAKNADNA ULAGANJA U INVESTICIONI FOND',
		description:
			'Investitori imaju mogućnost da, tokom bilo kojeg perioda razvoja projekta, u različitim iznosima i u više navrata, ulažu finansijska sredstva u investicioni fond.',
		coverImage: '/images/investicioni-plan-i-program/IP08.jpg',
	},
	{
		id: 'povrat-ulozenih-sredstava',
		title: 'POVRAT ULOŽENIH SREDSTAVA',
		description:
			'Investitori mogu u bilo kom trenutku zatražiti povrat sredstava uloženih u investicioni fond. U tom slučaju, dobijaju nazad svoj novac u razumnom vremenskom roku i u tačnom iznosu, ali gube pravo na suvlasništvo u projektu i dalje prihodovanje.',
		coverImage: '/images/investicioni-plan-i-program/IP09.jpg',
	},
	{
		id: 'prihodovanje-od-investicija',
		title: 'PRIHODOVANJE OD INVESTICIJA',
		description:
			'Nakon 31.03.2026. godine, investitori stiču pravo na prihode stečene poslovanjem Infotrga, srazmerno visini njihovih vlasničkih udela. Predviđena mesečna zarada investitora iznosi 10% od ukupnih uloženih sredstava, plus prihodi od preostalih sedam uslužnih delatnosti Infotrga, kao i prihodi iz inostranstva ukoliko se projekat proširi van Srbije.',
		coverImage: '/images/investicioni-plan-i-program/IP10.jpg',
	},
	{
		id: 'bonus-procenti',
		title: 'BONUS PROCENTI',
		description:
			'Ukoliko se do 31.03.2026. godine potroši manje novca iz investicionog fonda nego što je predviđeno, svi investitori koji su ulagali sredstva do 31.12.2024. godine stiču pravo na preraspodelu viškova, odnosno na dodatne procente koji povećavaju njihov vlasnički udeo i buduće prihode.',
		coverImage: '/images/investicioni-plan-i-program/IP11.jpg',
	},
	{
		id: 'prodaja-vlasnickih-udela',
		title: 'PRODAJA VLASNIČKIH UDELA',
		description:
			'Investitori imaju pravo da u bilo kom trenutku prodaju svoje vlasničke udele u projektu po ceni koju sami odrede. Nakon prenosa vlasništva na drugo lice, gube pravo na dalja prihodovanja od projekta.',
		coverImage: '/images/investicioni-plan-i-program/IP12.jpg',
	},
];

export const mapIdToPath = (id: string): string => {
	return `/ulaganje/investicioni-plan-i-program/${id}`;
};
