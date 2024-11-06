import H2 from '../../components/text/H2';
import Image from 'next/image';
import TextBlockItem from '../../ulaganje/collapsible/TextBlockItem';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import CustomCombobox from '../../components/input/CustomCombobox';
import SumbitButton from '../../components/buttons/SubmitButton';
import { Translation, Category, Language, TranslationUpdate } from '../../../utils/helpers/types';
import UploadNewIconOnEditButton from '../buttons/UploadNewIconOnEditButton';
import LabelInputDefault from '../input/LabelInputDefault';
import Label from '../text/Label';
import H3 from '../text/H3';
import DeleteTextButton from '../buttons/DeleteTextButton';
import TextNormal from '../text/TextNormal';

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
	const handleTranslationChange = (languageId: number, translation: string) => {
		setNewTranslations(prevTranslations =>
			prevTranslations.map(t => (t.languageId === languageId ? { ...t, translation } : t))
		);
	};

	const handleDescriptionChange = (languageId: number, description: string) => {
		setNewTranslations(prevTranslations =>
			prevTranslations.map(t => (t.languageId === languageId ? { ...t, description } : t))
		);
	};

	const handleSynonymsChange = (languageId: number, synonyms: string) => {
		const synonymsArray = synonyms.split(',').map(synonym => synonym.trim());
		setNewTranslations(prevTranslations =>
			prevTranslations.map(t =>
				t.languageId === languageId ? { ...t, synonyms: synonymsArray } : t
			)
		);
	};

	const flattenCategories = (nestedCategories: Category[]) => {
		return nestedCategories.reduce((acc, category) => {
			// Dodajemo trenutnu kategoriju u akumulator
			acc.push(category);
			// Ako kategorija ima children, rekurzivno dodajemo sve podkategorije
			if (category.children && category.children.length > 0) {
				acc = acc.concat(flattenCategories(category.children));
			}
			return acc;
		}, [] as Category[]);
	};

	const flatCategories = flattenCategories(categories);
	const uniqueParentIds = Array.from(new Set(parentIds));

	console.log('categories', categories);
	console.log('parentId', parentIds);
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
				) : undefined}
				{newIcon && (
					<div className='mt-4'>
						<TextNormal text='Nova ikonica za upload:' />
						<Image
							src={URL.createObjectURL(newIcon)}
							alt='New Icon Preview'
							width={100}
							height={100}
						/>
					</div>
				)}
				<div className='flex w-full justify-between space-x-4'>
					<UploadNewIconOnEditButton onChange={handleFileChange} />
					<ChooseImageButton onClick={() => setIsIconPickerOpen(true)} label='Izbor ikonice' />
				</div>
			</div>

			{/* Translations and Synonyms */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
				{languages.map(language => (
					<div key={language.id} className='flex flex-col text-black space-y-4'>
						{/* Translation Input */}
						<div>
							<LabelInputDefault
								label={`${language.name.charAt(0).toUpperCase()}${language.name
									.slice(1)
									.toLocaleLowerCase()} naziv`}
								onChange={e => handleTranslationChange(language.id, e.target.value)}
								value={newTranslations.find(t => t.languageId === language.id)?.translation || ''}
								id={`translation-${language.id}`}
								placeholder=''
							/>
						</div>

						{/* Description Input */}
						<div>
							<Label color='black' htmlFor={`description-${language.id}`}>{`${language.name
								.charAt(0)
								.toUpperCase()}${language.name.slice(1).toLocaleLowerCase()} opis`}</Label>
							<textarea
								id={`description-${language.id}`}
								className='border p-2 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-sky-500'
								value={newTranslations.find(t => t.languageId === language.id)?.description || ''}
								onChange={e => handleDescriptionChange(language.id, e.target.value)}
							/>
						</div>

						{/* Synonyms Input */}
						<div>
							<LabelInputDefault
								label={`${language.name.charAt(0).toUpperCase()}${language.name
									.slice(1)
									.toLocaleLowerCase()} sinonimi`}
								onChange={e => handleSynonymsChange(language.id, e.target.value)}
								value={
									newTranslations.find(t => t.languageId === language.id)?.synonyms.join(', ') || ''
								}
								id={`synonyms-${language.id}`}
								placeholder='Odvojite ih zarezom'
							/>
						</div>
					</div>
				))}
			</div>

			<div className='mb-6 w-full'>
				<H3 text='Povezane kategorije' />
				<ul className='list-disc pl-5 text-black space-y-2 mb-4 max-h-48 overflow-y-auto'>
					{relatedIds.map(relatedId => {
						const relatedCategory = flatCategories.find(cat => cat.id === relatedId);
						return (
							<li key={`related-${relatedId}`} className='flex items-center justify-between'>
								<span className='text-sm text-gray-800'>
									{relatedCategory ? relatedCategory.name : 'Nepoznato'}
								</span>
								<DeleteTextButton
									relatedId={relatedId}
									relatedIds={relatedIds}
									setRelatedIds={setRelatedIds}
								/>
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
						setRelatedIds(newRelatedIds);
					}}
					placeholder='Select related categories'
				/>
			</div>

			{/* Parent Categories Section */}
			<div className='mb-6 w-full'>
				<H3 text='Izabrane natkategorije:' />
				<ul className='list-disc pl-5 text-black space-y-2 mb-4 max-h-48 overflow-y-auto'>
					{uniqueParentIds.length > 0 ? (
						uniqueParentIds.map(parentId => {
							// Pronalazimo odgovarajuću kategoriju iz `flatCategories` za dati `parentId`
							const parentCategory = flatCategories.find(cat => cat.id === parentId);
							return (
								<li key={`parent-${parentId}`} className='flex items-center justify-between'>
									<span className='text-sm text-gray-800'>
										{/* Prikazujemo ime kategorije ili default tekst ako kategorija nije pronađena */}
										{parentCategory ? parentCategory.name : 'Prevod nije dostupan'}
									</span>
									<DeleteTextButton
										relatedId={parentId}
										relatedIds={parentIds}
										setRelatedIds={setParentIds}
									/>
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
						setParentIds(prevParentIds => [...new Set([...prevParentIds, ...newParentIds])]);
					}}
					placeholder='Izaberite natkategorije'
				/>
			</div>

			<div className='flex justify-center mt-6'>
				<SumbitButton>SAČUVAJ</SumbitButton>
			</div>
		</form>
	);
};

export default EditCategoryForm;
