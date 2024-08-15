'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Route } from '@/utils/helpers/types';
import { handleMouseLeave } from '@/utils/helpers/universalFunctions';

interface Props {
	label: string;
	href: string;
	hasChildren: boolean;
	subRoutes?: Route[];
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	isTopLevel?: boolean;
}

const HeaderLinkButton: React.FC<Props> = ({
	label,
	href,
	hasChildren,
	subRoutes,
	onMouseEnter,
	onMouseLeave,
	isTopLevel = true,
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const checkIsActive = (path: string, subRoutes?: Route[]): boolean => {
		if (pathname === path || pathname.startsWith(`${path}/`)) return true;
		if (subRoutes) {
			return subRoutes.some(subRoute => checkIsActive(subRoute.href, subRoute.subRoutes));
		}
		return false;
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleMouseEnterLocal = () => {
		if (hasChildren && !isOpen) {
			setIsOpen(true);
			if (onMouseEnter) {
				onMouseEnter();
			}
		}
	};

	const handleMouseLeaveLocal = (event: React.MouseEvent) => {
		handleMouseLeave({
			event,
			hasChildren,
			dropdownRef,
			setIsOpen,
			onMouseLeave,
		});
	};

	const handleClick = () => {
		router.push(href);
	};

	const className = `relative ${isTopLevel ? 'flex' : 'inline-block'} ${
		checkIsActive(href, subRoutes) ? 'text-yellowLighter' : 'text-blueLightest'
	} `;

	return (
		<div
			className={className}
			onMouseEnter={handleMouseEnterLocal}
			onMouseLeave={handleMouseLeaveLocal}>
			<button
				className='focus:outline-none relative flex items-center justify-between gap-2 w-full h-full px-4 transition-colors duration-300 hover:text-gray-50 hover:bg-yellowLighter hover:bg-opacity-35'
				onClick={handleClick}>
				<span className='relative z-10 py-4'>{label}</span>
				{hasChildren && (
					<span className='relative inset-y-0 right-0 flex items-center pointer-events-none'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className={`h-4 w-4 transition-transform duration-200 transform ${
								isTopLevel
									? isOpen
										? 'rotate-0'
										: 'rotate-180'
									: isOpen
									? '-rotate-90'
									: 'rotate-90'
							}`}
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path d='M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z' />
						</svg>
					</span>
				)}
			</button>
			{hasChildren && (
				<div
					ref={dropdownRef}
					className={`absolute ${isTopLevel ? 'top-full left-0' : 'left-full top-0'}
                      w-max max-w-sm bg-main shadow-lg z-10 transition-all duration-200 ease-in-out ${
												isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
											}`}>
					<div className='flex flex-col items-stretch border-4 border-blueMain rounded-lg'>
						{subRoutes?.map(subRoute => (
							<HeaderLinkButton
								key={subRoute.href}
								label={subRoute.label}
								href={subRoute.href}
								hasChildren={!!subRoute.subRoutes && subRoute.subRoutes.length > 0}
								subRoutes={subRoute.subRoutes}
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
								isTopLevel={false}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default HeaderLinkButton;
