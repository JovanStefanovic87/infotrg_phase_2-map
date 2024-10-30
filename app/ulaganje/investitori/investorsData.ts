interface BasicInformation {
  id: string;
  name: string;
  amount?: string;
  share: string;
  email?: string;
  phone?: string;
}

interface Invested {
  date: string;
  amount?: string;
  share: string;
}

interface InvestedData {
  [key: string]: Invested[];
}

interface Withdrawn {
  amount: string;
  share: string;
}

interface WithdrawnData {
  [key: string]: Withdrawn;
}

export const contentData: BasicInformation[] = [
  {
    id: 'IN-001',
    name: 'Miroslav Ostrogonac',
    email: 'suinfotrg@gmail.com',
    amount: '2.500,00',
    share: '5,00',
  },
  {
    id: 'IN-002',
    name: 'Jovan Stefanović',
    email: 'jovanstefanovic024@gmail.com',
    amount: '1.593,91',
    share: '3,17',
  },
  {
    id: 'IN-003',
    name: 'Đorđe Bunić',
    phone: '0692601981',
    amount: '3.400,00',
    share: '6,80',
  },
  {
    id: 'IN-004',
    name: 'Ivan Ostrogonac',
    email: 'ostrogonacivan2003@gmail.com',
    amount: '171,00',
    share: '0,34',
  },
  {
    id: 'IN-005',
    name: 'Dragana Filipović',
    email: 'draganaflpv@gmail.com',
    amount: '100,00',
    share: '0,20',
  },
  {
    id: 'IN-006',
    name: 'Adrien Stefanović',
    email: 'adrienstefanovic@gmail.com',
    amount: '50,00',
    share: '0,1',
  },
  {
    id: 'IN-007',
    name: 'Nebojša Lukić',
    email: 'nebojsa.3011992@gmail.com',
    amount: '1.709,40',
    share: '3,42',
  },
  {
    id: 'IN-008',
    name: 'Aniko Kovačić',
    email: 'anikokovacic@gmail.com',
    amount: '10,00',
    share: '0,02',
  },
  {
    id: 'IN-009',
    name: 'Nemanja Komazec',
    email: 'komazecnemanja22@gmail.com',
    amount: '50,00',
    share: '0,10',
  },
  {
    id: 'IN-010',
    name: 'Marija Ostrogonac',
    email: 'ostrogonacmarija@gmail.com',
    amount: '100,00',
    share: '0,20',
  },
  {
    id: 'IN-011',
    name: 'Atila Sekula',
    email: 'sekula1985@yahoo.com',
    amount: '25,00',
    share: '0,05',
  },
  {
    id: 'IN-012',
    name: 'Vladimir Madžarević',
    phone: '0643151066',
    amount: '50,00',
    share: '0,10',
  },
  {
    id: 'IN-013',
    name: 'Radoslava Stantić',
    amount: '10,00',
    share: '0,02',
  },
  {
    id: 'IN-016',
    name: 'Dražen Bedić',
    amount: '50,00',
    share: '0,10',
  },
  {
    id: 'IN-017',
    name: 'Monika Kasaš',
    amount: '20,00',
    share: '0,04',
  },
  {
    id: 'IN-018',
    name: 'Milan Paskaš',
    amount: '17,09',
    share: '0,03',
  },
  {
    id: 'IN-019',
    name: 'Roland Janda',
    share: '1,00',
  },
];

