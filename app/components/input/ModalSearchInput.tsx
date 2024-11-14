import React from 'react';

interface CategorySearchInputProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}

const ModalSearchInput: React.FC<CategorySearchInputProps> = ({ searchTerm, setSearchTerm }) => {
	return (
		<div className='mb-4'>
			<input
				type='text'
				placeholder='Pretraži kategorije...'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black'
			/>
		</div>
	);
};

export default ModalSearchInput;
