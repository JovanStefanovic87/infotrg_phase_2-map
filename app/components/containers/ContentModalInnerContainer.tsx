import React, { ReactNode, FC } from 'react';

interface Props {
  children: ReactNode;
}

const ContentModalInnerContainer: FC<Props> = ({ children }) => {
  return (
    <div className='relative bg-white rounded-lg shadow-lg p-6 overflow-y-auto w-full h-full border-4 border-blueLighter'>
      {children}
    </div>
  );
};

export default ContentModalInnerContainer;
