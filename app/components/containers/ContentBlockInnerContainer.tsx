import React, { ReactNode } from 'react';

interface ContentBlockInnerContainerProps {
	children: ReactNode;
}

const ContentBlockInnerContainer: React.FC<ContentBlockInnerContainerProps> = ({ children }) => {
	return (
		<div className='cursor-pointer w-full sm:p-2 h-auto'>
			<div className='flex flex-col h-full p-4'>{children}</div>
		</div>
	);
};

export default ContentBlockInnerContainer;
