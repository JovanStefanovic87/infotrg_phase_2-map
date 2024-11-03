interface Props {
	onClick?: () => void;
	icon: React.ReactNode;
	text: string;
}

const IconButton: React.FC<Props> = ({ onClick, icon, text }) => {
	return (
		<button
			onClick={onClick}
			className='flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-b from-sky-400 to-sky-600 text-white text-sm font-semibold rounded-lg transition duration-300 hover:from-sky-500 hover:to-sky-700 hover:shadow-2xl active:bg-gradient-to-b active:from-sky-800 active:via-sky-700 active:to-sky-600 active:shadow-inner active:shadow-sky-900 focus:outline-none'>
			<span className='text-xl'>{icon}</span>
			<span className='select-none'>{text}</span>
		</button>
	);
};

export default IconButton;
