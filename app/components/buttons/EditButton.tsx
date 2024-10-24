// components/EditButton.tsx

import React from 'react';

interface EditButtonProps {
	onClick: () => void;
	value?: string;
	className?: string;
}

const EditButton: React.FC<EditButtonProps> = ({
	onClick,
	value = 'Izmeni',
	className = 'bg-sky-500',
}) => {
	return (
		<button
			className={` text-white px-4 py-2 rounded transition duration-300 hover:bg-sky-600 focus:outline-none ${className}`}
			onClick={onClick}>
			{value}
		</button>
	);
};

export default EditButton;
