interface Props {
  description: string;
  align?: 'left' | 'center' | 'right' | 'stretch';
}

const BlockTextFullContent: React.FC<Props> = ({ description, align = 'left' }) => {
  return (
    <div className='text-grayDarkest text-base leading-relaxed mb-2 max-w-full flex-grow overflow-hidden'>
      <p className={`text-${align} text-pretty`}>{description}</p>
    </div>
  );
};

export default BlockTextFullContent;
