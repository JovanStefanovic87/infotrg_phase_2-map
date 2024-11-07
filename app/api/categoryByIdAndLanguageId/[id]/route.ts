import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const categoryId = parseInt(params.id);
	const languageId = parseInt(req.nextUrl.searchParams.get('languageId') || '1');
	if (isNaN(categoryId) || isNaN(languageId)) {
		return NextResponse.json({ error: 'Invalid category ID or language ID' }, { status: 400 });
	}

	try {
		const category = await prisma.category.findUnique({
			where: { id: categoryId },
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
				parentCategories: {
					include: {
						parent: {
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
				childCategories: {
					include: {
						child: {
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

		if (!category) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		// Formiramo odgovor sa svim podacima o kategoriji
		const responseData = {
			id: category.id,
			name: category.label.translations[0]?.translation || 'Nedefinisana kategorija',
			icon: category.icon
				? {
						id: category.icon.id,
						name: category.icon.name,
						url: category.icon.url,
						createdAt: category.icon.createdAt,
				  }
				: null,
			labelId: category.labelId,
			synonyms: category.label.translations[0]?.synonyms.map(syn => syn.synonym) || [],
			parents: Array.from(
				new Map(
					category.parentCategories.map(parentCategory => [
						parentCategory.parent.id,
						{
							id: parentCategory.parent.id,
							name:
								parentCategory.parent.label.translations[0]?.translation ||
								'Nedefinisana kategorija',
							icon: parentCategory.parent.icon
								? {
										id: parentCategory.parent.icon.id,
										name: parentCategory.parent.icon.name,
										url: parentCategory.parent.icon.url,
								  }
								: null,
						},
					])
				).values()
			),
			children: category.childCategories.map(childCategory => ({
				id: childCategory.child.id,
				name: childCategory.child.label.translations[0]?.translation || 'Nedefinisana kategorija',
				icon: childCategory.child.icon
					? {
							id: childCategory.child.icon.id,
							name: childCategory.child.icon.name,
							url: childCategory.child.icon.url,
					  }
					: null,
			})),
			relatedCategories: [
				...category.relatedCategories.map(related => ({
					id: related.related.id,
					name: related.related.label.translations[0]?.translation || 'Nedefinisana kategorija',
					icon: related.related.icon
						? {
								id: related.related.icon.id,
								name: related.related.icon.name,
								url: related.related.icon.url,
						  }
						: null,
				})),
				...category.relatedTo.map(related => ({
					id: related.category.id,
					name: related.category.label.translations[0]?.translation || 'Nedefinisana kategorija',
					icon: related.category.icon
						? {
								id: related.category.icon.id,
								name: related.category.icon.name,
								url: related.category.icon.url,
						  }
						: null,
				})),
			],
		};

		return NextResponse.json(responseData);
	} catch (error) {
		console.error('Error fetching category by ID and language ID:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
