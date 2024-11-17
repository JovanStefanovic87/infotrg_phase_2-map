'use client';
import React, { useState } from 'react';
import { TranslationSimple } from '@/utils/helpers/types';

interface CustomComboboxProps {
	options: Array<{ name: string; languageId: number; labelId: number }>;
	selectedOptions: Array<{ name: string; languageId: number; labelId: number }>;
	onSelect: (selectedOptions: Array<{ name: string; languageId: number; labelId: number }>) => void;
	placeholder?: string;
}

const Custom2Combobox: React.FC<CustomComboboxProps> = ({
	options,
	selectedOptions,
	onSelect,
	placeholder = 'Select...',
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const filterOptions = (searchTerm: string) => {
		const lowercasedSearch = searchTerm.trim().toLowerCase();
		return options.filter(
			option =>
				typeof option.name === 'string' &&
				option.name.toLowerCase().includes(lowercasedSearch) &&
				!selectedOptions.some(selected => selected.labelId === option.labelId) // Izbaci već izabrane opcije
		);
	};

	const filteredOptions = filterOptions(inputValue);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(typeof value === 'string' ? value : '');
		setIsOpen(true);
	};

	const handleOptionClick = (option: { name: string; languageId: number; labelId: number }) => {
		const alreadySelected = selectedOptions.some(selected => selected.labelId === option.labelId);
		const newSelectedOptions = alreadySelected
			? selectedOptions.filter(selected => selected.labelId !== option.labelId) // Remove if already selected
			: [...selectedOptions, option]; // Add if not selected

		setInputValue(''); // Clear the input field after selection
		setIsOpen(false);
		onSelect(newSelectedOptions); // Pass updated selections back to parent
	};

	const handleInputClick = () => {
		setIsOpen(true);
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (!(e.target as HTMLElement).closest('.combobox')) {
			setIsOpen(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

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
					{filteredOptions.map((option, index) => (
						<div
							key={`${option.labelId}-${index}`}
							onClick={() => handleOptionClick(option)}
							className={`cursor-pointer p-2 hover:bg-gray-200 text-black ${
								selectedOptions.some(selected => selected.labelId === option.labelId)
									? 'bg-gray-100'
									: ''
							}`}>
							{option.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Custom2Combobox;
