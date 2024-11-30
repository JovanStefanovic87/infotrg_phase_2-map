import { NextPage } from 'next';
import PageContent from './home/PageContent';

export const metadata = {
	title: 'Infotrg',
	description: 'servis za objavljivanje informacija i posredovanje u trgovini',
};

const Home: NextPage = () => {
	return (
		<div className='lg:-mt-8'>
			<PageContent categories={[]} />
		</div>
	);
};

export default Home;
