'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ExtendedUser {
	id: string;
	role: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

const AdminPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	// Cast session.user to ExtendedUser type
	const user = session?.user as ExtendedUser | undefined;

	if (status === 'loading') return <div>Loading...</div>;

	if (!session || !user || user.role !== 'admin') {
		router.push('/auth/signin');
		return null;
	}

	return <div>Admin Dashboard</div>;
};

export default AdminPage;
