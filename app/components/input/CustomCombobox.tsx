import React, { useState } from 'react';

interface Category {
	id: string;
	name: string;
	synonyms?: string[];
}

interface ComboboxProps {
	options: Category[];
	onSelect: (selectedOption: Category | null) => void;
	placeholder?: string;
}

const Combobox: React.FC<ComboboxProps> = ({ options, onSelect, placeholder = 'Select...' }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [selectedOption, setSelectedOption] = useState<Category | null>(null);

	const filterOptions = (searchTerm: string) => {
		const lowercasedSearch = searchTerm.trim().toLowerCase();
		return options.filter(cat => {
			const name = cat.name?.trim().toLowerCase() || '';
			const nameMatches = name.includes(lowercasedSearch);

			const synonyms = cat.synonyms ? cat.synonyms.map(s => s.trim().toLowerCase()) : [];
			const synonymsMatch = synonyms.some(synonym => synonym.includes(lowercasedSearch));

			return nameMatches || synonymsMatch;
		});
	};

	const filteredOptions = filterOptions(inputValue);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setIsOpen(true);
	};

	const handleOptionClick = (option: Category) => {
		setSelectedOption(option);
		setInputValue(option.name);
		setIsOpen(false);
		onSelect(option);
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
							{option.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Combobox;
