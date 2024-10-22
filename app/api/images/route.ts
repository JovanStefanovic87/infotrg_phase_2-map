// app\api\images\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';

const prisma = new PrismaClient();

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

const uploadFile = async (file: File, uploadDirectory: string): Promise<number> => {
	try {
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

		// Construct the correct URL path
		const relativeFilePath = path.relative(process.cwd(), finalFilePath);
		const urlPath = `/images/${path.basename(path.dirname(relativeFilePath))}/${path.basename(
			relativeFilePath
		)}`;

		// Save image data in the database using Prisma
		const image = await prisma.image.create({
			data: {
				name: fileName,
				url: urlPath,
			},
		});

		return image.id;
	} catch (error) {
		console.error('File upload and processing error:', error);
		throw new Error('Failed to upload and process file');
	}
};

// GET method to fetch all images
export async function GET(request: NextRequest) {
	try {
		// Get the directory from the query parameters
		const { searchParams } = new URL(request.url);
		const directory = searchParams.get('directory');

		// Fetch only images from the specified directory
		const images = await prisma.image.findMany({
			where: {
				url: {
					contains: `/images/${directory}`,
				},
			},
		});

		// Return the images data
		return NextResponse.json(images);
	} catch (error) {
		console.error('Error fetching images:', error);
		return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
	}
}

// POST method to upload a new image
export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get('image') as File;
		const directory = formData.get('directory') as string;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		if (!directory) {
			return NextResponse.json({ error: 'No directory specified' }, { status: 400 });
		}

		// Define the upload directory path using the directory from form data
		const uploadDirectory = path.join(process.cwd(), `public/images/${directory}`);

		// Ensure the upload directory exists
		await fs.promises.mkdir(uploadDirectory, { recursive: true });

		// Upload the file and save image data to the database
		const imageId = await uploadFile(file, uploadDirectory);
		return NextResponse.json({ message: 'File uploaded successfully', imageId });
	} catch (error) {
		console.error('File upload error:', error);
		return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
	} finally {
		// Ensure that Prisma connection is properly closed
		await prisma.$disconnect();
	}
}
