import { NextPage } from 'next';
import LocationsAdmin from '@/app/components/categories/LocationsAdmin';
import { location } from '@/app/api/prefix';

const CategoriesAdminPage: NextPage = () => {
	return <LocationsAdmin prefix={location} title='LOKACIJE' />;
};

export default CategoriesAdminPage;
