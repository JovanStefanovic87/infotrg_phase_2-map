import React from 'react';

interface Props {
  text: string;
  padding?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  responsiveSize?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'bold' | 'semibold';
  color?: 'white' | 'black';
}

const H3Title: React.FC<Props> = ({ text, padding = 0, weight = 'semibold', color = 'black' }) => {
  const maxWidth = `calc(100% - ${2 * padding}px)`;

  return (
    <div className='flex justify-center '>
      <h3
        className={`text-xl md:text-2xl text-${color} font-${weight} text-center overflow-hidden`}
        style={{ maxWidth: maxWidth, paddingBottom: padding }}
      >
        {text}
      </h3>
    </div>
  );
};

export default H3Title;
