interface Props {
	title: string;
	pb?: number | string;
	color?: string;
	size?: string;
}

const H1: React.FC<Props> = ({
	title,
	pb = '1.5rem',
	color = '#1f2937', // Tamnija podrazumevana boja za minimalistički izgled
	size = 'text-3xl md:text-4xl',
}) => {
	return (
		<h1
			className={`${size} font-bold text-center`}
			style={{
				paddingBottom: pb,
				color: color,
				textShadow: color === '#facc15' ? '1px 1px 2px rgba(0, 0, 0, 0.25)' : 'none', // Blaga senka samo za svetlu boju
			}}>
			{title}
		</h1>
	);
};

export default H1;
