'use client';
import React, { useState } from 'react';
import axios from 'axios';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import SuccessDisplay from '@/app/components/modals/systemModals/SuccessDisplay';
import ErrorDisplay from '@/app/components/modals/systemModals/ErrorDisplay';

interface AddLanguageFormProps {
	onLanguageAdded: (language: { id: number; code: string; name: string }) => void;
}

const AddLanguageForm: React.FC<AddLanguageFormProps> = ({ onLanguageAdded }) => {
	const [code, setCode] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!code || !name) {
			setError('Morate popuniti oba polja.');
			return;
		}

		try {
			const response = await axios.post('/api/languages', { code, name });
			if (response.status === 201) {
				const newLanguage = response.data;
				setSuccess('Jezik uspešno sačuvan.');
				setCode('');
				setName('');
				onLanguageAdded(newLanguage);
			} else {
				setError('Greška prilikom unošenja novog jezika.');
			}
		} catch (err: any) {
			// Provera specifične greške servera
			if (err.response?.status === 409) {
				setError(`Greška: Jezik sa šifrom "${code}" već postoji.`);
			} else {
				const serverError = err.response?.data?.error || 'Došlo je do neočekivane greške.';
				console.error('Neuspešan pokušaj dodavanja jezika:', serverError); // Ispis u konzoli za druge greške
				setError(serverError);
			}
		}
	};

	return (
		<div className='p-4'>
			{error && <ErrorDisplay error={error} clearError={() => setError(null)} />}
			{success && <SuccessDisplay success={success} clearSuccess={() => setSuccess(null)} />}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='text-black'>
					<label htmlFor='code' className='block mb-2'>
						Internacionalna šifra jezika:
					</label>
					<input
						type='text'
						id='code'
						value={code}
						onChange={e => setCode(e.target.value)}
						className='border p-2 w-full'
					/>
				</div>
				<div className='text-black'>
					<label htmlFor='name' className='block mb-2'>
						Naziv jezika:
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={e => setName(e.target.value)}
						className='border p-2 w-full'
					/>
				</div>
				<SubmitButton>Sačuvaj</SubmitButton>
			</form>
		</div>
	);
};

export default AddLanguageForm;
