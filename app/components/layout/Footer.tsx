'use client';
import { useIsMobile } from '@/utils/helpers/universalFunctions';
import FooterButton from '../buttons/FooterButton';

interface Props {}

const Footer: React.FC<Props> = () => {
	const isMobile = useIsMobile();

	const links = () => {
		return (
			<>
				<div className='mb-4'>
					<h2 className='text-lg font-bold text-white mb-2'>Linkovi</h2>
					{isMobile ? (
						<ul className='space-y-2'>
							<FooterButton href='/' label='Home' />
							<FooterButton href='/o-nama' label='O Nama' />
							<FooterButton href='/ulaganja' label='Ulaganja' />
							<FooterButton href='/kontakt' label='Kontakt' />
						</ul>
					) : (
						<ul className='flex gap-5'>
							<FooterButton href='/' label='Početna' />
							<FooterButton href='/o-nama' label='O Nama' />
							<FooterButton href='/ulaganja' label='Ulaganja' />
							<FooterButton href='/kontakt' label='Kontakt' />
						</ul>
					)}
				</div>

				{/* Contact Info */}
				<div className='mb-4'>
					<h2 className='text-lg font-bold text-white mb-2'>Kontaktirajte nas</h2>
					<p className='text-gray-300'>
						<span className='block'>
							<a
								href='tel:+1234567890'
								className='cursor-pointer text-gray-300 hover:text-white transition duration-300'>
								Telefon: 060 145 13 49
							</a>
						</span>
						<span className='block'>
							<a
								href='mailto:office@infotrg.com'
								className='cursor-pointer text-gray-300 hover:text-white transition duration-300'>
								Email: suinfotrg@gmail.com
							</a>
						</span>
					</p>
				</div>
			</>
		);
	};

	return (
		<footer className='bg-gray-800 text-gray-300 py-6'>
			<div className='container mx-auto px-4'>
				{/* <div className='grid grid-cols-1 md:grid-cols-1'>
          <div className='flex justify-between'>{links()}</div>
        </div> */}
				{/* Company Info */}
				<div className='text-sm text-gray-300'>
					<p>
						Infotrg &copy; {new Date().getFullYear()} Sva prava zadržana. - Miroslav Ostrogonac{' '}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
