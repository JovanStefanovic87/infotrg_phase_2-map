import React from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title: string;
}

const CustomModalAdmin: React.FC<Props> = ({ isOpen, onClose, children, title }) => {
	if (!isOpen) return null;

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
			onClick={handleOverlayClick}>
			<div className='bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl h-[90vh] overflow-y-auto relative'>
				<h2 className='text-2xl font-bold text-center mb-4'>{title}</h2>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'>
					&times;
				</button>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default CustomModalAdmin;
