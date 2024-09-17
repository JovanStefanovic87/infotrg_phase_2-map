import H2 from '../../components/text/H2';
import Image from 'next/image';
import TextBlockItem from '../../ulaganje/collapsible/TextBlockItem';
import ImageUploadButton from '../../components/buttons/ImageUploadButton';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import CustomCombobox from '../../components/input/CustomCombobox';
import SumbitButton from '../../components/buttons/SubmitButton';
import {
	Translation,
	Category,
	Icon,
	Language,
	TranslationUpdate,
} from '../../../utils/helpers/types';

interface Props {
	currentIcon: {
		iconId: number | null;
		iconUrl: string | null;
	};
	newIcon: File | null;
	languages: Language[];
	newTranslations: TranslationUpdate[];
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setNewTranslations: React.Dispatch<React.SetStateAction<TranslationUpdate[]>>;
	parentIds: number[];
	categories: Category[];
	translations: Translation[];
	setParentIds: React.Dispatch<React.SetStateAction<number[]>>;
	filterCategoriesForSelect: () => Category[];
	setIsIconPickerOpen: (isOpen: boolean) => void;
	handleSubmitEdit: (e: React.FormEvent<HTMLFormElement>) => void;
	relatedIds: number[];
	setRelatedIds: (relatedIds: number[]) => void;
}

