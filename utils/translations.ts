export type PageContentTranslations = {
	[key: string]: {
		homePageTitle: string;
		noSearchResults: string;
		search: string;
	};
};

export const pageContentTranslations: PageContentTranslations = {
	rs: {
		homePageTitle: 'Pronađite proizvode koji vas zanimaju i pogledajte gde se prodaju',
		noSearchResults: 'Ne postoji rezultat za pretragu',
		search: 'Pretraga...',
	},
	hu: {
		homePageTitle: 'Keresse meg az Önt érdeklő termékeket, és nézze meg, hol értékesítik őket',
		noSearchResults: 'Nincsenek keresési eredmények',
		search: 'Keresés...',
	},
};