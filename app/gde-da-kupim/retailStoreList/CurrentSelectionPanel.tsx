import React from 'react';
import Image from 'next/image';
import DefaultButton from '@/app/components/buttons/DefaultButton';

interface Props {
	mainCategoryData: {
		icon: {
			url: string;
		};
		name: string;
	};
	locationText: string;
	openEditModal: () => void;
}

const CurrentSelectionPanel: React.FC<Props> = ({
	mainCategoryData,
	locationText,
	openEditModal,
}) => {
	return (
		<div className='flex gap-2 bg-yellowLogo rounded-lg px-4 w-full max-w-xs md:max-w-lg mx-auto relative shadow-inner shadow-black'>
			<div className='relative flex items-center justify-center py-7'>
				<Image
					src={mainCategoryData.icon.url}
					alt={mainCategoryData.name}
					width={100}
					height={100}
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col flex-1 pt-6 relative'>
				<span className='text-2xl font-extrabold text-black uppercase tracking-wide drop-shadow-md break-all text-center'>
					{mainCategoryData.name}
				</span>
				<div className='absolute bottom-0 right-0 text-md text-black italic uppercase text-right font-extrabold whitespace-pre-line tracking-wide break-words w-28'>
					<span className='w-28'>{locationText}</span>
				</div>
			</div>
			<div className='absolute -bottom-4 left-0 flex justify-center w-full'>
				<DefaultButton onClick={openEditModal} className='px-4 py-1.5 shadow-black shadow-md'>
					Izmeni
				</DefaultButton>
			</div>
		</div>
	);
};

export default CurrentSelectionPanel;
