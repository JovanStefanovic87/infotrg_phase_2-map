import React from 'react';

interface Props {
  text: string;
  keywords: string[];
  number?: number;
}

const HighlightText: React.FC<Props> = ({ text, keywords, number }) => {
  const getHighlightedText = (text: string, keywords: string[]): string => {
    let highlightedText = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<strong>$1</strong>');
    });
    return highlightedText;
  };

  const highlightedHTML = getHighlightedText(text, keywords);

  return (
    <div className={`flex ${number !== undefined ? 'items-start' : 'items-baseline'}`}>
      {number !== undefined && <div className='mr-4 font-semibold text-gray-600'>{number}.)</div>}
      <div className='flex-1' dangerouslySetInnerHTML={{ __html: highlightedHTML }} />
    </div>
  );
};

export default HighlightText;
