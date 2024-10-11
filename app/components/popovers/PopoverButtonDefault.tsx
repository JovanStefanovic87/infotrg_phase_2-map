import { PopoverButton } from '@headlessui/react';
import React from 'react';

interface Props {
	className?: string;
	children: React.ReactNode;
}

const PopoverButtonDefault: React.FC<Props> = ({ className, children }) => {
	return (
		<PopoverButton className={`underline text-blue-600 cursor-pointer w-full ${className}`}>
			{children}
		</PopoverButton>
	);
};

export default PopoverButtonDefault;
