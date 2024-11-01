import React from 'react';

interface Props {
	children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
	return (
		<main className='bg-white flex flex-col overflow-hidden items-center relative mt-header md:ml-slotsWidth  pt-4 lg:pt-8 pb-10'>
			{children}
		</main>
	);
};

export default Main;
