import React, { useState } from 'react';
import { AdFormState, AdAdmin } from '@/utils/helpers/types';
import EditModalContainer from '../forms/EditModalContainer';
import AdItem from './AdItem';
import InputDefault from '../input/InputDefault';
import ConfirmationModal from '../modals/systemModals/ConfirmationModal';

interface Props {
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	ads: AdAdmin[];
}

const AdsList: React.FC<Props> = ({ setSuccessMessage, setError, ads }) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [adToDelete, setAdToDelete] = useState<AdFormState | null>(null);

	// Filter ads based on the search query
	const filteredAds = ads
		.filter(ad => ad.name.toLowerCase().includes(searchQuery.toLowerCase()))
		.sort((a, b) => a.name.localeCompare(b.name));

	const handleDeleteClick = (ad: AdAdmin) => {
		console.log('delete');
	};

	const handleEditClick = (ad: AdAdmin) => {
		// Logika za uređivanje reklame, na primer otvaranje modalnog prozora
		console.log('Editing ad:', ad);
	};

	const confirmDelete = () => {
		if (adToDelete) {
			// Implement the deletion logic here
			setSuccessMessage('Reklama uspešno obrisana!');
			setIsDeleteModalOpen(false);
		}
	};

	return (
		<div>
			<div className='mb-4'>
				<InputDefault
					placeholder='Brza pretraga'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>
			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onRequestClose={() => setIsDeleteModalOpen(false)}
				onConfirm={confirmDelete}
				mainText='Da li ste sigurni da želite da obrišete'
				subject='reklamu'
				subjectName={adToDelete?.name || ''}
			/>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredAds.map(ad => (
					<AdItem
						key={ad.id}
						ad={ad}
						onDeleteClick={() => handleDeleteClick(ad)}
						onEditClick={() => handleEditClick(ad)}
					/>
				))}
			</div>
			{isModalOpen && (
				<EditModalContainer
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title='Izmeni reklamu'>
					<div></div>
				</EditModalContainer>
			)}
		</div>
	);
};

export default AdsList;
