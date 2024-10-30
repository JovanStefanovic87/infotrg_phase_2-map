import React from 'react';
import Label from '../text/Label';
import InputDefault from './InputDefault';

interface Props {
	id?: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
	required?: boolean;
	type?: string;
}

const LabelInputDefault: React.FC<Props> = ({
	id,
	label,
	value,
	onChange,
	placeholder,
	className,
	required,
	type,
}) => {
	return (
		<div className='flex flex-col'>
			<Label htmlFor={label} color='black'>
				{label}
			</Label>
			<InputDefault
				id={id}
				name={label}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={className}
				type={type}
				required={required}
			/>
		</div>
	);
};

export default LabelInputDefault;
