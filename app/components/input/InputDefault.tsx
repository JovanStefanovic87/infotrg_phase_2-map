import React from 'react';

interface TextInputProps {
	id?: string | number;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
	required?: boolean;
}

const InputDefault: React.FC<TextInputProps> = ({
	id,
	value,
	onChange,
	placeholder,
	className = '',
	required = false,
}) => {
	return (
		<input
			id={id?.toString()}
			type='text'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`block w-full mb-4 p-3 border border-grayMidLight rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${className}`}
			required={required}
		/>
	);
};

export default InputDefault;
