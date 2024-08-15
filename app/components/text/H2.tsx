import React from 'react';

interface Props {
  text: string;
  align?: 'left' | 'center' | 'right';
  padding?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  responsiveSize?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'bold' | 'semibold';
  marginBottom?: string;
  color?: string;
}

const H2: React.FC<Props> = ({
  text,
  align = 'left',
  padding = 0,
  weight = 'semibold',
  marginBottom = '0',
  color = 'white',
}) => {
  const maxWidth = `calc(100% - ${2 * padding}px)`;

  return (
    <h2
      className={`text-lg lg:text-xl text-${color} font-${weight} mb-${marginBottom} text-${align} pb-${padding} overflow-hidden`}
      style={{ maxWidth }}
    >
      {text}
    </h2>
  );
};

export default H2;
