import React, { useCallback } from 'react';
import Image from 'next/image';
import { Location, Translation } from '@/utils/helpers/types';
import { getCategoryIconUrl } from '../../../utils/helpers/universalFunctions';
import TextNormal from '../text/TextNormal';
import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';
import ArrowToggleButton from '../buttons/ArrowToggleButton';
import ToggleButtonContainer from '../buttons/ToggleButtonContainer';
import H4 from '../text/H4';
import TextWrapped from '../text/TextWrapped';

interface RetailStoreItemProps {
	retail: any;
	expandedRetails: Set<number>;
	logos: any[];
}

const RetailStoreItem: React.FC<RetailStoreItemProps> = ({ retail, expandedRetails, logos }) => {
	const isRetailExpanded = useCallback((id: number) => expandedRetails.has(id), [expandedRetails]);

	const getRetailName = (retail: any): string => {
		const translations = Array.isArray(retail.label.translations)
			? (retail.label.translations as unknown as Translation[])
			: [];

		const primaryTranslation = translations.find(
			(translation: Translation) => translation.languageId === 1
		);

		return primaryTranslation?.translation
			? primaryTranslation.translation.charAt(0).toUpperCase() +
					primaryTranslation.translation.slice(1)
			: retail.label.name;
	};

	const iconUrl = getCategoryIconUrl(retail.logoId, logos);
	return (
		<div className='border p-4 mb-4 rounded-lg shadow-md bg-white'>
			<H4 text={getRetailName(retail.labelId)} color='black' shouldBreak />
			<div className='mt-2'>
				{retail.iconId ? (
					iconUrl ? (
						<Image
							src={iconUrl}
							alt='Category Icon'
							width={50}
							height={50}
							priority={false}
							style={{ width: '50px', height: '50px' }}
						/>
					) : (
						<TextWrapped block='Ikonica nije izabrana' />
					)
				) : (
					<TextWrapped block='Ikonica ne postoji' />
				)}
			</div>

			<div className='mt-4 flex space-x-2'>
				<EditButton onClick={() => {}} />
				<DeleteButton onClick={() => {}} />
			</div>

			{retail.children && isRetailExpanded(retail.id) && (
				<div className='mt-4 pl-4 border-l-2 border-gray-200'>
					{retail.children.map((item: { id: React.Key | null | undefined }) => (
						<RetailStoreItem
							key={item.id}
							retail={item}
							expandedRetails={expandedRetails}
							logos={logos}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default RetailStoreItem;
