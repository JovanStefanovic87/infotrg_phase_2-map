import React from 'react';
import CategoryHierarchy from './CategoryHierarchy';
import FormDefaultButton from '../../components/buttons/FormDefaultButton';
import { Category, GetRetailStoreApi } from '@/utils/helpers/types';

interface Props {
	isOpen: boolean;
	store: GetRetailStoreApi | null;
	categories: Category[];
	onClose: () => void;
}

const AssortmentModal: React.FC<Props> = ({ isOpen, store, categories, onClose }) => {
	if (!isOpen || !store) return null;

	return (
		<div
			className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
			onClick={onClose}>
			<div
				className='bg-white p-4 rounded-lg shadow-lg w-full max-w-lg h-[80vh] flex flex-col overflow-hidden'
				onClick={e => e.stopPropagation()}>
				<h4 className='text-2xl font-extrabold text-center text-indigo-700 mb-2'>
					Asortiman proizvoda
				</h4>
				<p className='text-lg font-semibold text-center text-gray-800 mb-4'>{store.name}</p>
				<div className='border-t border-gray-300 mb-4'></div>
				<div className='flex-1 border rounded-lg p-4 overflow-y-auto'>
					<CategoryHierarchy categories={categories} />
				</div>
				<div className='flex justify-center items-center p-4'>
					<FormDefaultButton onClick={onClose} label='Zatvori' />
				</div>
			</div>
		</div>
	);
};

export default AssortmentModal;
