'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HydratationAuthInput from '@/app/components/ui/input/HydratationAuthInput';
import IconInput from '@/app/components/ui/Icons/IconInput';
import { FaUser, FaLock } from 'react-icons/fa';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import PageContainer from '@/app/components/containers/PageContainer';

const SignInPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError('Neispravan email ili lozinka');
		} else if (result?.ok) {
			router.push('/admin');
		} else {
			setError('Došlo je do neočekivane greške.');
		}
	};

	return (
		<PageContainer>
			<div className='flex justify-center'>
				<div className='p-8 w-full max-w-md'>
					<h1 className='text-2xl font-bold text-center mb-6'>Prijava</h1>
					{error && <p className='text-red-500 text-sm text-center mb-4'>{error}</p>}
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<HydratationAuthInput
								placeholder='Email adresa korisnika*'
								value={email}
								setValue={setEmail}>
								<IconInput icon={<FaUser />} />
							</HydratationAuthInput>
						</div>
						<div>
							<HydratationAuthInput
								placeholder='Lozinka*'
								value={password}
								type='password'
								setValue={setPassword}>
								<IconInput icon={<FaLock />} />
							</HydratationAuthInput>
						</div>
						<div>
							<SubmitButton>Prijavi se</SubmitButton>
						</div>
					</form>
					<div className='text-sm text-center mt-4'>
						<p>
							Zaboravljena lozinka?{' '}
							<a href='/auth/reset-password' className='text-blue-600 hover:underline'>
								Resetuj
							</a>
						</p>
					</div>
				</div>
			</div>
		</PageContainer>
	);
};

export default SignInPage;
