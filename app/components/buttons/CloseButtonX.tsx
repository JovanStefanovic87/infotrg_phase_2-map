import React from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  onClose: () => void;
}

const CloseButtonX: React.FC<Props> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className='absolute right-4 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-700 focus:outline-none transition duration-200 ease-in-out transform hover:scale-110 cursor-pointer z-50'
      aria-label='Close Modal'
    >
      <MdClose className='w-6 h-6' />
    </button>
  );
};

export default CloseButtonX;
