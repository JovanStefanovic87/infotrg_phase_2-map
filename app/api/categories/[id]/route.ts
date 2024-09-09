//app\api\categories\[id]\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Category as AppCategory } from '@/utils/helpers/types';
import { Prisma } from '@prisma/client';

const fetchSubcategories = async (parentId: number) => {
	const categories = await prisma.category.findMany({
		where: { childCategories: { some: { parentId } } }, // Povucite potkategorije gde je trenutna kategorija roditelj
		include: {
		  icon: true, // Uključite detalje ikone
		  parentCategories: {
			include: {
			  parent: {
				include: { icon: true },
			  },
			},
		  },
		  childCategories: {
			include: {
			  child: { // Povucite sve informacije o potkategorijama
				include: { icon: true },
			  },
			},
		  },
		},
	  });
	
  
	  categories.forEach(category => {
		console.log('Fetched parent categories for:', category.name, JSON.stringify(category.parentCategories, null, 2));
		console.log('Fetched child categories for:', category.name, JSON.stringify(category.childCategories, null, 2));
	});
  
	return categories.map((category) => ({
		id: category.id,
		iconId: category.iconId ?? null,
		labelId: category.labelId ?? null,
		name: category.name,
		icon: category.icon
		  ? {
			  id: category.icon.id,
			  name: category.icon.name,
			  url: category.icon.url,
			}
		  : null,
		parents: category.parentCategories.length > 0
		  ? category.parentCategories.map((pc) => ({
			  id: pc.parent.id,
			  iconId: pc.parent.iconId ?? null,
			  labelId: pc.parent.labelId ?? null,
			  name: pc.parent.name,
			  icon: pc.parent.icon
				? {
					id: pc.parent.id,
					name: pc.parent.icon.name,
					url: pc.parent.icon.url,
				  }
				: null,
			}))
		  : [],
		children: category.childCategories.map((cc) => ({
		  id: cc.child.id,
		  name: cc.child.name,
		  iconId: cc.child.iconId ?? null,
		})),
		hasChildren: category.childCategories.length > 0, // Indikujte da li kategorija ima decu
	  }));
	};
  
  

const buildCategoryTree = async (parentId: number | null): Promise<AppCategory[]> => {
	const categories: Prisma.CategoryGetPayload<{
	  include: { parentCategories: { include: { parent: true } }; childCategories: true; icon: true };
	}>[] = await prisma.category.findMany({
	  where:
		parentId === null
		  ? { parentCategories: { none: {} } } // Fetch categories with no parents if parentId is null
		  : { parentCategories: { some: { parentId } } }, // Fetch categories with specific parentId
	  include: {
		parentCategories: { include: { parent: true } }, // Include parent relation in the query
		childCategories: { include: { child: true } }, // Include child relation in the query
		icon: true, // Include icon details if any
	  },
	});
  
	return Promise.all(
	  categories.map(async category => {
		const children = await buildCategoryTree(category.id); // Recursively fetch children
		const parents = await buildCategoryTree(category.parentCategories[0]?.parent?.id || null); // Fetch parent recursively
  
		return {
		  id: category.id,
		  iconId: category.iconId ?? null,
		  labelId: category.labelId ?? null,
		  name: category.name, // Dodaj polje name
		  icon: category.icon
			? {
				id: category.icon.id,
				name: category.icon.name,
				url: category.icon.url,
				createdAt: category.icon.createdAt,
			  }
			: null,
		  parents: parents.length > 0 ? parents : category.parentCategories.map(pc => ({
			id: pc.parent.id,
			iconId: pc.parent.iconId ?? null,
			labelId: pc.parent.labelId ?? null,
			name: pc.parent.name, // Dodaj name za roditeljsku kategoriju
			parents: [],
			children: [],
		  })),
		  children,
		} as AppCategory;
	  })
	);
  };
  

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	console.log('clicked categroy id', id);

	try {
		const parentId = Number(id);
		console.log('Fetching subcategories for parentId:', parentId); // This log should appear

		// Call fetchSubcategories to get the subcategories for the given parentId
		const categories = await fetchSubcategories(parentId);

		// Log the fetched subcategories
		console.log('Fetched subcategories:', categories);

		return NextResponse.json(categories);
	} catch (error) {
		console.error('Error fetching subcategories:', error); // Log error
		return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const url = new URL(request.url);
	const id = url.pathname.split('/').pop();

	if (!id || isNaN(Number(id))) {
		return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
	}

	try {
		const categoryId = Number(id);

		const deleteCategoryAndRelatedData = async (id: number) => {
			// Recursively find and delete child categories
			const subcategories = await prisma.category.findMany({
				where: { childCategories: { some: { parentId: id } } }, // Fetch child categories
			});

			for (const subcategory of subcategories) {
				await deleteCategoryAndRelatedData(subcategory.id);
			}

			const label = await prisma.category.findUnique({
				where: { id },
				select: { labelId: true },
			});

			if (label?.labelId) {
				await prisma.translation.deleteMany({
					where: { labelId: label.labelId },
				});

				await prisma.label.delete({
					where: { id: label.labelId },
				});
			}

			await prisma.category.delete({ where: { id } });
		};

		const category = await prisma.category.findUnique({ where: { id: categoryId } });
		if (!category) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		await deleteCategoryAndRelatedData(categoryId);

		return NextResponse.json({
			message: 'Category, subcategories, and related data deleted successfully',
		});
	} catch (error) {
		console.error('Error deleting category and related data:', error);
		return NextResponse.json(
			{ error: 'Error deleting category and related data' },
			{ status: 500 }
		);
	}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;

	try {
		const body = await request.json();
		const { parentIds, labelId, iconId, translations } = body;

		if (!Array.isArray(parentIds)) {
			return NextResponse.json({ error: 'parentIds should be an array' }, { status: 400 });
		}

		if (labelId === undefined || typeof labelId !== 'number') {
			return NextResponse.json({ error: 'Invalid labelId' }, { status: 400 });
		}

		if (iconId !== null && iconId !== undefined && typeof iconId !== 'number') {
			return NextResponse.json({ error: 'Invalid iconId' }, { status: 400 });
		}

		// Validate translations
		if (!Array.isArray(translations)) {
			return NextResponse.json({ error: 'Translations should be an array' }, { status: 400 });
		}

		const updatedCategory = await prisma.$transaction(async prisma => {
			const dataToUpdate: { labelId: number; iconId?: number | null } = { labelId };

			if (iconId !== undefined) {
				dataToUpdate.iconId = iconId;
			}

			const category = await prisma.category.update({
				where: { id: Number(id) },
				data: dataToUpdate,
			});

			await prisma.parentCategory.deleteMany({
				where: { childId: Number(id) },
			});

			await prisma.parentCategory.createMany({
				data: parentIds.map((parentId: number) => ({
					parentId: parentId,
					childId: Number(id),
				})),
			});

			for (const translation of translations) {
				const {
					translationId,
					languageId,
					translation: translationText,
					description,
					synonyms,
				} = translation;
				console.log('description', description);
				await prisma.translation.upsert({
					where: { id: translationId },
					update: { translation: translationText, description }, // Update translation and description
					create: {
						labelId,
						languageId,
						translation: translationText,
						description, // Create with description
					},
				});

				await prisma.synonym.deleteMany({
					where: { translationId },
				});

				if (Array.isArray(synonyms)) {
					await prisma.synonym.createMany({
						data: synonyms.map((synonym: string) => ({
							translationId,
							synonym,
						})),
					});
				}
			}

			return category;
		});

		return NextResponse.json(updatedCategory);
	} catch (error) {
		console.error('Error updating category:', error);
		return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
	}
}
