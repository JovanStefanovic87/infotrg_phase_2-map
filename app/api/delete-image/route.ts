//app/api/delete-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const uploadDirectory = path.join(process.cwd(), 'public/icons/articles');

export async function POST(req: NextRequest) {
	try {
		const { filename } = await req.json();

		if (!filename) {
			return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
		}

		const filePath = path.join(uploadDirectory, filename);

		if (fs.existsSync(filePath)) {
			await fs.promises.unlink(filePath);
			return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
		} else {
			return NextResponse.json({ error: 'File not found' }, { status: 404 });
		}
	} catch (error) {
		console.error('Error in delete-image API:', error);
		return NextResponse.json({ error: 'Error deleting file' }, { status: 500 });
	}
}
