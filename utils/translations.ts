export type PageContentTranslations = {
	[key: string]: {
		homePageTitle: string;
		noSearchResults: string;
		noResultsAvailable: string;
		search: string;
		noMaporCoordinates: string;
		unknownLocation: string;
		undefinedName: string;
		relatedCategories: string;
		close: string;
		selectCategory: string;
		selectLocation: string;
		select: string;
		save: string;
		cancel: string;
		searchParamsFormError: string;
		edit: string;
	};
};

export const pageContentTranslations: PageContentTranslations = {
	rs: {
		homePageTitle: 'Pronađite proizvode koji vas zanimaju i pogledajte gde se prodaju!',
		noSearchResults: 'Ne postoji rezultat za pretragu',
		noResultsAvailable: 'Nema dostupnih prodajnih objekata za prikaz.',
		search: 'Pretraga...',
		noMaporCoordinates: 'Mapa ili koordinate nisu dostuponi.',
		unknownLocation: 'Nepoznata lokacija',
		undefinedName: 'Nedefinisano ime',
		relatedCategories: 'Povezane kategorije',
		close: 'Zatvori',
		selectCategory: 'Izaberite kategoriju proizvoda',
		selectLocation: 'Izaberite lokaciju pretrage',
		select: 'Izaberite',
		save: 'Sačuvaj',
		cancel: 'Odustani',
		searchParamsFormError: 'Morate izabrati kategoriju i lokaciju pretrage.',
		edit: 'Izmeni',
	},
	hu: {
		homePageTitle:
			'Keresse meg azokat a termékeket amelyek érdeklik Önt! Nézze meg hol árulják őket!',
		noSearchResults: 'Nincsenek keresési eredmények',
		noResultsAvailable: 'Nincsenek megjeleníthető üzletek.',
		search: 'Keresés...',
		noMaporCoordinates: 'Nem állnak rendelkezésre térképek vagy koordináták.',
		unknownLocation: 'Ismeretlen helyszín',
		undefinedName: 'Ismeretlen név',
		relatedCategories: 'Kapcsolódó kategóriák',
		close: 'Zárd be',
		selectCategory: 'Válassza ki a termék-kategóriát',
		selectLocation: 'Válassza ki a keresés helyszínét',
		select: 'Válasszon',
		save: 'Mentés',
		cancel: 'Mégsem',
		searchParamsFormError: 'Válassza ki a keresés kategóriáját és helyszinét.',
		edit: 'Szerkesztés',
	},
};
