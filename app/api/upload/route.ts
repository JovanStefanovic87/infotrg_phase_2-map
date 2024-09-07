// app/api/upload/route.ts
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Adjust the path to your Prisma client

// Helper function to convert ReadableStream to Node.js Readable
const readableStreamToNodeStream = (readableStream: ReadableStream<Uint8Array>): Readable => {
	const reader = readableStream.getReader();
	const nodeStream = new Readable({
		read() {
			reader
				.read()
				.then(({ value, done }) => {
					if (done) {
						this.push(null);
					} else {
						this.push(Buffer.from(value));
					}
				})
				.catch(err => this.destroy(err));
		},
	});
	return nodeStream;
};

// Utility function to handle file upload (removed the export)
const uploadFile = async (file: File, uploadDirectory: string): Promise<number> => {
	const fileStream = file.stream();
	const nodeStream = readableStreamToNodeStream(fileStream);

	const fileName = file.name;
	const finalFilePath = path.join(uploadDirectory, fileName);

	// Convert the file stream to a buffer to check its size
	const chunks: Buffer[] = [];
	for await (const chunk of nodeStream) {
		chunks.push(chunk);
	}
	const fileBuffer = Buffer.concat(chunks);

	// Check the file size in bytes (2MB = 2 * 1024 * 1024 bytes)
	const fileSize = fileBuffer.length;
	const shouldResize = fileSize > 2 * 1024 * 1024;

	if (shouldResize) {
		// Resize the image and save it to the final file path
		await sharp(fileBuffer)
			.resize({ width: 800 }) // Adjust width as needed
			.toFile(finalFilePath);
	} else {
		// Save the image without resizing
		await fs.promises.writeFile(finalFilePath, fileBuffer);
	}

	const relativeFilePath = path.relative(process.cwd(), finalFilePath);
	const urlPath = `/icons/articles/${relativeFilePath.replace(/\\/g, '/')}`;

	const icon = await prisma.icon.create({
		data: {
			name: fileName,
			url: urlPath,
		},
	});

	return icon.id;
};

// API route handler
export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const file = formData.get('icon') as File;

	if (!file) {
		return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
	}

	const uploadDirectory = path.join(process.cwd(), 'public/icons/articles'); // Ensure this path exists and is writable

	try {
		const iconId = await uploadFile(file, uploadDirectory);
		return NextResponse.json({ message: 'File uploaded successfully', iconId });
	} catch (error) {
		console.error('File upload error:', error);
		return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
	}
}
