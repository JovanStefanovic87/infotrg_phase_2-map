import React, { ChangeEvent, useState } from 'react';
import { RetailAdmin, RetailFormState } from '@/utils/helpers/types';
import { useUpdateRetailStore, useDeleteRetailStore } from '@/app/helpers/api/retailStore';
import InputDefault from '../input/InputDefault';
import RetailStoreItem from './RetailStoreItem';
import RetailStoreForm from '../forms/RetailStoreForm';
import EditModalContainer from '../forms/EditModalContainer';
import { retailInit } from '@/utils/helpers/initialStates';
import FormDefaultButton from '../buttons/FormDefaultButton';
import CategoryModal from '../modals/CategoryModal';
import ConfirmationModal from '../modals/systemModals/ConfirmationModal';
import { SimplifiedCategory } from '@/utils/helpers/types';

interface Category {
	id: number;
	name: string;
	children: Category[];
	parents?: SimplifiedCategory[];
}

interface Props {
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	retails: RetailAdmin[];
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
	locations: any[];
}

const RetailStoreList: React.FC<Props> = ({
	setSuccessMessage,
	setError,
	retails,
	articleCategories,
	activityCategories,
	objectTypeCategories,
	locations,
}) => {
	const mutation = useUpdateRetailStore();
	const deleteMutation = useDeleteRetailStore();
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [formData, setFormData] = useState(retailInit);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedArticleCategoryIds, setSelectedArticleCategoryIds] = useState<number[]>(
		formData.articleCategoryIds || []
	);
	const [selectedActivityCategoryIds, setSelectedActivityCategoryIds] = useState<number[]>(
		formData.activityCategoryIds || []
	);
	const [selectedObjectTypeCategoryIds, setSelectedObjectTypeCategoryIds] = useState<number[]>(
		formData.objectTypeCategoryIds || []
	);
	const [currentRetail, setCurrentRetail] = useState<RetailFormState | null>(null);
	const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
	const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
	const [isObjectTypeModalOpen, setIsObjectTypeModalOpen] = useState(false);
	const [articleSearchQuery, setArticleSearchQuery] = useState('');
	const [activitySearchQuery, setActivitySearchQuery] = useState('');
	const [objectTypeSearchQuery, setObjectTypeSearchQuery] = useState('');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [retailToDelete, setRetailToDelete] = useState<RetailAdmin | null>(null);
	const filteredRetails = retails
		.filter(
			retail =>
				retail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				retail.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				retail.email?.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => a.name.localeCompare(b.name));

	const handleSubmitEdit = (e: React.FormEvent) => {
		e.preventDefault();

		const updatedRetailStoreData: RetailFormState = {
			id: currentRetail?.id || 0,
			name: formData.name,
			phoneNumber: formData.phoneNumber,
			email: formData.email,
			website: formData.website,
			latitude: formData.latitude,
			longitude: formData.longitude,
			locationDescription: formData.locationDescription,
			stateId: formData.stateId,
			countyId: formData.countyId,
			cityId: formData.cityId || null,
			suburbId: formData.suburbId || null,
			articleCategoryIds: selectedArticleCategoryIds,
			activityCategoryIds: selectedActivityCategoryIds,
			objectTypeCategoryIds: selectedObjectTypeCategoryIds,
		};

		mutation.mutate(
			{
				id: currentRetail?.id?.toString() || '',
				data: updatedRetailStoreData,
			},
			{
				onSuccess: () => {
					setSuccessMessage('Prodajni objekat uspešno ažuriran!');
					handleModalClose();
				},
				onError: error => {
					setError(error.message || 'Greška prilikom ažuriranja prodajnog objekta');
				},
			}
		);
	};

	const handleEditClick = (retail: RetailAdmin) => {
		setFormData({
			name: retail.name || '',
			phoneNumber: retail.phoneNumber || '',
			email: retail.email || '',
			website: retail.website || '',
			latitude: retail.latitude || 0,
			longitude: retail.longitude || 0,
			locationDescription: retail.locationDescription || '',
			stateId: retail.state?.id || 0,
			countyId: retail.county?.id || 0,
			cityId: retail.city?.id || 0,
			suburbId: retail.suburb?.id || 0,
			articleCategoryIds: retail.articleCategories?.map(category => category.id) || [],
			activityCategoryIds: retail.activityCategories?.map(category => category.id) || [],
			objectTypeCategoryIds: retail.objectTypeCategories?.map(category => category.id) || [],
			address: retail.address || '',
		});

		setSelectedArticleCategoryIds(retail.articleCategories?.map(category => category.id) || []);
		setSelectedActivityCategoryIds(retail.activityCategories?.map(category => category.id) || []);
		setSelectedObjectTypeCategoryIds(
			retail.objectTypeCategories?.map(category => category.id) || []
		);

		setCurrentRetail({
			id: retail.id,
			name: retail.name || '',
			phoneNumber: retail.phoneNumber || '',
			email: retail.email || '',
			website: retail.website || '',
			latitude: retail.latitude || 0,
			longitude: retail.longitude || 0,
			locationDescription: retail.locationDescription || '',
			stateId: retail.state?.id || 0,
			countyId: retail.county?.id || 0,
			cityId: retail.city?.id || 0,
			suburbId: retail.suburb?.id || 0,
			articleCategoryIds: retail.articleCategories?.map(category => category.id) || [],
			activityCategoryIds: retail.activityCategories?.map(category => category.id) || [],
			objectTypeCategoryIds: retail.objectTypeCategories?.map(category => category.id) || [],
			address: retail.address || '',
		});

		setIsModalOpen(true);
	};

	const handleDeleteClick = (retail: RetailAdmin) => {
		// Otvori modal i postavi retail koji treba da se obriše
		setRetailToDelete(retail);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = () => {
		if (retailToDelete) {
			deleteMutation.mutate(retailToDelete.id.toString(), {
				onSuccess: () => {
					setSuccessMessage('Prodajni objekat uspešno obrisan!');
					setIsDeleteModalOpen(false); // Zatvori modal
				},
				onError: error => {
					setError(error.message || 'Greška prilikom brisanja prodajnog objekta');
				},
			});
		}
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setCurrentRetail(null);
	};

	const filteredCounties = formData.stateId
		? locations?.find((state: { id: number }) => state.id === formData.stateId)?.counties || []
		: [];

	const filteredCities = formData.countyId
		? filteredCounties.find((county: { id: number }) => county.id === formData.countyId)?.cities ||
		  []
		: [];

	const filteredSuburbs = formData.cityId
		? filteredCities.find((city: { id: number }) => city.id === formData.cityId)?.suburbs || []
		: [];

	const findAllParents = (category: Category, allCategories: Category[]): Category[] => {
		let parents: Category[] = [];

		if (category.parents && category.parents.length > 0) {
			category.parents.forEach((parent: SimplifiedCategory) => {
				// Convert SimplifiedCategory to Category
				const parentAsCategory: Category = {
					...parent,
					children: [], // Add empty children
					parents: [], // Prevent further recursion if unnecessary
				};
				parents.push(parentAsCategory);
				parents = [...parents, ...findAllParents(parentAsCategory, allCategories)];
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
		const { name, value } = e.target;

		setFormData(prevFormData => ({
			...prevFormData,
			[name]: name.endsWith('Id') ? parseInt(value, 10) || 0 : value, // Pretvori samo ID-ove u brojeve
		}));
	};

	const toggleArticleModal = () => setIsArticleModalOpen(!isArticleModalOpen);
	const toggleActivityModal = () => setIsActivityModalOpen(!isActivityModalOpen);
	const toggleObjectTypeModal = () => setIsObjectTypeModalOpen(!isObjectTypeModalOpen);

	return (
		<div>
			<div className='mb-4'>
				<InputDefault
					placeholder='Brza pretraga'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
			</div>
			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onRequestClose={() => setIsDeleteModalOpen(false)}
				onConfirm={confirmDelete}
				mainText='Da li ste sigurni da želite da obrišete'
				subject='prodajni objekat'
				subjectName={retailToDelete?.name || ''}
			/>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredRetails.map(retail => (
					<RetailStoreItem
						key={retail.id}
						retail={retail}
						onEditClick={handleEditClick}
						onDeleteClick={() => handleDeleteClick(retail)}
					/>
				))}
			</div>
			{currentRetail && (
				<EditModalContainer
					isOpen={isModalOpen}
					onClose={handleModalClose}
					title='Izmeni prodajni objekat'>
					<>
						<div className='flex justify-between gap-1 px-8 pt-4'>
							<FormDefaultButton onClick={toggleArticleModal} label='Kategorije proizvoda' />
							<FormDefaultButton onClick={toggleActivityModal} label='Kategorije delatnosti' />
							<FormDefaultButton onClick={toggleObjectTypeModal} label='Tip pr. objekata' />
						</div>
						<RetailStoreForm
							formData={formData}
							states={locations}
							handleChange={handleChange}
							handleSelectChange={handleSelectChange}
							handleSubmit={handleSubmitEdit}
							loading={false}
							mutation={{}}
							successMessage={null}
							filteredCounties={filteredCounties}
							filteredCities={filteredCities}
							filteredSuburbs={filteredSuburbs}
						/>
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
					</>
				</EditModalContainer>
			)}
		</div>
	);
};

export default RetailStoreList;
