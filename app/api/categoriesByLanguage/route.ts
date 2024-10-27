import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Category } from '@/utils/helpers/types';

const fetchParents = async (childId: number): Promise<Category[]> => {
	const parentCategories = await prisma.parentCategory.findMany({
		where: { childId },
		include: {
			parent: {
				include: {
					icon: true,
					label: {
						include: {
							translations: {
								include: {
									synonyms: true, // Include synonyms as well
								},
							},
						},
					},
				},
			},
		},
	});

	return Promise.all(
		parentCategories.map(async ({ parent }) => ({
			id: parent.id,
			name: parent.label.translations.length > 0 ? parent.label.translations[0].translation : '',
			iconId: parent.iconId,
			labelId: parent.labelId,
			parents: await fetchParents(parent.id),
			children: [], // Only fetching parent categories here
			synonyms: parent.label.translations[0]?.synonyms || [], // Add synonyms if available
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
};

const buildCategoryTree = async (
	parentId: number | null,
	prefix: string,
	languageId: number
): Promise<Category[]> => {
	const categories = await prisma.category.findMany({
		where: {
			...(parentId === null
				? { childCategories: { none: {} } } // Top-level categories with no parents
				: { childCategories: { some: { parentId } } }), // Subcategories of the current parentId
			label: {
				name: {
					startsWith: prefix, // Filter based on the prefix
				},
			},
		},
		include: {
			icon: true,
			childCategories: {
				include: {
					child: true,
				},
			},
			label: {
				include: {
					translations: {
						where: { languageId },
						include: {
							synonyms: true, // Include synonyms for each translation
						},
					},
				},
			},
			relatedCategories: {
				include: {
					related: true,
				},
			},
			relatedTo: {
				include: {
					category: true,
				},
			},
		},
	});

	return Promise.all(
		categories.map(async category => {
			const relatedIds = [
				...(category.relatedCategories?.map(rc => rc.related.id) || []),
				...(category.relatedTo?.map(rt => rt.category.id) || []),
			];

			return {
				id: category.id,
				name:
					category.label.translations.length > 0 ? category.label.translations[0].translation : '',
				iconId: category.iconId,
				labelId: category.labelId,
				parents: await fetchParents(category.id),
				children: await buildCategoryTree(category.id, prefix, languageId),
				synonyms: category.label.translations[0]?.synonyms || [], // Add synonyms if available
				icon: category.icon
					? {
							id: category.icon.id,
							name: category.icon.name,
							url: category.icon.url,
							createdAt: category.icon.createdAt,
					  }
					: null,
				relatedIds,
			};
		})
	);
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const prefix = searchParams.get('prefix') || 'article_category_';
	const languageId = Number(searchParams.get('languageId')) || 1;

	try {
		const topLevelCategories: Category[] = await buildCategoryTree(null, prefix, languageId);
		return NextResponse.json(topLevelCategories);
	} catch (error) {
		console.error('Error fetching categories:', error);
		return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
	}
}
