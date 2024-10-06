'use client';
import React, { useState } from 'react';
import { Icon, Location } from '@/utils/helpers/types';
import { handleError } from '@/utils/helpers/universalFunctions';
import {
	location,
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';
import InputDefault from '../input/InputDefault';
import RetailStoreItem from './RetailStoreItem';

interface Props {
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	retails: any[];
	expandedRetails: Set<number>;
	setExpandedRetails: React.Dispatch<React.SetStateAction<Set<number>>>;
	logos: Icon[];
	setLogo: React.Dispatch<React.SetStateAction<File | null>>;
}

const RetailStoreList: React.FC<Props> = ({
	setSuccessMessage,
	setError,
	retails,
	expandedRetails,
	setExpandedRetails,
	logos,
	setLogo,
}) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	return (
		<div>
			<div className='mb-4'>
				<InputDefault
					placeholder='Brza pretraga kompanija i prodajnih obejkata'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
			</div>
			{retails.map(retail => (
				<RetailStoreItem
					key={retail.id}
					retail={retail}
					expandedRetails={expandedRetails}
					logos={logos}
				/>
			))}
		</div>
	);
};

export default RetailStoreList;
