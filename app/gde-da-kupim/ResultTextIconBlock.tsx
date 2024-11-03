import clsx from 'clsx';

interface ResultTextIconBlockProps {
	text: string;
	color?: string;
	children?: React.ReactNode;
	iconColor?: string;
}

const ResultTextIconBlock: React.FC<ResultTextIconBlockProps> = ({
	text,
	children,
	color,
	iconColor = 'text-grayMedium',
}) => {
	return (
		<div className='flex items-center gap-2 text-sm'>
			<span className={clsx(`${iconColor}`, 'text-lg')}>{children}</span>
			<span className={clsx(color ? `${color}` : '')}>{text}</span>
		</div>
	);
};

export default ResultTextIconBlock;
