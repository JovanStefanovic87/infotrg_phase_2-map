interface Props {
	text: string;
	onClick?: () => void;
	className?: string;
}

const BlockButton: React.FC<Props> = ({ text, onClick, className }) => {
	return (
		<div className='button-container'>
			<button
				className={`text-black mt-2 border border-blueLight bg-blueLightest px-4 py-2 rounded-md self-start ${className}`}
				onClick={onClick}>
				{text}
			</button>
		</div>
	);
};

export default BlockButton;
