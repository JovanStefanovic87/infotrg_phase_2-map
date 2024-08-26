// components/CustomModal.tsx
import React from 'react';

interface CustomModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, children }) => {
	if (!isOpen) return null;

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.target === event.currentTarget) {
			onRequestClose();
		}
	};

	return (
		<div
			className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
			onClick={handleOverlayClick}>
			<div className='bg-white p-6 rounded-lg shadow-lg'>{children}</div>
		</div>
	);
};

export default CustomModal;
