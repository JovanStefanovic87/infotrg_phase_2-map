import React from 'react';

type CloseButtonProps = {
	onClose: () => void;
	label?: string;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClose, label = 'Odustani' }) => {
	return (
		<button onClick={onClose} className='bg-gray-500 text-white px-4 py-2 rounded-md'>
			{label}
		</button>
	);
};

export default CloseButton;
