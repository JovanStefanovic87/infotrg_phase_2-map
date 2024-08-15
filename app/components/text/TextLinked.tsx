import React from 'react';
import Link from 'next/link';

interface TextLinkedProps {
  text: string;
  hyperlinks: { id: string; link: string; text: string }[];
  className?: string;
}

const TextLinked: React.FC<TextLinkedProps> = ({ text, hyperlinks, className }) => {
  const hyperlink = hyperlinks.find((hl) => hl.text === text);

  if (!hyperlink) {
    return <span className={className}>{text}</span>;
  }
  return (
    <h4 className={className}>
      <Link href={hyperlink.link}>
        <span className='text-blue-500 hover:underline text-hyperlink'>{text}</span>
      </Link>
    </h4>
  );
};

export default TextLinked;
