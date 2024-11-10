import { prisma } from '@/app/lib/prisma';
import { Category } from '@/utils/helpers/types';
import { NextRequest, NextResponse } from 'next/server';

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
								where: { languageId: 1 },
								include: { synonyms: true },
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
			name: parent.label.translations[0]?.translation || '',
			iconId: parent.iconId,
			labelId: parent.labelId,
			parents: await fetchParents(parent.id),
			children: [],
			synonyms: parent.label.translations[0]?.synonyms.map(syn => syn.synonym) || [],
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
	categoryIds: number[],
	prefix: string,
	languageId: number,
	processedIds: Set<number> = new Set()
): Promise<Category[]> => {
	const categories = await prisma.category.findMany({
		where: {
			id: { in: categoryIds },
			label: { name: { startsWith: prefix } },
		},
		include: {
			icon: true,
			childCategories: { include: { child: true } },
			label: { include: { translations: { where: { languageId }, include: { synonyms: true } } } },
			relatedCategories: { include: { related: true } },
			relatedTo: { include: { category: true } },
		},
	});

	const categoryPromises = categories.map(async category => {
		if (processedIds.has(category.id)) return undefined;
		processedIds.add(category.id);

		const relatedIds = [
			...(category.relatedCategories?.map(rc => rc.related.id) || []),
			...(category.relatedTo?.map(rt => rt.category.id) || []),
		];

		const childIds = category.childCategories.map(childCategory => childCategory.child.id);
		const children = await buildCategoryTree(childIds, prefix, languageId, processedIds);

		return {
			id: category.id,
			name: category.label.translations[0]?.translation || '',
			iconId: category.iconId,
			labelId: category.labelId,
			parents: await fetchParents(category.id),
			children,
			synonyms: category.label.translations[0]?.synonyms.map(syn => syn.synonym) || [],
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
	});

	const categoryResults = await Promise.all(categoryPromises);
	return categoryResults.filter((category): category is any => category !== undefined);
};

export async function GET(req: NextRequest) {
	const searchParams = new URL(req.url).searchParams;
	const categoryId = searchParams.get('categoryId');
	const stateId = searchParams.get('stateId');
	const countyId = searchParams.get('countyId');
	const cityId = searchParams.get('cityId');
	const suburbId = searchParams.get('suburbId');
	const languageId = parseInt(searchParams.get('languageId') ?? '1');

	const where: any = {};

	// Add category-based filtering
	if (categoryId) {
		where.OR = [
			{ articleCategories: { some: { id: parseInt(categoryId) } } },
			{ activityCategories: { some: { id: parseInt(categoryId) } } },
			{ objectTypeCategories: { some: { id: parseInt(categoryId) } } },
		];
	}

	// Dynamically add location filtering only if the ID is non-zero and non-null
	if (stateId && stateId !== '0') where.stateId = parseInt(stateId);
	if (countyId && countyId !== '0') where.countyId = parseInt(countyId);
	if (cityId && cityId !== '0') where.cityId = parseInt(cityId);
	if (suburbId && suburbId !== '0') where.suburbId = parseInt(suburbId);

	try {
		const retailStores = await prisma.retailStore.findMany({
			where,
			include: {
				articleCategories: true,
				activityCategories: true,
				objectTypeCategories: true,
				state: {
					include: {
						label: { include: { translations: { where: { languageId } } } },
					},
				},
				county: {
					include: {
						label: { include: { translations: { where: { languageId } } } },
					},
				},
				city: {
					include: {
						label: { include: { translations: { where: { languageId } } } },
					},
				},
				suburb: {
					include: {
						label: { include: { translations: { where: { languageId } } } },
					},
				},
				coordinates: true,
			},
		});

		return NextResponse.json(retailStores);
	} catch (error) {
		console.error('Error fetching filtered retail stores:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
