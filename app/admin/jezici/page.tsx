'use client';
import PageContainer from '@/app/components/containers/PageContainer';
import AddLanguageForm from './AddLanguageForm';
import LanguageFlag from './LanguageFlag';

const AdminCategoriesPage = () => {
	return (
		<PageContainer>
			<div className='p-6'>
				<h1 className='text-2xl font-bold'>Add New Language</h1>
				<AddLanguageForm />
			</div>
			<div className='flex gap-2 px-4 py-4 bg-white w-min'>
				<LanguageFlag code='hu' />
				<p className='text-black'>Magyar</p>
			</div>
		</PageContainer>
	);
};

export default AdminCategoriesPage;
