interface Props {
  marginY?: string;
}

const Devider: React.FC<Props> = ({ marginY = '0' }) => (
  <hr className={`my-${marginY} border-grayLight`} />
);

export default Devider;
