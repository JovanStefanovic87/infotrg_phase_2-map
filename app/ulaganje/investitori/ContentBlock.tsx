import React from 'react';
import ContentBlockContainer from '../../components/containers/ContentBlockContainer';
import BlockTitle from '../../components/text/BlockTitle';
import TextTable from '@/app/components/text/TextTable';
import Devider2 from '@/app/components/ui/Devider2';

interface Props {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	amount?: string;
	share: string;
	amountMinusTransfer?: string;
	shareMinusTransfer?: string;
	onOpenModal: (type: 'investment' | 'withdrawal', data: any) => void;
}

const ContentBlock: React.FC<Props> = ({
	id,
	name,
	email,
	phone,
	amount,
	share,
	amountMinusTransfer,
	shareMinusTransfer,
	onOpenModal,
}) => {
	return (
		<ContentBlockContainer contentBlocks={[]} isLink={false} openContentModal={() => {}}>
			<div className='w-full p-2 rounded-md overflow-hidden'>
				<div className='flex flex-col h-ful p-4 rounded-md overflow-hidden'>
					<div className='mb-4 border-2 border-gray-200'>
						<BlockTitle text={name} bgColor='gray-50' align='center' mb={0} />
					</div>

					<div className='flex flex-col h-full justify-between'>
						<div className='flex flex-col mb-4'>
							<TextTable label='Registarski broj:' value={id} />
							{email && <TextTable label='Email:' value={email} />}
							{phone && <TextTable label='Telefon:' value={phone} />}
							{amount && (
								<TextTable label='Investicija:' value={`${amountMinusTransfer || amount} EUR`} />
							)}
							<TextTable label='Udeo:' value={`${shareMinusTransfer || share} %`} />
						</div>
						<div className='flex flex-wrap justify-around'>
							<Devider2 marginY={4} height={2} />
							<div className='flex gap-2 justify-between'>
								<button
									onClick={() => onOpenModal('investment', { id, name })}
									className='text-black text-base mt-2 border border-blueLight bg-blueLightest px-2  xl:px-4 py-2 rounded-md'>
									Ulaganje finansija
								</button>
								<button
									onClick={() => onOpenModal('withdrawal', { id, name })}
									className='text-black text-base mt-2 border border-blueLight bg-blueLightest px-2 xl:px-4 py-2 rounded-md'>
									Povlačenje finansija
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ContentBlockContainer>
	);
};

export default ContentBlock;
