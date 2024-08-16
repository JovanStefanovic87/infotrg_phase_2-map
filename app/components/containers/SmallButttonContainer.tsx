import React from 'react';

interface SmallButtonContainerProps {
	children: React.ReactNode;
}

const SmallButtonContainer: React.FC<SmallButtonContainerProps> = ({ children }) => {
	return <div className='w-min'>{children}</div>;
};

export default SmallButtonContainer;
