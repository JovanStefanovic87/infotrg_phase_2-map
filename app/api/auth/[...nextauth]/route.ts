import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async credentials => {
				console.log('Received credentials:', credentials);

				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				console.log('Fetched user from database:', user);

				if (user && (await bcrypt.compare(credentials.password, user.password))) {
					return {
						id: user.id.toString(),
						role: user.role,
						email: user.email,
					} as User;
				}

				return null;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub as string;
				session.user.role = token.role as string;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.sub = user.id;
				token.role = user.role;
			}
			return token;
		},
	},
	pages: {
		signIn: '/auth/signin',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
