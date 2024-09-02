interface TextSpecificationsProps {
	label?: string;
	value?: string;
}

const TextSpecifications: React.FC<TextSpecificationsProps> = ({ label, value }) => {
	if (!value) {
		return null;
	}

	return (
		<div className='flex gap-0 lg:gap-4 justify-start items-center lg:items-start border-b-2 border-gray-200 py-1'>
			<p className='text-left text-black font-bold text-xs sm:text-sm md:text-base lg:text-lg w-36 flex-1 lg:w-60'>
				{label}
			</p>
			<p className='text-left text-black font-normal text-xs sm:text-sm md:text-base lg:text-lg flex-1'>
				{value}
			</p>
		</div>
	);
};

export default TextSpecifications;
