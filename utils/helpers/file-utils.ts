// utils/uploadFile.ts
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

// Reusable upload file function
export const uploadFile = async (
	file: File,
	uploadDirectory: string,
	options?: { maxSize?: number; resizeWidth?: number }
): Promise<number> => {
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

		// Set default options if not provided
		const maxSize = options?.maxSize || 2 * 1024 * 1024; // 2MB by default
		const resizeWidth = options?.resizeWidth || 800; // Default width for resizing

		// Check the file size in bytes
		const fileSize = fileBuffer.length;
		const shouldResize = fileSize > maxSize;

		if (shouldResize) {
			// Resize the image and save it to the final file path
			await sharp(fileBuffer).resize({ width: resizeWidth }).toFile(finalFilePath);
		} else {
			// Save the image without resizing
			await fs.promises.writeFile(finalFilePath, fileBuffer);
		}

		// Construct the correct URL path
		const relativeFilePath = path.relative(process.cwd(), finalFilePath);
		const urlPath = `/icons/${path.basename(path.dirname(relativeFilePath))}/${path.basename(
			relativeFilePath
		)}`;

		// Save icon data in the database using Prisma
		const icon = await prisma.icon.create({
			data: {
				name: fileName,
				url: urlPath,
			},
		});

		return icon.id;
	} catch (error) {
		console.error('File upload and processing error:', error);
		throw new Error('Failed to upload and process file');
	}
};

// utils/uploadFile.ts
export const uploadImage = async (
	file: File,
	uploadDirectory: string,
	options?: { maxSize?: number; resizeWidth?: number }
): Promise<number | null> => {
	try {
		const fileStream = file.stream();
		const nodeStream = readableStreamToNodeStream(fileStream);

		const fileName = file.name;
		const finalFilePath = path.join(uploadDirectory, fileName);

		// Konvertujemo stream u buffer da bi proverili veličinu fajla
		const chunks: Buffer[] = [];
		for await (const chunk of nodeStream) {
			chunks.push(chunk);
		}
		const fileBuffer = Buffer.concat(chunks);

		// Default vrednosti ako opcije nisu prosleđene
		const maxSize = options?.maxSize || 2 * 1024 * 1024; // 2MB by default
		const resizeWidth = options?.resizeWidth || 800; // Default width for resizing

		// Proveravamo veličinu fajla
		const fileSize = fileBuffer.length;
		const shouldResize = fileSize > maxSize;

		if (shouldResize) {
			// Ako je veća od maxSize, smanji veličinu slike
			await sharp(fileBuffer).resize({ width: resizeWidth }).toFile(finalFilePath);
		} else {
			// Snimi sliku bez smanjenja veličine
			await fs.promises.writeFile(finalFilePath, fileBuffer);
		}

		// Konstruisanje URL-a slike
		const relativeFilePath = path.relative(process.cwd(), finalFilePath);
		const urlPath = `/${path.basename(path.dirname(relativeFilePath))}/${path.basename(
			relativeFilePath
		)}`;

		// Snimanje slike u bazu koristeći Prisma
		const icon = await prisma.image.create({
			data: {
				name: fileName,
				url: urlPath,
			},
		});

		return icon.id;
	} catch (error) {
		console.error('Image upload error:', error);
		return null; // Vraća null ako dođe do greške
	}
};
