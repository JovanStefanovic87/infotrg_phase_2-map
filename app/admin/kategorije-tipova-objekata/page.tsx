import { NextPage } from 'next';
import CategoriesAdmin from '../../components/pageContent/CategoriesAdmin';
import { prefixObjectTypeCategory } from '@/app/api/prefix';

const ObjectTypesAdminPage: NextPage = () => {
	return <CategoriesAdmin prefix={prefixObjectTypeCategory} title='KATEGORIJE TIPOVA OBJEKATA' />;
};

export default ObjectTypesAdminPage;
