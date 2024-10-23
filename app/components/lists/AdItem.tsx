import React from 'react';
import Image from 'next/image';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import TextList from '../text/TextList';
import H3Title from '../text/H3Title';
import PopoverButtonDefault from '../popovers/PopoverButtonDefault';
import PopoverPanelList from '../popovers/PopoverPanelList';
import PopoverContainerBackdrop from '../popovers/PopoverContainerBackdrop';
import { AdAdmin } from '@/utils/helpers/types';

interface Props {
	ad: AdAdmin;
	onDeleteClick: () => void;
	onEditClick: (ad: AdAdmin) => void;
}

const AdItem: React.FC<Props> = ({ ad, onDeleteClick, onEditClick }) => {
	// Provera lokacije
	const country = ad.country?.label.translations[0].translation;
	const city = ad.city?.label.translations[0].translation;
	const cityPart = ad.city?.label.translations[0].translation;
	const marketplace = ad.marketplace?.label.translations[0].translation;

	const shortLocation = `${city}${marketplace ? `, ${marketplace}` : ''}`;
	const fullLocation = `${country} - ${city}${
		cityPart || marketplace
			? ` (${cityPart ? cityPart : ''}${marketplace ? `, ${marketplace}` : ''})`
			: ''
	}`;

	// Prikaz kategorija
	const articleCategories = ad.articleCategories.length
		? ad.articleCategories.map(
				category =>
					category.label.translations.find(
						(translation: { languageId: number }) => translation.languageId === 1
					)?.translation || 'Nije definisano'
		  )
		: ['Nije definisano'];

	const activityCategories = ad.activityCategories.length
		? ad.activityCategories.map(
				category =>
					category.label.translations.find(
						(translation: { languageId: number }) => translation.languageId === 1
					)?.translation || 'Nije definisano'
		  )
		: ['Nije definisano'];

	const objectTypeCategories = ad.objectTypeCategories.length
		? ad.objectTypeCategories.map(
				category =>
					category.label.translations.find(
						(translation: { languageId: number }) => translation.languageId === 1
					)?.translation || 'Nije definisano'
		  )
		: ['Nije definisano'];

	// Računanje razlike u danima između trenutnog datuma i validTo
	const currentDate = new Date();
	const validToDate = new Date(ad.validTo);
	const differenceInTime = validToDate.getTime() - currentDate.getTime();
	const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

	// Indikator da li su svi podaci prisutni
	const isComplete =
		!!ad.name.trim() &&
		city !== 'N/A' &&
		articleCategories.length > 0 &&
		objectTypeCategories.length > 0;
	const lampColor = isComplete ? 'bg-green-500' : 'bg-red-500';

	return (
		<div className='bg-white p-6 shadow-lg rounded-xl transition-transform transform flex flex-col justify-between'>
			<div className={`absolute w-4 h-4 rounded-full right-0 top-0 mr-2 mt-2 ${lampColor}`} />

			<div className='flex justify-between items-center'>
				<div className='text-center p-4 mb-4 bg-yellowLighter rounded-3xl shadow-md w-full'>
					<H3Title text={ad.name} />
				</div>
			</div>

			{/* Display Image */}
			{ad.Image && ad.Image.url && (
				<div className='mb-4'>
					<Image
						src={ad.Image.url}
						alt={ad.Image.name}
						width={400}
						height={300}
						className='rounded-lg'
					/>
				</div>
			)}

			<div className='space-y-3 mb-6'>
				<TextList label='Tip reklame' value={ad.adType || 'N/A'} />
				<TextList label='URL' value={ad.url || 'N/A'} />
				<TextList label='Pregledi' value={ad.viewCount.toString()} />
				<TextList label='Preostalo dana' value={`${differenceInDays} dana`} />

				<PopoverContainerBackdrop>
					<PopoverButtonDefault>
						<TextList label='Lokacija' value={shortLocation} />
					</PopoverButtonDefault>
					<PopoverPanelList list={[fullLocation]} label='Puna Lokacija' />
				</PopoverContainerBackdrop>

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
				<EditButton onClick={() => onEditClick(ad)} />
				<DeleteButton onClick={onDeleteClick} />
			</div>
		</div>
	);
};

export default AdItem;
