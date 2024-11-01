import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	bgColor?: string;
}

const PageContainer: React.FC<Props> = ({ children, bgColor = 'white' }) => {
	return (
		<div
			className={`container mx-auto px-3 pt-0 lg:pt-6 lg:px-6 w-screen bg-${bgColor} overflow-x-hidden`}>
			{children}
		</div>
	);
};

export default PageContainer;
