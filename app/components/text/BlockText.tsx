interface Props {
  description: string;
  maxLines: number;
  align?: 'left' | 'center' | 'right';
}

const BlockText: React.FC<Props> = ({ description, maxLines, align = 'left' }) => {
  return (
    <div className='text-grayDarkest text-base leading-relaxed mb-2 max-w-full flex-grow overflow-hidden'>
      <p className={`line-clamp-${maxLines} text-${align} text-pretty`}>{description}</p>
    </div>
  );
};

export default BlockText;
