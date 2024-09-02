import React, { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const PageContainer: React.FC<Props> = ({ children }) => {
	return <div className='container mx-auto px-3 pt-0 lg:pt-6 lg:px-6 w-screen'>{children}</div>;
};

export default PageContainer;
