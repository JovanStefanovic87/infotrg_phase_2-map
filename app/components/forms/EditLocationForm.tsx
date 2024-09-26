import { Language, Country, City, CityPart } from '@/utils/helpers/types';

import React from 'react';

interface Props {
	locations: (Country | City | CityPart)[];
	currentLocation: Country | City | CityPart;
	handleSubmitEdit: () => void;
	languages: Language[];
	newTranslations: any[];
	parentId: number | null;
	setNewTranslations: React.Dispatch<React.SetStateAction<any[]>>;
	setParentId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EditLocationForm: React.FC<Props> = ({
	languages,
	newTranslations,
	parentId,
	locations,
	setNewTranslations,
	setParentId,
	handleSubmitEdit,
}) => {
	const filterLocationsForSelect = () => {
		return locations.filter(
			location => location.id !== parentId // Avoid setting the same location as its own parent
		);
	};

	return (
		<form onSubmit={handleSubmitEdit} className='flex flex-col space-y-6'>
			{/* Prevod i sinonimi */}
			<div className='grid grid-cols-2 gap-6'>
				{languages.map(language => (
					<div key={language.id}>
						<input
							type='text'
							placeholder={`${language.name} prevod`}
							value={newTranslations.find(t => t.languageId === language.id)?.translation || ''}
							onChange={e => {
								const translation = e.target.value;
								setNewTranslations(prevTranslations =>
									prevTranslations.map(t =>
										t.languageId === language.id ? { ...t, translation } : t
									)
								);
							}}
						/>
					</div>
				))}
			</div>

			{/* Roditeljska lokacija */}
			<div>
				<label htmlFor='parentId'>Roditeljska lokacija</label>
				<select
					id='parentId'
					value={parentId ?? ''}
					onChange={e => setParentId(Number(e.target.value))}>
					<option value=''>Nema roditelja</option>
					{filterLocationsForSelect().map(location => (
						<option key={location.id} value={location.id}>
							{location.label.name || 'Nepoznat'}
						</option>
					))}
				</select>
			</div>

			{/* Dugme za submit */}
			<button type='submit'>Sačuvaj izmene</button>
		</form>
	);
};

export default EditLocationForm;
