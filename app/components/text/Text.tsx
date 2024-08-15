interface Props {
  text: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | 'semibold';
  paddingLeft?: string;
}

const Text: React.FC<Props> = ({ text, align = 'left', weight = 'normal', paddingLeft = '0' }) => {
  const hasSpecialEnding = text.includes('.)');
  const parts = hasSpecialEnding ? text.split(/(\.\))/) : [text];

  return (
    <p
      className={`text-${align} text-pretty font-${weight} text-grayDarkest text-base tracking-wide leading-relaxed`}
      style={{ paddingLeft }}
    >
      {hasSpecialEnding ? (
        <>
          <span className='font-semibold'>{parts[0]}</span>
          {parts[1]}
          {parts.slice(2).join('')}
        </>
      ) : (
        text
      )}
    </p>
  );
};

export default Text;
