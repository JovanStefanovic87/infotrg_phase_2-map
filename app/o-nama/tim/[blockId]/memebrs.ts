import { ContentBlocksData, MemberData } from '@/app/helpers/types';

const bolderLine = 4;

const marginLeftSmall = '2vw';
const marginLeftMedium = '4vw';

const MIROSLAV: Omit<MemberData, 'id'> = {
  name: 'Miroslav Ostrogonac',
  birth: '27.04.1975.',
  profession: 'Grafičar',
  infotrgEngagements: 'Od 01.08.2022. godine',
  phone: '0601451349',
  email: 'suinfotrg@gmail.com',
  image: '/images/members/avatar_miroslav.webp',
};

const JOVAN: Omit<MemberData, 'id'> = {
  name: 'Jovan Stefanović',
  birth: '21.07.1987.',
  profession: 'Veb programer (web developer)',
  affinities:
    'Javascript, React, React Native, Typescript, PostgreSQL, Node JS, Figma, NginX, Linux',
  previousEngagements:
    'Veb aplikacija za zakazivanje termina “KLIKTERMIN“ (autor/veb programer), internet stranica za prodaju pasa “CORGIHAPPYHOUSE” (veb programer), mobilna aplikacija za evidenciju servisa klima uređaja “AC INSPECTOR” (veb programer)',
  infotrgEngagements: 'Od 27.08.2022. godine',
  phone: '0691120296',
  email: 'jovanstefanovic024@gmail.com',
  image: '/images/members/avatar_jovan.webp',
};

const NEBOJSA: Omit<MemberData, 'id'> = {
  name: 'Nebojša Lukić',
  birth: '',
  infotrgEngagements: 'Od 27.08.2022. godine',
  phone: '0611366166',
  image: '/images/members/avatar_nebojsa.webp',
};

const NEMANJA: Omit<MemberData, 'id'> = {
  name: 'Nemanja Komazec',
  affinities: 'Marketing, timski rad, terenski rad na relaciji Sombor-Subotica',
  previousEngagements: 'Distribucija prečistača vazduha i vode “FRASH” (trgovački putnik)',
  infotrgEngagements: 'Od 01.02.2024. godine',
  phone: '0642922747',
  email: 'komazecnemanja22@gmail.com',
  image: '/images/members/avatar_nemanja.webp',
};

const NORBERT: Omit<MemberData, 'id'> = {
  name: 'Norbert Takač',
  birth: '28.04.1989.',
  education:
    'Tehničar za pripremu štampe, digitalni tipograf i dizajner - Politehnička škola, Informatičko inženjerstvo - Visoka tehnička škola strukovnih studija',
  affinities:
    'Grafički dizajn, priprema za štampu, Microsoft word, Excel, Power Point, web dizajn (CSS, HTML), Corel Draw, Adobe Photoshop, Autodesc Fusion 360, programiranje i servisiranje fiskalnih kasa',
  previousEngagements:
    'GTL export - import (elektrotehničar računara i serviser za fiskalnie kase), šteler - tehničar (Continental Contitech Fluid)',
  infotrgEngagements: 'Od 14.10.2024. godine',
  /* phone: '069709380', */
  email: 'bosqeee@gmail.com',
  image: '/images/members/avatar_norbert.webp',
};

const ATILA: Omit<MemberData, 'id'> = {
  name: 'Atila Sekula',
  birth: '23.12.1985.',
  profession: 'Team leader (Continental Subotica)',
  affinities: 'Administracija, izrada dokumenata, Office paket, korišćenje AI, timski rad.',
  infotrgEngagements: 'Od 14.10.2024. godine',
  phone: '0655577446',
  email: 'sekula1985@yahoo.com',
  image: '/images/members/avatar_atila.webp',
};

