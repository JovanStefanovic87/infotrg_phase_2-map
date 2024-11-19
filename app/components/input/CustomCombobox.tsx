import React, { useState, useEffect } from 'react';

interface Option {
	id: number;
	labelId: number;
	languageId: number;
	translation: string;
}

interface CustomComboboxProps {
	options: Option[];
	selectedOptions: Option[];
	onSelect: (selectedOptions: Option[]) => void;
	placeholder?: string;
}

const CustomCombobox: React.FC<CustomComboboxProps> = ({
	options,
	selectedOptions,
	onSelect,
	placeholder = 'Select...',
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const filterOptions = (searchTerm: string) => {
		const lowercasedSearch = searchTerm.trim().toLowerCase();
		return options.filter(option => option.translation.toLowerCase().includes(lowercasedSearch));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setIsOpen(true);
	};

	const handleOptionClick = (option: Option) => {
		const alreadySelected = selectedOptions.some(opt => opt.labelId === option.labelId);
		const updatedSelectedOptions = alreadySelected
			? selectedOptions.filter(opt => opt.labelId !== option.labelId)
			: [...selectedOptions, option];

		onSelect(updatedSelectedOptions);
		setInputValue(''); // Clear the input
		setIsOpen(false); // Close the dropdown
	};

	const handleInputClick = () => {
		setIsOpen(true);
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest('.combobox')) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const filteredOptions = filterOptions(inputValue);

	return (
		<div className='relative combobox'>
			<input
				type='text'
				value={inputValue}
				onClick={handleInputClick}
				onChange={handleInputChange}
				placeholder={placeholder}
				className='block w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>
			{isOpen && filteredOptions.length > 0 && (
				<div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto'>
					{filteredOptions.map(option => (
						<div
							key={option.labelId}
							onClick={() => handleOptionClick(option)}
							className={`cursor-pointer p-2 hover:bg-gray-200 text-black ${
								selectedOptions.some(selected => selected.labelId === option.labelId)
									? 'bg-gray-100'
									: ''
							}`}>
							{option.translation}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomCombobox;
