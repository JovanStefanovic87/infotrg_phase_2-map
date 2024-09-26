import { NextPage } from 'next';
import CategoriesAdmin from '../../components/categories/CategoriesAdmin';
import { prefixActivityCategory } from '@/app/api/prefix';

const ActivitiesAdminPage: NextPage = () => {
	return <CategoriesAdmin prefix={prefixActivityCategory} title='KATEGORIJE DELATNOSTI' />;
};

export default ActivitiesAdminPage;
