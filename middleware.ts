import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		authorized: ({ token }) => token?.role === 'admin',
	},
});

export const config = { matcher: ['/admin/:path*'] };
