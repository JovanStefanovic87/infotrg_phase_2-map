import Image from 'next/image';

type Props = {
  icon: string;
  label: string;
};

const SidebarIcon: React.FC<Props> = ({ icon, label }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-20 bg-gray-900 rounded-lg p-2'>
      <Image src={icon} alt={label} width={32} height={32} />
      <span className='mt-2 text-sm text-white text-center'>{label}</span>
    </div>
  );
};

export default SidebarIcon;
