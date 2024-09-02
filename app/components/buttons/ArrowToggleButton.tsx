// components/ToggleButton.tsx
import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type Props = {
	title?: string;
	isOpen: boolean;
	onClick: () => void;
};

const ArrowToggleButton: React.FC<Props> = ({ title = '', isOpen, onClick }) => {
	return (
		<button
			className='text-blueLighter hover:text-blueLightest focus:outline-none flex items-center'
			onClick={onClick}>
			<span className='ml-2'>{title}</span>
			{isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
		</button>
	);
};

export default ArrowToggleButton;
