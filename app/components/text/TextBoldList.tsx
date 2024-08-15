interface Props {
  content: string;
  bullet: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | 'semibold';
  paddingLeft?: string;
  paddingTop?: string;
}

const TextBoldList: React.FC<Props> = ({
  content,
  bullet,
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
      <strong>{`${bullet}.)`}</strong>
      {` ${content}`}
    </p>
  );
};

export default TextBoldList;
