'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HydratationAuthInput from '@/app/components/ui/input/HydratationAuthInput';
import IconInput from '@/app/components/ui/Icons/IconInput';
import { FaUser, FaLock } from 'react-icons/fa';

const SignInPage = () => {
	const [email, setEmail] = useState('suinfotrg@gmail.com');
	const [password, setPassword] = useState('5NuEiAkC9@)/');
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
			setError(result.error);
		} else if (result?.ok) {
			router.push('/admin');
		} else {
			setError('Unexpected error occurred');
		}
	};

	return (
		<div id='signin-wrapper'>
			<h1>Sign In</h1>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<HydratationAuthInput placeholder='Korisničko ime*' value={email} setValue={setEmail}>
					<IconInput icon={<FaUser />} />
				</HydratationAuthInput>
				<HydratationAuthInput
					placeholder='Lozinka*'
					value={password}
					type='password'
					setValue={setPassword}>
					<IconInput icon={<FaLock />} />
				</HydratationAuthInput>
				{/* <input
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Email'
					required
				/>
				<input
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Password'
					required
				/> */}
				<button type='submit'>Sign In</button>
			</form>
		</div>
	);
};

export default SignInPage;
