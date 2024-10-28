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
  {
    id: 'tim',
    title: 'INFOTRG TIM',
    description:
      'Projektom upravljaju članovi tima koji su zaduženi za realizaciju plana i programa poslovanja u okviru predviđenih radnih zadataka i obaveza.',
    coverImage: '/images/o-nama/ON04.jpg',
  },
  {
    id: 'posao',
    title: 'POSAO',
    description:
      'Infotrg tim okuplja nove članove spremne za saradnju u različitim sektorima poslovanja: marketing, trgovina, administracija, PR menadžment i grafički dizajn.',
    coverImage: '/images/home/NA04.jpg',
  },
];

const oNamaIds = new Set(['projekat-infotrg']);
const pppIds = new Set(['plan-i-program-poslovanja']);
const povratIds = new Set(['povrat-ulozenih-sredstava']);
const timIds = new Set(['tim']);
const posaoIds = new Set(['posao']);

export const mapIdToPath = (id: string): string => {
  if (oNamaIds.has(id)) {
    return `/o-nama/`;
  } else if (pppIds.has(id)) {
    return `/o-nama/${id}`;
  } else if (povratIds.has(id)) {
    return `/ulaganje/investicioni-plan-i-program/${id}`;
  } else if (timIds.has(id)) {
    return `/o-nama/tim/`;
  } else if (posaoIds.has(id)) {
    return `/posao/`;
  } else {
    return `/ulaganje/${id}`;
  }
};
