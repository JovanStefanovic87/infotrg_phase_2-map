//app/api/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
			},
		});
		return NextResponse.json(categories);
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}

export async function POST(request: NextRequest) {
	try {
		const { parentId, labelId, iconUrl } = await request.json(); // Accept iconUrl from the request

		const category = await prisma.category.create({
			data: {
				parentId,
				labelId,
				iconUrl,
				createdAt: new Date(),
			},
		});

		return NextResponse.json(category);
	} catch (error) {
		console.error('Error creating category:', error);
		return NextResponse.error();
	}
}

/* const handleSubmit = async (event: React.FormEvent) => {
	event.preventDefault();

	try {
		const labelResponse = await axios.post('/api/labels', { name });
		const newLabelId = labelResponse.data.id;

		if (!newLabelId) {
			throw new Error('Failed to create label');
		}

		const categoryResponse = await axios.post('/api/categories', {
			parentId,
			labelId: newLabelId,
		});

		if (!categoryResponse.data) {
			throw new Error('Failed to create category');
		}

		if (languageId) {
			await axios.post('/api/translation', {
				labelId: newLabelId,
				languageId,
				translation: name,
			});
		}

		setName('');
		setParentId(null);
		setLanguageId('');
		setIcon(null);
		setError('');
	} catch (err) {
		if (err instanceof Error) {
			setError(`Submission Error: ${err.message}`);
		} else {
			setError('An unexpected error occurred.');
		}
	}
}; */
