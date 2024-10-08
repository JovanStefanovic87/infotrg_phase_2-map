import React, { useState } from 'react';
import { RetailAdmin } from '@/utils/helpers/types';
import InputDefault from '../input/InputDefault';
import RetailStoreItem from './RetailStoreItem';

interface Props {
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	retails: RetailAdmin[];
}

const RetailStoreList: React.FC<Props> = ({ setSuccessMessage, setError, retails }) => {
	const [searchQuery, setSearchQuery] = useState<string>('');

	const filteredRetails = retails.filter(
		retail =>
			retail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			retail.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			retail.email?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			<div className='mb-4'>
				<InputDefault
					placeholder='Brza pretraga kompanija i prodajnih objekata'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* CSS Grid layout for displaying multiple items in a row */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredRetails.map(retail => (
					<RetailStoreItem key={retail.id} retail={retail} />
				))}
			</div>
		</div>
	);
};

export default RetailStoreList;
