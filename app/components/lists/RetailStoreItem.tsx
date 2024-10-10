import React, { useCallback } from 'react';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import H4 from '../text/H4';
import TextList from '../text/TextList';
import { CategoryData, Label } from '@/utils/helpers/types';
import { mockLocations } from '@/utils/mockData/location';
import { mockCategories } from '@/utils/mockData/category';
import H3 from '../text/H3';
import H3Title from '../text/H3Title';

interface RetailStoreItemProps {
	retail: any;
}

const RetailStoreItem: React.FC<RetailStoreItemProps> = ({ retail }) => {
	const country = retail.country?.translation || 'N/A';
	const city = retail.city?.translation || 'N/A';
	const cityPart = retail.cityPart?.translation || 'N/A';
	const marketplace = retail.marketplace?.translation || 'N/A';

	// Proveri da li postoje kategorije pre nego što pokušaš da ih mapiraš
	const retailCategories =
		retail.categories?.map((catId: number) => {
			return mockCategories.find(category => category.id === catId);
		}) ?? [];

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
				<TextList label='Lokacija' value={`${country} - ${city} (${cityPart}, ${marketplace})`} />
				<TextList label='Pregledi' value={retail.viewCount.toString()} />

				{/* Prikaz kategorija */}
				<TextList
					label='Kategorije'
					value={retailCategories.map((cat: { label: Label }) => cat?.label || 'N/A').join(', ')}
				/>
			</div>

			<div className='flex justify-between items-end mt-auto'>
				<EditButton onClick={() => {}} />
				<DeleteButton onClick={() => {}} />
			</div>
		</div>
	);
};

export default RetailStoreItem;
