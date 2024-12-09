import React, { useEffect } from 'react';
import H2 from '../../components/text/H2';
import Image from 'next/image';
import TextBlockItem from '../../ulaganje/collapsible/TextBlockItem';
import ChooseImageButton from '../../components/buttons/ChooseImageButton';
import CustomCombobox from '../../components/input/CustomCombobox';
import SumbitButton from '../../components/buttons/SubmitButton';
import {
	Translation,
	Category,
	CategoryWithTranslations,
	Language,
	TranslationUpdate,
	relatedCategory,
} from '../../../utils/helpers/types';
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
	filterCategoriesForSelect: () => CategoryWithTranslations[];
	setIsIconPickerOpen: (isOpen: boolean) => void;
	handleSubmitEdit: (e: React.FormEvent<HTMLFormElement>) => void;
	relatedIds: number[];
	setRelatedIds: (relatedIds: number[]) => void;
	currentEditCategory: CategoryWithTranslations | null;
	setCurrentEditCategory: React.Dispatch<React.SetStateAction<CategoryWithTranslations | null>>;
}

const EditCategoryForm: React.FC<Props> = ({
	currentIcon,
	newIcon,
	languages,
	handleFileChange,
	setNewTranslations,
	parentIds,
	categories,
	filterCategoriesForSelect,
	setIsIconPickerOpen,
	handleSubmitEdit,
	currentEditCategory,
	setCurrentEditCategory,
}) => {
	const flattenCategories = (nestedCategories: Category[]) => {
		return nestedCategories.reduce((acc, category) => {
			acc.push(category);
			if (category.children && category.children.length > 0) {
				acc = acc.concat(flattenCategories(category.children));
			}
			return acc;
		}, [] as Category[]);
	};

	const updateRelatedIds = (newRelatedIds: number[]) => {
		if (currentEditCategory) {
			const updatedRelatedCategories = [
				...(currentEditCategory.relatedCategories || []), // Postojeće `relatedCategories`
				...newRelatedIds
					.map(id => {
						const category = flatCategories.find(cat => cat.labelId === id);
						// Pretvorite `Category` u `relatedCategory`
						return category
							? ({
									id: category.id,
									labelId: category.labelId,
									name: category.name,
									iconId: category.iconId,
									icon: null, // `relatedCategory` nema `icon` podatke
									parents: [], // `relatedCategory` nema roditelje
									children: [], // `relatedCategory` nema decu
							  } as relatedCategory)
							: null;
					})
					.filter((cat): cat is relatedCategory => Boolean(cat)), // Uklonite `null` vrednosti
			];

			setCurrentEditCategory({
				...currentEditCategory,
				relatedCategories: [...new Set(updatedRelatedCategories)], // Uklanjanje duplikata
			});
		}
	};

	const updateTranslationField = (
		languageId: number,
		field: 'translation' | 'description' | 'synonyms',
		value: string | string[]
	) => {
		setCurrentEditCategory(prev => {
			if (!prev) return null;

			return {
				...prev,
				label: {
					...prev.label,
					translations: prev.label.translations.map((t: { languageId: number }) =>
						t.languageId === languageId
							? {
									...t,
									[field]:
										field === 'synonyms' && Array.isArray(value)
											? value.map(v => ({ synonym: v }))
											: value,
							  }
							: t
					),
				},
			};
		});
	};

	const updateParentIds = (newParentIds: number[]) => {
		if (currentEditCategory) {
			const updatedParents = [
				...(currentEditCategory.parents || []),
				...newParentIds
					.map(id => flatCategories.find(cat => cat.labelId === id))
					.filter((cat): cat is Category => Boolean(cat)),
			];

			setCurrentEditCategory({
				...currentEditCategory,
				parents: [...new Set(updatedParents)],
			});
		}
	};

	const flatCategories = flattenCategories(categories);
	const uniqueParentIds = Array.from(new Set(parentIds));

	useEffect(() => {
		if (!currentEditCategory) return;

		const updatedTranslations = currentEditCategory.label.translations.map(
			(t: { id: any; languageId: any; translation: any; description: any; synonyms: any[] }) => ({
				translationId: t.id,
				languageId: t.languageId,
				translation: t.translation,
				description: t.description || '',
				synonyms: t.synonyms?.map(s => s.synonym) || [],
			})
		);

		setNewTranslations(prev => {
			const isSame = JSON.stringify(prev) === JSON.stringify(updatedTranslations);
			return isSame ? prev : updatedTranslations;
		});
	}, [currentEditCategory, setNewTranslations]);

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
								label={`${language.name} naziv`}
								onChange={e => updateTranslationField(language.id, 'translation', e.target.value)}
								value={
									currentEditCategory?.label.translations.find(
										(t: { languageId: number }) => t.languageId === language.id
									)?.translation || ''
								}
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
								onChange={e => updateTranslationField(language.id, 'description', e.target.value)}
								value={
									currentEditCategory?.label.translations.find(
										(t: { languageId: number }) => t.languageId === language.id
									)?.description || ''
								}
							/>
						</div>

						{/* Synonyms Input */}
						<div>
							<LabelInputDefault
								label={`${language.name} sinonimi`}
								onChange={e =>
									updateTranslationField(
										language.id,
										'synonyms',
										e.target.value.split(',').map(s => s.trim())
									)
								}
								value={
									currentEditCategory?.label.translations
										.find((t: { languageId: number }) => t.languageId === language.id)
										?.synonyms.map((s: { synonym: any }) => s.synonym)
										.join(', ') || ''
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
					{currentEditCategory?.relatedCategories?.map(relatedCategory => (
						<li key={relatedCategory.id} className='flex items-center justify-between'>
							<span className='text-sm text-gray-800'>{relatedCategory.name || 'Nepoznato'}</span>
							<DeleteTextButton
								stateId={relatedCategory.id}
								stateIds={currentEditCategory?.relatedCategories?.map(related => related.id) || []}
								setStateIds={() => {
									if (currentEditCategory) {
										const updatedRelatedCategories =
											currentEditCategory.relatedCategories?.filter(
												related => related.id !== relatedCategory.id // Ovde koristimo `id` umesto `labelId`
											) || [];
										setCurrentEditCategory({
											...currentEditCategory,
											relatedCategories: updatedRelatedCategories, // Postavljamo samo ažuriranu listu
										});
									}
								}}
							/>
						</li>
					))}
				</ul>

				<CustomCombobox
					options={filterCategoriesForSelect().map(cat => {
						const translation = cat.translations.find(t => t.languageId === 1);
						return {
							id: cat.id,
							labelId: cat.labelId,
							languageId: 1,
							translation: translation?.name || 'Ne postoji prevod',
						} as Translation;
					})}
					selectedOptions={
						currentEditCategory?.relatedCategories?.map(cat => ({
							id: cat.id,
							labelId: cat.labelId,
							languageId: 1, // Dodaj validan languageId (može biti dinamičan ako je potrebno)
							translation: cat.name || 'Ne postoji prevod',
						})) || []
					}
					onSelect={selectedOptions => {
						const newRelatedIds = selectedOptions.map(option => option.labelId);
						updateRelatedIds(newRelatedIds);
					}}
					placeholder='Izaberite povezanu kategoriju'
				/>
			</div>

			{/* Parent Categories Section */}
			<div className='mb-6 w-full'>
				<H3 text='Izabrane natkategorije:' />
				<ul className='list-disc pl-5 text-black space-y-2 mb-4 max-h-48 overflow-y-auto'>
					{uniqueParentIds.length > 0 ? (
						uniqueParentIds.map(parentId => {
							const parentCategory = flatCategories.find(cat => cat.id === parentId);
							return (
								<li key={`parent-${parentId}`} className='flex items-center justify-between'>
									<span className='text-sm text-gray-800'>
										{parentCategory ? parentCategory.name : 'Prevod nije dostupan'}
									</span>
									<DeleteTextButton
										stateId={parentId}
										stateIds={currentEditCategory?.parents.map(parent => parent.id) || []}
										setStateIds={() => {
											if (currentEditCategory) {
												const updatedParents = currentEditCategory.parents.filter(
													parent => parent.id !== parentId
												);
												setCurrentEditCategory({
													...currentEditCategory,
													parents: updatedParents,
												});
											}
										}}
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
						const translation = cat.translations.find(t => t.languageId === 1);
						return {
							id: cat.id,
							labelId: cat.labelId,
							languageId: 1,
							translation: translation?.name || 'Ne postoji prevod',
						} as Translation;
					})}
					selectedOptions={
						currentEditCategory?.parents.map(parent => ({
							id: parent.id,
							labelId: parent.labelId,
							languageId: 1, // Dodaj validan languageId (ako je statičan ili dohvaćen iz nekog drugog izvora)
							translation: parent.name || 'Ne postoji prevod',
						})) || []
					}
					onSelect={selectedOptions => {
						const newParentIds = selectedOptions.map(option => option.labelId);
						updateParentIds(newParentIds);
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
