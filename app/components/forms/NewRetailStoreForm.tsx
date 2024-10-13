'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import useDebounce from '@/utils/hooks/useDebounce';
import { useCreateRetailStore } from '@/app/helpers/api/retailStore';
import { useFetchLocations } from '@/app/helpers/api/location';
import {
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';
import { useCategoriesByPrefixAndLanguage } from '@/app/helpers/api/category';
import CustomModalAdmin from '../modals/CustomModalAdmin';

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
	error: string;
	loading: boolean;
}

const NewRetailStoreForm: React.FC<NewRetailStoreFormProps> = ({
	successMessage,
	setSuccessMessage,
	setError,
	setLoading,
	error,
	loading,
}) => {
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
	const { data: locations, isLoading: loadingLocations } = useFetchLocations({
		prefix: '',
		languageId: 1,
	});

	// Fetch kategorije iz API-ja
	const { data: articleCategories } = useCategoriesByPrefixAndLanguage({
		prefix: prefixAticleCategory,
		languageId: 1,
	});

	const { data: activityCategories } = useCategoriesByPrefixAndLanguage({
		prefix: prefixActivityCategory,
		languageId: 1,
	});

	const { data: objectTypeCategories } = useCategoriesByPrefixAndLanguage({
		prefix: prefixObjectTypeCategory,
		languageId: 1,
	});

	const [formData, setFormData] = useState({
		name: '',
		phoneNumber: '',
		email: '',
		website: '',
		countryId: 0,
		cityId: 0,
		cityPartId: 0,
		marketplaceId: 0,
		latitude: '',
		longitude: '',
		articleCategoryIds: [] as number[],
		activityCategoryIds: [] as number[],
		objectTypeCategoryIds: [] as number[],
	});

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

	// Filtriranje kategorija prema unetim pojmovima za pretragu
	const filteredArticleCategories = articleCategories?.filter((category: { name: string }) =>
		category.name.toLowerCase().includes(articleSearchQuery.toLowerCase())
	);
	const filteredActivityCategories = activityCategories?.filter((category: { name: string }) =>
		category.name.toLowerCase().includes(activitySearchQuery.toLowerCase())
	);
	const filteredObjectTypeCategories = objectTypeCategories?.filter((category: { name: string }) =>
		category.name.toLowerCase().includes(objectTypeSearchQuery.toLowerCase())
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: type === 'number' || name.endsWith('Id') ? parseInt(value, 10) || 0 : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		mutation.mutate(
			{
				name: formData.name,
				phoneNumber: formData.phoneNumber,
				email: formData.email,
				website: formData.website,
				newLocation: {
					countryId: formData.countryId,
					cityId: formData.cityId,
					cityPartId: formData.cityPartId,
					marketplaceId: formData.marketplaceId,
					address: 'Some Address',
				},
				coordinates: {
					latitude: parseFloat(formData.latitude),
					longitude: parseFloat(formData.longitude),
					locationDescription: 'Some location description',
				},
				articleCategoryIds: selectedArticleCategoryIds, // Save selected article categories
				activityCategoryIds: selectedActivityCategoryIds, // Save selected activity categories
				objectTypeCategoryIds: selectedObjectTypeCategoryIds, // Save selected object type categories
			},
			{
				onSuccess: () => {
					setSuccessMessage('Retail store created successfully!');
					setLoading(false);
				},
				onError: error => {
					setError(error.message);
					setLoading(false);
				},
			}
		);
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
				childrenIds = [...childrenIds, ...findAllChildren(child)]; // rekurzivno pronalazimo sve potomke
			});
		}

		return childrenIds;
	};

	const CategoryTree: React.FC<{
		categories: Category[];
		selectedCategories: number[];
		setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
	}> = ({ categories, selectedCategories, setSelectedCategories }) => {
		const handleCategoryChange = (category: Category) => {
			let newSelected = [...selectedCategories];

			// Ako je kategorija već izabrana, uklanjamo je i sve njene potomke
			if (newSelected.includes(category.id)) {
				// Uklonimo sve potomke
				const childrenIds = findAllChildren(category);
				newSelected = newSelected.filter(id => id !== category.id && !childrenIds.includes(id));
			} else {
				// Ako nije izabrana, dodajemo je i sve nadkategorije
				const parents = findAllParents(category, categories);
				const parentIds = parents.map(p => p.id);

				newSelected = [...new Set([...newSelected, category.id, ...parentIds])]; // Uklanjamo duplikate pomoću Set-a
			}

			setSelectedCategories(newSelected);
		};

		const renderCategories = (categories: Category[]) => {
			if (!categories || categories.length === 0) {
				return <p className='text-gray-500'>No categories available</p>;
			}

			return categories.map(category => (
				<div key={category.id} className='text-black mb-2'>
					<label className='flex items-center space-x-3'>
						<input
							type='checkbox'
							checked={selectedCategories.includes(category.id)}
							onChange={() => handleCategoryChange(category)}
							className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
						/>
						<span className='font-medium text-gray-900'>{category.name}</span>
					</label>
					{category.children && category.children.length > 0 && (
						<div className='ml-5 border-l border-gray-200 pl-4'>
							{renderCategories(category.children)}
						</div>
					)}
				</div>
			));
		};

		return <div>{renderCategories(categories)}</div>;
	};

	const toggleArticleModal = () => setIsArticleModalOpen(!isArticleModalOpen);
	const toggleActivityModal = () => setIsActivityModalOpen(!isActivityModalOpen);
	const toggleObjectTypeModal = () => setIsObjectTypeModalOpen(!isObjectTypeModalOpen);

	return (
		<form onSubmit={handleSubmit} className='space-y-8 bg-white p-8 rounded-lg shadow-md'>
			{/* Store Name */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='name' className='text-black font-semibold'>
					Store Name
				</label>
				<input
					id='name'
					name='name'
					type='text'
					value={formData.name}
					onChange={handleChange}
					placeholder='Enter store name'
					required
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* Phone Number */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='phoneNumber' className='text-black font-semibold'>
					Phone Number
				</label>
				<input
					id='phoneNumber'
					name='phoneNumber'
					type='text'
					value={formData.phoneNumber}
					onChange={handleChange}
					placeholder='Enter phone number'
					required
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* Email */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='email' className='text-black font-semibold'>
					Email
				</label>
				<input
					id='email'
					name='email'
					type='email'
					value={formData.email}
					onChange={handleChange}
					placeholder='Enter email'
					required
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* Website */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='website' className='text-black font-semibold'>
					Website
				</label>
				<input
					id='website'
					name='website'
					type='text'
					value={formData.website}
					onChange={handleChange}
					placeholder='Enter website'
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* Latitude */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='latitude' className='text-black font-semibold'>
					Latitude
				</label>
				<input
					id='latitude'
					name='latitude'
					type='number'
					step='any'
					value={formData.latitude}
					onChange={handleChange}
					placeholder='Enter latitude'
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* Longitude */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='longitude' className='text-black font-semibold'>
					Longitude
				</label>
				<input
					id='longitude'
					name='longitude'
					type='number'
					step='any'
					value={formData.longitude}
					onChange={handleChange}
					placeholder='Enter longitude'
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>

			{/* Country Selection */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='countryId' className='text-black font-semibold'>
					Select Country
				</label>
				<select
					id='countryId'
					name='countryId'
					value={formData.countryId}
					onChange={handleChange}
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
					<option value={0}>Select Country</option>
					{locations?.map((location: any) => (
						<option key={location.id} value={location.id}>
							{location.label.translations[0]?.translation || location.label.name}
						</option>
					))}
				</select>
			</div>

			{/* City Selection */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='cityId' className='text-black font-semibold'>
					Select City
				</label>
				<select
					id='cityId'
					name='cityId'
					value={formData.cityId}
					onChange={handleChange}
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
					<option value={0}>Select City</option>
					{filteredCities.map((city: any) => (
						<option key={city.id} value={city.id}>
							{city.label.translations[0]?.translation || city.label.name}
						</option>
					))}
				</select>
			</div>

			{/* City Part Selection */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='cityPartId' className='text-black font-semibold'>
					Select City Part
				</label>
				<select
					id='cityPartId'
					name='cityPartId'
					value={formData.cityPartId}
					onChange={handleChange}
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
					<option value={0}>Select City Part</option>
					{filteredCityParts.map((cityPart: any) => (
						<option key={cityPart.id} value={cityPart.id}>
							{cityPart.label.translations[0]?.translation || cityPart.label.name}
						</option>
					))}
				</select>
			</div>

			{/* Marketplace Selection */}
			<div className='flex flex-col space-y-2'>
				<label htmlFor='marketplaceId' className='text-black font-semibold'>
					Select Marketplace
				</label>
				<select
					id='marketplaceId'
					name='marketplaceId'
					value={formData.marketplaceId}
					onChange={handleChange}
					className='border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'>
					<option value={0}>Select Marketplace</option>
					{filteredMarketplaces.map((marketplace: any) => (
						<option key={marketplace.id} value={marketplace.id}>
							{marketplace.label.translations[0]?.translation || marketplace.label.name}
						</option>
					))}
				</select>
			</div>

			{/* Category Selection Buttons */}
			<div className='flex justify-between'>
				<button type='button' onClick={toggleArticleModal} className='bg-gray-200 p-2 rounded'>
					Select Article Categories
				</button>
				<button type='button' onClick={toggleActivityModal} className='bg-gray-200 p-2 rounded'>
					Select Activity Categories
				</button>
				<button type='button' onClick={toggleObjectTypeModal} className='bg-gray-200 p-2 rounded'>
					Select Object Type Categories
				</button>
			</div>

			{/* Article Categories Modal */}
			{isArticleModalOpen && (
				<CustomModalAdmin
					isOpen={isArticleModalOpen}
					onClose={toggleArticleModal}
					title='Select Article Categories'>
					<input
						type='text'
						value={articleSearchQuery}
						onChange={e => setArticleSearchQuery(e.target.value)}
						placeholder='Search categories...'
						className='border p-2 rounded w-full mb-4'
					/>
					<CategoryTree
						categories={filteredArticleCategories || []}
						selectedCategories={selectedArticleCategoryIds}
						setSelectedCategories={setSelectedArticleCategoryIds}
					/>
				</CustomModalAdmin>
			)}

			{/* Activity Categories Modal */}
			{isActivityModalOpen && (
				<CustomModalAdmin
					isOpen={isActivityModalOpen}
					onClose={toggleActivityModal}
					title='Select Activity Categories'>
					<input
						type='text'
						value={activitySearchQuery}
						onChange={e => setActivitySearchQuery(e.target.value)}
						placeholder='Search categories...'
						className='border p-2 rounded w-full mb-4'
					/>
					<CategoryTree
						categories={filteredActivityCategories || []}
						selectedCategories={selectedActivityCategoryIds}
						setSelectedCategories={setSelectedActivityCategoryIds}
					/>
				</CustomModalAdmin>
			)}

			{/* Object Type Categories Modal */}
			{isObjectTypeModalOpen && (
				<CustomModalAdmin
					isOpen={isObjectTypeModalOpen}
					onClose={toggleObjectTypeModal}
					title='Select Object Type Categories'>
					<input
						type='text'
						value={objectTypeSearchQuery}
						onChange={e => setObjectTypeSearchQuery(e.target.value)}
						placeholder='Search categories...'
						className='border p-2 rounded w-full mb-4'
					/>
					<CategoryTree
						categories={filteredObjectTypeCategories || []}
						selectedCategories={selectedObjectTypeCategoryIds}
						setSelectedCategories={setSelectedObjectTypeCategoryIds}
					/>
				</CustomModalAdmin>
			)}

			{/* Submit Button */}
			<div className='flex justify-end'>
				<button
					type='submit'
					disabled={loading}
					className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500'>
					{loading ? 'Loading...' : 'Submit'}
				</button>
			</div>

			{/* Error and Success Messages */}
			{mutation.isError && <p className='text-red-500'>{mutation.error?.message}</p>}
			{mutation.isSuccess && <p className='text-green-500'>{successMessage}</p>}
		</form>
	);
};

export default NewRetailStoreForm;
