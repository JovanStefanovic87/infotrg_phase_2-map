export const mockLocations = {
	countries: [
		{
			id: 1,
			name: 'Serbia',
			code: 'SRB',
			postCode: '11000',
			cities: [
				{
					id: 1,
					name: 'Belgrade',
					postCode: '11000',
					cityParts: [
						{
							id: 1,
							name: 'New Belgrade',
							postCode: '11070',
							marketplaces: [
								{
									id: 1,
									name: 'Block 44 Market',
									address: 'Yuri Gagarin Street',
								},
							],
						},
						{
							id: 2,
							name: 'Zemun',
							postCode: '11080',
							marketplaces: [
								{
									id: 2,
									name: 'Zemun Market',
									address: 'Zemunski Kej',
								},
							],
						},
					],
				},
				{
					id: 2,
					name: 'Novi Sad',
					postCode: '21000',
					cityParts: [
						{
							id: 3,
							name: 'Stari Grad',
							postCode: '21000',
							marketplaces: [
								{
									id: 3,
									name: 'Novi Sad Market',
									address: 'Trg Republike',
								},
							],
						},
					],
				},
			],
		},
		{
			id: 2,
			name: 'Croatia',
			code: 'CRO',
			postCode: '10000',
			cities: [
				{
					id: 3,
					name: 'Zagreb',
					postCode: '10000',
					cityParts: [
						{
							id: 4,
							name: 'Maksimir',
							postCode: '10000',
							marketplaces: [
								{
									id: 4,
									name: 'Maksimir Market',
									address: 'Maksimirska Cesta',
								},
							],
						},
					],
				},
			],
		},
	],
};