const EditCategoryForm: React.FC<Props> = ({
	currentIcon,
	newIcon,
	languages,
	newTranslations,
	handleFileChange,
	setNewTranslations,
	parentIds,
	categories,
	translations,
	setParentIds,
	filterCategoriesForSelect,
	setIsIconPickerOpen,
	handleSubmitEdit,
	relatedIds,
	setRelatedIds,
}) => {
	return (
		<form
			onSubmit={handleSubmitEdit}
			className='flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto overflow-auto max-h-[85vh] lg:max-h-[90vh]'>
			{/* Icon Section */}
			<div className='flex flex-col items-center text-black mb-6 w-full'>
				<div className='mb-4'>
					<H2 text='KATEGROIJA PROIZVODA' color='black' />
				</div>
				{currentIcon.iconUrl && !newIcon ? (
					<div className='mb-4 flex gap-4 justify-center items-center w-full'>
						<TextBlockItem content='Trenutna ikonica:' />
						<Image src={currentIcon.iconUrl} alt='Current Icon' width={50} height={50} />
					</div>
				) : (
					<p className='text-gray-500 mb-4'>No icon selected</p>
				)}
				<div className='flex w-full justify-between space-x-4'>
					<ImageUploadButton
						id='iconUpload'
						label='Nova ikonica (PNG)'
						onChange={handleFileChange}
					/>
					<ChooseImageButton onClick={() => setIsIconPickerOpen(true)} label='Izbor ikonice' />
				</div>
			</div>

			{/* Translations and Synonyms */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
				{languages.map(language => (
					<div key={language.id} className='flex flex-col text-black space-y-4'>
						{/* Translation Input */}
						<div>
							<label
								htmlFor={`translation-${language.id}`}
								className='font-semibold mb-1 block text-lg'>
								{`${language.name.charAt(0).toUpperCase()}${language.name
									.slice(1)
									.toLocaleLowerCase()} naziv`}
							</label>
							<input
								type='text'
								id={`translation-${language.id}`}
								className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
								value={newTranslations.find(t => t.languageId === language.id)?.translation || ''}
								onChange={e => {
									const translation = e.target.value;
									setNewTranslations(prevTranslations =>
										prevTranslations.map(t =>
											t.languageId === language.id ? { ...t, translation } : t
										)
									);
								}}
							/>
						</div>

						{/* Description Input */}
						<div>
							<label
								htmlFor={`description-${language.id}`}
								className='font-semibold mb-1 block text-lg'>
								{`${language.name.charAt(0).toUpperCase()}${language.name
									.slice(1)
									.toLocaleLowerCase()} opis`}
							</label>
							<textarea
								id={`description-${language.id}`}
								className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
								value={newTranslations.find(t => t.languageId === language.id)?.description || ''}
								onChange={e => {
									const description = e.target.value;
									setNewTranslations(prevTranslations =>
										prevTranslations.map(t =>
											t.languageId === language.id ? { ...t, description } : t
										)
									);
								}}
							/>
						</div>

						{/* Synonyms Input */}
						<div>
							<label
								htmlFor={`synonyms-${language.id}`}
								className='font-semibold mb-1 block text-lg'>
								{`${language.name.charAt(0).toUpperCase()}${language.name
									.slice(1)
									.toLocaleLowerCase()} sinonimi`}
							</label>
							<input
								type='text'
								placeholder='Odvojite ih zarezom'
								className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
								value={
									newTranslations.find(t => t.languageId === language.id)?.synonyms.join(', ') || ''
								}
								onChange={e => {
									const synonyms = e.target.value.split(',').map(synonym => synonym.trim());
									setNewTranslations(prevTranslations =>
										prevTranslations.map(t =>
											t.languageId === language.id ? { ...t, synonyms } : t
										)
									);
								}}
							/>
						</div>
					</div>
				))}
			</div>

			<div className='mb-6 w-full'>
				<label className='font-semibold text-lg mb-3 block text-black'>Povezane kategorije:</label>
				<ul className='list-disc pl-5 text-black space-y-2 mb-4 max-h-48 overflow-y-auto'>
					{relatedIds.map(relatedId => {
						const relatedCategory = categories.find(cat => cat.id === relatedId);
						return (
							<li key={`related-${relatedId}`} className='flex items-center justify-between'>
								<span className='text-sm text-gray-800'>
									{translations.find(t => t.labelId === relatedCategory?.labelId)?.translation ||
										'Unknown'}
								</span>
								<button
									type='button'
									onClick={() => setRelatedIds(relatedIds.filter(id => id !== relatedId))}
									className='ml-4 text-red-500 hover:text-red-700'>
									Ukloni
								</button>
							</li>
						);
					})}
				</ul>
				<CustomCombobox
					options={filterCategoriesForSelect().map(cat => {
						const translation = translations.find(
							t => t.labelId === cat.labelId && t.languageId === 1
						);

						return {
							id: cat.id,
							labelId: cat.labelId,
							languageId: 1,
							translation: translation?.translation || 'No translation',
							description: translation?.description || '',
							createdAt: translation?.createdAt || new Date(),
							synonyms: translation?.synonyms || [],
							translationId: translation?.translationId ?? null,
						};
					})}
					selectedOptions={categories
						.filter(cat => relatedIds.includes(cat.id))
						.map(cat => {
							const translation = translations.find(
								t => t.labelId === cat.labelId && t.languageId === 1
							);
							return {
								id: cat.id,
								labelId: cat.labelId,
								languageId: 1,
								translation: translation?.translation || 'No translation',
								description: translation?.description || '',
								createdAt: translation?.createdAt || new Date(),
								synonyms: translation?.synonyms || [],
								translationId: translation?.translationId ?? null,
							} as Translation;
						})}
					onSelect={selectedOptions => {
						const newRelatedIds = selectedOptions.map(option => option.id);
						console.log('New Related Ids:', newRelatedIds); // Ensure it is correct
						setRelatedIds(newRelatedIds); // Make sure this update happens before submission
					}}
					placeholder='Select related categories'
				/>
			</div>

			{/* Parent Categories Section */}
			<div className='mb-6 w-full'>
				<label className='font-semibold text-lg mb-3 block text-black'>
					Izabrane nadkategorije:
				</label>
				<ul className='list-disc pl-5 text-black space-y-2 mb-4 max-h-48 overflow-y-auto'>
					{[...new Set(parentIds)].length > 0 ? (
						[...new Set(parentIds)].map(parentId => {
							const parentCategory = categories.find(cat => cat.id === parentId);
							const translation = translations.find(
								t => t.labelId === parentCategory?.labelId && t.languageId === 1
							);

							return (
								<li key={`parent-${parentId}`} className='flex items-center justify-between'>
									<span className='text-sm text-gray-800'>
										{translation ? translation.translation : 'Translation not available'}
									</span>
									<button
										type='button'
										onClick={() => setParentIds(parentIds.filter(id => id !== parentId))}
										className='ml-4 text-red-500 hover:text-red-700 focus:outline-none'>
										Ukloni
									</button>
								</li>
							);
						})
					) : (
						<li className='text-sm text-gray-500'>Ovo je glavna kategorija</li>
					)}
				</ul>
				<CustomCombobox
					options={filterCategoriesForSelect().map(cat => {
						const translation = translations.find(
							t => t.labelId === cat.labelId && t.languageId === 1
						);

						return {
							id: translation?.id || cat.id,
							labelId: cat.id,
							languageId: 1,
							translation: translation?.translation || 'Ne postoji prevod',
							description: translation?.description || '',
							createdAt: translation?.createdAt || new Date(),
							synonyms: translation?.synonyms || [],
							translationId: translation?.translationId ?? null,
						} as Translation;
					})}
					selectedOptions={translations.filter(t => parentIds.includes(t.labelId))}
					onSelect={selectedOptions => {
						const newParentIds = selectedOptions.map(option => option.labelId);
						setParentIds(newParentIds);
					}}
					placeholder='Izaberite nadkategorije'
				/>
			</div>

			<div className='flex justify-center mt-6'>
				<SumbitButton>SAČUVAJ</SumbitButton>
			</div>
		</form>
	);
};

export default EditCategoryForm;
