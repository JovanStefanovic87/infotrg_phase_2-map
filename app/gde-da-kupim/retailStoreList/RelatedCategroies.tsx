import Image from 'next/image';
import { Category } from '@/utils/helpers/types';
import { pageContentTranslations, PageContentTranslations } from '@/utils/translations';

interface RelatedCategoriesProps {
	relatedCategories: Category[];
	languageCode: string;
}

const RelatedCategories: React.FC<RelatedCategoriesProps> = ({
	relatedCategories,
	languageCode,
}) => {
	const translations: PageContentTranslations = pageContentTranslations;
	return (
		<div className='related-categories mt-6 text-black select-none'>
			<h2 className='text-base font-semibold mb-3 text-center'>
				{translations[languageCode].relatedCategories}
			</h2>
			<div className='flex flex-wrap justify-center gap-3'>
				{relatedCategories.map(category => (
					<div
						key={category.id}
						className='flex flex-col items-center p-2 w-20 rounded-md shadow-sm shadow-grayLighter hover:shadow-md transition-shadow duration-200 cursor-pointer'>
						{category.icon && (
							<Image
								src={category.icon.url}
								alt={category.name}
								width={40}
								height={40}
								style={{ objectFit: 'contain' }}
							/>
						)}
						<p className='text-xs text-center font-light truncate max-w-full'>{category.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default RelatedCategories;
