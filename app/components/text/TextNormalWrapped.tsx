interface Props {
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'bold' | 'semibold';
  paddingLeft?: string;
  children: React.ReactNode;
}

const TextNormalWrapped: React.FC<Props> = ({
  align = 'left',
  weight = 'normal',
  paddingLeft = '0',
  children,
}) => {
  return (
    <p
      className={`text-${align} text-pretty font-${weight} text-grayDarkest text-sm md:text-sm lg:text-base leading-relaxed`}
      style={{ paddingLeft }}
    >
      {children}
    </p>
  );
};

export default TextNormalWrapped;
