import { useState, SyntheticEvent, useEffect } from 'react';
import Select from 'react-select';
import { Category, CategoryData } from '@/utils/helpers/types';
import FormDefaultButton from '@/app/components/buttons/FormDefaultButton';
import CloseButton from '@/app/components/buttons/CloseButton';
import InputDefault from '@/app/components/input/InputDefault';
import { formatCategoryOptions } from '@/utils/helpers/universalFunctions';

interface CategoryFormProps {
	categoryData: CategoryData;
	categories: Category[];
	onSubmit: (categoryData: CategoryData) => void;
	onClose: () => void;
	editingCategory: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
	categoryData,
	categories,
	onSubmit,
	onClose,
	editingCategory,
}) => {
	const [category, setCategory] = useState(categoryData.name);
	const [description, setDescription] = useState(categoryData.description || '');
	const [parentId, setParentId] = useState<string | null>(categoryData.parentId || null);
	const [synonyms, setSynonyms] = useState(categoryData.synonyms.join(', ') || '');
	const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			const filtered = formatCategoryOptions(categories, searchTerm);
			setFilteredCategories(filtered);
		}, 300); // Debounce delay

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, categories]);

	const handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const newCategoryData: CategoryData = {
			name: category,
			description,
			parentId,
			synonyms: synonyms.split(',').map(s => s.trim()),
		};
		onSubmit(newCategoryData);
	};

	return (
		<div className='fixed inset-0 flex justify-center items-center z-50'>
			<div className='absolute inset-0 bg-black bg-opacity-75' onClick={onClose} />
			<div
				className='relative bg-white p-6 rounded-lg shadow-md w-full max-w-md'
				onClick={e => e.stopPropagation()}>
				<h2 className='text-2xl font-semibold mb-4 text-gray-800'>
					{editingCategory ? 'Izmenite kategoriju' : 'Dodajte novu kategoriju'}
				</h2>
				<InputDefault
					value={category}
					onChange={e => setCategory(e.target.value)}
					placeholder='Naziv kategorije'
				/>
				<textarea
					placeholder='Opis kategorije (opciono)'
					value={description}
					onChange={e => setDescription(e.target.value)}
					className='block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<input
					type='text'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='Pretraži kategorije'
					className='block w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<Select
					options={formatCategoryOptions(categories, searchTerm)}
					value={
						parentId
							? {
									value: parentId,
									label: categories.find(cat => cat.id === parentId)?.name || '',
							  }
							: null
					}
					onChange={option => setParentId(option?.value || null)}
					className='mb-4'
					placeholder='Nadkategorija (opciono)'
				/>

				<InputDefault
					value={synonyms}
					onChange={e => setSynonyms(e.target.value)}
					placeholder='Sinonimi (odvojene zarezom / opciono)'
				/>
				<div className='flex justify-end space-x-2'>
					<FormDefaultButton onClick={handleSubmit} />
					<CloseButton onClose={onClose} />
				</div>
			</div>
		</div>
	);
};

export default CategoryForm;
