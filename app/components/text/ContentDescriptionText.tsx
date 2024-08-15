import React from 'react';
import H2 from './H2';

interface Props {
  text: string;
  align: 'left' | 'center' | 'right';
  color: string;
  children?: React.ReactNode;
}

const ContentDescriptionText: React.FC<Props> = ({ text, align, color, children }) => {
  return (
    <div className='flex flex-col items-center bg-mainWhite rounded-lg p-6 shadow-lg mb-4'>
      <H2 text={text} align={align} color={color} />
      {children}
    </div>
  );
};

export default ContentDescriptionText;
