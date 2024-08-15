import React from 'react';

interface Props {
  text: string;
  bgColor?: string;
  align?: 'left' | 'center' | 'right';
}

const BlockTitileWrap: React.FC<Props> = ({ text, bgColor = 'yellowLighter', align = 'left' }) => {
  return (
    <div className={`mb-4 bg-${bgColor} p-2 rounded-md`}>
      <h2
        className={`text-lg text-${align} text-grayDarkest font-semibold overflow-hidden text-wrap`}
      >
        {text}
      </h2>
    </div>
  );
};

export default BlockTitileWrap;
