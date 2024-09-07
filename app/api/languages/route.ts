import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const languages = await prisma.language.findMany();
		return NextResponse.json(languages);
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}

export async function POST(request: NextRequest) {
	try {
		const { code, name } = await request.json();

		if (!code || !name) {
			return NextResponse.json({ error: 'Code and Name are required' }, { status: 400 });
		}

		const newLanguage = await prisma.language.create({
			data: {
				code,
				name,
			},
		});

		return NextResponse.json(newLanguage, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Failed to add language' }, { status: 500 });
	}
}
