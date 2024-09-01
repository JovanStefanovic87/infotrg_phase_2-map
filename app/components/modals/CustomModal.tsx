// components/CustomModal.tsx
import React, { useEffect } from 'react';

interface CustomModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	children: React.ReactNode;
	mt?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
	isOpen,
	onRequestClose,
	children,
	mt = '0',
}) => {
	// Handle closing the modal when pressing the Escape key
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onRequestClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onRequestClose]);

	if (!isOpen) return null;

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.target === event.currentTarget) {
			onRequestClose();
		}
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out'
			onClick={handleOverlayClick}
			aria-labelledby='modal-title'
			aria-modal='true'
			role='dialog'>
			<div
				className={`bg-white flex rounded-lg shadow-lg mt-${mt} max-w-6xl mx-4`}
				style={{ marginTop: mt }}>
				{children}
			</div>
		</div>
	);
};

export default CustomModal;
