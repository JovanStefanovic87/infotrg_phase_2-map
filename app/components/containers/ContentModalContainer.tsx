import React, { ReactNode } from 'react';
import CloseButtonX from '../buttons/CloseButtonX';

interface Props {
  onContentModalClose: () => void;
  isStandard?: boolean;
  children: ReactNode;
}

const ContentModalContainer: React.FC<Props> = ({
  onContentModalClose,
  children,
  isStandard = true,
}) => {
  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-75 z-50' onClick={onContentModalClose} />
      <div className='fixed right-4 top-4 z-50' onClick={onContentModalClose}>
        <CloseButtonX onClose={onContentModalClose} />
      </div>
      <div
        className={`fixed ${
          isStandard ? 'mt-16' : 'mt-8'
        } flex flex-col w-11/12 lg:max-w-screen-lg ${
          isStandard ? 'max-h-main' : 'max-h-mainMinusClose'
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-auto`}
      >
        {children}
      </div>
    </>
  );
};

export default ContentModalContainer;
