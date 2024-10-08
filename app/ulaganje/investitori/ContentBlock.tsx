import React from 'react';
import ContentBlockContainer from '../../components/containers/ContentBlockContainer';
import BlockTitle from '../../components/text/BlockTitle';
import { ContentBlockItem } from '@/utils/helpers/types';
import TextTable from '@/app/components/text/TextTable';
import Devider2 from '@/app/components/ui/Devider2';

interface Props {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	contentBlocks: ContentBlockItem[];
	amount: string;
	share: string;
	onOpenModal: (type: 'investment' | 'withdrawal', data: any) => void;
}

const ContentBlock: React.FC<Props> = ({
	id,
	name,
	email,
	phone,
	contentBlocks,
	amount,
	share,
	onOpenModal,
}) => {
	return (
		<ContentBlockContainer contentBlocks={[]} isLink={false} openContentModal={() => {}}>
			<div className='w-full p-2 rounded-md overflow-hidden'>
				<div className='flex flex-col h-full bg-gradient-white p-4 rounded-md overflow-hidden'>
					<BlockTitle text={name} />
					<div className='flex flex-col h-full justify-between'>
						<div className='flex flex-col mb-4'>
							<TextTable label='Registarski broj:' value={id} />
							{email && <TextTable label='Email:' value={email} />}
							{phone && <TextTable label='Telefon:' value={phone} />}
							<TextTable label='Investicija:' value={`${amount} EUR`} />
							<TextTable label='Udeo:' value={`${share} %`} />
						</div>
						<div className='flex flex-wrap justify-around'>
							<Devider2 marginY={4} height={2} />
							<div className='flex gap-2 justify-between'>
								<button
									onClick={() => onOpenModal('investment', { id, name })}
									className='text-blue-500 text-base mt-2 border border-blueLight bg-blueLightest px-2  xl:px-4 py-2 rounded-md'>
									Ulaganje finansija
								</button>
								<button
									onClick={() => onOpenModal('withdrawal', { id, name })}
									className='text-blue-500 text-base mt-2 border border-blueLight bg-blueLightest px-2 xl:px-4 py-2 rounded-md'>
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
