'use client';
import { NextPage } from 'next';
import Image from 'next/image';
import InfotrgPlatform from './InfotrgPlatform';
import { vebIzlogData, gdeDaKupimData, enciklopedijaData } from './InfotrgPlatformData';
import H1 from '@/app/components/text/H1';
import H2 from '@/app/components/text/H2';

const platformItems = [
	{
		number: '1.)',
		text: 'Veb izlog',
		id: 'veb-izlog',
		icon: '/icons/vebIzlog.svg',
	},
	{
		number: '2.)',
		text: 'Funkcija “gde da kupim?"',
		id: 'gde-da-kupim',
		icon: '/icons/gdeSeProdaje.svg',
	},
	{
		number: '3.)',
		text: 'Enciklopedija proizvoda',
		id: 'enciklopedija',
		icon: '/icons/enciklopedia.svg',
	},
];

const handleScrollTo = (id: string) => {
	const element = document.getElementById(id);
	if (element) {
		const headerOffset = 60;
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - headerOffset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	}
};

const PlatformContainer: NextPage = () => {
	return (
		<>
			<H1 title='INFOTRG PLATFORMA' pb='0' />
			<div className='flex flex-col items-center p-6 border-b-2'>
				<H2
					text='Platforma raspolaže sa tri osnovne korisničke funkcije:'
					align='center'
					color='black'
				/>
				<div className='my-6'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
						{platformItems.map(({ icon, text, id }, index) => (
							<div
								key={index}
								onClick={() => handleScrollTo(id)}
								className='flex flex-col items-center justify-center p-6 rounded-lg shadow-md border-2 border-l-blueLightest border-r-blueLightest bg-red-600 text-white cursor-pointer'>
								<div className='flex items-center'>
									<div className='relative h-16 w-16'>
										<Image src={icon} alt={'label'} fill style={{ objectFit: 'contain' }} />
									</div>
								</div>
								<p className='text-sm md:text-base text-center mt-2'>{text}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='my-8'>
				<InfotrgPlatform contentData={vebIzlogData} title='1.) Veb izlog' id='veb-izlog' />
				<InfotrgPlatform
					contentData={gdeDaKupimData}
					title='2.) Funkcija “gde da kupim?"'
					id='gde-da-kupim'
				/>
				<InfotrgPlatform
					contentData={enciklopedijaData}
					title='3.) Enciklopedija proizvoda'
					id='enciklopedija'
				/>
			</div>
		</>
	);
};

export default PlatformContainer;
