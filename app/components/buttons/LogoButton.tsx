import Image from 'next/image';
import Link from 'next/link';
import logoTransparent from '../../../public/images/logoTransparent.png';

const LogoButton: React.FC = () => {
  return (
    <Link href='/' passHref>
      <button
        type='button'
        className='text-white bg-gradient-to-r from-blue via-blueLight to-blue hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg h-10 w-16 flex flex-col items-center justify-center lg:mr-2'
      >
        <div className='flex justify-center items-center w-full h-full rounded-lg overflow-hidden'>
          <Image src={logoTransparent} alt='Button Icon' width={100} height={100} priority />
        </div>
      </button>
    </Link>
  );
};

export default LogoButton;
