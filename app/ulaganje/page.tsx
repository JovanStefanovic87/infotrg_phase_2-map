import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import InvestContent from './InvestContent';

export const metadata = {
	title: 'Infotrg | Ulaganje',
	description: 'Pametna mogućnost ulaganja',
};

const Invest: NextPage = () => {
	// Primer uslova za validaciju stranice (proverite stvarne podatke ili stanje)
	const isPageValid = true; // Zamenite sa stvarnim uslovom

	// Ako stranica nije validna, prikazati 404
	if (!isPageValid) {
		notFound();
	}

	return (
		<>
			<InvestContent />
		</>
	);
};

export default Invest;
