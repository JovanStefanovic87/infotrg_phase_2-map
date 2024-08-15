import React, { ReactNode } from 'react';

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<Props> = ({ onClose, children }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg overflow-hidden shadow-lg'>
        <div className='p-4'>
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          >
            Close
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
