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
			name: parent.label.translations.length > 0 ? parent.label.translations[0].translation : '',
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
};

const buildCategoryTree = async (
	categoryIds: number[],
	prefix: string,
	languageId: number,
	processedIds: Set<number> = new Set() // Track processed IDs to avoid infinite loop
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
							synonyms: true,
						},
					},
				},
			},
			relatedCategories: {
				include: {
					related: {
						include: {
							icon: true,
							label: {
								include: {
									translations: {
										where: { languageId },
										include: {
											synonyms: true,
										},
									},
								},
							},
						},
					},
				},
			},
			relatedTo: {
				include: {
					category: {
						include: {
							icon: true,
							label: {
								include: {
									translations: {
										where: { languageId },
										include: {
											synonyms: true,
										},
									},
								},
							},
						},
					},
				},
			},
		},
	});

	// Collect promises for category transformations
	const categoryPromises = categories.map(async category => {
		if (processedIds.has(category.id)) {
			return undefined;
		}
		processedIds.add(category.id);

		const relatedCategories = [
			...(category.relatedCategories?.map(rc => ({
				id: rc.related.id,
				name:
					rc.related.label.translations.length > 0
						? rc.related.label.translations[0].translation
						: '',
				iconId: rc.related.iconId,
				labelId: rc.related.labelId,
				synonyms: rc.related.label.translations[0]?.synonyms || [],
				icon: rc.related.icon
					? {
							id: rc.related.icon.id,
							name: rc.related.icon.name,
							url: rc.related.icon.url,
							createdAt: rc.related.icon.createdAt,
					  }
					: null,
			})) || []),
			...(category.relatedTo?.map(rt => ({
				id: rt.category.id,
				name:
					rt.category.label.translations.length > 0
						? rt.category.label.translations[0].translation
						: '',
				iconId: rt.category.iconId,
				labelId: rt.category.labelId,
				synonyms: rt.category.label.translations[0]?.synonyms || [],
				icon: rt.category.icon
					? {
							id: rt.category.icon.id,
							name: rt.category.icon.name,
							url: rt.category.icon.url,
							createdAt: rt.category.icon.createdAt,
					  }
					: null,
			})) || []),
		];

		const childIds = category.childCategories.map(childCategory => childCategory.child.id);
		const children = await buildCategoryTree(childIds, prefix, languageId, processedIds);

		return {
			id: category.id,
			name:
				category.label.translations.length > 0 ? category.label.translations[0].translation : '',
			iconId: category.iconId,
			labelId: category.labelId,
			parents: await fetchParents(category.id),
			children,
			synonyms: category.label.translations[0]?.synonyms || [],
			icon: category.icon
				? {
						id: category.icon.id,
						name: category.icon.name,
						url: category.icon.url,
						createdAt: category.icon.createdAt,
				  }
				: null,
			relatedCategories, // Sada vraća sve informacije o povezanima kategorijama
		};
	});

	// Await all category promises and filter out undefined values
	// Correcting quotes and ensuring valid syntax
	const categoryResults = await Promise.all(categoryPromises);

	// Correctly filter out undefined values with type assertion
	return categoryResults.filter((category): category is any => category !== undefined);
};

// Function to create a category tree
export async function GET(req: NextRequest) {
	const searchParams = new URL(req.url).searchParams; // Use searchParams directly
	const categoryId = searchParams.get('categoryId'); // Changed quotes
	const countryId = searchParams.get('countryId'); // Changed quotes
	const cityId = searchParams.get('cityId'); // Changed quotes
	const cityPartId = searchParams.get('cityPartId'); // Changed quotes
	const marketplaceId = searchParams.get('marketplaceId'); // Changed quotes
	const languageId = parseInt(searchParams.get('languageId') ?? '1'); // Changed quotes

	const where: any = {};

	if (categoryId) {
		where.OR = [
			{ articleCategories: { some: { id: parseInt(categoryId) } } },
			{ activityCategories: { some: { id: parseInt(categoryId) } } },
			{ objectTypeCategories: { some: { id: parseInt(categoryId) } } },
		];
	}
	if (countryId) where.countryId = parseInt(countryId);
	if (cityId) where.cityId = parseInt(cityId);
	if (cityPartId && cityPartId !== '0') where.cityPartId = parseInt(cityPartId);
	else where.cityPartId = null;
	if (marketplaceId && marketplaceId !== '0') where.marketplaceId = parseInt(marketplaceId);
	else where.marketplaceId = null;

	try {
		const retailStores = await prisma.retailStore.findMany({
			where,
			include: {
				articleCategories: true,
				activityCategories: true,
				objectTypeCategories: true,
				country: {
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
				cityPart: {
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
				marketplace: {
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

		const countCategories = (categories: Category[]): number => {
			return categories.reduce(
				(count, category) => count + 1 + countCategories(category.children || []),
				0
			);
		};

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

				// Funkcija za brojanje kategorija i potkategorija unutar articleCategories
				const countCategories = (categories: Category[]): number => {
					let count = categories.length;
					categories.forEach(category => {
						if (category.children) {
							count += countCategories(category.children); // Rekurzivno brojanje svih potkategorija
						}
					});
					return count;
				};

				const totalArticleCategoryCount = countCategories(articleCategories); // Ukupan broj articleCategories i njihovih potkategorija

				return {
					...store,
					articleCategories,
					activityCategories,
					objectTypeCategories,
					totalArticleCategoryCount, // Dodajemo ukupan broj article kategorija
				};
			})
		);

		return NextResponse.json(enhancedRetailStores);
	} catch (error) {
		console.error('Error fetching filtered retail stores:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
