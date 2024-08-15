import React, { ReactNode } from 'react';

interface ContentBlockInnerContainerProps {
  children: ReactNode;
}

const ContentBlockInnerContainer: React.FC<ContentBlockInnerContainerProps> = ({ children }) => {
  return (
    <div className='cursor-pointer w-full sm:p-2 h-auto rounded-none overflow-auto sm:rounded-md sm:overflow-hidden'>
      <div className='flex flex-col h-full bg-gradient-white p-4 rounded-none overflow-auto sm:rounded-md sm:overflow-hidden'>
        {children}
      </div>
    </div>
  );
};

export default ContentBlockInnerContainer;
