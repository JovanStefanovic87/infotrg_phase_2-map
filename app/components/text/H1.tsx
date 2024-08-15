interface Props {
  title: string;
  pb?: number | string;
  color?: string;
  size?: string;
}

const H1: React.FC<Props> = ({ title, pb = '1.5rem', color = '#facc15' }) => {
  return (
    <h1
      className={`text-3xl md:text-4xl font-bold text-center`}
      style={{ paddingBottom: pb, color: color !== '#facc15' ? color : '#facc15' }}
    >
      {title}
    </h1>
  );
};

export default H1;
