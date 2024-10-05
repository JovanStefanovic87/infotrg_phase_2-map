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
}

const LabelInputDefault: React.FC<Props> = ({
	id,
	label,
	value,
	onChange,
	placeholder,
	className,
	required,
}) => {
	return (
		<div>
			<Label htmlFor='name'>{label}</Label>
			<InputDefault
				id={id}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={className}
				required={required}
			/>
		</div>
	);
};

export default LabelInputDefault;
