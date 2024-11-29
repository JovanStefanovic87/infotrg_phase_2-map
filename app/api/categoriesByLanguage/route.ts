import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Category } from '@/utils/helpers/types';

// Fetch all parent categories recursively for a given child ID
const fetchParents = async (childId: number): Promise<Category[]> => {
	try {
		const parentCategories = await prisma.parentCategory.findMany({
			where: { childId },
			include: {
				parent: {
					include: {
						icon: true,
						label: {
							include: {
								translations: { include: { synonyms: true } },
							},
						},
					},
				},
			},
		});

		return Promise.all(
			parentCategories.map(async ({ parent }) => ({
				id: parent.id,
				name: parent.label.translations[0]?.translation || '',
				slug: parent.label.translations[0]?.slug || '',
				iconId: parent.iconId,
				labelId: parent.labelId,
				parents: await fetchParents(parent.id),
				children: [],
				synonyms: parent.label.translations[0]?.synonyms || [],
				icon: parent.icon
					? {
							id: parent.icon.id,
							name: parent.icon.name,
							url: parent.icon.url,
							createdAt: parent.icon.createdAt,
					  }
					: null,
			}))
		);
	} catch (error) {
		console.error('Greška prilikom dohvatanja nadređenih kategorija:', error);
		throw new Error(
			'Došlo je do greške pri dohvatanju nadređenih kategorija. Molimo pokušajte ponovo.'
		);
	}
};

// Build a hierarchical category tree with recursive subcategory fetching
const buildCategoryTree = async (
	parentId: number | null,
	prefix: string,
	languageId: number
): Promise<Category[]> => {
	try {
		const categories = await prisma.category.findMany({
			where: {
				...(parentId === null
					? { childCategories: { none: {} } }
					: { childCategories: { some: { parentId } } }),
				label: { name: { startsWith: prefix } },
			},
			include: {
				icon: true,
				childCategories: { include: { child: true } },
				label: {
					include: { translations: { where: { languageId }, include: { synonyms: true } } },
				},
				relatedCategories: { include: { related: true } },
				relatedTo: { include: { category: true } },
			},
		});

		return Promise.all(
			categories.map(async category => ({
				id: category.id,
				name: category.label.translations[0]?.translation || '',
				slug: category.label.translations[0]?.slug || '',
				iconId: category.iconId,
				labelId: category.labelId,
				parents: await fetchParents(category.id),
				children: await buildCategoryTree(category.id, prefix, languageId),
				synonyms: category.label.translations[0]?.synonyms || [],
				icon: category.icon
					? {
							id: category.icon.id,
							name: category.icon.name,
							url: category.icon.url,
							createdAt: category.icon.createdAt,
					  }
					: null,
				relatedIds: [
					...(category.relatedCategories?.map(rc => rc.related.id) || []),
					...(category.relatedTo?.map(rt => rt.category.id) || []),
				],
			}))
		);
	} catch (error) {
		console.error('Error building category tree:', error);
		throw error;
	}
};

// Handle GET request to fetch category hierarchy
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const prefix = searchParams.get('prefix') || 'article_category_';
	const languageId = Number(searchParams.get('languageId'));

	try {
		const categoires: Category[] = await buildCategoryTree(null, prefix, languageId);
		return NextResponse.json(categoires);
	} catch (error) {
		console.error('Greška prilikom dohvatanja kategorija:', error);
		return NextResponse.json(
			{ error: 'Došlo je do greške prilikom dohvatanja kategorija. Molimo pokušajte ponovo.' },
			{ status: 500 }
		);
	}
}
