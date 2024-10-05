import { NextPage } from 'next';
import LocationsAdmin from '@/app/components/pageContent/LocationsAdmin';
import { location } from '@/app/api/prefix';

const CategoriesAdminPage: NextPage = () => {
	return <LocationsAdmin prefix={location} title='LOKACIJE' />;
};

export default CategoriesAdminPage;