export const invested: InvestedData = {
  'IN-001': [
    { date: '27.08.2022.', amount: '85,47', share: '0,17%' },
    { date: '16.10.2022.', amount: '85,47', share: '0,17%' },
    { date: '21.11.2022.', amount: '128,21', share: '0,26%' },
    { date: '05.02.2023.', amount: '59,82', share: '0,12%' },
    { date: '18.02.2023.', amount: '42,73', share: '0,08%' },
    { date: '22.03.2023.', amount: '42,73', share: '0,08%' },
    { date: '02.05.2023.', amount: '85,47', share: '0,17%' },
    { date: '25.07.2023.', amount: '70,94', share: '0,14%' },
    { date: '11.09.2023.', amount: '256,41', share: '0,51%' },
    { date: '24.01.2024.', amount: '2,13', share: '0,01%' },
    { date: '24.02.2024.', amount: '153,84', share: '0,31%' },
    { date: '16.04.2024.', amount: '256,41', share: '0,51%' },
    { date: '03.06.2024.', amount: '16,92', share: '0,04%' },
    { date: '04.08.2024.', amount: '713,45', share: '1,43%' },
    { date: '31.08.2024.', amount: '250,00', share: '0,50%' },
    { date: '15.10.2024.', amount: '250,00', share: '0,50%' },
  ],
  'IN-002': [
    { date: '18.02.2023.', amount: '170,94', share: '0,34%' },
    { date: '28.07.2023.', amount: '75,21', share: '0,15%' },
    { date: '16.10.2023.', amount: '100,00', share: '0,20%' },
    { date: '30.10.2023.', amount: '15,40', share: '0,03%' },
    { date: '19.11.2023.', amount: '502,56', share: '1,00%' },
    { date: '16.04.2024.', amount: '149,57', share: '0,30%' },
    { date: '27.05.2024.', amount: '40,00', share: '0,08%' },
    { date: '03.06.2024.', amount: '42,73', share: '0,08%' },
    { date: '03.06.2024.', amount: '462,50', share: '0,92%' },
    { date: '19.08.2024.', amount: '25,00', share: '0,05%' },
    { date: '30.08.2024.', amount: '10,00', share: '0,02%' },
  ],
  'IN-003': [
    { date: '17.07.2024.', amount: '1400,00', share: '2,80%' },
    { date: '19.09.2024.', amount: '2000,00', share: '4,00%' },
  ],
  'IN-004': [{ date: '24.08.2024.', amount: '171,00', share: '0,34%' }],
  'IN-005': [{ date: '05.10.2024.', amount: '100,00', share: '0,20%' }],
  'IN-006': [
    { date: '05.10.2024.', amount: '30,00', share: '0,06%' },
    { date: '16.10.2024.', amount: '20,00', share: '0,04%' },
  ],
  'IN-007': [{ date: '11.10.2024.', amount: '1.709,40', share: '3,42%' }],
  'IN-008': [{ date: '11.10.2024.', amount: '10,00', share: '0,02%' }],
  'IN-009': [{ date: '14.10.2024.', amount: '50,00', share: '0,10%' }],
  'IN-010': [{ date: '14.10.2024.', amount: '100,00', share: '0,20%' }],
  'IN-011': [{ date: '15.10.2024.', amount: '25,00', share: '0,05%' }],
  'IN-012': [{ date: '15.10.2024.', amount: '50,00', share: '0,10%' }],
  'IN-013': [{ date: '21.10.2024.', amount: '10,00', share: '0,02%' }],
  'IN-016': [{ date: '22.10.2024.', amount: '50,00', share: '0,10%' }],
  'IN-017': [{ date: '28.10.2024.', amount: '20,00', share: '0,04%' }],
  'IN-018': [{ date: '28.10.2024.', amount: '17,09', share: '0,03%' }],
  'IN-019': [{ date: '29.10.2024.', share: '1,00%' }],
};

export const withdrawn: WithdrawnData = {
  'IN-001': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-002': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-003': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-004': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-005': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-006': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-007': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-008': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-009': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-010': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-011': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-012': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-013': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-016': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-017': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-018': {
    amount: '0,00',
    share: '0,00',
  },
  'IN-019': {
    amount: '0,00',
    share: '0,00',
  },
};

