import Image from 'next/image';
import Link from 'next/link';
import logoMini from '../../../public/images/logo-mini.png';

const LogoButton: React.FC = () => {
	return (
		<Link href='/' passHref>
			<div className='flex justify-center items-center w-full h-full rounded-lg overflow-hidden sm:mr-8'>
				<Image src={logoMini} alt='Button Icon' width={40} height={40} priority quality={100} />
			</div>
		</Link>
	);
};

export default LogoButton;
