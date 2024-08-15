import { BasicInformation } from '@/utils/helpers/types';

export const vebIzlogData: BasicInformation[] = [
	{
		id: 'vebIzlogData-01',
		title: 'Šta je veb izlog?',
		description:
			'Veb izlog je personalni prostor Infotrg platforme u kojem prodavac može izlagati svoje proizvode.',
		coverImage: '/images/platform/PL01.jpg',
		content: [
			{
				type: 'h3',
				content: 'Šta je veb izlog?',
			},
			{
				type: 'pNormal',
				content:
					'U realnom svetu, većina prodajnih objekata ima izloge u koje se postavljaju najatraktivniji proizvodi kako bi privukli pažnju prolaznika i na taj način ih privukli u samu prodavnicu.',
			},
			{
				type: 'pNormal',
				content:
					'Baš kao što klasični izlozi privlače pažnju prolaznika u realnom svetu, istu svrhu na internetu imaju veb izlozi. U ovim veb izlozima postavljaju se najatraktivniji proizvodi onlajn prodavnica ili drugih vebsajtova koji se bave prodajom različitih proizvoda, kako bi privukli pažnju internet korisnika i usmerili ih ka svom vebsajtu ili onlajn prodavnici.',
			},
			{
				type: 'pNormal',
				content:
					'Tehnički gledano, veb izlog je internet prostor koji svaki prodavac može individualno zakupiti, urediti ga, popuniti artiklima i podacima koje želi da prikaže, povezati sa svojim glavnim vebsajtom, a potom ga javno objaviti.',
			},
			{
				type: 'pNormal',
				content:
					'Infotrg omogućava iznajmljivanje ovakvih internet prostora svakom prodavcu, pružajući im priliku da na atraktivan način predstave svoje proizvode i povećaju svoju vidljivost na internetu.',
			},
		],
	},
	{
		id: 'vebIzlogData-02',
		title: 'Šta sadrži veb izlog?',
		description:
			'Veb izlog sadrži opšte informacije o prodajnom objektu, asortiman proizvoda i kontakt formu.',
		coverImage: '/images/platform/PL02.jpg',
		content: [
			{
				type: 'h3',
				content: 'Šta sadrži veb izlog?',
			},
			{
				type: 'pNormal',
				content: 'Veb izlog jednog prodajnog objekta sastoji se od tri zasebne celine (particije):',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 1,
				content:
					'Opšte informacije: Ova particija objedinjuje sve najznačajnije podatke o prodajnom objektu, kao što su internet stranica, opis objekta, delatnost, ime vlasnika, adresa, telefon, radno vreme i druge relevantne informacije.',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 2,
				content:
					'Asortiman prodaje: Ovaj deo veb izloga služi za predstavljanje isključivo artikala. Artikli mogu biti organizovani po kategorijama kako bi se lakše pronalazili, baš kao što su proizvodi u klasičnim izlozima raspoređeni na policama.',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 3,
				content:
					'Kontakt forma: Ova particija omogućava posetiocima da stupe u direktnu komunikaciju sa prodavcem.',
			},
		],
	},
	{
		id: 'vebIzlogData-03',
		title: 'Kako su veb izlozi organizovani na Infotrg platformi?',
		description: 'Veb izlozi su organizovani u kategorijama prema tipu trgovinske delatnosti.',
		coverImage: '/images/platform/PL03.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO SU VEB IZLOZI ORGANIZOVANI NA INFOTRG PLATFORMI?',
			},
			{
				type: 'pNormal',
				content:
					'U realnom svetu, prolaznik koji šeta ulicom ide od jednog izloga do drugog, zagledajući šta je u njima izloženo.',
			},
			{
				type: 'pNormal',
				content:
					'Radi koncepta uređenosti, treba zamusliti da se u svakoj ulici nalaze izlozi samo jedne vrste poslovne delatnosti. Na primer, u jednoj ulici su pekarski izlozi, u drugoj mesarski, a u trećoj poslastičarski izlozi.',
			},
			{
				type: 'pNormal',
				content:
					'Ako zamislimo ulice na ovaj način, lako je zamisliti i da se ulice srodnih delatnosti nalaze u susedstvu, čineći jedan zaseban poslovni kvart. U takvoj analogiji, ulice sa pekarskim, mesarskim i poslastičarskim proizvodima nalazile bi se u tržnom kvartu koji bi se, na primer, mogao nazvati prehrambeni kvart.',
			},
			{
				type: 'pNormal',
				content:
					'Na još većem nivou, više takvih tržnih kvartova (prehrambeni, hemijski, tekstilni, tehnički, itd.) formirali bi jedan čitav tržni grad.',
			},
			{
				type: 'pNormal',
				content:
					'Na isti način, u digitalnom svetu Infotrg okuplja sve veb izloge Subotice na jednom mestu, organizujući ih u zasebne kvartove i ulice, koje se ovde nazivaju "kategorije prodajnih objekata."',
			},
		],
	},
	{
		id: 'vebIzlogData-04',
		title: 'Kako kupac pronalazi određeni veb izlog na Infotrgu?',
		description:
			'Kupac određeni veb izlog pronalazi putem kategorija ili unosom ključnih reči u polje za pretragu.',
		coverImage: '/images/platform/PL04.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO KUPAC PRONALAZI ODREĐENI VEB IZLOG NA INFOTRGU?',
			},
			{
				type: 'pNormal',
				content:
					'Ako posetilac platforme želi da razgleda veb izloge koji, na primer, nude poslastičarske proizvode, zahvaljujući organizovanim kategorijama prodajnih objekata lako će ih pronaći prateći određeni logički niz. Najpre će otići u kategoriju "Prodajni objekti prehrambenih proizvoda", zatim u kategoriju "Poslastičarnice", gde će biti u prilici da razgleda veb izloge svih poslastičarnica u određenom nizu.',
			},
			{
				type: 'pNormal',
				content:
					'Ukoliko posetilac želi da odmah nađe neki određeni prodajni objekat po njegovom nazivu, bez potrebe da pretražuje kategorije, može to učiniti direktnim unosom ključnih reči u dato polje predviđeno za tu svrhu.',
			},
			{
				type: 'pNormal',
				content:
					'Osim toga, veb izlogu se može pristupiti i preko proizvoda koji se prikazuju posredstvom drugih funkcija Infotrga, kao što su funkcija "Gde da kupim?" i enciklopedija proizvoda.',
			},
		],
	},
	{
		id: 'vebIzlogData-05',
		title: 'Ko može otvoriti veb izlog na Infotrgu?',
		description: 'Veb izlog na Infotrgu mogu otvoriti sva lica koja prodaju makar jedan proizvod.',
		coverImage: '/images/platform/PL05.jpg',
		content: [
			{
				type: 'h3',
				content: 'KO MOŽE OTVORITI VEB IZLOG NA INFOTRGU?',
			},
			{
				type: 'pNormal',
				content:
					'Po svojoj svrsi, veb izlozi su prvostepeno namenjeni kao ispomoć svim prodajnim objektima koji već imaju neku veb stranicu. Međutim, veb izlog može otvoriti svako fizičko lice koje ima da ponudi na prodaju bilo kakav artikal, bez obzira da li već ima registrovanu radnju ili vebsajt. Na primer, veb izlog može otvoriti i neko ko želi da proda samo jedan svoj polovni kišobran i ništa više od toga.',
			},
		],
	},
	{
		id: 'vebIzlogData-06',
		title: 'Kako se otvara veb izlog na Infotrgu?',
		description:
			'Veb izlog na Infotrgu se otvara tako što prodavac podnosi zahtev, nakon čega mu se ustupa prazan veb izlog.',
		coverImage: '/images/platform/PL06.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO SE OTVARA VEB IZLOG NA INFOTRGU?',
			},
			{
				type: 'pNormal',
				content: 'Prodavac podnosi zahtev Infotrgu i istog momenta dobija svoj prazan veb izlog.',
			},
			{
				type: 'pNormal',
				content:
					'Na osnovu vrste delatnosti koju je prodavac naveo u zahtevu za otvaranje, prazan veb izlog će biti dodeljen određenoj kategoriji u kojoj se nalaze i drugi veb izlozi slične ili iste delatnosti.',
			},
			{
				type: 'pNormal',
				content:
					'Odmah po ustupanju praznog izloga, prodavac može započeti njegovo popunjavanje artiklima koje želi da izloži, koristeći alate i elektronske obrasce predviđene za tu svrhu.',
			},
		],
	},
	{
		id: 'vebIzlogData-07',
		title: 'Kakvu korist prodavci imaju od veb izloga?',
		description: 'Prodajni objekat može biti pronađen preko proizvoda koji se u njima prodaju.',
		coverImage: '/images/platform/PL07.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKVU KORIST PRODAVCI IMAJU OD VEB IZLOGA?',
			},
			{
				type: 'pNormal',
				content:
					'Treba zamisliti kako bi u realnom svetu izgledalo da na ulicama postoje samo raštrkani trgovinski objekti na kojima se spolja vide samo njihovi nazivi, ali bez ijednog izloga ili izloženog artikla.',
			},
			{
				type: 'pNormal',
				content:
					'Tada bi prolaznici bili prinuđeni da ulaze u svaku prodavnicu zasebno i tumaraju po njoj kako bi pronašli proizvode koji ih zanimaju, prelazeći tako iz jedne prodavnice u drugu.',
			},
			{
				type: 'pNormal',
				content:
					'U realnom svetu, većina prodajnih objekata ima izloge gde prolaznici mogu odmah videti određene proizvode, bez potrebe da ulaze u samu prodavnicu, čime se značajno štedi vreme i energija potencijalnog kupca.',
			},
			{
				type: 'pNormal',
				content:
					'Isti model funkcioniše i u internet svetu. Zahvaljujući veb izlozima koji su sortirani na jednom mestu, posetilac ne mora da otvara i pretražuje svaki pojedinačni vebsajt. Umesto toga, odmah može preko veb izloga pronaći ono što mu treba, i tek ukoliko se zainteresuje za određeni proizvod može pristupiti prodavnici, čime se štedi vreme i trud svakog korisnika interneta koji traži određeni proizvod.',
			},
			{
				type: 'pNormal',
				content:
					'Iz istog razloga i prodavci imaju korist od veb izloga jer ih kupci na taj način lakše pronalaze.',
			},
			{
				type: 'pNormal',
				content:
					'Na primer, mnogi prodavci pored svojih fizičkih radnji ili onlajn prodavnica, otvaraju Fejsbuk stranice kako bi na tim stranicama istakli svoje najatraktivnije proizvode, nadajući se da će ih slučajni prolaznici zapaziti. U ovom slučaju, Fejsbuk stranica ima ulogu veb izloga.',
			},
			{
				type: 'pNormal',
				content:
					'Međutim, Fejsbuk ima značajan nedostatak jer su njegove stranice razbacane i Fejsbuk nalozi nisu sortirani prema delatnostima. Na Fejsbuku je teško ciljano pronaći neki prodajni objekat osim ukoliko se već zna za njegovo ime, ukoliko se slučajno naiđe na njega putem preporuke ili prijatelja, ili ako je uložen novac u njegovu reklamu.',
			},
			{
				type: 'pNormal',
				content:
					'Za razliku od Fejsbuka i drugih medija na internetu, Infotrg nudi mogućnost da svaki prodajni objekat bude momentalno pronađen prema prirodi svoje delatnosti ili prema proizvodima koje prodaje, a to je moguće samo ukoliko prodajni objekat ima otvoren svoj veb izlog.',
			},
		],
	},
	{
		id: 'vebIzlogData-08',
		title: 'Kolika je cena samostalnog održavanja veb izloga?',
		description: 'Samostalno održavanje veb izloga je besplatno.',
		coverImage: '/images/platform/PL08.jpg',
		content: [
			{
				type: 'h3',
				content: 'KOLIKA JE CENA SAMOSTALNOG ODRŽAVANJA VEB IZLOGA?',
			},
			{
				type: 'pNormal',
				content:
					'Otvaranje, korišćenje i samostalno održavanje veb izloga je besplatno, bez obzira na njegovu ekstenziju.',
			},
			{
				type: 'pNormal',
				content:
					'Jedino što se plaća je pozicioniranje veb izloga, odnosno da veb izlog bude u samom vrhu kada se otvori kategorija, da bude među prvima u svojoj kategoriji, ali to nije obavezno.',
			},
		],
	},
];

