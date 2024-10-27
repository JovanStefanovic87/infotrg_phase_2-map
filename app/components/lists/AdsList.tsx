import React, { useState } from 'react';
import { AdFormState, AdAdmin } from '@/utils/helpers/types';
import EditModalContainer from '../forms/EditModalContainer';
import AdItem from './AdItem';
import InputDefault from '../input/InputDefault';
import ConfirmationModal from '../modals/systemModals/ConfirmationModal';
import { useDeleteAd, useUpdateAd } from '@/app/helpers/api/ads';
import FormDefaultButton from '../buttons/FormDefaultButton';
import AdForm from '../forms/AdForm';
import CategoryModal from '../modals/CategoryModal';
import { adInit } from '@/utils/helpers/initialStates';
import { useFetchImages, useUploadImages } from '@/app/helpers/api/images';

interface Props {
	setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
	successMessage: string | null;
	setError: React.Dispatch<React.SetStateAction<string>>;
	ads: AdAdmin[];
	locations: any[];
	articleCategories: any[];
	activityCategories: any[];
	objectTypeCategories: any[];
	retails: any[];
	imagesData: any[];
	filteredCities: any[];
	filteredCityParts: any[];
	filteredMarketplaces: any[];
	filteredStores?: any[];
}

const AdsList: React.FC<Props> = ({
	setSuccessMessage,
	successMessage,
	setError,
	ads,
	locations,
	articleCategories,
	activityCategories,
	objectTypeCategories,
	retails,
	imagesData,
	filteredCities,
	filteredCityParts,
	filteredMarketplaces,
	filteredStores,
}) => {
	const { mutate: deleteAd } = useDeleteAd();
	const { mutate: updateAd } = useUpdateAd();
	const { mutate: uploadImage } = useUploadImages();
	const [formData, setFormData] = useState<AdFormState>(adInit);
	const [loading, setLoading] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
	const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
	const [isObjectTypeModalOpen, setIsObjectTypeModalOpen] = useState(false);
	const [selectedArticleCategoryIds, setSelectedArticleCategoryIds] = useState<number[]>(
		formData.articleCategoryIds || []
	);
	const [selectedActivityCategoryIds, setSelectedActivityCategoryIds] = useState<number[]>(
		formData.activityCategoryIds || []
	);
	const [selectedObjectTypeCategoryIds, setSelectedObjectTypeCategoryIds] = useState<number[]>(
		formData.objectTypeCategoryIds || []
	);
	const [articleSearchQuery, setArticleSearchQuery] = useState('');
	const [activitySearchQuery, setActivitySearchQuery] = useState('');
	const [objectTypeSearchQuery, setObjectTypeSearchQuery] = useState('');
	const [adToDelete, setAdToDelete] = useState<AdAdmin | null>(null);

	const [currentAd, setCurrentAd] = useState<AdAdmin | null>(null);

	// Filter ads based on the search query
	const filteredAds = ads
		.filter(ad => ad.name.toLowerCase().includes(searchQuery.toLowerCase()))
		.sort((a, b) => a.name.localeCompare(b.name));

	const handleDeleteClick = (ad: AdAdmin) => {
		setAdToDelete(ad);
		setIsDeleteModalOpen(true); // Otvorite modal za potvrdu
	};

	const confirmDelete = () => {
		if (adToDelete) {
			deleteAd(adToDelete.id, {
				onSuccess: () => {
					setSuccessMessage('Reklama uspešno obrisana!');
					setIsDeleteModalOpen(false);
				},
				onError: error => {
					setError('Greška prilikom brisanja reklame.');
					setIsDeleteModalOpen(false);
				},
			});
		}
	};

	const handleAdTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		setFormData((prev: AdFormState) => ({
			...prev,
			adType: value,
		}));
	};

	const handleEditClick = (ad: AdAdmin) => {
		setCurrentAd(ad);

		setFormData({
			id: ad.id,
			name: ad.name || '',
			description: ad.description || '',
			adType: ad.adType,
			url: ad.url || '',
			validTo: ad.validTo ? new Date(ad.validTo).toISOString() : new Date().toISOString(),
			articleCategoryIds: ad.articleCategories.map(category => category.id) || [],
			activityCategoryIds: ad.activityCategories.map(category => category.id) || [],
			objectTypeCategoryIds: ad.objectTypeCategories.map(category => category.id) || [],
			imageId: ad.imageId || undefined,
			newImageFile: null, // Resetujte novo učitanu sliku
			countryId: ad.country?.id || 1,
			cityId: ad.city?.id || 1,
			cityPartId: ad.cityPart?.id || 0,
			marketplaceId: ad.marketplace?.id || 0,
			retailStoreId: ad.retailStore?.id || 0,
			image: ad.image || null,
			viewCount: ad.viewCount || 0,
			marketplace: ad.marketplace || null,
			city: ad.city || null,
			country: ad.country || null,
			objectTypeCategories: ad.objectTypeCategories || [],
			articleCategories: ad.articleCategories || [],
			activityCategories: ad.activityCategories || [],
		});
		setSelectedArticleCategoryIds(ad.articleCategories.map(category => category.id) || []);
		setSelectedActivityCategoryIds(ad.activityCategories.map(category => category.id) || []);
		setSelectedObjectTypeCategoryIds(ad.objectTypeCategories.map(category => category.id) || []);
		setIsModalOpen(true);
	};

	const handleSubmitEdit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!currentAd) {
			setError('Current advertisement is not available.');
			return;
		}

		setLoading(true);
		setError('');
		setSuccessMessage(null);

		try {
			let imageId = formData.imageId;

			if (formData.newImageFile) {
				const imageUploadData = {
					image: formData.newImageFile,
					directory: 'advertisments',
				};

				await new Promise<void>((resolve, reject) => {
					uploadImage(imageUploadData, {
						onSuccess: (response: any) => {
							imageId = response?.data?.imageId;
							if (imageId) {
								resolve();
							} else {
								setError('Image upload failed. No ID returned.');
								setLoading(false);
								reject();
							}
						},
						onError: (err: any) => {
							setError('Failed to upload image');
							setLoading(false);
							console.error('Image upload error:', err);
							reject();
						},
					});
				});
			}

			const adData = new FormData();
			adData.append('name', formData.name);
			adData.append('description', formData.description);
			adData.append('adType', formData.adType);
			adData.append('url', formData.url);

			adData.append('articleCategoryIds', JSON.stringify(selectedArticleCategoryIds));
			adData.append('activityCategoryIds', JSON.stringify(selectedActivityCategoryIds));
			adData.append('objectTypeCategoryIds', JSON.stringify(selectedObjectTypeCategoryIds));

			if (formData.retailStoreId) {
				adData.append('retailStoreId', formData.retailStoreId.toString());
			}

			if (imageId) {
				adData.append('imageId', imageId.toString());
			}

			if (formData.validTo) {
				adData.append('validTo', formData.validTo.toString());
			} else {
				adData.append('validTo', 'null');
			}

			await updateAd({ adId: currentAd.id, adData });

			setSuccessMessage('Reklama uspešno ažurirana!');
			setIsModalOpen(false);
		} catch (error) {
			setError(`Greška prilikom ažuriranja reklame: ${error}`);
		} finally {
			setLoading(false);
		}
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
				subject='reklamu'
				subjectName={adToDelete?.name || ''}
			/>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredAds.map(ad => (
					<AdItem
						key={ad.id}
						ad={ad}
						onDeleteClick={() => handleDeleteClick(ad)}
						onEditClick={() => handleEditClick(ad)}
						setIsModalOpen={setIsModalOpen}
					/>
				))}
			</div>
			{isModalOpen && (
				<EditModalContainer
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title='Izmeni reklamu'>
					<>
						<div className='flex justify-between gap-1 px-8 pt-4'>
							<FormDefaultButton onClick={toggleArticleModal} label='Kategorije proizvoda' />
							<FormDefaultButton onClick={toggleActivityModal} label='Kategorije delatnosti' />
							<FormDefaultButton onClick={toggleObjectTypeModal} label='Tip pr. objekata' />
						</div>
						<AdForm
							formData={formData}
							editMode={true}
							setFormData={setFormData}
							locations={locations}
							handleChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
							handleSelectChange={e =>
								setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
							}
							handleAdTypeChange={handleAdTypeChange}
							loading={loading}
							filteredCities={filteredCities}
							filteredCityParts={filteredCityParts}
							filteredMarketplaces={filteredMarketplaces}
							filteredStores={filteredStores || []}
							successMessage={successMessage}
							handleSubmit={handleSubmitEdit}
							mutation={undefined}
							existingImages={imagesData}
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

export default AdsList;
