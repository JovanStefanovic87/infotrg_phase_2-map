import React from 'react';

interface Props {
	id: string;
	label: string;
	value: number;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	children: React.ReactNode;
}

const SelectInputForm: React.FC<Props> = ({ id, label, value, onChange, children }) => {
	return (
		<div className='flex flex-col space-y-2'>
			<label htmlFor={id} className='text-black font-semibold'>
				{label}
			</label>
			<select
				id={id}
				name={id}
				value={value}
				onChange={onChange}
				className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'>
				{children}
			</select>
		</div>
	);
};

export default SelectInputForm;
