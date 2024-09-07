'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddLanguageForm: React.FC = () => {
	const [code, setCode] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!code || !name) {
			setError('Please fill in both fields.');
			return;
		}

		try {
			const response = await axios.post('/api/languages', { code, name });
			if (response.status === 201) {
				setSuccess(true);
				setCode('');
				setName('');
			} else {
				setError('Failed to add language.');
			}
		} catch (err) {
			setError('An error occurred while adding the language.');
		}
	};

	return (
		<div className='p-4'>
			<h1 className='text-xl font-bold mb-4'>Add New Language</h1>
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			{success && <p className='text-green-500 mb-4'>Language added successfully!</p>}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='code' className='block mb-2'>
						Language Code:
					</label>
					<input
						type='text'
						id='code'
						value={code}
						onChange={e => setCode(e.target.value)}
						className='border p-2 w-full text-black'
					/>
				</div>
				<div>
					<label htmlFor='name' className='block mb-2'>
						Language Name:
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={e => setName(e.target.value)}
						className='border p-2 w-full text-black'
					/>
				</div>
				<button type='submit' className='bg-green-500 text-white p-2 rounded'>
					Add Language
				</button>
			</form>
		</div>
	);
};

export default AddLanguageForm;
