import React from 'react';
import Link from 'next/link';

interface TextPart {
  text: string;
  bold?: boolean;
  link?: string;
}

interface Props {
  content: TextPart[];
  label: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | 'semibold';
  paddingLeft?: string;
  paddingTop?: string;
  wordsWithLinks?: { word: string; url: string }[];
  wordsToBold?: string[];
}

const TextBoldAndLink: React.FC<Props> = ({
  content,
  label,
  align = 'left',
  weight = 'normal',
  paddingLeft = '0',
  paddingTop = '0',
  wordsWithLinks = [],
  wordsToBold = [],
}) => {
  const processText = (text: string) => {
    let processedText = text;

    // Convert bold words
    wordsToBold.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi');
      processedText = processedText.replace(regex, '<strong>$1</strong>');
    });

    // Convert links
    wordsWithLinks.forEach(({ word, url }) => {
      const regex = new RegExp(`(${word})`, 'gi');
      processedText = processedText.replace(regex, `<a href="${url}">$1</a>`);
    });

    return processedText;
  };

  return (
    <div
      className={`text-${align} font-${weight} text-grayDarkest text-base leading-relaxed`}
      style={{ paddingLeft, paddingTop }}
    >
      <strong>{label}</strong>
      {content.map((part, index) => {
        const { text, bold, link } = part;
        const processedText = processText(text);

        return (
          <React.Fragment key={index}>
            {link ? (
              <Link href={link}>
                <span
                  dangerouslySetInnerHTML={{ __html: processedText }}
                  className='font-bold text-hyperlink'
                />
              </Link>
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: bold ? `<strong>${processedText}</strong>` : processedText,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TextBoldAndLink;
