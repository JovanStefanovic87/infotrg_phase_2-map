import React, { useCallback } from 'react';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import H4 from '../text/H4';
import TextList from '../text/TextList';
import { CategoryData } from '@/utils/helpers/types';
import { mockLocations } from '@/utils/mockData/location';
import { mockCategories } from '@/utils/mockData/category';
import H3 from '../text/H3';
import H3Title from '../text/H3Title';

interface RetailStoreItemProps {
	retail: any;
}

const RetailStoreItem: React.FC<RetailStoreItemProps> = ({ retail }) => {
	// Find the categories for the retail store based on category IDs
	const retailCategories = retail.categories.map((catId: number) => {
		return mockCategories.find(category => category.id === catId);
	});

	// Find the retail store's location data
	const retailLocation = mockLocations.countries.find(country =>
		country.cities.some(city => city.id === retail.cityId)
	);

	return (
		<div className='bg-white p-6 shadow-lg rounded-xl transition-transform transform flex flex-col justify-between'>
			<div className='text-center p-4 mb-4 bg-yellowLighter rounded-3xl shadow-md'>
				<H3Title text={retail.name} />
			</div>

			<div className='space-y-3 mb-6'>
				<TextList label='Telefon' value={retail.phoneNumber || 'N/A'} />
				<TextList label='Email' value={retail.email || 'N/A'} />
				<TextList
					label='Grad'
					value={`${retailLocation?.cities?.[0]?.name || 'N/A'} - ${
						retailLocation?.cities?.[0]?.cityParts?.[0]?.name || ''
					}`}
				/>
				<TextList label='Pregledi' value={retail.viewCount} />
			</div>

			<div className='flex justify-between items-end mt-auto'>
				<EditButton onClick={() => {}} />
				<DeleteButton onClick={() => {}} />
			</div>
		</div>
	);
};

export default RetailStoreItem;
