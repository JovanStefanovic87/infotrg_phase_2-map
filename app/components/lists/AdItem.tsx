import React from 'react';
import Image from 'next/image';
import { differenceInDays } from 'date-fns';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import TextList from '../text/TextList';
import H3Title from '../text/H3Title';
import PopoverButtonDefault from '../popovers/PopoverButtonDefault';
import PopoverPanelList from '../popovers/PopoverPanelList';
import PopoverContainerBackdrop from '../popovers/PopoverContainerBackdrop';
import { AdAdmin } from '@/utils/helpers/types';
import { reverseAdTypeOptions } from '@/utils/helpers/varStrings';
import {
	getCategoryTranslations,
	getCategoryTranslationString,
} from '@/utils/helpers/universalFunctions';
import { useExtendAd } from '@/app/helpers/api/ads';

interface Props {
	ad: AdAdmin;
	onDeleteClick: () => void;
	onEditClick: (ad: AdAdmin) => void;
}

const AdItem: React.FC<Props> = ({ ad, onDeleteClick, onEditClick }) => {
	const extendAdMutation = useExtendAd();
	const country = ad.country?.label.translations[0].translation;
	const city = ad.city?.label.translations[0].translation;
	const cityPart = ad.cityPart?.label.translations[0].translation;
	const marketplace = ad.marketplace?.label.translations[0].translation;

	const shortLocation = `${city}${marketplace ? `, ${marketplace}` : ''}`;
	const fullLocation = `${country} - ${city}${
		cityPart || marketplace
			? ` (${cityPart ? cityPart : ''}${marketplace ? `, ${marketplace}` : ''})`
			: ''
	}`;

	const currentDate = new Date();
	const validToDate = new Date(ad.validTo);
	const daysLeft = differenceInDays(validToDate, currentDate);

	const activityCategories = getCategoryTranslationString(ad.activityCategories, 1);
	const articleCategories = getCategoryTranslationString(ad.articleCategories, 1);
	const objectTypeCategories = getCategoryTranslationString(ad.objectTypeCategories, 1);

	const lampColor = daysLeft > 3 ? 'bg-green-500' : 'bg-red-500';

	const handleExtendAd = async () => {
		const newValidTo =
			daysLeft > 0
				? new Date(validToDate.setDate(validToDate.getDate() + 30))
				: new Date(currentDate.setDate(currentDate.getDate() + 30));

		// Pozivamo mutation za produžavanje reklame
		await extendAdMutation.mutateAsync({ adId: ad.id, updatedData: { validTo: newValidTo } });
	};

	return (
		<div className='bg-white p-6 shadow-lg rounded-xl transition-transform transform flex flex-col justify-between'>
			<div className={`absolute w-4 h-4 rounded-full right-0 top-0 mr-2 mt-2 ${lampColor}`} />

			<div className='flex justify-between items-center'>
				<div className='text-center p-4 mb-4 bg-yellowLighter rounded-3xl shadow-md w-full'>
					<H3Title text={ad.retailStore.name} />
				</div>
			</div>

			{/* Display Image */}
			{ad.image && ad.image.url && (
				<div className='mb-4'>
					<Image
						src={ad.image.url}
						alt={ad.image.name}
						width={400}
						height={300}
						className='rounded-lg'
					/>
				</div>
			)}

			<div className='space-y-3 mb-6'>
				<TextList
					label='Tip reklame'
					value={
						reverseAdTypeOptions[ad.adType as keyof typeof reverseAdTypeOptions] ||
						'Nije definisano'
					}
				/>
				<TextList label='Ističe za' value={ad.validTo ? `${daysLeft} dana` : 'Nije definisano'} />
				<TextList label='Broj pregleda' value={ad.viewCount.toString()} />

				<PopoverContainerBackdrop>
					<PopoverButtonDefault>
						<TextList label='Lokacija' value={shortLocation} />
					</PopoverButtonDefault>
					<PopoverPanelList list={[fullLocation]} label='Puna Lokacija' />
				</PopoverContainerBackdrop>
				{ad.articleCategories.length && (
					<PopoverContainerBackdrop>
						<PopoverButtonDefault>
							<TextList
								label='Kategorije proizvoda'
								value={articleCategories || 'Nije definisano'}
							/>
						</PopoverButtonDefault>
						<PopoverPanelList
							list={getCategoryTranslations(ad.articleCategories)}
							label='Sve kategorije proizvoda'
						/>
					</PopoverContainerBackdrop>
				)}

				{ad.activityCategories.length > 0 && (
					<PopoverContainerBackdrop>
						<PopoverButtonDefault>
							<TextList label='Vrsta delatnosti' value={activityCategories || 'Nije definisano'} />
						</PopoverButtonDefault>
						<PopoverPanelList
							list={getCategoryTranslations(ad.activityCategories)}
							label='Sve vrste delatnosti'
						/>
					</PopoverContainerBackdrop>
				)}

				{ad.objectTypeCategories.length > 0 && (
					<PopoverContainerBackdrop>
						<PopoverButtonDefault>
							<TextList label='Tip objekta' value={objectTypeCategories || 'Nije definisano'} />
						</PopoverButtonDefault>
						<PopoverPanelList
							list={getCategoryTranslations(ad.objectTypeCategories)}
							label='Svi tipovi objekata'
						/>
					</PopoverContainerBackdrop>
				)}
			</div>

			<div className='flex flex-col mt-auto p-4 border-t border-gray-300 bg-gray-100 rounded-b-lg'>
				<div className='flex justify-between mb-2 space-x-2'>
					<EditButton
						onClick={handleExtendAd} // Ispravno pozivanje funkcije
						value='Produži'
						className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full'
					/>
					<EditButton
						onClick={() => onEditClick(ad)}
						value='Stopiraj'
						className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full'
					/>
				</div>
				<div className='flex justify-between space-x-2'>
					<EditButton
						onClick={() => onEditClick(ad)}
						value='Izmeni'
						className='bg-sky-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 w-full'
					/>
					<DeleteButton
						onClick={onDeleteClick}
						className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full'
					/>
				</div>
			</div>
		</div>
	);
};

export default AdItem;
