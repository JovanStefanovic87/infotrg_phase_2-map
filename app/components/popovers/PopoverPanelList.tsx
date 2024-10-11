import { PopoverPanel } from '@headlessui/react';
import React from 'react';

interface Props {
	list: string[];
	label: string;
}

const PopoverPanelList: React.FC<Props> = ({ list, label }) => {
	return (
		<PopoverPanel className='relative z-50 p-4 bg-white shadow-lg rounded-md max-w-xs text-black w-full'>
			<p className='font-bold mb-2'>{`${label}:`}</p>
			<ul className='list-disc pl-5'>
				{list.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</PopoverPanel>
	);
};

export default PopoverPanelList;
