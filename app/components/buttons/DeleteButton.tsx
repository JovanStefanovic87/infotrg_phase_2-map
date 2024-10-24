// components/DeleteButton.tsx

import React from 'react';

interface DeleteButtonProps {
	onClick: () => void;
	children?: React.ReactNode;
	className?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, children = 'Obriši', className }) => {
	return (
		<button
			className={`bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600 focus:outline-none ${className}`}
			onClick={onClick}>
			{children}
		</button>
	);
};

export default DeleteButton;
