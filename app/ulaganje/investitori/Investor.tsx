import React from 'react';
import { invested } from './investorsData';
import BlockTitle from '@/app/components/text/BlockTitle';

interface Props {
	id: string;
	name: string;
	view: 'investment' | 'withdrawal';
}

const Investor: React.FC<Props> = ({ id, name, view }) => {
	const investments = invested[id] || [];

	const roundUp = (num: number, precision: number): number => {
		const factor = Math.pow(10, precision);
		return Math.ceil(num * factor) / factor;
	};

	const totalInvestment = roundUp(
		investments.reduce(
			(sum, investment) => sum + parseFloat(investment.amount.replace(',', '.')),
			0
		),
		2
	).toFixed(2);

	const totalShare =
		roundUp(
			investments.reduce(
				(sum, investment) => sum + parseFloat(investment.share.replace(',', '.')),
				0
			),
			2
		).toFixed(2) + '%';

	return (
		<div>
			{view === 'investment' ? (
				<div>
					<BlockTitle text='ULAGANJE FINASIJA' bgColor='yellowLighter' align='center' />
					<div className='flex flex-col gap-4'>
						<div className='mt-4'>
							<p className='text-lg text-black'>
								<strong>Ime i prezime :</strong> {name}
							</p>
							<p className='text-lg text-black'>
								<strong>Registarski broj :</strong> {id}
							</p>
						</div>
						<table className='w-full bg-white border border-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
										Datum
									</th>
									<th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
										Iznos
									</th>
									<th className='px-3 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600'>
										Udeo
									</th>
								</tr>
							</thead>
							<tbody>
								{investments.map((investment, index) => (
									<tr key={index} className='hover:bg-gray-100'>
										<td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
											{investment.date}
										</td>
										<td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
											{investment.amount.replace(',', '.')} EUR
										</td>
										<td className='px-3 py-4 border-b border-gray-200 text-sm text-gray-700'>
											{investment.share}
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<p className='text-lg text-black'>
							<strong>Ukupno:</strong> {totalInvestment} EUR / {totalShare}
						</p>
					</div>
				</div>
			) : (
				<div>
					<BlockTitle text='POVLAČENJE FINASIJA' bgColor='yellowLighter' align='center' />
					<p className='text-lg text-black'>
						<strong>Ukupno:</strong> 0 EUR 0.00%
					</p>
				</div>
			)}
		</div>
	);
};

export default Investor;
