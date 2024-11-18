import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

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
				icon: true,
				label: {
					include: {
						translations: { include: { synonyms: true } },
					},
				},
			},
		});

		console.log('category', category);

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
		return NextResponse.json({
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
	} catch (error) {
		console.error('Error fetching category:', error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
