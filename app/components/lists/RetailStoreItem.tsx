import React from 'react';
import { PopoverButton } from '@headlessui/react';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import TextList from '../text/TextList';
import H3Title from '../text/H3Title';
import TextWrapped from '../text/TextWrapped';
import { RetailAdmin } from '@/utils/helpers/types';
import PopoverButtonDefault from '../popovers/PopoverButtonDefault';
import PopoverPanelList from '../popovers/PopoverPanelList';
import PopoverContainerBackdrop from '../popovers/PopoverContainerBackdrop';

interface RetailStoreItemProps {
	retail: RetailAdmin;
}

const RetailStoreItem: React.FC<RetailStoreItemProps> = ({ retail }) => {
	const country = retail.country?.translation || 'N/A';
	const city = retail.city?.translation || 'N/A';
	const cityPart = retail.cityPart?.translation || 'N/A';
	const marketplace = retail.marketplace?.translation || 'N/A';

	// Kombinovani prikaz lokacije
	const shortLocation = `${city}, ${marketplace}`;
	const fullLocation = `${country} - ${city} (${cityPart}, ${marketplace})`;

	// Prikaz kategorija
	const articleCategories = retail.articleCategories?.map(
		(category: any) => category.label || 'N/A'
	);
	const activityCategories = retail.activityCategories?.map(
		(category: any) => category.label || 'N/A'
	);
	const objectTypeCategories = retail.objectTypeCategories?.map(
		(category: any) => category.label || 'N/A'
	);

	const isComplete = () => {
		return (
			!!retail.name.trim() &&
			city !== 'N/A' &&
			retail.latitude !== undefined &&
			retail.longitude !== undefined &&
			articleCategories.length > 0 &&
			objectTypeCategories.length > 0
		);
	};

	const lampColor = isComplete() ? 'bg-green-500' : 'bg-red-500';

	return (
		<div className='bg-white p-6 shadow-lg rounded-xl transition-transform transform flex flex-col justify-between'>
			<div className={`absolute w-4 h-4 rounded-full right-0 top-0 mr-2 mt-2 ${lampColor}`} />

			<div className='flex justify-between items-center'>
				<div className='text-center p-4 mb-4 bg-yellowLighter rounded-3xl shadow-md w-full'>
					<H3Title text={retail.name} />
				</div>
			</div>

			<div className='space-y-3 mb-6'>
				<TextList label='Telefon' value={retail.phoneNumber || 'N/A'} />
				<TextList label='Email' value={retail.email || 'N/A'} />

				<PopoverContainerBackdrop>
					<PopoverButton className='underline text-blue-600 cursor-pointer w-full'>
						<TextList label='Lokacija' value={shortLocation} />
					</PopoverButton>
					<PopoverPanelList list={[fullLocation]} label='Puna Lokacija' />
				</PopoverContainerBackdrop>

				<TextList label='Pregledi' value={retail.viewCount.toString()} />

				<PopoverContainerBackdrop>
					<PopoverButtonDefault>
						<TextList label='Artikli' value={articleCategories.slice(0, 3).join(', ') || 'N/A'} />
					</PopoverButtonDefault>
					<PopoverPanelList list={articleCategories} label='Svi Artikli' />
				</PopoverContainerBackdrop>

				<PopoverContainerBackdrop>
					<PopoverButtonDefault>
						<TextList
							label='Aktivnosti'
							value={activityCategories.slice(0, 3).join(', ') || 'N/A'}
						/>
					</PopoverButtonDefault>
					<PopoverPanelList list={activityCategories} label='Sve Aktivnosti' />
				</PopoverContainerBackdrop>

				<PopoverContainerBackdrop>
					<PopoverButtonDefault>
						<TextList
							label='Vrsta objekta'
							value={objectTypeCategories.slice(0, 3).join(', ') || 'N/A'}
						/>
					</PopoverButtonDefault>
					<PopoverPanelList list={objectTypeCategories} label='Sve Vrste Objekta' />
				</PopoverContainerBackdrop>
			</div>

			<div className='flex justify-between items-end mt-auto'>
				<EditButton onClick={() => {}} />
				<DeleteButton onClick={() => {}} />
			</div>
		</div>
	);
};

export default RetailStoreItem;
