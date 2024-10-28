import { NextPage } from 'next';
import PageContent from './PageContent';

export const metadata = {
	title: 'Infotrg | Plan i program poslovanja',
	description:
		'Detalji o planu i programu poslovanja kompanije Infotrg. Saznajte više o našim planovima i programima.',
};

const Ppp: NextPage = () => {
	return (
		<>
			<PageContent />
		</>
	);
};

export default Ppp;
