import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

const basePublicDirectory = path.join(process.cwd(), 'public');

const uploadFile = async (file: File, uploadDirectory: string): Promise<string> => {
	const buffer = Buffer.from(await file.arrayBuffer());
	const fileName = `${Date.now()}-${file.name}`;
	const filePath = path.join(uploadDirectory, fileName);

	await fs.promises.mkdir(uploadDirectory, { recursive: true });
	await fs.promises.writeFile(filePath, buffer);

	return filePath;
};

export async function POST(request: NextRequest) {
	try {
		const contentType = request.headers.get('content-type') || '';

		if (contentType.includes('application/json')) {
			const { action, filePath } = await request.json();

			if (!action) {
				return NextResponse.json({ error: 'Action not specified' }, { status: 400 });
			}

			const fullPath = path.join(basePublicDirectory, filePath || '');

			if (action === 'delete') {
				if (fs.existsSync(fullPath)) {
					await fs.promises.unlink(fullPath);
					return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
				} else {
					return NextResponse.json({ error: 'File not found' }, { status: 404 });
				}
			} else {
				return NextResponse.json({ error: 'Invalid action for JSON request' }, { status: 400 });
			}
		} else if (contentType.includes('multipart/form-data')) {
			const formData = await request.formData();
			const file = formData.get('file') as File;
			const customPath = formData.get('customPath') as string;

			if (!file) {
				return NextResponse.json({ error: 'No file provided' }, { status: 400 });
			}

			let uploadDirectory = path.join(basePublicDirectory, 'icons/articles');

			if (customPath) {
				const sanitizedPath = path.resolve(basePublicDirectory, customPath);
				if (!sanitizedPath.startsWith(basePublicDirectory)) {
					return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
				}
				uploadDirectory = sanitizedPath;
			}

			const finalFilePath = await uploadFile(file, uploadDirectory);

			// Create or update the icon record in the database
			const icon = await prisma.icon.create({
				data: {
					name: file.name,
					url: `/icons/articles/${path.basename(finalFilePath)}`,
				},
			});

			return NextResponse.json({ iconId: icon.id, message: 'File uploaded successfully' }); // Return iconId
		} else {
			return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
		}
	} catch (error) {
		console.error('Error managing file:', error);
		return NextResponse.json({ error: 'Error managing file' }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const filePath = url.searchParams.get('filePath');

		if (!filePath) {
			return NextResponse.json({ error: 'No filePath specified' }, { status: 400 });
		}

		const fullPath = path.join(basePublicDirectory, filePath);

		if (fs.existsSync(fullPath)) {
			const stats = await fs.promises.stat(fullPath);
			return NextResponse.json({
				filePath: fullPath,
				size: stats.size,
				lastModified: stats.mtime,
			});
		} else {
			return NextResponse.json({ error: 'File not found' }, { status: 404 });
		}
	} catch (error) {
		console.error('Error retrieving file information:', error);
		return NextResponse.json({ error: 'Error retrieving file information' }, { status: 500 });
	}
}
