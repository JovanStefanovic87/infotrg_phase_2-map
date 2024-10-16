import React from 'react';

interface Props {
	id: string;
	label: string | number;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	children: React.ReactNode;
}

const SelectInputForm: React.FC<Props> = ({ id, label, value, onChange, children }) => {
	console.log('id', value);
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
				className={`border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
					value === 0 ? 'text-gray-400' : 'text-black'
				}`}>
				{children}
			</select>
		</div>
	);
};

export default SelectInputForm;