export const gdeDaKupimData: BasicInformation[] = [
	{
		id: 'gdeDaKupimData-01',
		title: 'Šta je funkcija “gde da kupim?”',
		description:
			'Funkcija “gde da kupim” je specijalizovani pretraživač koji prikazuje lokacije na kojima se mogu kupiti određeni proizvodi.',
		coverImage: '/images/platform/PL09.jpg',
		content: [
			{
				type: 'h3',
				content: 'ŠTA JE FUNKCIJA “GDE DA KUPIM”?',
			},
			{
				type: 'pNormal',
				content:
					'Funkcija “gde da kupim?” je suštinska i najvažnija funkcija Infotrga, i trenutno jedinstveni način pretrage na čitavom internetu.',
			},
			{
				type: 'pNormal',
				content:
					'Generalno, funkcija “gde da kupim?” omogućava da se iz mnoštva informacija brzo i efikasno sagleda gde se određena vrsta proizvoda ili pojedinačnog artikla nalazi u prodaji.',
			},
			{
				type: 'pNormal',
				content:
					'Da bi upotrebio pretraživač proizvoda, korisnik treba samo da odabere (upiše) željeni proizvod i lokaciju pretrage, a potom dobija rezultate pretrage u kojima može sagledati koji prodajni objekti na odabranoj lokaciji prodaju traženi proizvod.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-02',
		title: 'Kako se željeni proizvod pronalazi na Infotrgu?',
		description:
			'Željeni proizvod se pronalazi putem kategorija, unosom ključnih reči u polje za pretragu ili prečicama na naslovnoj stranici.',
		coverImage: '/images/platform/PL10.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO SE ŽELJENI PROIZVOD PRONALAZI NA INFOTRGU?',
			},
			{
				type: 'pNormal',
				content:
					'Na primer, korisnik želi doći do informacije gde može da kupi LED sijalicu na teritoriji cele Subotice.',
			},
			{
				type: 'pNormal',
				content:
					'Korisnik odlazi na sajt Infotrg i pronalazi željeni proizvod, u ovom slučaju LED sijalice. Pronalaženje željenog proizvoda na Infotrg platformi može se sprovesti na nekoliko načina:',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 1,
				content:
					'Unosom ključnih reči u polje za brzu pretragu, gde je dovoljno da korisnik ukuca naziv artikla i zatim klikne na ponuđene opcije.',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 2,
				content:
					'Putem glavnog menija, gde korisnik najpre otvara glavnu kategoriju, a potom otvarajući potkategorije dolazi do krajnjeg proizvoda. Na primer, prvo ulazi u glavnu kategoriju "Svi proizvodi“, potom u potkategoriju "Tehnika“, dalje u "Elektrika“, pa "Sijalice“, i konačno "LED sijalice“.',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 3,
				content: 'Direktnom prečicom sa početne stranice vebsajta.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-03',
		title: 'Kako se ograničava lokacija pretrage?',
		description:
			'Lokacija pretrage se ograničava selekcijom prostornog područja pretrage u izborniku platforme.',
		coverImage: '/images/platform/PL11.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO SE OGRANIČAVA LOKACIJA PRETRAGE?',
			},
			{
				type: 'pNormal',
				content:
					'Nakon što korisnik odabere željenu vrstu proizvoda, u mogućnosti je da odredi geografsko područje na kojem će pretraživanje biti usmereno.',
			},
			{
				type: 'pNormal',
				content:
					'Na primer, ukoliko korisnika zanimaju samo oni prodajni objekti koji se nalaze na teritoriji grada Subotice, korisnik će u polju za unos ključnih reči upisati ili odabrati opciju "LED sijalice – Subotica“, ili putem glavnog menija izabrati grad Suboticu kao jednu od ponuđenih opcija.',
			},
			{
				type: 'pNormal',
				content:
					'Na isti način korisnik može proširiti ili suziti područje pretrage. Na primer, sa Subotice proširiti na područje čitave Bačke ili suziti samo na područje subotičkog buvljaka.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-04',
		title: 'Šta su rezultati pretrage?',
		description:
			'Rezultati pretrage su odvojene sekvence koje sadrže informacije o prodajnom objektu ili proizvodu na datoj lokaciji.',
		coverImage: '/images/platform/PL12.jpg',
		content: [
			{
				type: 'h3',
				content: 'ŠTA SU REZULTATI PRETRAGE?',
			},
			{
				type: 'pNormal',
				content:
					'Na primeru pretrage za LED sijalice u Subotici, Infotrg na osnovu zadatih parametara izbacuje rezultate pretrage.',
			},
			{
				type: 'pNormal',
				content:
					'Rezultati pretrage su prikazani kao odvojene sekvence koje se nižu jedna ispod druge u određenom redosledu i sadrže podatke o svim prodajnim objektima koji prodaju LED sijalice na teritoriji grada Subotice.',
			},
			{
				type: 'pNormal',
				content:
					'Svaki pojedinačni rezultat pretrage je baziran na jedan prodajni objekat i sadrži osnovne podatke o prodajnom objektu, sliku prodajnog objekta, kontakt informacije, adresu, kao i pristup širem asortimanu traženog proizvoda (u ovom slučaju LED sijalice).',
			},
			{
				type: 'pNormal',
				content:
					'Listajući rezultate pretrage, korisnik se može odlučiti za prodajni objekat koji mu najviše odgovara na osnovu ponuđenih informacija.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-05',
		title: 'Koje preglednike sadrži funkcija “gde da kupim”?',
		description:
			'Funkcija “gde da kupim” sadrži sledeće preglednike: po mapama, po prodajnim objektima i po slikama proizvoda.',
		coverImage: '/images/platform/PL13.jpg',
		content: [
			{
				type: 'h3',
				content: 'KOJE PREGLEDNIKE SADRŽI FUNKCIJA "GDE DA KUPIM“?',
			},
			{
				type: 'pNormal',
				content:
					'Generalno, preglednici predstavljaju različite načine prikaza istih rezultata pretrage, u zavisnosti od potreba i interesovanja korisnika.',
			},
			{
				type: 'pNormal',
				content: 'Funkcija “gde da kupim?” u početku će nuditi tri preglednika:',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 1,
				content:
					'Mape prodajnih mesta: preglednik koji prikazuje mapu nekog određenog područja sa označenim tačnim lokacijama na kojima se traženi proizvod nalazi u prodaji.',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 2,
				content:
					'Lista prodajnih objekata: preglednik gde su podaci o prodajnom objektu u prvom planu svakog pojedinačnog rezultata pretrage.',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 3,
				content:
					'Slike proizvoda: preglednik u kojem je akcenat stavljen na slike pojedinačnih artikala, odnosno gde je slika artikla u prvom planu svakog pojedinačnog rezultata pretrage.',
			},
			{
				type: 'pNormal',
				content:
					'U dogledno vreme nakon pokretanja, Infotrg platforma će proširiti asortiman preglednika pretraživača (cene, mali oglasi, video oglasi, itd.).',
			},
			{
				type: 'pNormal',
				content:
					'Nakon što je odabrao jedan preglednik, korisnik se lako može prebaciti na drugi preglednik putem glavnog menija gde se nalaze sve tri ponuđene varijante preglednika, ili putem direktne prečice koja se nalazi odmah iznad rezultata pretrage.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-06',
		title: 'Šta su filteri pretrage?',
		description: 'Filteri pretrage eliminišu suvišne rezultate pretrage.',
		coverImage: '/images/platform/PL14.jpg',
		content: [
			{
				type: 'h3',
				content: 'ŠTA SU FILTERI PRETRAGE?',
			},
			{
				type: 'pNormal',
				content:
					'Filteri omogućavaju dodatno sužavanje liste rezultata pretrage ukoliko je ona predugačka za korisnika. Kada korisnik u rezultatima pretrage dobije listu svih prodajnih objekata, upotrebom filtera može eliminisati suvišne prodajne objekte.',
			},
			{
				type: 'pNormal',
				content:
					'Na primer, korisnik može podesiti filter da se u rezultatima pretrage nalaze samo oni prodajni objekti čije radno vreme je do 16:00h, a da svi ostali budu eliminisani.',
			},
			{
				type: 'pNormal',
				content:
					'Drugi primer: u pregledniku sa slikama korisnik može ostaviti samo artikal Philips LED 40 W, a sve ostale eliminisati iz rezultata pretrage.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-07',
		title: 'Kako se vrši sortiranje rezultata pretrage?',
		description:
			'Sortiranje rezultata pretrage se vrši opcijom za uređivanje liste rezultata pretrage.',
		coverImage: '/images/platform/PL15.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO SE VRŠI SORTIRANJE REZULTATA PRETRAGE?',
			},
			{
				type: 'pNormal',
				content:
					'Rezultati pretrage se izbacuju u određenom redosledu, a korisnik može putem ponuđenih opcija taj redosled menjati prema svojim potrebama.',
			},
			{
				type: 'pNormal',
				content:
					'Na primer, korisnik može rezultate pretrage sortirati prema datumu objave - od najnovijeg do najstarijeg,po cenama artikala - od najjeftinijeg do najskupljeg, itd.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-08',
		title: 'Kako je funkcija “gde da kupim?” povezana sa veb izlozima?',
		description: 'Proizvodi objavljeni u veb izlozima mogu biti vidljivi u rezultatima pretrage.',
		coverImage: '/images/platform/PL16.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO JE FUNKCIJA "GDE DA KUPIM?“ POVEZANA SA VEB IZLOZIMA?',
			},
			{
				type: 'pNormal',
				content:
					'Pretraživač proizvoda funkcije "gde da kupim?“ može da detektuje samo one proizvode koji se nalaze u veb izlozima na Infotrg platformi. Dakle, ukoliko prodavac ne otvori veb izlog i ne ubaci artikle u njega, pretraživač proizvoda na Infotrg platformi neće pronaći te artikle, pa samim tim neće ih ni objaviti u rezultatima pretrage.',
			},
			{
				type: 'pNormal',
				content:
					'Druga veza se ogleda u tome što se iz svakog rezultata pretrage može direktno pristupiti veb izlogu. Na primer, ukoliko korisnik pronađe odgovarajuću LED sijalicu u rezultatu pretrage Tehnomanije, klikom na odgovarajuće dugme može direktno pristupiti veb izlogu Tehnomanije i pogledati njene druge proizvode.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-09',
		title: 'Kakvu korist kupci imaju od funkcije “gde da kupim”?',
		description:
			'Kupci preko funkcije “gde da kupim” imaju uvid u objedinjenu pretragu svih vrsta proizvoda na jednom mestu.',
		coverImage: '/images/platform/PL17.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKVU KORIST KUPCI IMAJU OD FUNKCIJE "GDE DA KUPIM?“',
			},
			{
				type: 'pNormal',
				content:
					'Korist koju kupci imaju od funkcije "gde da kupim?“ ogleda se u objedinjenoj, brzoj i direktnoj pretrazi koja štedi vreme. Bez ove funkcije, korisnici interneta su prinuđeni da guglaju, obilaze, otvaraju i pregledaju razne sajtove, a potom upisuju uporedne beleške. Rezultati pretrage na Infotrg platformi sve potrebne informacije objavljuju odmah i na jednom mestu.',
			},
		],
	},
	{
		id: 'gdeDaKupimData-10',
		title: 'Kakvu korist prodavci imaju od funkcije “gde da kupim”?',
		description:
			'Veb izlozi mogu biti pronađeni i posećeni preko proizvoda u rezultatima pretrage.',
		coverImage: '/images/platform/PL18.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKVU KORIST PRODAVCI IMAJU OD FUNKCIJE "GDE DA KUPIM?“',
			},
			{
				type: 'pNormal',
				content:
					'Korist koju prodavci imaju od funkcije "gde da kupim?“ ogleda se u mogućnosti da njihovi prodajni objekti budu pronađeni preko proizvoda koji se u njima prodaju, čak i ako nisu digitalno optimizovani, što je do sada neviđena pogodnost na internetu. U dosadašnjoj praksi na internetu, do oficijalnih stranica prodajnih objekata se uglavnom dolazi preko njihovog brendiranog imena ili optimizovanih stranica na Google-u, dok na Fejsbuku takva mogućnost ne postoji.',
			},
		],
	},
];

export const enciklopedijaData: BasicInformation[] = [
	{
		id: 'enciklopedijaData-01',
		title: 'Šta je enciklopedija proizvoda?',
		description:
			'Enciklopedija proizvoda je skup datoteka na platformi koje nude detaljne informacije o pojedinačnim proizvodima.',
		coverImage: '/images/platform/PL19.jpg',
		content: [
			{
				type: 'h3',
				content: 'ŠTA JE ENCIKLOPEDIJA PROIZVODA?',
			},
			{
				type: 'pNormal',
				content:
					'Enciklopedija proizvoda je funkcija Infotrg platforme preko koje se mogu dobiti detaljne informacije o pojedinačnim artiklima. U realnom životu, ta svojevrsna baza artikala se može uporediti sa velikom enciklopedijom koja sadrži sve artikle sa njihovim detaljnim opisima, gde bi svaka stranica zasebno sadržala opis jednog artikla. Listajući takvu knjigu, korisnik bi mogao razgledati razne artikle dostupne u prodaji u svim prodajnim objektima i dobijati informacije o njima.',
			},
			{
				type: 'pNormal',
				content:
					'Na isti način funkcioniše i enciklopedija proizvoda na Infotrg platformi. Korisnik može pronaći zaseban članak o artiklu koji ga zanima, a potom preći na sledeći članak o nekom drugom artiklu, listajući redno sadržaj ili koristeći odgovarajuće prečice.',
			},
		],
	},
	{
		id: 'enciklopedijaData-02',
		title: 'Kako se pronalazi proizvod o kojem se želi dobiti informacija?',
		description:
			'Proizvod o kojem se želi dobiti informacija se pronalazi pregledom kategorija enciklopedije proizvoda, unosom ključnih reči u polje za pretragu ili preko veb izloga.',
		coverImage: '/images/platform/PL20.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO SE PRONALAZI PROIZVOD O KOJEM SE ŽELI DOBITI INFORMACIJA?',
			},
			{
				type: 'pNormal',
				content:
					'Na primer, ukoliko korisnik želi dobiti informacije o kulenu "Sent Tomaš 1000 g“, može to učiniti na nekoliko načina:',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 1,
				content:
					'Unosom ključnih reči: Upisivanjem naziva artikla u polje za unos ključnih reči uz dodatak da je to enciklopedija proizvoda (npr. "Sent Tomaš 1000 g – enciklopedija proizvoda").',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 2,
				content:
					'Pretragom kategorija: Zalaženjem u kategorije i potkategorije putem glavnog menija ili menija enciklopedije proizvoda (Svi proizvodi > Hrana > Suhomesnati proizvodi > Kuleni > Kulen Sent Tomaš 1000 g).',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 3,
				content:
					'Direktan pristup: Direktnim pristupom enciklopediji proizvoda iz drugih funkcija Infotrg platforme (veb izloga prodavca ili rezultata pretrage pretraživača funkcije "gde da kupim?“).',
			},
		],
	},
	{
		id: 'enciklopedijaData-03',
		title: 'Koje informacije se mogu dobiti o pojedinačnim proizvodima?',
		description:
			'Informacije o pojedinačnim proizvodima koje se mogu dobiti u enciklopediji proizvoda su: slike, cene, svojstva proizvoda, način upotrebe, poreklo, lokacije prodaje.',
		coverImage: '/images/platform/PL21.jpg',
		content: [
			{
				type: 'h3',
				content: 'KOJE INFORMACIJE SE MOGU DOBITI O POJEDINAČNIM PROIZVODIMA?',
			},
			{
				type: 'pNormal',
				content:
					'Svaki članak (stranica enciklopedije) na Infotrg platformi sadrži informacije o samo jednom pojedinačnom artiklu. Te informacije zavise od vrste artikla. Na primer, informacije o kulenu "Sent Tomaš 1000 g“ mogu uključivati:',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 1,
				content: 'Slike proizvoda',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 2,
				content: 'Proizvođač',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 3,
				content: 'Zemlja porekla',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 4,
				content: 'Pakovanje',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 5,
				content: 'Sastav namirnica',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 6,
				content: 'Rok trajanja',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 7,
				content: 'Načini pripreme',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 8,
				content: 'Preporuke za upotrebu',
			},
			{
				type: 'pNormal',
				content:
					'Ovakav pristup omogućava korisnicima da dobiju sve relevantne informacije o proizvodu koji ih zanima na jednom mestu.',
			},
		],
	},
	{
		id: 'enciklopedijaData-04',
		title: 'Koje odeljke sadrže stranice enciklopedije proizvoda?',
		description:
			'Stranice enciklopedije proizvoda sadrže sledeće odeljke: opšte informacije, slike, specifikacije, uputstva, napomene, “gde se prodaje?”.',
		coverImage: '/images/platform/PL22.jpg',
		content: [
			{
				type: 'h3',
				content: 'KOJE ODELJKE SADRŽE STRANICE ENCIKLOPEDIJE PROIZVODA?',
			},
			{
				type: 'pNormal',
				content:
					'Stranice enciklopedije proizvoda mogu biti veoma dugačke zbog obilja teksta, što može otežati korisnicima brzo pronalaženje određenih informacija. Zato je svaki članak podeljen na nekoliko segmenata, dostupnih putem prečica. Na primer, korisnik koji otvori članak o kulenu "Sent Tomaš 1000 g" sa namerom da sazna u kakvom crevu je kulen pakovan, ne mora da pregleda ceo članak već može da klikne na odeljak "specifikacije" i odmah dobije tu informaciju.',
			},
		],
	},
	{
		id: 'enciklopedijaData-05',
		title: 'Kako se enciklopedija proizvoda koristi za otkrivanje manje poznatih proizvoda?',
		description:
			'Enciklopedija proizvoda za otkrivanje manje poznatih proizvoda se koristi pregledom izbornika ili prelistavanjem članaka.',
		coverImage: '/images/platform/PL23.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO SE ENCIKLOPEDIJA PROIZVODA KORISTI ZA OTKRIVANJE MANJE POZNATIH PROIZVODA?',
			},
			{
				type: 'pNormal',
				content:
					'Enciklopedija proizvoda ne samo da pruža informacije o svakom pojedinačnom artiklu, već omogućava korisnicima da otkriju manje poznate ili potpuno nepoznate proizvode. Na primer, nakon što korisnik pogleda podatke o kulenu "Sent Tomaš 1000 g", može istražiti i druge vrste kulena koje bi mu mogle biti zanimljive. To može učiniti na nekoliko načina:',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 1,
				content:
					'Prelistavanjem članaka: Nakon pregledanja jednog članka, korisnik može preći na sledeći srodni članak putem opcija "prethodno" (npr. "Sent Tomaš 500 g") ili "sledeće" (npr. "Sent Tomaš 1000 g ljuta").',
			},
			{
				type: 'pNormalWrapped',
				paddingLeft: '20px',
				order: 2,
				content:
					'Razgledanjem kategorije: Korisnik može pogledati sve artikle unutar određene kategorije putem spiska. Na primer, u kategoriji "Kulen Sent Tomaš" mogu se naći članci kao što su "Sent Tomaš 1000 g", "Sent Tomaš 500 g", "Sent Tomaš 1000 g ljuta", itd.',
			},
		],
	},
	{
		id: 'enciklopedijaData-06',
		title: 'Ko može objavlti informacije u enciklopediji proizvoda?',
		description:
			'Informacije u enciklopediji proizvoda mogu objaviti svi registrovani korisnici platforme.',
		coverImage: '/images/platform/PL24.jpg',
		content: [
			{
				type: 'h3',
				content: 'KO MOŽE OBJAVLJIVATI INFORMACIJE U ENCIKLOPEDIJI PROIZVODA?',
			},
			{
				type: 'pNormal',
				content:
					'Svaki registrovani korisnik Infotrg platforme, bez obzira da li je kupac ili prodavac, može učestvovati u pisanju ili dopuni članaka o bilo kojem artiklu. Administrator platforme ima ulogu moderatora i proverava da li su unete informacije relevantne i korektne. Ukoliko informacije nisu tačne, administrator ih može ukloniti.',
			},
			{
				type: 'pNormal',
				content:
					'Artikal se može nalaziti u enciklopediji proizvoda čak iako nije prisutan u veb izlogu. Takođe, enciklopedija proizvoda može sadržati sačuvane podatke o nekim zastarelim proizvodima koji više nisu u prodaji.',
			},
		],
	},
	{
		id: 'enciklopedijaData-07',
		title: 'Kako je enciklopedija proizvoda povezana sa veb izlogom?',
		description:
			'Preko proizvoda objavljenih u veb izlozima moguće je pristupiti stranicama enciklopedije proizvoda.',
		coverImage: '/images/platform/PL25.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO JE ENCIKLOPEDIJA PROIZVODA POVEZANA SA VEB IZLOGOM?',
			},
			{
				type: 'pNormal',
				content:
					'Enciklopediji proizvoda se može pristupiti nezavisno, ali i putem veb izloga. Kada korisnik u veb izlogu pronađe zanimljiv artikal o kojem želi da sazna više, klikom na odgovarajuću prečicu (link) može biti direktno preusmeren na članak o tom artiklu u enciklopediji proizvoda.',
			},
		],
	},
	{
		id: 'enciklopedijaData-08',
		title: 'Kako je enciklopedija proizvoda povezana sa funkcijom “gde da kupim”?',
		description:
			'Preko proizvoda u rezultatima pretrage moguće je pristupiti stranicama enciklopedije proizvoda.',
		coverImage: '/images/platform/PL26.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKO JE ENCIKLOPEDIJA PROIZVODA POVEZANA SA FUNKCIJOM “GDE DA KUPIM?”',
			},
			{
				type: 'pNormal',
				content:
					'Ako se korisnik Infotrg platforme zainteresuje za artikal pronađen u rezultatima pretrage funkcije “gde da kupim?”, može putem prečice (linka) biti preusmeren na članak o tom artiklu u enciklopediji proizvoda.',
			},
			{
				type: 'pNormal',
				content:
					'Takođe, iz enciklopedije proizvoda se može direktno pristupiti pretraživaču proizvoda funkcije “gde da kupim?”. Na primer, korisnik koji u enciklopediji proizvoda pronađe zanimljiv artikal, može klikom na prečicu “gde se prodaje” direktno preći u pretraživač proizvoda i videti listu svih prodajnih objekata koji imaju taj artikal u svom asortimanu.',
			},
		],
	},
	{
		id: 'enciklopedijaData-09',
		title: 'Kakvu korist kupci imaju od enciklopedije proizvoda?',
		description: 'Kupci imaju uvid u objedinjene informacije o proizvodima na jednom mestu.',
		coverImage: '/images/platform/PL27.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKVU KORIST KUPCI IMAJU OD ENCIKLOPEDIJE PROIZVODA?',
			},
			{
				type: 'pNormal',
				content:
					'Kupci imaju koristi od enciklopedije proizvoda zbog zbirke podataka o artiklima na jednom mestu, čime se izbegava potreba za surfovanjem internetom i posećivanjem različitih vebsajtova. Time se štedi vreme, smanjuje mogućnost propuštanja bitnih informacija, i omogućava korisnicima da usputno steknu saznanja o drugim proizvodima koji su im do tada bili nepoznati.',
			},
		],
	},
	{
		id: 'enciklopedijaData-10',
		title: 'Kakvu korist prodavci imaju od enciklopedije proizvoda?',
		description:
			'Prodavci mogu da se referencijalno povežu sa stranicama enciklopedije proizvoda, bez potrebe zasebnih opisivanja pojedinačnih proizvoda.',
		coverImage: '/images/platform/PL28.jpg',
		content: [
			{
				type: 'h3',
				content: 'KAKVU KORIST PRODAVCI IMAJU OD ENCIKLOPEDIJE PROIZVODA?',
			},
			{
				type: 'pNormal',
				content:
					'Prilikom unosa proizvoda u veb izlog, prodavci često moraju pripremiti i njihove opise kako bi zadovoljili potrebe potrošača za informacijama. Opisivanje svakog artikla zahteva mnogo vremena i truda, te može opteretiti njihove veb stranice. Zahvaljujući jedinstvenoj bazi artikala u enciklopediji proizvoda, koju mogu zajednički koristiti svi prodavci, vlasnici veb izloga mogu jednostavno okačiti naziv i cenu artikla, a za detaljne informacije mogu postaviti link ka enciklopediji proizvoda, čime preusmeravaju zainteresovane kupce.',
			},
		],
	},
];

export const highlightedText = [
	'Opšte informacije:',
	'Asortiman prodaje:',
	'Kontakt forma:',
	'Unosom ključnih reči:',
	'Putem glavnog menija:',
	'Mape prodajnih mesta:',
	'Lista prodajnih objekata:',
	'Slike proizvoda:',
	'Direktnom prečicom:',
	'Pretragom kategorija:',
	'Direktan pristup:',
	'Prelistavanjem članaka:',
	'Razgledanjem kategorije:',
];
