'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Translation {
	languageId: number;
	translation: string;
}

const AddCategoryForm: React.FC = () => {
	const [name, setName] = useState('');
	const [parentId, setParentId] = useState<number | null>(null);
	const [translations, setTranslations] = useState<Translation[]>([
		{ languageId: 1, translation: '' },
	]);
	const [error, setError] = useState<string | null>(null);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const handleParentIdChange = (e: ChangeEvent<HTMLInputElement>) =>
		setParentId(Number(e.target.value));

	const handleTranslationChange = (
		index: number,
		field: 'languageId' | 'translation',
		value: string | number
	) => {
		setTranslations(translations.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
	};

	const addTranslationField = () => {
		setTranslations([...translations, { languageId: 1, translation: '' }]);
	};

	const removeTranslationField = (index: number) => {
		setTranslations(translations.filter((_, i) => i !== index));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			await axios.post('/api/categories', { name, parentId, translations });
			setName('');
			setParentId(null);
			setTranslations([{ languageId: 1, translation: '' }]);
			console.log('Category added successfully');
		} catch (err) {
			setError('An error occurred while adding the category.');
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label htmlFor='name'>Category Name</label>
				<input type='text' id='name' value={name} onChange={handleNameChange} required />
			</div>
			<div>
				<label htmlFor='parentId'>Parent Category ID</label>
				<input type='number' id='parentId' value={parentId ?? ''} onChange={handleParentIdChange} />
			</div>
			{translations.map((t, index) => (
				<div key={index} className='flex space-x-2'>
					<div>
						<label htmlFor={`languageId-${index}`}>Language ID</label>
						<input
							type='number'
							id={`languageId-${index}`}
							value={t.languageId}
							onChange={e => handleTranslationChange(index, 'languageId', Number(e.target.value))}
						/>
					</div>
					<div>
						<label htmlFor={`translation-${index}`}>Translation</label>
						<input
							type='text'
							id={`translation-${index}`}
							value={t.translation}
							onChange={e => handleTranslationChange(index, 'translation', e.target.value)}
						/>
					</div>
					<button type='button' onClick={() => removeTranslationField(index)}>
						Remove
					</button>
				</div>
			))}
			<button type='button' onClick={addTranslationField}>
				Add Translation
			</button>
			<button type='submit'>Add Category</button>
			{error && <p className='text-red-500'>{error}</p>}
		</form>
	);
};

export default AddCategoryForm;
