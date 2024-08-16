import React from 'react';

interface TextInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
}

const InputDefault: React.FC<TextInputProps> = ({
	value,
	onChange,
	placeholder,
	className = '',
}) => {
	return (
		<input
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
		/>
	);
};

export default InputDefault;
