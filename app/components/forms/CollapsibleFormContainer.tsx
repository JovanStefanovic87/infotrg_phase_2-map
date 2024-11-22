'use client';
import React, { useState, useEffect } from 'react';
import FormDefaultButton from '../buttons/FormDefaultButton';
import CategoryModal from '../modals/CategoryModal';
import H3Title from '../text/H3Title';
import { SimplifiedCategory } from '@/utils/helpers/types';

interface Category {
	id: number;
	name: string;
	children: Category[];
	parents?: SimplifiedCategory[];
}

interface Props {
	articleCategories: Category[];
	activityCategories: Category[];
	objectTypeCategories: Category[];
	setFormData: React.Dispatch<React.SetStateAction<any>>;
	submitTrigger: boolean;
	children: React.ReactNode;
}

const CollapsibleFormContainer: React.FC<Props> = ({
	articleCategories,
	activityCategories,
	objectTypeCategories,
	setFormData,
	submitTrigger,
	children,
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

	// Sync formData with selected categories when they change
	useEffect(() => {
		setFormData((prevFormData: any) => ({
			...prevFormData,
			articleCategoryIds: selectedArticleCategoryIds,
			activityCategoryIds: selectedActivityCategoryIds,
			objectTypeCategoryIds: selectedObjectTypeCategoryIds,
		}));
	}, [
		selectedArticleCategoryIds,
		selectedActivityCategoryIds,
		selectedObjectTypeCategoryIds,
		setFormData,
	]);

	useEffect(() => {
		resetSelectedCategories();
	}, [submitTrigger]);

	const toggleFormVisibility = () => setIsFormOpen(!isFormOpen);
	const toggleArticleModal = () => setIsArticleModalOpen(!isArticleModalOpen);
	const toggleActivityModal = () => setIsActivityModalOpen(!isActivityModalOpen);
	const toggleObjectTypeModal = () => setIsObjectTypeModalOpen(!isObjectTypeModalOpen);

	const resetSelectedCategories = () => {
		setSelectedArticleCategoryIds([]);
		setSelectedActivityCategoryIds([]);
		setSelectedObjectTypeCategoryIds([]);
	};

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
				{children}
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
				title='Select Activity Categories'
				searchQuery={activitySearchQuery}
				setSearchQuery={setActivitySearchQuery}
				categories={activityCategories || []}
				selectedCategories={selectedActivityCategoryIds}
				setSelectedCategories={setSelectedActivityCategoryIds}
			/>

			<CategoryModal
				isOpen={isObjectTypeModalOpen}
				onClose={toggleObjectTypeModal}
				title='Select Object Type Categories'
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

export default CollapsibleFormContainer;
