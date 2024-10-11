import { Popover, PopoverBackdrop } from '@headlessui/react';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

const PopoverContainerBackdrop: React.FC<Props> = ({ children }) => {
	return (
		<Popover className='relative'>
			<div className='relative z-10 cursor-pointer'>{children}</div>
			<PopoverBackdrop className='fixed inset-0 bg-black opacity-30' />
		</Popover>
	);
};

export default PopoverContainerBackdrop;
