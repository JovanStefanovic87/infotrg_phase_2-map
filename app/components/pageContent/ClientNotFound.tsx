'use client';

import Image from 'next/image';
import DefaultButton from '@/app/components/buttons/DefaultButton';
import H1 from '@/app/components/text/H1';

export default function ClientNotFound() {
	const handleGoBack = () => {
		if (typeof window !== 'undefined') {
			window.history.back(); // Vraća korisnika na prethodnu stranicu
		}
	};

	return (
		<div className='flex flex-col justify-center items-center gap-4'>
			<Image
				src='/images/notFound.png'
				alt='Stranica ne postoji'
				width={500}
				height={500}
				priority={true}
				style={{ width: 'auto', height: 'auto' }}
				sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
			/>
			<H1 title='Ups! Stranica koju tražite ne postoji' pb={0} />
			<DefaultButton onClick={handleGoBack}>Vrati se nazad</DefaultButton>
		</div>
	);
}
