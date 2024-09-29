'use client';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
interface AdminSession extends Session {
	user: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
		role?: string | null;
	};
}

const AdminPage = () => {
	const { data: session, status } = useSession() as { data: AdminSession | null; status: string };
	const router = useRouter();

	if (status === 'loading') return <div>Loading...</div>;

	if (!session || session.user.role !== 'admin') {
		router.push('/auth/signin');
		return null;
	}

	return <div>Admin Dashboard</div>;
};

export default AdminPage;
