'use client';
import { useEffect, useState } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { routes } from '../../routes';
import SidebarIcon from './SidebarIcon';

const Sidebar = () => {
	const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
	const [isScrollingUp, setIsScrollingUp] = useState(true);

	useEffect(() => {
		let lastScrollPos = window.scrollY;

		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			setIsScrollingUp(currentScrollPos <= lastScrollPos);
			lastScrollPos = currentScrollPos;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const toggleBodyScroll = () => {
			if (isOpen) {
				document.documentElement.style.overflow = 'hidden';
				document.body.style.overflow = 'hidden';
			} else {
				document.documentElement.style.overflow = 'auto';
				document.body.style.overflow = 'auto';
			}
		};

		toggleBodyScroll();
		return () => {
			document.documentElement.style.overflow = 'auto';
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	return (
		<div className={'lg:hidden h-screen'}>
			<button
				className={`fixed lg:hidden top-2 left-4 ${
					isOpen ? '-translate-y-52' : 'translate-y-0'
				} z-50 p-2 bg-gradient-to-r from-blue via-blueLight to-blue hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center h-10 w-16 flex flex-col items-center justify-between transition-transform duration-500 ease-in-out ${
					isScrollingUp ? 'translate-x-0' : '-translate-x-20'
				}`}
				onClick={toggleSidebar}>
				<span className='block w-7 h-1 bg-grayDarkest'></span>
				<span className='block w-7 h-1 bg-black'></span>
				<span className='block w-7 h-1 bg-black'></span>
			</button>
			<div
				className={`fixed inset-0 z-45 transform ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 ease-in-out bg-gray-800 lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:flex-col w-5/6 lg:w-0 shadow-lg lg:shadow-none ${
					isOpen ? 'overflow-y-auto' : ''
				}`}>
				<div className='flex items-center justify-center h-16 bg-gray-900'>
					<span className='text-white text-2xl'></span>
				</div>
				<div className='flex flex-col p-4 space-y-2 pb-20'>
					{routes.map(route => (
						<SidebarIcon
							key={route.href}
							href={route.href}
							icon={route.icon}
							label={route.label}
							subRoutes={route.subRoutes}
						/>
					))}
				</div>
			</div>
			{isOpen && (
				<div className='fixed inset-0 bg-black opacity-50 z-30 lg:hidden' onClick={closeSidebar} />
			)}
		</div>
	);
};

export default Sidebar;
