import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
	interface User extends PrismaUser {
		id: string;
		role: string;
	}

	interface Session {
		user: {
			id: string;
			role: string;
		} & DefaultSession['user'];
	}

	interface JWT {
		sub?: string;
		role?: string;
	}
}
