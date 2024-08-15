interface Props {
  content: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | 'semibold';
  paddingLeft?: string;
  paddingTop?: string;
}

const TextBoldCustom: React.FC<Props> = ({
  content,
  label,
  align = 'left',
  weight = 'normal',
  paddingLeft = '0',
  paddingTop = '0',
}) => {
  return (
    <p
      className={`text-${align} text-pretty font-${weight} text-grayDarkest text-base leading-relaxed`}
      style={{ paddingLeft, paddingTop }}
    >
      <strong>{`${label}`}</strong>
      {` ${content}`}
    </p>
  );
};

export default TextBoldCustom;
