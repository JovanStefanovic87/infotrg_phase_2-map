import React from 'react';

interface Icon {
	id: number;
	name: string;
	url: string;
	createdAt: string;
}

interface Category {
	id: number;
	name: string;
	iconId: number;
	labelId: number;
	parents: Category[];
	children: Category[];
	synonyms: string[];
	icon: Icon | null;
	relatedIds: number[];
}

interface CategoryListProps {
	categories: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
			{categories?.map(category => (
				<div key={category.id} className='bg-white rounded-lg shadow-md p-4 text-black'>
					{/* Glavna kategorija sa ikonom */}
					<div className='flex flex-col items-center mb-4'>
						{category.icon && (
							<img src={category.icon.url} alt={category.icon.name} className='w-16 h-16 mb-2' />
						)}
						<h2 className='text-lg font-bold text-center'>{category.name}</h2>
					</div>

					{/* Prvih 5 potkategorija */}
					<ul className='text-center'>
						{category.children.slice(0, 5).map(subcategory => (
							<li key={subcategory.id} className='text-blue-600 hover:underline'>
								{subcategory.name}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default CategoryList;
