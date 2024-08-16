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

export interface Category {
	id: string;
	name: string;
	description?: string;
	parentId?: string | null;
	subcategories: Category[];
	synonyms?: string[];
}

export interface CategoryData {
	name: string;
	description: string;
	parentId: string | null;
	synonyms: string[];
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
