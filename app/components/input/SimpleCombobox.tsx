'use client';
import React, { useState } from 'react';
import { Translation } from '@/utils/helpers/types';

interface ComboboxProps {
	options: Translation[];
	onSelect: (selectedOption: Translation | null) => void;
	placeholder?: string;
}

const Combobox: React.FC<ComboboxProps> = ({ options, onSelect, placeholder = 'Select...' }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const getCommonCharacterCount = (str1: string, str2: string) => {
		const charCount1 = Array.from(str1).reduce((acc, char) => {
			acc[char] = (acc[char] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		const charCount2 = Array.from(str2).reduce((acc, char) => {
			acc[char] = (acc[char] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		return Object.keys(charCount1).reduce((acc, char) => {
			if (charCount2[char]) {
				acc += Math.min(charCount1[char], charCount2[char]);
			}
			return acc;
		}, 0);
	};

	const filterOptions = (searchTerm: string) => {
		const lowercasedSearch = searchTerm.trim().toLowerCase();
		const exactMatches = options.filter(translation =>
			translation.translation.trim().toLowerCase().includes(lowercasedSearch)
		);

		if (exactMatches.length > 0) {
			return exactMatches.sort((a, b) => a.translation.localeCompare(b.translation));
		}

		const closeMatches = options
			.map(translation => ({
				...translation,
				commonChars: getCommonCharacterCount(
					lowercasedSearch,
					translation.translation.trim().toLowerCase()
				),
			}))
			.filter(translation => translation.commonChars > 0)
			.sort((a, b) => b.commonChars - a.commonChars);

		return closeMatches;
	};

	const filteredOptions = filterOptions(inputValue);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setIsOpen(true);
	};

	const handleOptionClick = (option: Translation) => {
		setInputValue(option.translation);
		setIsOpen(false);
		onSelect(option);
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
					{filteredOptions.map(option => (
						<div
							key={option.id}
							onClick={() => handleOptionClick(option)}
							className='cursor-pointer p-2 hover:bg-gray-200 text-black'>
							{option.translation}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Combobox;
