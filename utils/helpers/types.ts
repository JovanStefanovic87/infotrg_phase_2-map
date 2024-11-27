import { RetailStore } from '@prisma/client';
import exp from 'constants';

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
	education?: string;
	affinities?: string;
	previousEngagements?: string;
	infotrgEngagements: string;
	phone?: string;
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
	code?: string;
	name: string;
}

export interface relatedCategory {
	icon: { id: number; name: string; url: string } | null;
	parents?: never[]; // optional property
	children?: never[]; // optional property
	id: number;
	name: string;
	iconId: number | null;
	labelId: number;
}

export interface Category {
	icon: any;
	label?: any;
	id: number;
	iconId: number | null;
	labelId: number;
	name: string;
	parents: SimplifiedCategory[];
	relatedIds?: number[];
	relatedCategories?: relatedCategory[];
	children: Category[];
}

export interface SimplifiedCategory {
	id: number;
	name: string;
	iconId: number | null;
	labelId: number;
}

export interface TranslationSimple {
	name: string;
	languageId: number;
	labelId: number;
	categoryId: number;
}

export interface CategoryWithTranslations extends Category {
	translations: TranslationSimple[];
	advertisingId?: number | null;
	createdAt?: Date;
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
	createdAt: Date;
	icon?: Icon; // Optional field for an icon
}

export interface State extends LocationBase {
	counties: County[];
	type: string;
}

export interface County extends LocationBase {
	postCode: string | null;
	stateId: number;
	cities: City[];
	type: string;
}

export interface City extends LocationBase {
	postCode: string | null;
	countyId: number;
	suburbs: Suburb[];
	type: string;
}

export interface Suburb extends LocationBase {
	name: string;
	address: string;
	cityId: number;
	createdAt: Date;
	iconId?: number;
	icon?: Icon;
	labelId: number;
	label: Label;
	type: string;
}

export type Location = State | County | City | Suburb;

export interface RetailAdmin {
	locationDescription: string;
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
	state: LocationDetail;
	county?: LocationDetail | null;
	city?: LocationDetail | null;
	suburb?: LocationDetail | null;
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
}

export interface LocationDetail {
	label?: any;
	id: number;
	translation: string;
}

export interface Coordinates {
	latitude: number;
	longitude: number;
	locationDescription: string;
}

export interface GetRetailStoreApi {
	address?: string;
	id: number;
	name: string;
	phoneNumber: string;
	email: string;
	website?: string;
	viewCount: number;
	isPhoneConfirmed: boolean;
	isEmailConfirmed: boolean;
	createdAt: Date;
	updatedAt: string;

	// Direct top-level IDs
	stateId: number;
	countyId?: number;
	cityId?: number | null;
	suburbId?: number | null;
	coordinatesId?: number | null;
	totalArticleCategoryCount: number;

	// Related entities as objects
	state: {
		id: number;
		label: {
			translations: {
				languageId: number;
				translation: string;
			}[];
		};
	};
	county?: {
		id: number;
		label: {
			translations: { translation: string }[];
		};
	};
	city?: {
		id: number;
		label: {
			translations: { translation: string }[];
		};
	} | null;
	suburb?: {
		id: number;
		label: {
			translations: { translation: string }[];
		};
	} | null;

	// Coordinates object
	coordinates?: {
		latitude: number;
		longitude: number;
		locationDescription?: string;
	} | null;

	// Categories
	articleCategories: {
		id: number;
		childCategories: any;
		label: {
			name: string;
			translations: { translation: string }[];
		};
	}[];
	activityCategories: {
		label: {
			name: string;
			translations: { translation: string }[];
		};
	}[];
	objectTypeCategories: {
		id?: number | string;
		name: string;
		label: {
			name: string;
			translations: { translation: string }[];
		};
	}[];
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
	state: LocationDetail;
	county?: LocationDetail | null;
	city?: LocationDetail | null;
	suburb?: LocationDetail | null;
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
}

