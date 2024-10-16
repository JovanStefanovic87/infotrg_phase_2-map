import CustomModalAdmin from './CustomModalAdmin';

interface Category {
	id: number;
	name: string;
	children: Category[];
	parents?: Category[];
}

interface CategoryModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	categories: Category[];
	selectedCategories: number[];
	setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
	isOpen,
	onClose,
	title,
	searchQuery,
	setSearchQuery,
	categories,
	selectedCategories,
	setSelectedCategories,
}) => {
	// Utility functions for finding all parents and children of a category
	const findAllParents = (category: Category, allCategories: Category[]): Category[] => {
		let parents: Category[] = [];

		if (category.parents && category.parents.length > 0) {
			category.parents.forEach((parent: Category) => {
				parents.push(parent);
				parents = [...parents, ...findAllParents(parent, allCategories)];
			});
		}

		return parents;
	};

	const findAllChildren = (category: Category): number[] => {
		let childrenIds: number[] = [];

		if (category.children && category.children.length > 0) {
			category.children.forEach(child => {
				childrenIds.push(child.id);
				childrenIds = [...childrenIds, ...findAllChildren(child)]; // Recursive find all children
			});
		}

		return childrenIds;
	};

	// CategoryTree component
	const CategoryTree: React.FC<{
		categories: Category[];
		selectedCategories: number[];
		setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
	}> = ({ categories, selectedCategories, setSelectedCategories }) => {
		const handleCategoryChange = (category: Category) => {
			let newSelected = [...selectedCategories];

			// If the category is already selected, remove it and its children
			if (newSelected.includes(category.id)) {
				const childrenIds = findAllChildren(category);
				newSelected = newSelected.filter(id => id !== category.id && !childrenIds.includes(id));
			} else {
				// If not selected, add it and all its parents
				const parents = findAllParents(category, categories);
				const parentIds = parents.map(p => p.id);

				newSelected = [...new Set([...newSelected, category.id, ...parentIds])]; // Avoid duplicates
			}

			setSelectedCategories(newSelected);
		};

		const renderCategories = (categories: Category[]) => {
			if (!categories || categories.length === 0) {
				return <p className='text-gray-500'>No categories available</p>;
			}

			return categories.map(category => (
				<div key={category.id} className='text-black mb-2'>
					<label className='flex items-center space-x-3'>
						<input
							type='checkbox'
							checked={selectedCategories.includes(category.id)}
							onChange={() => handleCategoryChange(category)}
							className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
						/>
						<span className='font-medium text-gray-900'>{category.name}</span>
					</label>
					{category.children && category.children.length > 0 && (
						<div className='ml-5 border-l border-gray-200 pl-4'>
							{renderCategories(category.children)}
						</div>
					)}
				</div>
			));
		};

		return <div>{renderCategories(categories)}</div>;
	};

	return (
		<CustomModalAdmin isOpen={isOpen} onClose={onClose} title={title}>
			<input
				type='text'
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				placeholder='Search categories...'
				className='border p-2 rounded w-full mb-4'
			/>
			<CategoryTree
				categories={categories}
				selectedCategories={selectedCategories}
				setSelectedCategories={setSelectedCategories}
			/>
		</CustomModalAdmin>
	);
};

export default CategoryModal;
