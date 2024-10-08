import React from 'react';

interface TextSpecificationsProps {
	label: string;
	value: string;
}

const TextTable: React.FC<TextSpecificationsProps> = ({ label, value }) => {
	return (
		<div className='flex gap-0 lg:gap-4 justify-start items-center lg:items-start border-b-2 border-gray-200 py-1 w-full'>
			<p className='text-left text-black font-bold text-base lg:text-sm w-auto md:w-36'>{label}</p>
			<p className='text-right text-black font-normal text-base lg:text-sm flex-1'>{value}</p>
		</div>
	);
};

export default TextTable;
