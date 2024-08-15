interface Props {
  marginY?: number;
  height?: number;
  width?: string;
}

const Devider2: React.FC<Props> = ({ marginY = 0, height = 0, width = '100%' }) => (
  <hr
    className={`border-grayLight border-${height}`}
    style={{ marginTop: marginY, marginBottom: marginY, width: width }}
  />
);

export default Devider2;
