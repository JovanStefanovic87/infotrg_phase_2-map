type Props = {
  icon: JSX.Element;
  label: string;
};

const SidebarSvgIcons: React.FC<Props> = ({ icon, label }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-20 bg-gray-900 rounded-lg p-2'>
      {icon}
      <span className='mt-2 text-sm text-white text-center'>{label}</span>
    </div>
  );
};

export default SidebarSvgIcons;
