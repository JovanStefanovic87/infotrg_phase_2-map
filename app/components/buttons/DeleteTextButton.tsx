import React from 'react';

interface DeleteTextButtonProps {
	relatedId: number;
	relatedIds: number[];
	setRelatedIds: (ids: number[]) => void;
}

const DeleteTextButton: React.FC<DeleteTextButtonProps> = ({
	relatedId,
	relatedIds,
	setRelatedIds,
}) => {
	const handleClick = () => {
		setRelatedIds(relatedIds.filter(id => id !== relatedId));
	};

	return (
		<button type='button' onClick={handleClick} className='ml-4 text-red-500 hover:text-red-700'>
			Ukloni
		</button>
	);
};

export default DeleteTextButton;