export const contentData: MemberData[] = [
  {
    id: 'autor',
    title: 'AUTOR',
    ...MIROSLAV,
    affinities: 'Grafički dizajn, leksikografija, pisanje scenarija, produkcija društvenih igara',
    previousEngagements:
      'Projekat “MICKEY“ (autor), kviz “KVIZANTIJA“ (autor), strip “Zeutron“ (autor)',
  },
  {
    id: 'administrator',
    title: 'ADMINISTRATOR',
    ...ATILA,
  },
  {
    id: 'vebmaster',
    title: 'VEBMASTER',
    ...JOVAN,
  },
  {
    id: 'graficki-dizajner',
    title: 'GRAFIČKI DIZAJNER',
    ...NORBERT,
  },
  {
    id: 'koordinator',
    title: 'KOORDINATOR',
    ...MIROSLAV,
    affinities: 'Administracija, trgovina, preduzetništvo, grafički dizajn, likovna umetnost',
    previousEngagements:
      'Kasarna “Vojvoda Živojin Mišić” (četni evidentičar), trgovina “KMS d.o.o.” (šef magacina), proizvodnja “JADROPLAST” d.o.o. (smenovođa), projekat “MICKEY“ (dizajner), kviz “KVIZANTIJA“ (autor / ilustrator), strip “Zeutron“ (scenarista / crtač)',
  },
  {
    id: 'pr-menadzer',
    title: 'PR MENADŽER',
    ...NEBOJSA,
  },
  {
    id: 'marketing-menadzer',
    title: 'MARKETING MENADŽER',
    ...NEMANJA,
  },
];
export const contentBlocksData: ContentBlocksData = {
  autor: [
    {
      type: 'h3',
      content: 'IZRADA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Izrada plana rada',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada investicionog plana i programa',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOPUNA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Dopuna tehničkog plana',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'RAZMATRANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje nacrta ugovora o saradnji',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ŠTAMPANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Štampanje prezentacionog materijala za okupljanje saradnika',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Štampanje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POTPISIVANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje investicionog plana i programa',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'PERIODIČNA OBNOVA ELEKTRONSKIH FORMI',
    },
    {
      type: 'pNormal',
      content: 'Obnova internet domena',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ZAŠTITA PROJEKTA',
    },
    {
      type: 'pNormal',
      content: 'Zaštita autorskih prava',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'KONTAKTIRANJE SARADNIKA',
    },
    {
      type: 'pNormal',
      content: 'Inicijalno okupljanje saradnika',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje potencijalnih investitora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  administrator: [
    {
      type: 'h3',
      content: 'ADMINISTRATIVNA MANIPULACIJA',
    },
    {
      type: 'pNormal',
      content: 'Administrativna kategorizacija',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Administrativna priprema spiskova',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Administrativna dopuna spiskova',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'OTVARANJE DATOTEKA NA PLATFORMI',
    },
    {
      type: 'pNormal',
      content: 'Otvaranje probnih stranica enciklopedije proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Otvaranje privremenih veb izloga prodajnih objekata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POPUNJAVANJE  STRANICA NA PLATFORMI',
    },
    {
      type: 'pNormal',
      content: 'Popunjavanje početnih stranica funkcija',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Popunjavanje bazičnih stranica ',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Popunjavanje stranica investicionog fonda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'UNOS PODATAKA NA PLATFORMU',
    },
    {
      type: 'pNormal',
      content: 'Unos podataka o artiklima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Unos podataka o prodajnim objektima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Unos artikala na probne stranice enciklopedije proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Unos artikala u privremene veb izloge',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'OBJAVLJIVANJE NA PLATFORMI',
    },
    {
      type: 'pNormal',
      content: 'Objavljivanje lokacija prodaje',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Objavljivanje reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Objavljivanje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Objavljivanje radnih pozicija saradnika',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AŽURIRANJE',
    },
    {
      type: 'pNormal',
      content: 'Ažuriranje spiskova proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Ažuriranje spiskova prodajnih objekata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Ažuriranje reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'MODERACIJA',
    },
    {
      type: 'pNormal',
      content: 'Moderacija veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Moderacija enciklopedije proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'SELEKCIJA PROIZVODA',
    },
    {
      type: 'pNormal',
      content: 'Selekcija proizvoda za besplatno oglašavanje',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POPISIVANJE',
    },
    {
      type: 'pNormal',
      content: 'Popisivanje prodajnih objekata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Popisivanje proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'RAZMATRANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'PRIPREMA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Priprema plana rada',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POTPISIVANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora o delu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'KONTAKTIRANJE SARADNIKA',
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje potencijalnih investitora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  vebmaster: [
    {
      type: 'h3',
      content: 'IZRADA PLATFORME',
    },
    {
      type: 'pNormal',
      content: 'Izrada probne platforme',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada regularne platforme',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'TEHNIČKO TESTIRANJE',
    },
    {
      type: 'pNormal',
      content: 'Studija tehničke izvodljivosti',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Testiranje platforme',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ODRŽAVANJE ELEKTRONSKIH FORMI',
    },
    {
      type: 'pNormal',
      content: 'Održavanje platforme',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Održavanje servera',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Održavanje SSL sertifikata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ANKETIRANJE',
    },
    {
      type: 'pNormal',
      content: 'Anketiranje tehničkog plana',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'PRIPREMA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Priprema plana rada',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOPUNA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Dopuna tehničkog plana',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'RAZMATRANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Razmatranje investicionog plana i programa',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POTPISIVANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje investicionog plana i programa',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'KONTAKTIRANJE SARADNIKA',
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje potencijalnih investitora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  'graficki-dizajner': [
    {
      type: 'h3',
      content: 'GRAFIČKA IZRADA',
    },
    {
      type: 'pNormal',
      content: 'Izrada reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada oglasa',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'GRAFIČKA PRIPREMA',
    },
    {
      type: 'pNormal',
      content: 'Grafička priprema bilborda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Grafička priprema flajera',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Grafička priprema priznanica',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Grafička priprema probnih artikala',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'PRIPREMA DOKUMENTACIJE',
    },
    {
      type: 'pNormal',
      content: 'Priprema plana rada',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POTPISIVANJE DOKUMENTACIJE',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ANKETIRANJE',
    },
    {
      type: 'pNormal',
      content: 'Anketiranje tehničkog plana',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  koordinator: [
    {
      type: 'h3',
      content: 'ANGAŽOVANJE SARADNIKA',
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje potencijalnih investitora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Angažovanje knjigovođe',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Angažovanje međugradskih inkasanata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'RUTINSKA KONTROLA',
    },
    {
      type: 'pNormal',
      content: 'Rutinska kontrola plana i programa',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Rutinska kontrola finansija',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Rutinska kontrola saradnika',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'EVIDENTIRANJE',
    },
    {
      type: 'pNormal',
      content: 'Evidentiranje finansija',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Evidentiranje budžeta',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Evidentiranje rezultata poslovanja',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Evidentiranje vlasničkih udela',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'PRIJAVLJIVANJE',
    },
    {
      type: 'pNormal',
      content: 'Prijavljivanje komunalnih troškova kancelarije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Prijavljivanje prihoda i poreza na plate',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Prijavljivanje APR-u',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'IZVEŠTAVANJE',
    },
    {
      type: 'pNormal',
      content: 'Periodično izveštavanje investitorima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'OPREMANJE INVENTARA',
    },
    {
      type: 'pNormal',
      content: 'Opremanje kancelarijskim priborom',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Opremanje kancelarijskim materijalom',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ODRŽAVANJE FINANSIJSKIH FONDOVA',
    },
    {
      type: 'pNormal',
      content: 'Održavanje bankovnog računa',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Održavanje budžetne kase',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Održavanje depozitnih fondova',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'REGULISANJE UPLATE',
    },
    {
      type: 'pNormal',
      content: 'Regulisanje uplate honorara za saradnike',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Regulisanje uplate za PIO doprinose',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Regulisanje uplate poreza',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Regulisanje uplate komunalnih troškova',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'SARADNJA NA GRAFIČKOJ PRIPREMI',
    },
    {
      type: 'pNormal',
      content: 'Saradnja na grafičkoj pripremi flajera',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Saradnja na grafičkoj pripremi priznanica',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'IZRADA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Izrada plana rada',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada ugovora o delu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada ugovora o investicijama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada registra investitora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada dokumenata za evidenciju budžeta',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada tabele za beleženje postignutih rezultata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada prezentacionog materijala za klijente',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada plana i programa za inkasante',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AŽURIRANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Ažuriranje dokumenata za evidenciju',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Ažuriranje izveštaja o postignutim rezultatima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POPUNJAVANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Popunjavanje ugovora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Popunjavanje priznanica',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ŠTAMPANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Štampanje ugovora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Štampanje priznanica',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'RAZMATRANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POTPISIVANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje projektne dokumentacije',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje priznanica',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  'pr-menadzer': [
    {
      type: 'h3',
      content: 'KONTAKTIRANJE SARADNIKA',
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje potencijalnih investitora',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'KOMUNIKACIJA SA PRODAVCIMA',
    },
    {
      type: 'pNormal',
      content: 'Navođenje prodavaca na odobravanje platforme',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Navođenje prodavaca na održavanje veb izloga',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Navođenje prodavaca na reklamiranje',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Navođenje prodavaca na affiliate marketing',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'PROMOVISANJE SADRŽAJA PLATFORME',
    },
    {
      type: 'pNormal',
      content: 'Promovisanje reklama',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Promovisanje veb izloga',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Promovisanje enciklopedije proizvoda',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ANKETIRANJE',
    },
    {
      type: 'pNormal',
      content: 'Anketiranje tehničkog plana',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'SARADNJA NA IZRADI PROMOTIVNOG MATERIJALA',
    },
    {
      type: 'pNormal',
      content: 'Saradnja na izradi promotivnih flajera',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'KONTROLA ŠTAMPANJA PROMOTIVNOG MATERIJALA',
    },
    {
      type: 'pNormal',
      content: 'Kontrola štampanja promotivnih flajera',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DISTRIBUCIJA PROMOTIVNOG MATERIJALA',
    },
    {
      type: 'pNormal',
      content: 'Distribucija promotivnih flajera prodavcima',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOPUNSKO POPISIVANJE PROIZVODA',
    },
    {
      type: 'pNormal',
      content: 'Dopunsko popisivanje asortimana proizvoda',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'SELEKCIJA PROIZVODA ZA OBJAVLJIVANJE',
    },
    {
      type: 'pNormal',
      content: 'Selekcija proizvoda za probne stranice enciklopedije proizvoda',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Selekcija proizvoda za privremene veb izloge',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'PRIPREMA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Priprema plana rada',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'RAZMATRANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje projektne dokumentacije',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje investicionog plana',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POTPISIVANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje projektne dokumentacije',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje investicionog plana i programa',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
  ],
  'marketing-menadzer': [
    {
      type: 'h3',
      content: 'ANGAŽOVANJE SARADNIKA',
    },
    {
      type: 'pNormal',
      content: 'Angažovanje promotera na društvenim mrežama',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Organizovanje promoterki ispred ulaza u pijacu',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje potencijalnih investitora',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'IZRADA VIDEO MATERIJALA',
    },
    {
      type: 'pNormal',
      content: 'Izrada video reklame',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'OGLAŠAVANJE PROMOTIVNOG MATERIJALA',
    },
    {
      type: 'pNormal',
      content: 'Oglašavanje video reklama putem medija',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Oglašavanje bilborda',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'ANGAŽMAN NA DRUŠTVENIM MREŽAMA',
    },
    {
      type: 'pNormal',
      content: 'Otvaranje naloga na društvenim mrežama',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Objavljivanje informacija o proizvodima na društvenim mrežama',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Angažovano širenje kontakta na društvenim mrežama',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'KONTROLA IZRADE PROMOTIVNOG MATERIJALA',
    },
    {
      type: 'pNormal',
      content: 'Kontrola štampanja bilborda',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Kontrola štampanja obaveštajnih flajera',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Kontrola izrade majica za promoterke',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DISTRIBUCIJA PROMOTIVNOG MATERIJALA',
    },
    {
      type: 'pNormal',
      content: 'Distribucija promotivnih flajera',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'USMENA PROMOCIJA',
    },
    {
      type: 'pNormal',
      content: 'Usmena promocija platforme posetiocima pijace',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Anketiranje tehničkog plana',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'NAVOĐENJE KUPACA',
    },
    {
      type: 'pNormal',
      content: 'Navođenje na praćenje preko društvenih mreža',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Navođenje kupaca na mesto prodaje',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'EVIDENTIRANJE',
    },
    {
      type: 'pNormal',
      content: 'Evidentiranje porasta pregleda',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'SARADNJA NA GRAFIČKOJ PRIPREMI',
    },
    {
      type: 'pNormal',
      content: 'Saradnja na grafičkoj pripremi bilborda',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Saradnja na grafičkoj pripremi promotivnih flajera',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'IZRADA DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Izrada plana rada',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'RAZMATRANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje projektne dokumentacije',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Razmatranje investicionog plana i programa',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'POTPISIVANJE DOKUMENATA',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje projektne dokumentacije',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje investicionog plana i programa',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora',
      paddingLeft: 'marginLeftMedium',
    },
    {
      type: 'hr',
    },
  ],
};

export const contentBlocks2Data: ContentBlocksData = {
  autor: [
    {
      type: 'h3',
      content: 'OBJAVLJIVANJE REKLAMA',
    },
    {
      type: 'pNormal',
      content: 'Postavljanje reklama na platformu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'USLUŽNO ODRŽAVANJE VEB IZLOGA',
    },
    {
      type: 'pNormal',
      content: 'Otvaranje veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Vođenje veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Održavanje veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'STARTER PROGRAM',
    },
    {
      type: 'pNormal',
      content: 'Objavljivanje informacija o budućim proizvodima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AUKCIJE',
    },
    {
      type: 'pNormal',
      content: 'Kontrola nadmetanja',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOSTAVA',
    },
    {
      type: 'pNormal',
      content: 'Upravljanje veb izlogom za dostavu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Unošenje informacija u veb izlog za dostavu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontrola narudžbe',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Upućivanje dostavljača u nabavku',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  administrator: [
    {
      type: 'h3',
      content: 'OBJAVLJIVANJE REKLAMA',
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje potencijalnih investitora',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'OBJAVLJIVANJE REKLAMA',
    },
    {
      type: 'pNormal',
      content: 'Postavljanje reklama na platformu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'USLUŽNO ODRŽAVANJE VEB IZLOGA',
    },
    {
      type: 'pNormal',
      content: 'Otvaranje veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Vođenje veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Održavanje veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'STARTER PROGRAM',
    },
    {
      type: 'pNormal',
      content: 'Objavljivanje informacija o budućim proizvodima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AUKCIJE',
    },
    {
      type: 'pNormal',
      content: 'Kontrola nadmetanja',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOSTAVA',
    },
    {
      type: 'pNormal',
      content: 'Upravljanje veb izlogom za dostavu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Unošenje informacija u veb izlog za dostavu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontrola narudžbe',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Upućivanje dostavljača u nabavku',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  'graficki-dizajner': [
    {
      type: 'h3',
      content: 'IZRADA REKLAMA',
    },
    {
      type: 'pNormal',
      content: 'Grafička priprema reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AFFILIATE POSREDNIŠTVO',
    },
    {
      type: 'pNormal',
      content: 'Grafička priprema reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Postavljanje reklama na platformu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOSTAVA',
    },
    {
      type: 'pNormal',
      content: 'Grafička priprema reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Postavljanje reklama na platformu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  koordinator: [
    {
      type: 'h3',
      content: 'OBJAVLJIVANJE REKLAMA',
    },
    {
      type: 'pNormal',
      content: 'Prikupljanje prihoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'IZRADA REKLAMA',
    },
    {
      type: 'pNormal',
      content: 'Angažovanje grafičkog dizajnera za izradu reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'USLUŽNO ODRŽAVANJE VEB IZLOGA',
    },
    {
      type: 'pNormal',
      content: 'Angažovanje administratora ili njegovog asistenta za održavanje veb izloga',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AFFILIATE POSREDNIŠTVO',
    },
    {
      type: 'pNormal',
      content: 'Priprema ugovora o affiliate posredništvu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Angažovanje grafičkog dizajnera',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontrola uplate',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'STARTER PROGRAM',
    },
    {
      type: 'pNormal',
      content: 'Odobravanje proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Izrada ugovora o starter posredništvu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontrola depozita',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontrola isporuke gotovih proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AUKCIJE',
    },
    {
      type: 'pNormal',
      content: 'Kontrola depozita',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOSTAVA',
    },
    {
      type: 'pNormal',
      content: 'Prikupljanje prihoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'USLUGA ODLOŽENOG PLAĆANJA',
    },
    {
      type: 'pNormal',
      content: 'Upućivanje dostavljača',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Preuzimanje priznanica',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontrola zaostalih uplata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Raspodela zaostalih uplata',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
  'pr-menadzer': [
    {
      type: 'h3',
      content: 'OBJAVLJIVANJE REKLAMA',
    },
    {
      type: 'pNormal',
      content: 'Podsticanje prodavaca na objavljivanje reklama',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Prosleđivanje prihoda ostvarenih plaćenim oglašavanjem',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AFFILIATE POSREDNIŠTVO',
    },
    {
      type: 'pNormal',
      content: 'Podsticanje prodavaca na affiliate posredništvo',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora sa potencijalnim klijentima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Komunikacija sa prodavcima u slučaju ostvarene prodaje',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'STARTER PROGRAM',
    },
    {
      type: 'pNormal',
      content: 'Potpisivanje ugovora sa potencijalnim prodavcima',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje prodavaca u slučaju narudžbe proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'pNormal',
      content: 'Kontaktiranje kupaca u slučaju ostvarene trgovine',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'AUKCIJE',
    },
    {
      type: 'pNormal',
      content: 'Prosleđivanje podataka o prodavcu',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
    {
      type: 'h3',
      content: 'DOSTAVA',
    },
    {
      type: 'pNormal',
      content: 'Komunikacija sa prodavcima u slučaju narudžbe proizvoda',
      paddingLeft: marginLeftMedium,
    },
    {
      type: 'hr',
    },
  ],
};
