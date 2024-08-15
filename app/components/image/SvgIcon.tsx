type Props = {
	icon: React.ElementType;
};

const SvgIcon: React.FC<Props> = ({ icon: Icon }) => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-20 bg-gray-900 rounded-lg p-2'>
			<Icon className='w-full h-full' />
		</div>
	);
};

export default SvgIcon;