export interface RetailLocationData {
	stateId: number;
	countyId?: number;
	cityId?: number | null;
	suburbId?: number | null;
	latitude?: number;
	longitude?: number;
}

export interface RetailFormState {
	id?: number;
	name: string;
	phoneNumber: string;
	email: string;
	website: string;
	stateId: number;
	countyId?: number;
	cityId?: number | null;
	suburbId?: number | null;
	retailStoreId?: number;
	latitude: number;
	longitude: number;
	locationDescription: string;
	articleCategoryIds: number[];
	activityCategoryIds: number[];
	objectTypeCategoryIds: number[];
	imageFile?: File | null;
	imageId?: number;
	address?: string;
}

export enum AdType {
	NONE = 'NONE',
	PRIORITY = 'PRIORITY',
	SMALL = 'SMALL',
	BIG = 'BIG',
	PREMIUM = 'PREMIUM',
	SPONSOR = 'SPONSOR',
}

export interface Image {
	id: number;
	name: string;
	url: string;
}

export interface AdAdmin {
	id: number;
	name: string;
	description: string;
	retailStore: RetailStore;
	url: string;
	imageId?: number;
	image: Image | null;
	adType: AdType;
	viewCount: number;
	state: LocationDetail;
	county?: LocationDetail | null;
	city?: LocationDetail | null;
	suburb?: LocationDetail | null;
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
	validTo: string | number;
}

export interface AdFormState {
	retailStore?: RetailStore;
	objectTypeCategories: any;
	articleCategories: any;
	activityCategories: any;
	image: Image | null;
	viewCount: number;
	suburb?: any;
	county?: any;
	city?: any;
	state: any;
	id?: number | string;
	name: string;
	description: string;
	url: string;
	imageId?: number;
	newImageFile?: File | null;
	adType: string;
	stateId: number;
	countyId?: number;
	cityId?: number;
	suburbId?: number;
	retailStoreId?: number;
	articleCategoryIds: number[];
	activityCategoryIds: number[];
	objectTypeCategoryIds: number[];
	imageFile?: File;
	validTo: string;
	address?: string;
}

export interface fetchedCategories {
	id: number;
	name: string;
	iconId: number;
	labelId: number;
	parents: fetchedCategories[];
	children: fetchedCategories[];
	synonyms: string[];
	icon: Icon | null;
	relatedIds: number[];
}

export interface EnhancedCategory {
	id: number;
	name: string;
	iconId?: number;
	labelId: number;
	createdAt: Date;
	parentCategories: { parentId: number }[];
	childCategories: { childId: number }[];
	children: EnhancedCategory[];
	icon?: {
		id: number;
		name: string;
		url: string;
		createdAt: Date;
	};
	label?: {
		id: number;
		name: string;
		translations: {
			translation: string;
			id: number;
			createdAt: Date;
			languageId: number;
			labelId: number;
			description?: string | null;
		}[];
	};
	relatedCategories?: { relatedId: number }[];
	relatedTo?: { categoryId: number }[];
}

export interface LocationDataForMap {
	id: number;
	name: string;
	icon?: string | null;
	type: 'county' | 'city' | 'suburb';
	cityId?: number | null;
	countyId?: number | null;
	children?: LocationDataForMap[];
	parentId?: number;
}

export interface RefetchOptions {
	id: number;
	type: 'county' | 'city' | 'suburb';
	languageId: number;
}

export interface CategoryDataForMap {
	id: number;
	name: string;
	icon?: string | null;
	children?: Category[];
}

export interface RawCategoryData {
	id: number;
	name?: string;
	icon?: any;
	iconId?: number | null;
	labelId?: number;
	parents?: RawCategoryData[];
	childCategories?: RawCategoryData[];
	relatedCategories?: { id: number }[];
	synonyms?: (string | { synonym: string })[];
}

export interface CategoryWithSynonyms extends Category {
	synonyms?: string[];
}
