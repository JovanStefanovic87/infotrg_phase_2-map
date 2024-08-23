export interface Category {
	id: number;
	parentId: number | null;
	parent?: Category | null;
	subcategories: Category[];
	labelId: number;
	iconId: number | null;
	icon?: {
		id: number;
		name: string;
		url: string;
	} | null;
	createdAt: string;
	Label: {
		id: number;
		name: string | null;
		translations: {
			id: number;
			translation: string;
			languageId: number;
		}[];
	};
}
