import { BasicTimInformation } from '../../helpers/types';

export const contentData: BasicTimInformation[] = [
  {
    id: 'autor',
    title: '1.) AUTOR',
    name: 'Miroslav Ostrogonac',
    description: 'Autor izlaže svoje ideje i priprema projektnu dokumentaciju.',
    coverImage: '/images/members/avatar_miroslav.bmp',
  },
  {
    id: 'koordinator',
    title: '2.) KOORDINATOR',
    name: 'Miroslav Ostrogonac',
    description: 'Koordinator organizuje saradnike i nadgleda razvoj kompletnog projekta.',
    coverImage: '/images/members/avatar_miroslav.bmp',
  },
  {
    id: 'vebmaster',
    title: '3.) VEBMASTER',
    name: 'Jovan Stefanović',
    description: 'Vebmaster izrađuje platformu i brine se o njenom funkcionisanju.',
    coverImage: '/images/members/avatar_jovan.bmp',
  },
  {
    id: 'administrator',
    title: '4.) ADMINISTRATOR',
    name: 'Atila Sekula',
    description: 'Administrator manipuliše podacima na platformi i vodi evidenciju dokumenata.',
    coverImage: '/images/members/avatar_atila.bmp',
  },
  {
    id: 'marketing-menadzer',
    title: '5.) MARKETING MENADŽER',
    name: 'Nemanja Komazec',
    description: 'Marketing menadžer planira strategiju promocije projekta.',
    coverImage: '/images/members/avatar_nemanja.bmp',
  },
  {
    id: 'pr-menadzer',
    title: '6.) PR MENADŽER',
    name: 'Nebojša Lukić',
    description: 'PR menadžer komunicira sa klijentima, kupcima, prodavcima i drugim saradnicima.',
    coverImage: '/images/members/avatar_nebojsa.bmp',
  },
  {
    id: 'graficki-dizajner',
    title: '7.) GRAFIČKI DIZAJNER',
    name: 'Norbert Takač',
    description: 'Grafički dizajner uređuje slike i izrađuje ilustracije.',
    coverImage: '/images/members/avatar_norbert.bmp',
  },
];

export const hyperlinks = [
  {
    text: 'Autor',
    url: `/o-nama/tim/${encodeURIComponent('autor').toLowerCase()}`,
  },
  {
    text: 'Koordinator',
    url: `/o-nama/tim/${encodeURIComponent('koordinator').toLowerCase()}`,
  },
  {
    text: 'Vebmaster',
    url: `/o-nama/tim/${encodeURIComponent('vebmaster').toLowerCase()}`,
  },
  {
    text: 'Administrator',
    url: `/o-nama/tim/${encodeURIComponent('administrator').toLowerCase()}`,
  },
  {
    text: 'Marketing menadžer',
    url: `/o-nama/tim/${encodeURIComponent('marketing-menadzer').toLowerCase()}`,
  },
  {
    text: 'PR menadžer',
    url: `/o-nama/tim/${encodeURIComponent('pr-menadzer').toLowerCase()}`,
  },
  {
    text: 'Graphički dizajner',
    url: `/o-nama/tim/${encodeURIComponent('graficki-dizajner').toLowerCase()}`,
  },
];
