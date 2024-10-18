'use client';
import React, { useState, ChangeEvent } from 'react';
import { useCreateRetailStore } from '@/app/helpers/api/retailStore';
import { useFetchLocations } from '@/app/helpers/api/location';
import {
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';
import { useCategoriesByPrefixAndLanguage } from '@/app/helpers/api/category';
import LabelInputForm from '../input/LabelInputForm';
import SelectInputForm from '../input/SelectInputForm';
import FormDefaultButton from '../buttons/FormDefaultButton';
import SubmitButton from '../buttons/SubmitButton';
import CategoryModal from '../modals/CategoryModal';
import H3Title from '../text/H3Title';
import { retailInit } from '@/utils/helpers/initialStates';
import RetailStoreForm from './RetailStoreForm';

interface Category {
	id: number;
	name: string;
	children: Category[];
	parents?: Category[];
}

interface NewRetailStoreFormProps {
	successMessage: string | null;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
	locations: any[];
	formData: any;
	setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const NewRetailStoreForm: React.FC<NewRetailStoreFormProps> = ({
	successMessage,
	setSuccessMessage,
	setError,
	setLoading,
	loading,
	articleCategories,
	activityCategories,
	objectTypeCategories,
	locations,
}) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [selectedArticleCategoryIds, setSelectedArticleCategoryIds] = useState<number[]>([]);
	const [selectedActivityCategoryIds, setSelectedActivityCategoryIds] = useState<number[]>([]);
	const [selectedObjectTypeCategoryIds, setSelectedObjectTypeCategoryIds] = useState<number[]>([]);
	const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
	const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
	const [isObjectTypeModalOpen, setIsObjectTypeModalOpen] = useState(false);
	const [articleSearchQuery, setArticleSearchQuery] = useState('');
	const [activitySearchQuery, setActivitySearchQuery] = useState('');
	const [objectTypeSearchQuery, setObjectTypeSearchQuery] = useState('');
	const mutation = useCreateRetailStore();

	const [formData, setFormData] = useState(retailInit);

	// Logika za filtriranje gradova, delova grada i pijaca na osnovu odabira
	const filteredCities = formData.countryId
		? locations?.find((country: { id: number }) => country.id === formData.countryId)?.cities || []
		: [];

	const filteredCityParts = formData.cityId
		? filteredCities.find((city: { id: number }) => city.id === formData.cityId)?.cityParts || []
		: [];

	const filteredMarketplaces = formData.cityPartId
		? filteredCityParts.find((cityPart: { id: number }) => cityPart.id === formData.cityPartId)
				?.marketplaces || []
		: [];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]:
				type === 'number' && value === ''
					? ''
					: type === 'number'
					? parseFloat(value) || ''
					: value,
		}));
	};

	const handleSelectChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: type === 'number' || name.endsWith('Id') ? parseInt(value, 10) || 0 : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newRetailStore = {
			name: formData.name,
			phoneNumber: formData.phoneNumber,
			email: formData.email,
			website: formData.website,
			// Direktne veze sa country, city, cityPart i marketplace umesto location
			countryId: formData.countryId,
			cityId: formData.cityId,
			cityPartId: formData.cityPartId || null,
			marketplaceId: formData.marketplaceId || null,
			coordinates: {
				latitude: formData.latitude,
				longitude: formData.longitude,
				locationDescription: 'Some location description',
			},
			articleCategoryIds: selectedArticleCategoryIds,
			activityCategoryIds: selectedActivityCategoryIds,
			objectTypeCategoryIds: selectedObjectTypeCategoryIds,
		};

		mutation.mutate(newRetailStore, {
			onSuccess: () => {
				setSuccessMessage('Retail store created successfully!');

				setFormData(retailInit);
				setSelectedArticleCategoryIds([]);
				setSelectedActivityCategoryIds([]);
				setSelectedObjectTypeCategoryIds([]);
			},
			onError: error => {
				setError(error.message);
			},
		});
	};

	const findAllParents = (category: Category, allCategories: Category[]): Category[] => {
		let parents: Category[] = [];

		if (category.parents && category.parents.length > 0) {
			category.parents.forEach((parent: Category) => {
				parents.push(parent);
				parents = [...parents, ...findAllParents(parent, allCategories)];
			});
		}

		return parents;
	};

	const findAllChildren = (category: Category): number[] => {
		let childrenIds: number[] = [];

		if (category.children && category.children.length > 0) {
			category.children.forEach(child => {
				childrenIds.push(child.id);
				childrenIds = [...childrenIds, ...findAllChildren(child)];
			});
		}

		return childrenIds;
	};

	const toggleFormVisibility = () => setIsFormOpen(!isFormOpen);
	const toggleArticleModal = () => setIsArticleModalOpen(!isArticleModalOpen);
	const toggleActivityModal = () => setIsActivityModalOpen(!isActivityModalOpen);
	const toggleObjectTypeModal = () => setIsObjectTypeModalOpen(!isObjectTypeModalOpen);

	return (
		<div className='bg-white rounded-lg pt-4 flex flex-col'>
			<div
				className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
					isFormOpen ? 'max-h-[2000px]' : 'max-h-0'
				}`}>
				<H3Title text='NOVI PRODAJNI OBJEKAT' />
				<div className='flex justify-between gap-1 px-8 pt-4'>
					<FormDefaultButton onClick={toggleArticleModal} label='Kategorije proizvoda' />
					<FormDefaultButton onClick={toggleActivityModal} label='Kategorije delatnosti' />
					<FormDefaultButton onClick={toggleObjectTypeModal} label='Tip pr. objekata' />
				</div>

				<RetailStoreForm
					formData={formData}
					locations={locations}
					handleChange={handleChange}
					handleSelectChange={handleSelectChange}
					handleSubmit={handleSubmit}
					loading={loading}
					mutation={mutation}
					successMessage={successMessage}
					filteredCities={filteredCities}
					filteredCityParts={filteredCityParts}
					filteredMarketplaces={filteredMarketplaces}
				/>
			</div>
			<CategoryModal
				isOpen={isArticleModalOpen}
				onClose={toggleArticleModal}
				title='Select Article Categories'
				searchQuery={articleSearchQuery}
				setSearchQuery={setArticleSearchQuery}
				categories={articleCategories || []}
				selectedCategories={selectedArticleCategoryIds}
				setSelectedCategories={setSelectedArticleCategoryIds}
			/>
			<CategoryModal
				isOpen={isActivityModalOpen}
				onClose={toggleActivityModal}
				title='Select Article Categories'
				searchQuery={activitySearchQuery}
				setSearchQuery={setActivitySearchQuery}
				categories={activityCategories || []}
				selectedCategories={selectedActivityCategoryIds}
				setSelectedCategories={setSelectedActivityCategoryIds}
			/>
			<CategoryModal
				isOpen={isObjectTypeModalOpen}
				onClose={toggleObjectTypeModal}
				title='Select Article Categories'
				searchQuery={objectTypeSearchQuery}
				setSearchQuery={setObjectTypeSearchQuery}
				categories={objectTypeCategories || []}
				selectedCategories={selectedObjectTypeCategoryIds}
				setSelectedCategories={setSelectedObjectTypeCategoryIds}
			/>

			<button
				onClick={toggleFormVisibility}
				className='bg-sky-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center gap-2'>
				{isFormOpen ? 'Sakrij formu' : 'Prikaži formu'}
				<span
					className={`transform transition-transform duration-300 ease-in-out ${
						isFormOpen ? 'rotate-180' : 'rotate-0'
					}`}>
					&#9660;
				</span>
			</button>
		</div>
	);
};

export default NewRetailStoreForm;
