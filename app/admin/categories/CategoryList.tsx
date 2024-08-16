import { RenderCategoryListProps } from '@/utils/helpers/types';

const CategoryList: React.FC<RenderCategoryListProps> = ({
	categories,
	parentId = null,
	depth = 0,
	onEdit,
	onDelete,
}) => {
	return (
		<ul>
			{categories
				.filter(cat => cat.parentId === parentId)
				.map(cat => (
					<li key={cat.id} className={`mb-2 ${depth > 0 ? 'pl-4' : ''}`}>
						<div className='flex items-center'>
							<span className='flex-1'>{`${'—'.repeat(depth)} ${cat.name}`}</span>
							<button className='ml-2 text-blue-600 hover:underline' onClick={() => onEdit(cat)}>
								Rename
							</button>
							<button
								className='ml-2 text-red-600 hover:underline'
								onClick={() => onDelete(cat.id)}>
								Delete
							</button>
						</div>
						{cat.subcategories.length > 0 && (
							<CategoryList
								categories={cat.subcategories}
								parentId={cat.id}
								depth={depth + 1}
								onEdit={onEdit}
								onDelete={onDelete}
							/>
						)}
					</li>
				))}
		</ul>
	);
};

export default CategoryList;
