import React from 'react';

interface Props {
	id: string;
	name: string;
	label: string | number;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
	type?: string;
	required?: boolean;
}

const LabelInputForm: React.FC<Props> = ({
	id,
	name,
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
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${className}`}
				required={required}
				data-lpignore='true'
				autoComplete='off'
				// Allow negative values for type="number"
				{...(type === 'number'
					? { min: '-999999', step: 'any', pattern: '^-?[0-9]*[.,]?[0-9]*$' }
					: {})}
			/>
		</div>
	);
};

export default LabelInputForm;
