import React from 'react';

interface Props {
  onClick: () => void;
}

const HamburgerButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type='button'
      className='absolute text-white bg-gradient-to-r from-blueLightest via-blueLighter to-blue hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center h-10 w-16 flex flex-col items-center justify-between p-2'
      onClick={onClick}
    >
      <div className='w-full bg-black h-1'></div>
      <div className='w-full bg-black h-1'></div>
      <div className='w-full bg-black h-1'></div>
    </button>
  );
};

export default HamburgerButton;
