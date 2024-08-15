import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const BreadcrumbsContainer: React.FC<Props> = ({ children }) => {
  return (
    <nav className='flex space-x-2 text-sm w-full pl-4 pb-4 lg:pb-0 h-auto lg:h-0 z-30'>
      {children}
    </nav>
  );
};

export default BreadcrumbsContainer;
