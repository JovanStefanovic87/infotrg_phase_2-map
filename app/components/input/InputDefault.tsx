import React from 'react';

interface TextInputProps {
	id?: string | number;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
	required?: boolean;
	type?: string;
	name?: string;
}

const InputDefault: React.FC<TextInputProps> = ({
	id,
	value,
	onChange,
	placeholder,
	className = '',
	required = false,
	type = 'text',
	name,
}) => {
	return (
		<input
			id={id?.toString()}
			name={name}
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={e => onChange(e)}
			className={`block w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-black ${className}`}
			required={required}
		/>
	);
};

export default InputDefault;
