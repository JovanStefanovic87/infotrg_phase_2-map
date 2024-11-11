import { useCombobox } from 'downshift';
import { CategoryOption } from '@/utils/helpers/types';

interface DownshiftSelectProps {
	options: CategoryOption[];
	value: string | null;
	onChange: (value: string | null) => void;
}

const DownshiftSelect: React.FC<DownshiftSelectProps> = ({ options, value, onChange }) => {
	const {
		isOpen,
		getLabelProps,
		getMenuProps,
		getInputProps,
		getItemProps,
		highlightedIndex,
		selectedItem,
		inputValue,
		getToggleButtonProps,
	} = useCombobox({
		items: options,
		itemToString: item => (item ? item.value : ''),
		onSelectedItemChange: ({ selectedItem }) => {
			onChange(selectedItem ? selectedItem.value : null);
		},
		selectedItem: options.find(option => option.value === value) || null,
	});

	return (
		<div>
			<label {...getLabelProps()} className='block text-gray-700'>
				Parent Category
			</label>
			<div className='relative'>
				<input
					{...getInputProps()}
					className='block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<ul
					{...getMenuProps()}
					className={`absolute z-10 bg-white border border-gray-300 rounded-md mt-1 ${
						isOpen ? 'block' : 'hidden'
					}`}>
					{isOpen &&
						options.map((item, index) => (
							<li
								{...getItemProps({ item, index })}
								key={item.value}
								className={`p-2 cursor-pointer ${highlightedIndex === index ? 'bg-blue-100' : ''}`}>
								{item.label}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default DownshiftSelect;
