//middleware.ts
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

const adminMiddleware = withAuth({
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		authorized: ({ token }) => token?.role === 'admin',
	},
});

export default async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// 1. Izuzmi statičke resurse i API rute
	if (
		pathname.startsWith('/_next') || // Statički fajlovi
		pathname.startsWith('/api') || // API pozivi
		pathname.startsWith('/favicon.ico') || // Favicon
		pathname.startsWith('/icons') // Ikone
	) {
		return NextResponse.next();
	}

	// 2. Admin middleware
	if (pathname.startsWith('/admin')) {
		return adminMiddleware(request as any as NextRequestWithAuth, {} as any);
	}

	// 3. Podrška za jezike
	const validLanguages = ['rs', 'hu'];
	const segments = pathname.split('/');
	let urlLanguage = '';

	for (let i = 1; i < segments.length; i++) {
		if (validLanguages.includes(segments[i])) {
			urlLanguage = segments[i];
			break;
		}
	}

	// Jezik iz kolačića (ili podrazumevani 'rs')
	const cookies = request.cookies;
	const cookieLanguage = cookies.get('languageCode')?.value || 'rs';

	// Ako URL nema validan jezik, redirektuj na podrazumevani jezik
	if (!urlLanguage) {
		const response = NextResponse.redirect(new URL(`/${cookieLanguage}${pathname}`, request.url));
		response.cookies.set('languageCode', cookieLanguage, { path: '/', maxAge: 31536000 });
		return response;
	}

	// Ako postoji razlika između jezika u URL-u i kolačića, ažuriraj kolačić
	if (urlLanguage !== cookieLanguage) {
		const response = NextResponse.next();
		response.cookies.set('languageCode', urlLanguage, { path: '/', maxAge: 31536000 });
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/admin/:path*', '/', '/:path*'],
};
