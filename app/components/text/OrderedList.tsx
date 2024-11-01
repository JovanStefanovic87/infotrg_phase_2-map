import React from 'react';
import { ContentBlockItem, Subitem } from '@/utils/helpers/types';
import { hyperlinks } from '../../ulaganje/ulaganjeData';
import { isTextHyperlinked } from '@/utils/helpers/universalFunctions';
import Link from 'next/link';

interface Props {
	items: ContentBlockItem[];
}

const getAlphabet = (index: number) => String.fromCharCode(97 + index);

const OrderedList: React.FC<Props> = ({ items }) => {
	const renderSubitems = (
		subitems: Subitem[],
		parentIndex: string,
		listStyle: 'number' | 'alphabet' = 'number'
	) => (
		<div className='pl-4 text-black'>
			{subitems.map((subItem, subIndex) => {
				const prefix =
					listStyle === 'number'
						? `${parentIndex}.${subIndex + 1}.)`
						: `${getAlphabet(subIndex)}.)`;

				return (
					<div
						key={`${parentIndex}.${subIndex}`}
						className='border-b border-dotted border-gray-400 pt-2'>
						<div className='flex flex-col md:flex-row items-center justify-between'>
							<div className='font-normal mb-2 md:mb-0 w-full'>
								<h4 className='text-sm sm:text-base'>
									{`${prefix} `}
									{isTextHyperlinked(subItem.text, hyperlinks) ? (
										<Link href={isTextHyperlinked(subItem.text, hyperlinks) as string}>
											<span className='text-blue-500 hover:underline text-hyperlink'>
												{subItem.text}
											</span>
										</Link>
									) : (
										subItem.text
									)}
								</h4>
							</div>
							<div className='text-sm sm:text-base w-full text-right'>{subItem.amount}</div>
						</div>
						{subItem.subitems &&
							renderSubitems(subItem.subitems, `${parentIndex}.${subIndex + 1}`, subItem.listStyle)}
					</div>
				);
			})}
		</div>
	);

	return (
		<div className='space-y-4'>
			{items.map((item, index) => (
				<div key={index}>
					{item.listContent?.map((listItem, listIndex) => (
						<div key={listIndex} className='mb-4 pt-4'>
							{listItem.type === 'paragraph1' && (
								<div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-2 border-b border-dotted border-gray-700'>
									<h3 className='text-sm md:text-base lg:text-lg font-bold mb-2 md:mb-0 flex-1 text-gray-900'>{`${listIndex}.) ${listItem.text}`}</h3>
									<p className='text-sm md:text-base lg:text-lg text-right font-bold w-full md:w-auto text-gray-900'>
										{listItem.amount}
									</p>
								</div>
							)}
							{listItem.type === 'paragraph1' &&
								listItem.subitems &&
								renderSubitems(listItem.subitems, `${listIndex}`, listItem.listStyle)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default OrderedList;
