// next-auth.d.ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: string;
			name: string;
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		role: string;
		name: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		sub: string;
		role: string;
		name: string;
	}
}
