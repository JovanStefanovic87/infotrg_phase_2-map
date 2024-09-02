// components/DeleteButton.tsx

import React from 'react';

interface DeleteButtonProps {
	onClick: () => void;
	children?: React.ReactNode;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, children = 'Obriši' }) => {
	return (
		<button
			className='bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600 focus:outline-none'
			onClick={onClick}>
			{children}
		</button>
	);
};

export default DeleteButton;
