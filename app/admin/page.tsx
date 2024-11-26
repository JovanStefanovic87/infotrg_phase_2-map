'use client';
import { useSession, signOut } from 'next-auth/react';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import PageContainer from '../components/containers/PageContainer';
import H1 from '../components/text/H1';
import SpinnerForContainers from '../components/ui/SpinnerForContainers';
import IconButton from '../components/buttons/IconButton';
import Link from 'next/link';

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

	if (status === 'loading')
		return (
			<div className='flex justify-center items-center h-screen'>
				<SpinnerForContainers />;
			</div>
		);

	if (!session || session.user.role !== 'admin') {
		router.push('/auth/signin');
		return (
			<div className='flex items-center justify-center h-screen bg-gray-100'>
				<p className='text-gray-700 text-lg'>Preusmeravanje na prijavu...</p>
			</div>
		);
	}

	return (
		<PageContainer>
			<header className='bg-blue-600 text-white py-4 px-6 shadow-md'>
				<div className='flex items-center justify-between'>
					<H1 title='ADMINISTRATIVNI PANEL' />
					<div className='hidden sm:flex'>
						<IconButton
							icon={<ArrowLeftEndOnRectangleIcon className='h-6 w-6 text-blue-600' />}
							text='Odjava'
							onClick={() => signOut()}
						/>
					</div>
				</div>
			</header>
			<main className='py-6 px-6'>
				<div className='bg-white rounded-lg shadow p-6'>
					<h2 className='text-xl font-semibold mb-4 text-black'>
						Dobrodošli, {session.user.name || 'Admin'}!
					</h2>
					<p className='text-gray-600'>Ovde možete upravljati podacima i resursima aplikacije.</p>
				</div>
				<div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					<Link
						href='/admin/jezici'
						className='block bg-sky-600 text-white text-center py-3 px-4 rounded-lg shadow hover:bg-sky-700 transition'>
						Jezici
					</Link>
					<Link
						href='/admin/lokacije'
						className='block bg-sky-600 text-white text-center py-3 px-4 rounded-lg shadow hover:bg-sky-700 transition'>
						Lokacije
					</Link>
					<Link
						href='/admin/kategorije-proizvoda'
						className='block bg-sky-600 text-white text-center py-3 px-4 rounded-lg shadow hover:bg-sky-700 transition'>
						Kategorije proizvoda
					</Link>
					<Link
						href='/admin/kategorije-tipova-objekata'
						className='block bg-sky-600 text-white text-center py-3 px-4 rounded-lg shadow hover:bg-sky-700 transition'>
						Kategorije tipova objekata
					</Link>
					<Link
						href='/admin/kategorije-delatnosti'
						className='block bg-sky-600 text-white text-center py-3 px-4 rounded-lg shadow hover:bg-sky-700 transition'>
						Kategorije delatnosti
					</Link>
					<Link
						href='/admin/prodavci'
						className='block bg-sky-600 text-white text-center py-3 px-4 rounded-lg shadow hover:bg-sky-700 transition'>
						Prodavci
					</Link>
					<Link
						href='/admin/oglasavanje'
						className='block bg-sky-600 text-white text-center py-3 px-4 rounded-lg shadow hover:bg-sky-700 transition'>
						Oglašavanje
					</Link>
					<div className='flex sm:hidden'>
						<IconButton
							icon={<ArrowLeftEndOnRectangleIcon className='h-6 w-6 text-blue-600' />}
							text='Odjava'
							onClick={() => signOut()}
						/>
					</div>
				</div>
			</main>
		</PageContainer>
	);
};

export default AdminPage;
