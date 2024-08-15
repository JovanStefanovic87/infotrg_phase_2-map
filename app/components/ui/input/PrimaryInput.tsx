'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface Props {
	placeholder: string;
	value: string | undefined;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	type?: string;
	setShowValidationTextError?: React.Dispatch<React.SetStateAction<boolean>>;
	submitted?: boolean;
}

const PrimaryInput: React.FC<Props> = ({
	placeholder,
	value,
	setValue,
	type = 'string',
	setShowValidationTextError,
	submitted = false,
}) => {
	const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	useEffect(() => {
		if (setShowValidationTextError) {
			setShowValidationTextError((isEmpty || !isTouched) && submitted);
		}
	}, [isEmpty, isTouched, submitted, setShowValidationTextError]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		setValue(inputValue);
		setIsEmpty(inputValue.trim() === '');
		setIsTouched(true);
	};

	return (
		<input
			type={type}
			className={`bg-white text-black pl-10 pr-4 border-2 border-neutral-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full ${
				(isEmpty || !isTouched) && submitted ? 'border-red-500' : ''
			}`}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
		/>
	);
};

export default PrimaryInput;
