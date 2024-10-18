import React from 'react';
import CustomModal from '../CustomModal';
import DeleteButton from '../../buttons/DeleteButton';
import FormDefaultButton from '../../buttons/FormDefaultButton';
import TextPopup from '../../text/TextPopup';

interface ConfirmationModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	onConfirm: () => void;
	mainText: string;
	subject: string;
	subjectName: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	isOpen,
	onRequestClose,
	onConfirm,
	mainText,
	subject,
	subjectName,
}) => {
	return (
		<CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
			<div className='p-6 flex flex-col items-center gap-6'>
				<TextPopup mainText={mainText} subject={subject} subjectName={subjectName} />
				<div className='flex gap-4 justify-between w-full'>
					<FormDefaultButton onClick={onRequestClose} label='Otkaži' />
					<DeleteButton onClick={onConfirm}>Potvrdi</DeleteButton>
				</div>
			</div>
		</CustomModal>
	);
};

export default ConfirmationModal;
