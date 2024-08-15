import Link from 'next/link';

interface Props {
  text: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | 'semibold';
  paddingLeft?: string;
  paddingTop?: string;
  link?: string;
}

const TextNormal: React.FC<Props> = ({
  text,
  align = 'left',
  weight = 'normal',
  paddingLeft = '0',
  paddingTop = '0',
  link,
}) => {
  if (!link) {
    return (
      <p
        className={`text-${align} text-pretty font-${weight} text-grayDarkest text-base leading-relaxed`}
        style={{ paddingLeft, paddingTop }}
      >
        {text}
      </p>
    );
  }

  return (
    <p
      className={`text-${align} text-pretty font-${weight} text-grayDarkest text-base leading-relaxed`}
      style={{ paddingLeft, paddingTop }}
    >
      <Link href={link}>
        <span className='text-blue-500 hover:underline text-hyperlink'>{text}</span>
      </Link>
    </p>
  );
};

export default TextNormal;
