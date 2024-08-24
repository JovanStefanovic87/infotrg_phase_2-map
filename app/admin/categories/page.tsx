'use client';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FileUploadButton from '@/app/components/buttons/FileUploadButton';
import CategoryList from './CategoryList';
import { Category, Language, Translation, Icon } from '@/utils/helpers/types';
import Combobox from '@/app/components/input/CustomCombobox';
import PageContainer from '@/app/components/containers/PageContainer';

const AddCategoryPage: React.FC = () => {
	const [parentId, setParentId] = useState<number | null>(null);
	const [languageId, setLanguageId] = useState<number>(1);
	const [name, setName] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [categories, setCategories] = useState<Category[]>([]);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [translations, setTranslations] = useState<Translation[]>([]);
	const [icons, setIcons] = useState<Icon[]>([]);
	const [icon, setIcon] = useState<File | null>(null);

	const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
	const [loadingLanguages, setLoadingLanguages] = useState<boolean>(false);
	const [loadingTranslations, setLoadingTranslations] = useState<boolean>(false);
	const [loadingIcons, setLoadingIcons] = useState<boolean>(false);

	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	useEffect(() => {
		const fetchCategories = async () => {
			setLoadingCategories(true);
			try {
				const response = await axios.get('/api/categories');
				setCategories(response.data);
			} catch (err) {
				console.error('Failed to fetch categories', err);
			} finally {
				setLoadingCategories(false);
			}
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchLanguages = async () => {
			setLoadingLanguages(true);
			try {
				const response = await axios.get('/api/languages');
				setLanguages(response.data);
			} catch (err) {
				console.error('Failed to fetch languages', err);
			} finally {
				setLoadingLanguages(false);
			}
		};

		fetchLanguages();
	}, []);

	useEffect(() => {
		if (languageId) {
			const fetchLabels = async () => {
				setLoadingTranslations(true);
				try {
					const response = await axios.get('/api/labels', { params: { languageId } });
					const labels = Array.isArray(response.data) ? response.data : [];

					const fetchTranslations = async () => {
						try {
							const translationResponses = await Promise.all(
								labels.map(async (label: { id: number }) => {
									const response = await axios.get('/api/translation', {
										params: {
											languageId,
											labelId: label.id,
										},
									});
									return response.data;
								})
							);
							const allTranslations = translationResponses.flat();
							setTranslations(allTranslations);
						} catch (err) {
							console.error('Failed to fetch translation', err);
						} finally {
							setLoadingTranslations(false);
						}
					};

					fetchTranslations();
				} catch (err) {
					console.error('Failed to fetch labels', err);
					setLoadingTranslations(false);
				}
			};

			fetchLabels();
		}
	}, [languageId]);

	useEffect(() => {
		const fetchIcons = async () => {
			setLoadingIcons(true);
			try {
				const response = await axios.get('/api/icons'); // Ensure this endpoint returns icon data
				setIcons(response.data);
			} catch (err) {
				console.error('Failed to fetch icons', err);
			} finally {
				setLoadingIcons(false);
			}
		};

		fetchIcons();
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			let iconId = 0;

			// Upload the icon first if it exists
			if (icon) {
				const formData = new FormData();
				formData.append('icon', icon);

				const uploadResponse = await axios.post('/api/icons', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				iconId = uploadResponse.data.iconId; // Get the iconId from the response
			}

			// Create the label
			const labelResponse = await axios.post('/api/labels', { name });
			const newLabelId = labelResponse.data.id;

			if (!newLabelId) {
				throw new Error('Failed to create label');
			}

			// Create the category with the iconId
			const categoryResponse = await axios.post('/api/categories', {
				parentId,
				labelId: newLabelId,
				iconId, // Include iconId in the request
			});

			if (!categoryResponse.data) {
				throw new Error('Failed to create category');
			}

			// Handle translations if needed
			if (languageId) {
				await axios.post('/api/translation', {
					labelId: newLabelId,
					languageId,
					translation: name,
				});
			}

			// Reset form fields
			setName('');
			setParentId(null);
			setLanguageId(1);
			setIcon(null);
			setError('');
			setSuccessMessage('Podaci uspešno sačuvani.');

			// Trigger file name reset
			if (fileUploadButtonRef.current.resetFileName) {
				fileUploadButtonRef.current.resetFileName();
			}
		} catch (err) {
			if (err instanceof Error) {
				setError(`Submission Error: ${err.message}`);
				setSuccessMessage(null); // Clear success message on error
			} else {
				setError('An unexpected error occurred.');
				setSuccessMessage(null); // Clear success message on error
			}
		}
	};

	const handleFileChange = (file: File | null) => {
		setIcon(file);
	};

	const handleResetFileName = () => {
		// This callback will be triggered to reset the file name
		if (fileUploadButtonRef.current.resetFileName) {
			fileUploadButtonRef.current.resetFileName();
		}
	};

	if (loadingCategories || loadingIcons) return <p>Loading...</p>;

	return (
		<PageContainer>
			<h1 className='text-xl font-bold mb-4'>Add New Category</h1>
			{error && <p className='text-red-500 mb-4'>{error}</p>}
			{successMessage && <p className='text-green-500 mb-4'>{successMessage}</p>}
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
						Parent Category (optional):
					</label>
					<Combobox
						options={translations}
						onSelect={selectedOption => {
							setParentId(selectedOption ? selectedOption.labelId : null);
						}}
						placeholder='Select Parent Category'
					/>
				</div>
				<div>
					<label htmlFor='icon' className='block mb-2'>
						Icon:
					</label>
					<FileUploadButton
						onFileChange={handleFileChange}
						resetFileName={handleResetFileName}
						ref={fileUploadButtonRef}
					/>
				</div>
				<div>
					<button type='submit' className='bg-blue-500 text-white px-4 py-2'>
						Save
					</button>
				</div>
			</form>
			<div className='mt-8'>
				<CategoryList
					categories={categories}
					translations={translations}
					icons={icons}
					languages={languages}
					languageId={languageId}
				/>
			</div>
		</PageContainer>
	);
};

export default AddCategoryPage;
