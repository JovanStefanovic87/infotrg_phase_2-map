import { FC } from 'react';
import { notFound } from 'next/navigation';
import CategoriesAdmin from '@/app/components/pageContent/CategoriesAdmin';
import {
	prefixActivityCategory,
	prefixAticleCategory,
	prefixObjectTypeCategory,
} from '@/app/api/prefix';
import PageContainer from '@/app/components/containers/PageContainer';
import CategoriesAutoInput from '@/app/components/autoInputFromExcel/categoriesAutoInput';
type CategoryType = 'kategorije-delatnosti' | 'kategorije-proizvoda' | 'kategorije-tipova-objekata';
interface Props {
	params: {
		category_type: CategoryType;
	};
}

const DynamicCategoriesAdminPage: FC<Props> = ({ params }) => {
	const { category_type } = params;
	const config = {
		'kategorije-delatnosti': {
			prefix: prefixActivityCategory,
			title: 'KATEGORIJE DELATNOSTI',
		},
		'kategorije-proizvoda': {
			prefix: prefixAticleCategory,
			title: 'KATEGORIJE PROIZVODA',
		},
		'kategorije-tipova-objekata': {
			prefix: prefixObjectTypeCategory,
			title: 'KATEGORIJE TIPOVA OBJEKATA',
		},
	};

	const currentConfig = config[category_type as keyof typeof config];

	if (!params || !params.category_type || !Object.keys(config).includes(params.category_type)) {
		notFound();
	}

	return (
		<PageContainer>
			<CategoriesAutoInput prefix={currentConfig.prefix} title={currentConfig.title} />
			<CategoriesAdmin prefix={currentConfig.prefix} title={currentConfig.title} />
		</PageContainer>
	);
};

export default DynamicCategoriesAdminPage;
