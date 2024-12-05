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

const validLanguages = ['rs', 'hu']; // Lista podržanih jezika
const excludedPaths = ['ulaganje', 'posao', 'o-nama'];

export default async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Ignorišemo statičke resurse i API rute
	if (
		/^\/(_next|api|favicon\.ico|icons|images|.*\.(jpg|jpeg|png|svg|gif|webp|css|js|woff|woff2|ttf|otf|bmp))/.test(
			pathname
		)
	) {
		return NextResponse.next();
	}

	// Admin middleware
	if (pathname.startsWith('/admin')) {
		return adminMiddleware(request as NextRequestWithAuth, {} as any);
	}

	// Delimo URL na segmente
	const segments = pathname.split('/').filter(Boolean); // Uklanja prazne segmente

	if (excludedPaths.includes(segments[0])) {
		return NextResponse.next();
	}

	// Dobijanje jezika iz kolačića
	const cookies = request.cookies;
	const cookieLanguage = cookies.get('languageCode')?.value || 'rs';

	// Provera da li URL već sadrži validan jezik
	const gdeDaKupimIndex = segments.indexOf('gde-da-kupim');
	const languageIndex = gdeDaKupimIndex + 1;

	// Ako "gde-da-kupim" nije u URL-u, osiguravamo da je jezik prisutan nakon root-a
	if (gdeDaKupimIndex === -1) {
		// Jezik treba da bude odmah nakon root-a
		if (segments.length === 0 || !validLanguages.includes(segments[0])) {
			const newPathname = `/${cookieLanguage}/${segments.join('/')}`;
			const response = NextResponse.redirect(new URL(newPathname, request.url));
			response.cookies.set('languageCode', cookieLanguage, { path: '/', maxAge: 31536000 });
			return response;
		}
		return NextResponse.next();
	}

	// Ako jezik nije odmah posle "gde-da-kupim", rekonstruišemo URL
	if (languageIndex >= segments.length || !validLanguages.includes(segments[languageIndex])) {
		const newSegments = [
			...segments.slice(0, gdeDaKupimIndex + 1), // Do "gde-da-kupim"
			cookieLanguage, // Dodajemo jezik
			...segments.slice(gdeDaKupimIndex + 1).filter(segment => !validLanguages.includes(segment)), // Ostali segmenti bez jezika
		];
		const newPathname = `/${newSegments.join('/')}`;
		const response = NextResponse.redirect(new URL(newPathname, request.url));
		response.cookies.set('languageCode', cookieLanguage, { path: '/', maxAge: 31536000 });
		return response;
	}

	// Ako je jezik na pravom mestu, nastavljamo
	const response = NextResponse.next();
	response.headers.set('x-nextjs-url', pathname);
	return response;
}

export const config = {
	matcher: ['/:path*'], // Važi za sve rute
};
