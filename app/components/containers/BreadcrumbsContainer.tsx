import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const BreadcrumbsContainer: React.FC<Props> = ({ children }) => {
	return (
		<nav className='flex space-x-2 text-sm w-screen pl-4 pb-4 lg:pb-0 z-30 overflow-x-auto'>
			<div className='flex space-x-2 w-9/12 sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-11/12 border-b border-gray-200'>
				{children}
			</div>
		</nav>
	);
};

export default BreadcrumbsContainer;
