import React from 'react';

interface Props {
	id: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
	type?: string;
	required?: boolean;
}

const HydratationFormInput: React.FC<Props> = ({
	id,
	label,
	value,
	onChange,
	placeholder,
	className = '',
	type = 'text',
	required = false,
}) => {
	return (
		<div className='flex flex-col space-y-2'>
			<label htmlFor={id} className='text-black font-semibold'>
				{label}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${className}`}
				required={required}
			/>
		</div>
	);
};

export default HydratationFormInput;
