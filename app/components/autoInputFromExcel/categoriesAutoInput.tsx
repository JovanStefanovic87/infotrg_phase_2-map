'use client';
import { useState, FC } from 'react';
import IconButton from '../buttons/IconButton';
import { FaAddressCard } from 'react-icons/fa';
import ButtonUploadXlsx from '../buttons/ButtonUploadXlsx';

interface CategoriesAdminProps {
	prefix: string;
	title: string;
}

const CategoriesAutoInput: FC<CategoriesAdminProps> = ({ prefix, title }) => {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const handleFileUpload = async () => {
		if (!file) {
			alert('Molimo izaberite fajl pre slanja.');
			return;
		}

		setLoading(true);
		setMessage(null);

		const formData = new FormData();
		formData.append('file', file);
		formData.append('prefix', prefix);

		try {
			const response = await fetch('/api/categoriesExcel', {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();

			if (response.ok) {
				setMessage('Podaci su uspešno uneti.');
			} else {
				setMessage(result.error || 'Došlo je do greške prilikom unosa podataka.');
			}
		} catch (error) {
			console.error('Greška prilikom slanja:', error);
			setMessage('Došlo je do greške prilikom unosa podataka.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-end'>
			<div className='flex justify-start gap-4'>
				<ButtonUploadXlsx label='Izaberite fajl' onChange={handleFileChange} />
				<IconButton icon={<FaAddressCard />} onClick={handleFileUpload} text='Pošalji' />
			</div>
			{message && <p>{message}</p>}
		</div>
	);
};

export default CategoriesAutoInput;
