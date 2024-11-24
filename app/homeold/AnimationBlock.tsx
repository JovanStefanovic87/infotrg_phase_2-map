'use client';

import React, { useEffect, useState } from 'react';
import Typewriter from '../components/text/Typewriter';
import logo from '@/public/images/logo.png';
import Image from 'next/image';

const AnimationBlock: React.FC = () => {
	const [isVisible1, setIsVisible1] = useState(false);
	const [isVisible2, setIsVisible2] = useState(false);
	const [isVisible3, setIsVisible3] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsVisible1(true);
		}, 2000); //INFORMACIJA

		setTimeout(() => {
			setIsVisible2(true);
		}, 2700); //POKREĆE

		setTimeout(() => {
			setIsVisible3(true);
		}, 3200); //TRGOVINU
	}, []);

	return (
		<div className='flex items-start justify-center p-2'>
			<div className='relative flex flex-col items-center justify-between rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-3xl h-52 sm:h-40 md:h-56 lg:h-80 pb-4 overflow-hidden'>
				<div className='flex justify-evenly absolute top-2 left-0 right-0 text-xxs2 md:text-xl md:top-4 lg:text-2xl font-bold text-black text-center tracking-wider'>
					<div
						className={`transition-opacity duration-1000 ${
							isVisible1 ? 'opacity-100' : 'opacity-0'
						}`}>
						INFORMACIJA
					</div>
					<div
						className={`transition-opacity duration-1000 ${
							isVisible2 ? 'opacity-100' : 'opacity-0'
						}`}>
						POKREĆE
					</div>
					<div
						className={`transition-opacity duration-1000 ${
							isVisible3 ? 'opacity-100' : 'opacity-0'
						}`}>
						TRGOVINU
					</div>
				</div>
				<div className='absolute animate-slideInTop flex items-center justify-center bottom-0'>
					<Image
						src={logo}
						alt='Logo'
						width={120}
						height={120}
						sizes='(max-width: 640px) 8rem, (max-width: 768px) 5rem, (max-width: 1024px) 8rem, (max-width: 1280px) 12rem, 12.5rem'
						priority
						quality={100}
						style={{ width: 'auto', height: 'auto' }}
						className='object-contain'
					/>
				</div>
			</div>
		</div>
	);
};

export default AnimationBlock;
