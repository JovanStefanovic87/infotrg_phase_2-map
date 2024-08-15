'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === 'loading') return <div>Loading...</div>;

	if (!session || session.user.role !== 'admin') {
		router.push('/auth/signin');
		return null;
	}

	return <div>Admin Dashboard</div>;
};

export default AdminPage;
