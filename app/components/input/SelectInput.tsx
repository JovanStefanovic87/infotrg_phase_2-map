import React from 'react';

interface Option {
	value: string | number;
	label: string;
}

interface SelectInputProps {
	id?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: Option[];
	className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
	id,
	value,
	onChange,
	options,
	className = '',
}) => {
	return (
		<select
			id={id}
			value={value}
			onChange={onChange}
			className={`mt-1 p-2 border border-gray-300 rounded text-black ${className}`}>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default SelectInput;
