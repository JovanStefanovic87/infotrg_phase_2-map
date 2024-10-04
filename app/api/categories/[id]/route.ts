//app\api\categories\[id]\route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { Category } from '@/utils/helpers/types';
import { Prisma } from '@prisma/client';

const getCategoryTranslation = async (labelId: number, languageId: number = 1) => {
	const translation = await prisma.translation.findFirst({
		where: { labelId, languageId },
		select: { translation: true },
	});
	return translation?.translation || 'Unknown';
};

const buildCategoryTree = async (
	parentId: number | null,
	languageId: number = 1
): Promise<Category[]> => {
	const categories = await prisma.category.findMany({
		where:
			parentId === null
				? { parentCategories: { none: {} } } // Fetch categories with no parents if parentId is null
				: { parentCategories: { some: { parentId } } }, // Fetch categories with specific parentId
		include: {
			parentCategories: { include: { parent: true } }, // Fetch parent categories to get parents
			childCategories: { include: { child: true } }, // Fetch child categories to get children
			icon: true, // Include icon details if any
		},
	});

	return Promise.all(
		categories.map(async category => {
			const name = await getCategoryTranslation(category.labelId, languageId);
			const children = await buildCategoryTree(category.id, languageId); // Recursively fetch children

			return {
				id: category.id,
				iconId: category.iconId,
				labelId: category.labelId,
				name, // Name is fetched from translations
				icon: category.icon
					? {
							id: category.icon.id,
							name: category.icon.name,
							url: category.icon.url,
							createdAt: category.icon.createdAt,
					  }
					: null,
				parents: await Promise.all(
					category.parentCategories.map(async pc => ({
						id: pc.parent.id,
						iconId: pc.parent.iconId,
						labelId: pc.parent.labelId,
						name: await getCategoryTranslation(pc.parent.labelId, languageId), // Fetch parent's name
						parents: [], // Avoid recursion
						children: [], // Avoid recursion
					}))
				),
				children,
			} as Category;
		})
	);
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const languageId = 1; // Assuming you are using default languageId as 1

	try {
		const category = await prisma.category.findUnique({
			where: { id: Number(id) },
			include: {
				parentCategories: { include: { parent: true } }, // Fetch parent details
				childCategories: { include: { child: true } }, // Fetch child details
				relatedCategories: { include: { related: true } }, // Fetch related categories
				relatedTo: { include: { category: true } }, // Fetch categories that this category is related to
			},
		});
		if (!category) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		// Combine relatedCategories and relatedTo categories into one array
		const relatedIds = [
			...(category.relatedCategories?.map(related => related.relatedId) || []),
			...(category.relatedTo?.map(related => related.categoryId) || []),
		];

		// Fetch category and parent/child names from the Translation table
		const name = await getCategoryTranslation(category.labelId, languageId);

		const transformedCategory: Category = {
			id: category.id,
			iconId: category.iconId,
			labelId: category.labelId,
			name, // Category name from translations
			parents: await Promise.all(
				category.parentCategories.map(async pc => ({
					id: pc.parent.id,
					iconId: pc.parent.iconId,
					labelId: pc.parent.labelId,
					name: await getCategoryTranslation(pc.parent.labelId, languageId), // Fetch parent's name
					parents: [], // Avoid recursion
					children: [], // Avoid recursion
				}))
			),
			children: await Promise.all(
				category.childCategories.map(async cc => ({
					id: cc.child.id,
					iconId: cc.child.iconId,
					labelId: cc.child.labelId,
					name: await getCategoryTranslation(cc.child.labelId, languageId), // Fetch child's name
					parents: [], // Avoid recursion
					children: [], // Avoid recursion
				}))
			),
			relatedIds, // Add the combined relatedIds to the category response
		};

		return NextResponse.json(transformedCategory);
	} catch (error) {
		console.error('Error fetching category:', error);
		return NextResponse.json({ error: 'Error fetching category' }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;

	if (!id || isNaN(Number(id))) {
		return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
	}

	try {
		const categoryId = Number(id);

		const deleteCategoryAndRelatedData = async (id: number) => {
			// Recursively find and delete subcategories
			const subcategories = await prisma.parentCategory.findMany({
				where: { parentId: id },
				select: { childId: true },
			});

			// Recursively delete subcategories
			for (const subcategory of subcategories) {
				await deleteCategoryAndRelatedData(subcategory.childId);
			}

			// Find the label associated with the category
			const category = await prisma.category.findUnique({
				where: { id },
				select: { labelId: true },
			});

			// Delete the category itself
			await prisma.category.delete({
				where: { id },
			});

			// Delete the related categories for this category
			await prisma.relatedCategory.deleteMany({
				where: {
					OR: [
						{ categoryId: id }, // Delete where the category is the main category
						{ relatedId: id }, // Delete where the category is the related one
					],
				},
			});

			if (category?.labelId) {
				// Delete the synonyms associated with the label's translations
				const translations = await prisma.translation.findMany({
					where: { labelId: category.labelId },
					select: { id: true },
				});

				// Delete all synonyms for the translations
				for (const translation of translations) {
					await prisma.synonym.deleteMany({
						where: { translationId: translation.id },
					});
				}

				// Delete translations associated with the label
				await prisma.translation.deleteMany({
					where: { labelId: category.labelId },
				});

				// Delete the label itself (once all categories that reference it are deleted)
				await prisma.label.delete({
					where: { id: category.labelId },
				});
			}
		};

		// Ensure the category exists
		const categoryExists = await prisma.category.findUnique({
			where: { id: categoryId },
		});

		if (!categoryExists) {
			return NextResponse.json({ error: 'Category not found' }, { status: 404 });
		}

		// Delete the category and related data
		await deleteCategoryAndRelatedData(categoryId);

		return NextResponse.json({
			message:
				'Category, subcategories, translations, synonyms, related categories, and related data deleted successfully',
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
		const { parentIds, relatedIds, labelId, iconId, translations } = body;

		if (!Array.isArray(parentIds) || !Array.isArray(relatedIds)) {
			return NextResponse.json(
				{ error: 'parentIds and relatedIds should be arrays' },
				{ status: 400 }
			);
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

			// Handle parent categories
			await prisma.parentCategory.deleteMany({
				where: { childId: Number(id) },
			});

			await prisma.parentCategory.createMany({
				data: parentIds.map((parentId: number) => ({
					parentId: parentId,
					childId: Number(id),
				})),
			});

			// Handle related categories more efficiently
			const existingRelatedCategories = await prisma.relatedCategory.findMany({
				where: {
					OR: [{ categoryId: Number(id) }, { relatedId: Number(id) }],
				},
				select: {
					categoryId: true,
					relatedId: true,
				},
			});

			// Filter out existing relationships that are already stored in any direction
			const newRelatedIds = relatedIds.filter(
				newRelatedId =>
					!existingRelatedCategories.some(
						rc =>
							(rc.categoryId === Number(id) && rc.relatedId === newRelatedId) ||
							(rc.relatedId === Number(id) && rc.categoryId === newRelatedId)
					)
			);

			// Remove relationships that were deleted from the relatedIds array
			const relationshipsToRemove = existingRelatedCategories.filter(
				rc =>
					(rc.categoryId === Number(id) && !relatedIds.includes(rc.relatedId)) ||
					(rc.relatedId === Number(id) && !relatedIds.includes(rc.categoryId))
			);

			if (relationshipsToRemove.length > 0) {
				await prisma.relatedCategory.deleteMany({
					where: {
						OR: relationshipsToRemove.map(rc => ({
							categoryId: rc.categoryId,
							relatedId: rc.relatedId,
						})),
					},
				});
			}

			// Add new related categories only if not already stored
			if (newRelatedIds.length > 0) {
				await prisma.relatedCategory.createMany({
					data: newRelatedIds.map((relatedId: number) => ({
						categoryId: Number(id),
						relatedId: relatedId,
					})),
				});
			}

			// Handle translations
			for (const translation of translations) {
				const {
					translationId,
					languageId,
					translation: translationText,
					description,
					synonyms,
				} = translation;

				// Upsert translation and retrieve the resulting translationId
				const upsertedTranslation = await prisma.translation.upsert({
					where: { id: translationId || 0 }, // Use 0 as a fallback if translationId is null
					update: { translation: translationText, description },
					create: {
						labelId,
						languageId,
						translation: translationText,
						description,
					},
					select: { id: true }, // Ensure we get the new or existing translation ID
				});

				const newTranslationId = upsertedTranslation.id;

				// Handle synonyms for the translation
				await prisma.synonym.deleteMany({
					where: { translationId: newTranslationId }, // Use the correct translationId
				});

				if (Array.isArray(synonyms) && synonyms.length > 0) {
					await prisma.synonym.createMany({
						data: synonyms.map((synonym: string) => ({
							translationId: newTranslationId, // Use the correct translationId
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
