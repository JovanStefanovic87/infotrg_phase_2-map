import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async credentials => {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (user && (await bcrypt.compare(credentials.password, user.password))) {
					return {
						id: user.id.toString(),
						role: user.role,
						email: user.email,
					};
				}

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: any; user: any }) {
			if (user) {
				token.sub = user.id;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			if (token) {
				session.user.id = token.sub as string;
				session.user.role = token.role as string;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/signin',
	},
};

// For Next.js App Router
export const handler = NextAuth(authOptions);

// Export handler for GET and POST
export { handler as GET, handler as POST };
