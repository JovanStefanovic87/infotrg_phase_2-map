import { SyntheticEvent } from 'react';

interface Props {
	onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
	label?: string;
}

const FormDefaultButton: React.FC<Props> = ({ onClick, label = 'Sačuvaj' }) => {
	return (
		<button
			onClick={onClick}
			className={`w-full bg-blueLightest text-black p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2`}>
			{label}
		</button>
	);
};

export default FormDefaultButton;
