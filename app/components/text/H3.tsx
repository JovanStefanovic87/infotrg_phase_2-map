import React from 'react';

interface Props {
  text: string;
  align?: 'left' | 'center' | 'right';
  padding?: number;
  weight?: 'normal' | 'bold' | 'semibold';
  marginBottom?: string;
}

const H3: React.FC<Props> = ({
  text,
  align = 'left',
  padding = 0,
  weight = 'semibold',
  marginBottom = '0',
}) => {
  const maxWidth = `calc(100% - ${2 * padding}px)`;

  return (
    <div>
      <h3
        className={`text-sm md:text-base lg:text-base text-black font-${weight} mb-${marginBottom} text-${align} pb-${padding} overflow-hidden`}
        style={{ maxWidth }}
      >
        {text}
      </h3>
    </div>
  );
};

export default H3;
