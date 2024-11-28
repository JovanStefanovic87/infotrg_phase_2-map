'use client';
import { useState, useEffect } from 'react';
import PageContainer from '@/app/components/containers/PageContainer';
import AddLanguageForm from './AddLanguageForm';
import LanguageFlag from '../../components/ui/LanguageFlag';
import ConfirmationModal from '@/app/components/modals/systemModals/ConfirmationModal';
import {
	useFetchLanguages,
	useUpdateLanguage,
	useDeleteLanguage,
} from '@/app/helpers/api/language';
import { Language } from '@/utils/helpers/types';

const AdminCategoriesPage = () => {
	const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [languageToDelete, setLanguageToDelete] = useState<Language | null>(null);

	// Fetch languages using the custom hook
	const { data: languages, error: fetchErrorFromHook, refetch } = useFetchLanguages();

	// Hook for updating and deleting languages
	const { mutate: updateLanguage } = useUpdateLanguage();
	const { mutate: deleteLanguage } = useDeleteLanguage();

	// Error handling for initial fetch
	useEffect(() => {
		if (fetchErrorFromHook) {
			setFetchError('Greška prilikom dohvatanja jezika. Molimo pokušajte ponovo.');
		}
	}, [fetchErrorFromHook]);

	// Handler for adding a new language to the list
	const handleLanguageAdded = () => {
		refetch(); // Refetch to refresh the languages list
		setFetchError(null);
	};

	// Handler for updating a language
	const handleEditSubmit = (updatedLanguage: Language) => {
		if (!updatedLanguage.code || !updatedLanguage.name) {
			setFetchError('Šifra i naziv jezika su obavezni.');
			return;
		}

		updateLanguage(
			{ id: updatedLanguage.id, code: updatedLanguage.code, name: updatedLanguage.name },
			{
				onSuccess: () => {
					setEditingLanguage(null);
					refetch();
					setFetchError(null);
				},
				onError: (error: any) => {
					const errorMessage =
						error?.response?.data?.error || 'Došlo je do greške prilikom ažuriranja jezika.';
					setFetchError(errorMessage);
				},
			}
		);
	};

	// Open confirmation modal for deleting a language
	const handleDeleteClick = (language: Language) => {
		setLanguageToDelete(language);
		setIsDeleteModalOpen(true);
	};

	// Confirm deletion
	const confirmDeleteLanguage = () => {
		if (languageToDelete) {
			deleteLanguage(languageToDelete.id, {
				onSuccess: () => {
					refetch();
					setFetchError(null);
				},
				onError: (error: any) => {
					const errorMessage =
						error?.response?.data?.error || 'Došlo je do greške prilikom brisanja jezika.';
					setFetchError(errorMessage);
				},
			});
		}
		setIsDeleteModalOpen(false);
	};

	return (
		<PageContainer>
			<div className='p-6'>
				<h1 className='text-3xl font-bold text-gray-800'>Dodaj Novi Jezik</h1>
				<AddLanguageForm onLanguageAdded={handleLanguageAdded} />
			</div>

			{fetchError && (
				<div className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg'>
					<strong>Greška:</strong> {fetchError}
				</div>
			)}

			<div className='p-6'>
				<h2 className='text-xl font-bold text-gray-700 mb-4'>Postojeći Jezici</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{languages?.map((language: Language) => (
						<div
							key={language.id}
							className='flex flex-col items-center gap-2 p-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-200 bg-gradient-to-br from-white to-gray-50 border border-gray-200'>
							<div className='w-10 h-6 flex-shrink-0'>
								<LanguageFlag code={language.code || ''} />
							</div>
							<p className='text-lg font-semibold text-gray-900 text-center'>{language.name}</p>
							<div className='flex gap-2 mt-2'>
								<button
									className='px-3 py-1 text-sm font-medium text-sky-600 bg-sky-50 border border-sky-300 rounded-full hover:bg-sky-100 transition-colors duration-150'
									onClick={() => setEditingLanguage(language)}>
									Izmeni
								</button>
								<button
									className='px-3 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-300 rounded-full hover:bg-red-100 transition-colors duration-150'
									onClick={() => handleDeleteClick(language)}>
									Obriši
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			{editingLanguage && (
				<div className='fixed inset-0 flex items-center justify-center bg-black text-black bg-opacity-50'>
					<div className='bg-white p-6 rounded-md shadow-xl w-full max-w-md'>
						<h2 className='text-2xl font-bold text-gray-800 mb-4'>Izmena Jezika</h2>
						<input
							type='text'
							value={editingLanguage.name || ''}
							onChange={e => setEditingLanguage({ ...editingLanguage, name: e.target.value })}
							className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-sky-500'
							placeholder='Naziv jezika'
						/>
						<input
							type='text'
							value={editingLanguage.code || ''}
							onChange={e => setEditingLanguage({ ...editingLanguage, code: e.target.value })}
							className='w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-sky-500'
							placeholder='Šifra jezika'
						/>
						<div className='flex justify-end gap-2'>
							<button
								onClick={() => setEditingLanguage(null)}
								className='px-4 py-2 text-black bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors'>
								Otkaži
							</button>
							<button
								onClick={() => handleEditSubmit(editingLanguage)}
								className='px-4 py-2 text-black bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors'>
								Sačuvaj
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Confirmation modal for deletion */}
			{isDeleteModalOpen && languageToDelete && (
				<ConfirmationModal
					isOpen={isDeleteModalOpen}
					onRequestClose={() => setIsDeleteModalOpen(false)}
					onConfirm={confirmDeleteLanguage}
					mainText='Da li ste sigurni da želite da obrišete ovaj jezik?'
					subject='Jezik'
					subjectName={languageToDelete.name}
				/>
			)}
		</PageContainer>
	);
};

export default AdminCategoriesPage;
