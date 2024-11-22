import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

const serializeData = (data: any) => {
	return JSON.parse(JSON.stringify(data));
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const id = parseInt(params.id, 10);
	if (isNaN(id)) {
		return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
	}

	try {
		// Preuzimanje kategorije sa roditeljima
		const category = await prisma.category.findUnique({
			where: { id },
			include: {
				childCategories: {
					include: {
						parent: {
							include: {
								label: {
									include: { translations: true },
								},
								icon: true,
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
				icon: true,
				label: {
					include: {
						translations: { include: { synonyms: true } },
					},
				},
			},
		});

		// Provera da li kategorija postoji
		if (!category) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		// Filtriranje roditelja na osnovu childId
		const parents =
			category.childCategories
				?.filter(pc => pc.childId === id)
				?.map(pc => ({
					id: pc.parent.id,
					iconId: pc.parent.iconId,
					labelId: pc.parent.labelId,
					name:
						pc.parent.label.translations.find(t => t.languageId === 1)?.translation || 'Unknown',
					icon: pc.parent.icon
						? {
								id: pc.parent.icon.id,
								name: pc.parent.icon.name,
								url: pc.parent.icon.url,
						  }
						: null,
				})) || null;

		// Vraćanje odgovora
		const serializedResponse = serializeData({
			id: category.id,
			labelId: category.labelId,
			name: category.label.translations.find(t => t.languageId === 1)?.translation || 'Unknown',
			icon: category.icon
				? {
						id: category.icon.id,
						name: category.icon.name,
						url: category.icon.url,
				  }
				: null,
			parents,
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
			label: {
				id: category.label.id,
				translations: category.label.translations.map(t => ({
					id: t.id,
					languageId: t.languageId,
					translation: t.translation,
					description: t.description || null,
					synonyms: t.synonyms.map(s => ({ id: s.id, synonym: s.synonym })),
				})),
			},
		});

		return NextResponse.json(serializedResponse);
	} catch (error) {
		console.error('Error fetching category:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
