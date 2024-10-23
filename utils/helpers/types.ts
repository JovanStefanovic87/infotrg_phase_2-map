export interface LinkData {
	text: string;
	url: string;
}

export interface Subitem {
	type: 'paragraph2';
	text: string;
	amount?: string;
	subitems?: Subitem[];
	listStyle?: 'number' | 'alphabet';
}

export interface BasicInformation {
	id: string;
	title: string;
	description?: string;
	coverImage?: string;
	date?: string;
	name?: string;
	content?: any[];
	isLink?: boolean;
	opisPosla?: string[];
	usloviRada?: string[];
	potrebneKvalifikacije?: string[];
}

export interface BasicTimInformation {
	id: string;
	title: string;
	name: string;
	description: string;
	coverImage?: string;
}

export interface ListOfLinks {
	id: string;
	type: 'H2BoldCenter' | 'h3' | 'H3BoldCenter' | 'h4' | 'text' | 'divider' | 'list' | 'p';
	text: string;
}

export interface ContentBlockItem {
	type:
		| 'h1'
		| 'h2'
		| 'H2BoldCenter'
		| 'h3'
		| 'H3BoldCenter'
		| 'h4'
		| 'text'
		| 'image'
		| 'imageBlockWithDescription'
		| 'divider'
		| 'list'
		| 'paragraph1'
		| 'paragraph2'
		| 'p'
		| 'hr'
		| 'listEvenly'
		| 'TextBoldList'
		| 'TextBoldCustom'
		| 'h3Block'
		| 'plus'
		| 'pNormal';
	content?: string;
	label?: string;
	value?: string;
	url?: string | string[];
	image?: string[];
	items?: ContentBlockItem[];
	listContent?: Array<{
		type: 'paragraph1' | 'paragraph2';
		text: string;
		amount?: string;
		subitems?: Subitem[];
		listStyle?: 'number' | 'alphabet';
	}>;
	list?: string[];
	paddingLeft?: number | string;
	align?: 'left' | 'center' | 'right';
	weight?: 'normal' | 'bold' | 'semibold';
	size?: 'sm' | 'md' | 'lg';
	marginBottom?: string;
	marginY?: string;
	color?: string;
	height?: number;
	link?: string;
	bullet?: string;
	circleContent?: {
		realizator: string;
		period: string;
		optimum: string;
		angažman: string;
		fond: string;
	};
	opisPosla?: string[];
	usloviRada?: string[];
	potrebneKvalifikacije?: string[];
	paddingTop?: string | number;
	owner?:
		| 'autor'
		| 'administrator'
		| 'koordinator'
		| 'webmaster'
		| 'marketing-manager'
		| 'pr'
		| 'graphic-designer';
}

export interface ContentBlocksData {
	[key: string]: ContentBlockItem[];
}

export interface Route {
	label: string;
	href: string;
	icon: string;
	subRoutes?: Route[];
}

export interface MemberData {
	id: string;
	title?: string;
	name: string;
	birth?: string;
	profession?: string;
	affinities?: string;
	previousEngagements?: string;
	infotrgEngagements: string;
	phone: string;
	email?: string;
	image: string;
}

export interface InvesticioniFondLinksData {
	id: string;
	label: string;
	listOrder: string;
	amount: string;
}

export interface PoslovnaSaradnja {
	description: string;
	coverImage?: string;
}

export interface PoslovnaSaradnjaData {
	[key: string]: PoslovnaSaradnja[];
}

export interface FullDescriptionDataLinksData {
	id: string;
	label: string;
}

export interface PppLinksData {
	id: string;
	label: string;
	amount: string;
}

export interface ImageBlockLink {
	description: string;
	coverImage?: string;
	isLink?: boolean;
	link?: string;
}

export interface ImageBlockLinkData {
	[key: string]: ImageBlockLink[];
}

/* export interface Category {
	id: string;
	name: string;
	description?: string;
	parentId?: string | null;
	subcategories: Category[];
	synonyms?: string[];
} */

export interface Language {
	id: number;
	name: string;
}

export interface Category {
	label?: any;
	id: number;
	iconId: number | null;
	labelId: number;
	name: string;
	parents: Category[];
	relatedIds?: number[];
	children: Category[];
}

export interface Synonym {
	id: number;
	translationId: number;
	synonym: string;
}

export interface Label {
	id: number;
	name: string;
	translations: Translation[];
}

