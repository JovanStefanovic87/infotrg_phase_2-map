// components/EditButton.tsx

import React from 'react';

interface EditButtonProps {
	onClick: () => void;
	value?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, value = 'Izmeni' }) => {
	return (
		<button
			className='bg-sky-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-sky-600 focus:outline-none'
			onClick={onClick}>
			{value}
		</button>
	);
};

export default EditButton;