export const hyperlinks = [
  {
    text: 'Fond za planiranje i pripremu',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Fond-za-planiranje-i-pripremu',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema nacrta tehničkog plana',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-nacrta-tehnickog-plana',
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
      'Testiranje-i-izrada-Tehnickog-plana',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema Plana i programa poslovanja',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'priprema-plana-i-programa-poslovanja',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema Ugovora o saradnji',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'priprema-ugovora-o-saradnji',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema i održavanje budžeta',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'priprema-i-odrzavanje-budzeta',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema Investicionog plana i programa',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-Investicionog-plana-i-programa',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema platforme za investicioni fond',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-platforme-za-investicioni-fond',
    ).toLowerCase()}`,
  },
  {
    text: 'Oglašavanje Investicionog plana i programa',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Oglasavanje-Investicionog-plana-i-programa',
    ).toLowerCase()}`,
  },
  {
    text: 'Kontaktiranje potencijalnih investitora',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Kontaktiranje-potencijalnih-investitora',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema platforme za preglednik po mapama',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-platforme-za-preglednik-po-mapama',
    ).toLowerCase()}`,
  },
  {
    text: 'Popis buvljaka i objavljivanje informacija',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Popis-buvljaka-i-objavljivanje-informacija',
    ).toLowerCase()}`,
  },
  {
    text: 'Upoznavanje prodavaca sa platformom',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Upoznavanje-prodavaca-sa-platformom',
    ).toLowerCase()}`,
  },
  {
    text: 'Objavljivanje probnih besplatnih reklama',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Objavljivanje-probnih-besplatnih-reklama',
    ).toLowerCase()}`,
  },
  {
    text: 'Navođenje kupaca na veliki broj pregleda',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Navodjenje-kupaca-na-veliki-broj-pregleda',
    ).toLowerCase()}`,
  },
  {
    text: 'Navođenje prodavaca na plaćeno oglašavanje',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Navodjenje-prodavaca-na-placeno-oglasavanje',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema platforme za veb izloge',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-platforme-za-veb-izloge',
    ).toLowerCase()}`,
  },
  {
    text: 'Otvaranje promotivnog veb izloga',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Otvaranje-promotivnog-veb-izloga',
    ).toLowerCase()}`,
  },
  {
    text: 'Promocija veb izloga prodavcima',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Promocija-veb-izloga-prodavcima',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema platforme za enciklopediju proizvoda',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-platforme-za-enciklopediju-proizvoda',
    ).toLowerCase()}`,
  },
  {
    text: 'Otvaranje promotivnih stranica enciklopedije proizvoda',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Otvaranje-promotivnih-stranica-enciklopedije-proizvoda',
    ).toLowerCase()}`,
  },
  {
    text: 'Promocija enciklopedije proizvoda prodavcima',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Promocija-enciklopedije-proizvoda-prodavcima',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema platforme za Suboticu',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-platforme-za-Suboticu',
    ).toLowerCase()}`,
  },
  {
    text: 'Popis Subotice i objavljivanje informacija',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Popis-Subotice-i-objavljivanje-informacija',
    ).toLowerCase()}`,
  },
  {
    text: 'Navođenje prodavaca na upotrebu veb izloga',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Navodjenje-prodavaca-na-upotrebu-veb-izloga',
    ).toLowerCase()}`,
  },
  {
    text: 'Objavljivanje probnih besplatnih reklama Subotica',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Objavljivanje-probnih-besplatnih-reklama-subotica',
    ).toLowerCase()}`,
  },
  {
    text: 'Navođenje kupaca na veliki broj pregleda Subotica',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Navodjenje-kupaca-na-veliki-broj-pregleda-subotica',
    ).toLowerCase()}`,
  },
  {
    text: 'Navođenje prodavaca na plaćeno oglašavanje',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Navodjenje-prodavaca-na-placeno-oglasavanje',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema platforme za objavljivanje informacija širom Srbije',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-platforme-za-objavljivanje-informacija-sirom-srbije',
    ).toLowerCase()}`,
  },
  {
    text: 'Osnivanje firme',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent('Osnivanje-firme').toLowerCase()}`,
  },
  {
    text: 'Organizovanje međugradskih inkasanata',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Organizovanje-medjugradskih-inkasanata',
    ).toLowerCase()}`,
  },
  {
    text: 'Pribavljanje spiska svih prodajnih objekata',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Pribavljanje-spiska-svih-prodajnih-objekata',
    ).toLowerCase()}`,
  },
  {
    text: 'Priprema prezentacije uspešnosti oglašavanja',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Priprema-prezentacije-uspesnosti-oglasavanja',
    ).toLowerCase()}`,
  },
  {
    text: 'Navođenje prodavaca na plaćeno oglašavanje Subotica',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Navodjenje-prodavaca-na-placeno-oglasavanje-subotica',
    ).toLowerCase()}`,
  },
  {
    text: 'Navođenje prodavaca na oglašavanje',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Navodjenje-prodavaca-na-oglasavanje',
    ).toLowerCase()}`,
  },
  {
    text: 'Promocija platforme putem medija',
    url: `/ulaganje/investicioni-fond/${encodeURIComponent(
      'Promocija-platforme-putem-medija',
    ).toLowerCase()}`,
  },
];
