import Link from 'next/link';

interface Props {
  href: string;
  label: string;
}

const FooterButton: React.FC<Props> = ({ href, label }) => (
  <li>
    <Link href={href}>
      <span className='cursor-pointer text-gray-300 hover:text-white transition duration-300'>
        {label}
      </span>
    </Link>
  </li>
);

export default FooterButton;
