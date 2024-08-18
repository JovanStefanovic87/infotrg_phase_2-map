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
