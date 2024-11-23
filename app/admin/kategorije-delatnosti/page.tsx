import { NextPage } from 'next';
import CategoriesAdmin from '../../components/pageContent/CategoriesAdmin';
import { prefixActivityCategory } from '@/app/api/prefix';

const ObjectTypesAdminPage: NextPage = () => {
	return <CategoriesAdmin prefix={prefixActivityCategory} title='KATEGORIJE DELATNOSTI' />;
};

export default ObjectTypesAdminPage;
