import { NextPage } from 'next';
import CategoriesAdmin from '../../components/categories/CategoriesAdmin';
import { prefixAticleCategory } from '@/app/api/prefix';

const AticleCategoriesAdminPage: NextPage = () => {
	return <CategoriesAdmin prefix={prefixAticleCategory} title='KATEGORIJE PROIZVODA' />;
};

export default AticleCategoriesAdminPage;
