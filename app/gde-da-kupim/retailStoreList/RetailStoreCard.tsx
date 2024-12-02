import React from 'react';
import { FaStore } from 'react-icons/fa';
import { MdOutlinePhoneAndroid, MdOutlineAlternateEmail } from 'react-icons/md';
import { TfiWorld } from 'react-icons/tfi';
import { SlLocationPin } from 'react-icons/sl';
import { BiSolidNavigation } from 'react-icons/bi';
import { FaSearchLocation } from 'react-icons/fa';
import ListMapMarker from './ListMapMarker';
import ResultTextIconBlock from './ResultTextIconBlock';
import IconButton from '../../components/buttons/IconButton';
import { GetRetailStoreApi, Category } from '@/utils/helpers/types';

interface RetailStoreCardProps {
	store: GetRetailStoreApi;
	index: number;
	categoryId: number;
	centerMapOnStore: (coordinates: { latitude: number; longitude: number } | null) => void;
	handleNavigationClick: (lat: number, lng: number) => void;
	openModalForStore: (store: GetRetailStoreApi) => void;
	getDisplayedCategories: (store: GetRetailStoreApi, categoryId: number) => Category[];
}

const RetailStoreCard: React.FC<RetailStoreCardProps> = ({
	store,
	index,
	categoryId,
	centerMapOnStore,
	handleNavigationClick,
	openModalForStore,
	getDisplayedCategories,
}) => {
	const countAllCategories = (categories: Category[]): number => {
		return categories.reduce(
			(count, category) => count + 1 + countAllCategories(category.children || []),
			0
		);
	};

	return (
		<div className='p-4 bg-white border-b-8 pb-6 rounded-lg shadow-md relative'>
			<div
				className='absolute top-2 right-4 bg-black text-white text-sm font-semibold rounded-full w-7 h-7 flex items-center justify-center'
				onClick={e => {
					e.stopPropagation();
					store.coordinates && centerMapOnStore(store.coordinates);
				}}>
				<ListMapMarker index={index} />
			</div>

			<div className='flex items-center mb-4 space-x-3'>
				<div className='bg-yellow-100 p-3 rounded-full'>
					<FaStore className='text-black text-3xl' />
				</div>
				<div>
					<h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-800'>{store.name}</h3>
					{store.objectTypeCategories && store.objectTypeCategories.length > 0 && (
						<div className='text-gray-800 text-sm md:text-base lg:text-lg'>
							{store.objectTypeCategories
								.map(c => c.label?.translations?.[0]?.translation || c.name || 'Nedefinisano')
								.join(', ')}
						</div>
					)}
				</div>
			</div>

			<div className='flex items-center justify-between border-b-2 mb-4 hover:shadow-md transition-shadow duration-300 pb-3'>
				<div className='flex flex-col text-black w-full'>
					<div
						className='flex flex-wrap items-center cursor-pointer hover:bg-gray-100 gap-0 rounded-lg transition-colors duration-200'
						onClick={e => {
							e.stopPropagation();
							openModalForStore(store);
						}}>
						{getDisplayedCategories(store, categoryId)
							.slice(0, 4)
							.map((childCategory, idx, arr) => (
								<span
									key={idx}
									className='text-sm md:text-sm lg:text-base font-normal py-1 rounded-full whitespace-nowrap'>
									{childCategory.name}
									{idx < arr.length - 1 && <span className='px-1'>•</span>}
								</span>
							))}

						{store.totalArticleCategoryCount > 4 && (
							<span
								className='text-sm md:text-sm lg:text-base font-normal text-black px-3 py-1 sm:ml-3 rounded-full border border-blueDarker cursor-pointer flex items-center gap-1'
								onClick={e => {
									e.stopPropagation();
									openModalForStore(store);
								}}>
								+ {store.totalArticleCategoryCount - 4} dodatnih
							</span>
						)}
					</div>
				</div>
			</div>

			{(store.phoneNumber || store.email || store.website) && (
				<div className='flex items-start gap-2 border-b-2 pb-2 mb-2'>
					<div className='space-y-2'>
						{store.phoneNumber && (
							<ResultTextIconBlock text={store.phoneNumber} color='text-black'>
								<MdOutlinePhoneAndroid />
							</ResultTextIconBlock>
						)}
						{store.email && (
							<ResultTextIconBlock text={store.email} color='text-black'>
								<MdOutlineAlternateEmail />
							</ResultTextIconBlock>
						)}
						{store.website && (
							<ResultTextIconBlock text={store.website} color='text-blueDarker'>
								<TfiWorld />
							</ResultTextIconBlock>
						)}
					</div>
				</div>
			)}

			<div className='flex items-center gap-2'>
				<ResultTextIconBlock
					text={`${
						store.city?.label?.translations?.[0]?.translation
							? `${store.city.label.translations[0].translation}, `
							: ''
					}${
						store.suburb?.label?.translations?.[0]?.translation
							? `${store.suburb.label.translations[0].translation}, `
							: ''
					}${store.address || 'Adresa nije definisana'}, ${
						store.coordinates?.locationDescription || 'Opis lokacije nije dostupan'
					}`}
					color='text-black'>
					<SlLocationPin />
				</ResultTextIconBlock>
			</div>

			<div className='flex items-center justify-center gap-2 mt-4 w-full'>
				<div className='flex-1'>
					<IconButton
						icon={<FaSearchLocation className='animate-bounceSmall drop-shadow-md' />}
						text='Lociraj'
						onClick={() => store.coordinates && centerMapOnStore(store.coordinates)}
					/>
				</div>
				<div className='flex-1'>
					<IconButton
						icon={<BiSolidNavigation className='animate-bounceSmall drop-shadow-md' />}
						text='Putanja'
						onClick={() =>
							store.coordinates &&
							handleNavigationClick(store.coordinates.latitude, store.coordinates.longitude)
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default RetailStoreCard;
