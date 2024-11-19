import React from 'react';

interface DeleteTextButtonProps {
	stateId: number;
	stateIds: number[];
	setStateIds: (ids: number[]) => void;
}

const DeleteTextButton: React.FC<DeleteTextButtonProps> = ({ stateId, stateIds, setStateIds }) => {
	const handleClick = () => {
		setStateIds(stateIds.filter(id => id !== stateId));
	};

	return (
		<button type='button' onClick={handleClick} className='ml-4 text-red-500 hover:text-red-700'>
			Ukloni
		</button>
	);
};

export default DeleteTextButton;
