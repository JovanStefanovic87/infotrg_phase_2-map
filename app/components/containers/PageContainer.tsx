import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	bgColor?: string;
}

const PageContainer: React.FC<Props> = ({ children, bgColor = 'white' }) => {
	return (
		<div className={`container mx-auto pt-0 lg:pt-6 px-1 lg:px-6 w-screen bg-${bgColor}`}>
			{children}
		</div>
	);
};

export default PageContainer;
