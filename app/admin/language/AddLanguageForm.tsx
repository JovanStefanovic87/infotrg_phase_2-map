import React, { useState } from 'react';
import axios from 'axios';

interface Translation {
	languageId: number;
	translation: string;
}

const AddCategoryPage: React.FC = () => {
	const [parentId, setParentId] = useState<number | null>(null);
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [languageId, setLanguageId] = useState<number | ''>('');
	const [translation, setTranslation] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleAddTranslation = () => {
		if (languageId !== '' && translation) {
			setTranslations([...translations, { languageId, translation }]);
			setLanguageId(''); // Reset after adding
			setTranslation('');
		} else {
			setError('Please fill in both fields.');
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			await axios.post('/api/categories', { name, parentId, translations });
			// Handle successful form submission (e.g., redirect or show a success message)
		} catch (err) {
			setError('Failed to add category. Please try again.');
		}
	};

	return (
		<div className='p-4'>
			<h1 className='text-xl font-bold mb-4'>Add New Category</h1>
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block mb-2'>
						Category Name:
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={e => setName(e.target.value)}
						className='border p-2 w-full text-black'
					/>
				</div>
				<div>
					<label htmlFor='parentId' className='block mb-2'>
						Parent ID (optional):
					</label>
					<input
						type='number'
						id='parentId'
						value={parentId !== null ? parentId : ''}
						onChange={e => setParentId(e.target.value ? +e.target.value : null)}
						className='border p-2 w-full text-black'
					/>
				</div>
				<div>
					<label htmlFor='languageId' className='block mb-2'>
						Language ID:
					</label>
					<input
						type='number'
						id='languageId'
						value={languageId !== '' ? languageId : ''}
						onChange={e => setLanguageId(e.target.value ? +e.target.value : '')}
						className='border p-2 w-full text-black'
					/>
				</div>
				<div>
					<label htmlFor='translation' className='block mb-2'>
						Translation:
					</label>
					<input
						type='text'
						id='translation'
						value={translation}
						onChange={e => setTranslation(e.target.value)}
						className='border p-2 w-full text-black'
					/>
				</div>
				<button
					type='button'
					onClick={handleAddTranslation}
					className='bg-blue-500 text-white p-2 rounded'>
					Add Translation
				</button>
				<div>
					<h2 className='text-lg font-semibold mt-4'>Translations</h2>
					<ul>
						{translations.map((t, index) => (
							<li key={index} className='text-black'>
								Language ID: {t.languageId}, Translation: {t.translation}
							</li>
						))}
					</ul>
				</div>
				<button type='submit' className='bg-green-500 text-white p-2 rounded'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddCategoryPage;
