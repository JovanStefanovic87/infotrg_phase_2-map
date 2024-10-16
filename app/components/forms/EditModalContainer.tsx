import React, { useEffect } from 'react';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const EditModalContainer: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
	// Zatvaranje modala kada korisnik klikne izvan forme
	const handleClickOutside = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	// Disable scroll kad je modal otvoren
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
			onClick={handleClickOutside}>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative'>
				<button
					className='absolute top-4 right-4 text-gray-600 hover:text-gray-800'
					onClick={onClose}>
					&times;
				</button>
				<h2 className='text-xl md:text-2xl font-semibold text-center mb-4 text-black'>{title}</h2>
				{children}
			</div>
		</div>
	);
};

export default EditModalContainer;
