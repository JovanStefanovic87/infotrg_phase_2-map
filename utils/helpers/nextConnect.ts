import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { createEdgeRouter } from 'next-connect';

const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.use(async (request, event, next) => {
	return next();
});

router.get('/about', request => {
	return NextResponse.redirect(new URL('/about-2', request.url));
});

router.all(() => {
	return NextResponse.next();
});

export function middleware(request: NextRequest, event: NextFetchEvent) {
	return router.run(request, event);
}

export const config = {
	matcher: ['/(?!api|_next|static|_next/image|favicon.ico).*'],
};
