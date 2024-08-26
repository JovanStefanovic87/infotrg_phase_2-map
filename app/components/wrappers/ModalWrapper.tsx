// components/ModalWrapper.tsx
'use client';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const ModalWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <>{children}</>;
};

export default ModalWrapper;
