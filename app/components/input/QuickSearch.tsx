'use client';
import React, { useState } from 'react';
import { FaSearch, FaChevronRight } from 'react-icons/fa';
import { ComboboxOption } from '@/utils/helpers/types';

interface SimpleComboboxProps {
	options: ComboboxOption[];
	onSelect: (option: ComboboxOption | null) => void;
	placeholder?: string;
	selectedOption?: ComboboxOption | null;
	setSelectedOption?: (option: ComboboxOption | null) => void;
}

const QuickSearch: React.FC<SimpleComboboxProps> = ({
	options,
	onSelect,
	placeholder,
	selectedOption,
	setSelectedOption,
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const filteredOptions = searchTerm
		? options.filter(
				option =>
					option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(option.synonyms &&
						option.synonyms.some(
							synonym =>
								typeof synonym === 'string' &&
								synonym.toLowerCase().includes(searchTerm.toLowerCase())
						))
		  )
		: options;

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value);
		setIsOpen(true);
	};

	const handleSelect = (option: ComboboxOption) => {
		setSearchTerm(option.label);
		if (setSelectedOption) {
			setSelectedOption(option); // Čuvanje selektovanog objekta u state
		}
		onSelect(option); // Navigacija odmah nakon selekcije
		setIsOpen(false);
	};

	const handleBlur = () => {
		setTimeout(() => setIsOpen(false), 100);
	};

	return (
		<div className='relative w-full mb-4'>
			<div className='flex items-center border border-gray-300 rounded-lg p-2 bg-gray-50 focus-within:border-blue-500'>
				<input
					type='text'
					value={searchTerm}
					onChange={handleSearch}
					onFocus={() => setIsOpen(true)}
					onBlur={handleBlur}
					placeholder={placeholder || 'Pretraga...'}
					className='flex-1 bg-transparent outline-none text-gray-800 p-2'
				/>
				<FaSearch className='h-5 w-5 text-red-500' />
			</div>
			{isOpen && filteredOptions.length > 0 && (
				<div className='absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto'>
					{filteredOptions.map(option => (
						<div
							key={option.value}
							onMouseDown={() => handleSelect(option)}
							className='px-4 py-2 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-100 flex flex-col relative'>
							<div className='flex items-center'>
								<FaChevronRight className='h-4 w-4 text-gray-500 mr-2' />
								<span className='font-semibold text-lg text-gray-800'>{option.label}</span>
							</div>
							{option.parent && (
								<div className='parent-category ml-6 mt-1 text-xs text-gray-500 flex items-center relative'>
									<span className='prefix'>U</span>
									<span>{option.parent}</span>
								</div>
							)}
						</div>
					))}
				</div>
			)}
			{isOpen && filteredOptions.length === 0 && (
				<div className='absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-lg p-4 text-center text-gray-500'>
					Ne postoji rezultat za pretragu &quot;{searchTerm}&quot;
				</div>
			)}
		</div>
	);
};

export default QuickSearch;
