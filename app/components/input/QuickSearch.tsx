'use client';
import React, { useState } from 'react';
import { FaSearch, FaChevronRight } from 'react-icons/fa';

interface ComboboxOption {
	value: string;
	label: string;
	parent?: string;
	synonyms?: string[];
}

interface SimpleComboboxProps {
	options: ComboboxOption[];
	onSelect: (option: ComboboxOption | null) => void;
	placeholder?: string;
}

const QuickSearch: React.FC<SimpleComboboxProps> = ({ options, onSelect, placeholder }) => {
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
		onSelect(option);
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
			<style jsx>{`
				.parent-category {
					position: relative;
					padding-left: 1.5rem;
				}

				.parent-category::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					height: 50%;
					border-left: 1px solid rgba(128, 126, 163, 0.82);
					border-bottom: 1px solid rgba(128, 126, 163, 0.82);
					width: 0.5rem;
				}

				.prefix {
					margin-right: 0.2rem;
				}
			`}</style>
		</div>
	);
};

export default QuickSearch;
