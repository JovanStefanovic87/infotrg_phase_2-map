interface Props {
  content: string | string[];
  align?: 'left' | 'center' | 'right';
}

const TextBlockItem: React.FC<Props> = ({ content, align = 'left' }) => {
  return <p className={`text-gray-800 text-${align}`}>{content}</p>;
};

export default TextBlockItem;
