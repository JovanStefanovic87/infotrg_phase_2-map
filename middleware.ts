import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

// Definiši admin middleware koristeći withAuth
const adminMiddleware = withAuth({
	pages: {
		signIn: '/auth/signin',
	},
	callbacks: {
		authorized: ({ token }) => token?.role === 'admin',
	},
});

// Glavni middleware
export default async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Provera za admin rute
	if (pathname.startsWith('/admin')) {
		// Pozovi admin middleware
		return adminMiddleware(request as any as NextRequestWithAuth, {} as any);
	}

	// Provera za /gde-da-kupim rute bez jezika
	if (pathname === '/gde-da-kupim') {
		// Proveri da li postoji cookie za jezik
		const languageCode = request.cookies.get('languageCode')?.value || 'rs'; // Default je 'rs'

		// Preusmeri na /gde-da-kupim/<language>
		return NextResponse.redirect(new URL(`/gde-da-kupim/${languageCode}`, request.url));
	}

	// Provera za root stranicu '/'
	if (pathname === '/') {
		// Proveri da li postoji cookie za jezik
		const languageCode = request.cookies.get('languageCode')?.value || 'rs'; // Default je 'rs'

		// Preusmeri na /<language> (npr. /rs ili /hu)
		return NextResponse.redirect(new URL(`/${languageCode}`, request.url));
	}

	// Nastavi dalje za sve ostale rute
	return NextResponse.next();
}

// Konfiguracija za matcher
export const config = {
	matcher: ['/', '/admin/:path*', '/gde-da-kupim', '/gde-da-kupim/:path*'],
};
