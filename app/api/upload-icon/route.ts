// app/api/upload/route.ts
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';
import { NextRequest, NextResponse } from 'next/server';

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

// Utility function to handle file upload
export const uploadFile = async (file: File, uploadDirectory: string): Promise<string> => {
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

	// Construct the relative URL directly
	const urlPath = `/icons/articles/${fileName}`;

	return urlPath;
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
		const relativeUrl = await uploadFile(file, uploadDirectory);
		return NextResponse.json({ message: 'File uploaded successfully', filePath: relativeUrl });
	} catch (error) {
		console.error('File upload error:', error);
		return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
	}
}
