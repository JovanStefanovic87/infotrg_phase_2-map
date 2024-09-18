import { NextPage } from 'next';
import CategoriesAdmin from '../../components/categories/CategoriesAdmin';
import { prefixObjectTypeCategory } from '@/app/api/prefix';

const CategoriesAdminPage: NextPage = () => {
	return <CategoriesAdmin prefix={prefixObjectTypeCategory} title='KATEGORIJE TIPOVA OBJEKATA' />;
};

export default CategoriesAdminPage;