export interface Translation {
	translationId: number | null;
	id: number;
	labelId: number;
	languageId: number;
	translation: string;
	description?: string;
	createdAt: Date;
	synonyms: Synonym[];
}

export interface TranslationUpdate {
	translationId: number;
	languageId: number;
	translation: string;
	description?: string;
	synonyms: string[];
}

export interface Icon {
	id: number;
	name: string;
	url: string;
}

export interface CurrentIcon {
	iconId: number | null;
	iconUrl: string | null;
}

export interface CategoryData {
	id: number;
	name: string;
	language: string;
	description: string;
	parentIds: string[];
	children: Category[];
	synonyms: string[];
	iconUrl?: string;
}

export interface HandleAddCategoryProps {
	categoryData: CategoryData;
	editingCategory: Category | null;
	clearForm: () => void;
	setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export interface CategoryOption {
	value: string;
	label: string;
}

export interface RenderCategoryListProps {
	categories: Category[];
	parentId?: string | null;
	depth?: number;
	onEdit: (category: Category) => void;
	onDelete: (id: string) => void;
}

export interface LocationBase {
	id: number;
	label: {
		translations: Translation[];
		id: number;
		name: string;
	};
	createdAt: string;
	icon?: Icon; // Optional field for an icon
}

export interface Country extends LocationBase {
	cities: City[];
	type: string;
}

export interface City extends LocationBase {
	postCode: string | null;
	countryId: number;
	cityParts: CityPart[];
	type: string;
}

export interface CityPart extends LocationBase {
	postCode: string | null;
	cityId: number;
	marketplaces: Marketplace[];
	type: string;
}

export interface Marketplace extends LocationBase {
	name: string;
	address: string;
	cityPartId: number;
	createdAt: string;
	iconId?: number;
	icon?: Icon;
	labelId: number;
	label: Label;
	type: string;
}

export type Location = Country | City | CityPart | Marketplace;

export interface RetailAdmin {
	id: number;
	name: string;
	phoneNumber?: string;
	email?: string;
	website?: string;
	address: string;
	latitude?: number;
	longitude?: number;
	viewCount: number;
	isSubscribedForAds: boolean;
	adType?: AdType;
	country: LocationDetail;
	city: LocationDetail;
	cityPart?: LocationDetail | null;
	marketplace?: LocationDetail | null;
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
}

export interface LocationDetail {
	label?: any;
	id: number;
	translation: string;
}

export interface RetailAdmin {
	id: number;
	name: string;
	phoneNumber?: string;
	email?: string;
	website?: string;
	address: string;
	latitude?: number;
	longitude?: number;
	viewCount: number;
	isSubscribedForAds: boolean;
	adType?: AdType;
	country: LocationDetail;
	city: LocationDetail;
	cityPart?: LocationDetail | null;
	marketplace?: LocationDetail | null;
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
}

export interface RetailLocationData {
	countryId: number;
	cityId: number;
	cityPartId?: number | null;
	marketplaceId?: number | null;
	latitude?: number;
	longitude?: number;
}

export interface RetailFormState {
	id?: number;
	name: string;
	phoneNumber: string;
	email: string;
	website: string;
	countryId: number;
	cityId: number;
	cityPartId?: number | null;
	marketplaceId?: number | null;
	retailStoreId?: number;
	latitude: number;
	longitude: number;
	articleCategoryIds: number[];
	activityCategoryIds: number[];
	objectTypeCategoryIds: number[];
	imageFile?: File | null;
	imageId?: number;
}

export enum AdType {
	NONE = 'NONE',
	SMALL = 'SMALL',
	BIG = 'BIG',
	PREMIUM = 'PREMIUM',
	SPONSOR = 'SPONSOR',
}

export interface AdAdmin {
	validTo: string | number | Date;
	Image: any;
	id: number;
	name: string;
	url: string;
	imageId?: number;
	adType: AdType;
	viewCount: number;
	country: LocationDetail;
	city: LocationDetail | null;
	cityPart?: LocationDetail | null;
	marketplace?: LocationDetail | null;
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
}

export interface AdFormState {
	marketplace: any;
	city: any;
	country: any;
	id: number | string;
	name: string;
	url: string;
	imageId?: number;
	newImageFile?: File | null;
	adType: string;
	countryId: number;
	cityId: number;
	cityPartId?: number;
	marketplaceId?: number;
	retailStoreId?: number;
	articleCategoryIds: number[];
	activityCategoryIds: number[];
	objectTypeCategoryIds: number[];
	imageFile?: File;
	validTo: string;
}
