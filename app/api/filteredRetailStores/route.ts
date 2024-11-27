import { prisma } from '@/app/lib/prisma';
import { Category, EnhancedCategory } from '@/utils/helpers/types';
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
								include: {
									synonyms: true,
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
			label: {
				name: {
					startsWith: prefix,
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
							synonyms: true, // Uključujemo sinonime
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

	const categoryPromises = categories.map(async category => {
		if (processedIds.has(category.id)) {
			return undefined;
		}
		processedIds.add(category.id);

		const relatedIds = [
			...(category.relatedCategories?.map(rc => rc.related.id) || []),
			...(category.relatedTo?.map(rt => rt.category.id) || []),
		];

		const childIds = category.childCategories.map(childCategory => childCategory.child.id);
		const children = await buildCategoryTree(childIds, prefix, languageId, processedIds);

		return {
			id: category.id,
			name: category.label.translations[0]?.translation || '', // Koristimo prvi prevod
			iconId: category.iconId,
			labelId: category.labelId,
			parents: await fetchParents(category.id),
			children,
			synonyms: category.label.translations[0]?.synonyms.map(syn => syn.synonym) || [], // Mapiramo sinonime kao niz stringova
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

// Function to create a category tree
export async function GET(req: NextRequest) {
	const searchParams = new URL(req.url).searchParams;

	// Extract query parameters
	const categoryId = searchParams.get('categoryId');
	const stateId = searchParams.get('stateId');
	const countyId = searchParams.get('countyId');
	const cityId = searchParams.get('cityId');
	const suburbId =
		searchParams.get('suburbId') === '0' || searchParams.get('suburbId') === 'null'
			? null
			: parseInt(searchParams.get('suburbId') ?? '0');

	const languageId = parseInt(searchParams.get('languageId') ?? '1');

	// Initialize where conditions
	const where: any = {};

	// Add category filtering
	if (categoryId) {
		where.OR = [
			{ articleCategories: { some: { id: parseInt(categoryId) } } },
			{ activityCategories: { some: { id: parseInt(categoryId) } } },
			{ objectTypeCategories: { some: { id: parseInt(categoryId) } } },
		];
	}

	// Add state filtering
	if (stateId && stateId !== '0') {
		where.stateId = parseInt(stateId);

		// Add county filtering
		if (countyId && countyId !== '0') {
			where.countyId = parseInt(countyId);

			// Add city filtering
			if (cityId && cityId !== '0') {
				where.cityId = parseInt(cityId);

				// Add suburb filtering (if suburbId is not null)
				if (suburbId !== null) {
					where.suburbId = suburbId;
				} else {
					delete where.suburbId; // Include all suburbs within the city
				}
			} else {
				delete where.cityId; // Include all cities within the county
			}
		} else {
			delete where.countyId; // Include all counties within the state
		}
	} else {
		delete where.stateId; // No location filtering
	}

	console.log('WHERE CONDITIONS:', where);

	try {
		// Fetch retail stores with filters and relations
		const retailStores = await prisma.retailStore.findMany({
			where,
			include: {
				articleCategories: true,
				activityCategories: true,
				objectTypeCategories: true,
				state: {
					include: {
						label: {
							include: {
								translations: {
									where: { languageId },
								},
							},
						},
					},
				},
				county: {
					include: {
						label: {
							include: {
								translations: {
									where: { languageId },
								},
							},
						},
					},
				},
				city: {
					include: {
						label: {
							include: {
								translations: {
									where: { languageId },
								},
							},
						},
					},
				},
				suburb: {
					include: {
						label: {
							include: {
								translations: {
									where: { languageId },
								},
							},
						},
					},
				},
				coordinates: true,
			},
		});

		// Enhance each retail store with category hierarchies
		const enhancedRetailStores = await Promise.all(
			retailStores.map(async store => {
				const articleCategoryIds = store.articleCategories.map(category => category.id);
				const activityCategoryIds = store.activityCategories.map(category => category.id);
				const objectTypeCategoryIds = store.objectTypeCategories.map(category => category.id);

				const articleCategories = await buildCategoryTree(
					articleCategoryIds,
					'article_category_',
					languageId
				);
				const activityCategories = await buildCategoryTree(
					activityCategoryIds,
					'activity_category_',
					languageId
				);
				const objectTypeCategories = await buildCategoryTree(
					objectTypeCategoryIds,
					'object_type_category_',
					languageId
				);

				return {
					...store,
					articleCategories,
					activityCategories,
					objectTypeCategories,
				};
			})
		);

		return NextResponse.json(enhancedRetailStores);
	} catch (error) {
		console.error('Error fetching filtered retail stores:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
