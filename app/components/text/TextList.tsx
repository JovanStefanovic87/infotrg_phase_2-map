interface Props {
	label?: string;
	value?: string;
}

const TextList: React.FC<Props> = ({ label, value }) => {
	if (!value) {
		return null;
	}

	return (
		<div className='flex gap-0 lg:gap-4 justify-start items-center lg:items-start border-b-2 border-gray-200 py-1'>
			<p className='text-left text-black font-bold text-base lg:text-lg xl:text-xl w-36 flex-1 lg:w-60'>
				{label}
			</p>
			<p className='text-right text-black font-normal text-base lg:text-lg xl:text-xl flex-1 overflow-hidden text-ellipsis whitespace-nowrap'>
				{value}
			</p>
		</div>
	);
};

export default TextList;
