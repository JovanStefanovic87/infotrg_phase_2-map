interface Props {
	mainText: string;
	subject: string;
	subjectName: string;
}

const TextPopup: React.FC<Props> = ({ mainText, subject, subjectName }) => {
	return (
		<div className='bg-white rounded-lg shadow-md p-6'>
			<p className='text-gray-900 text-lg font-semibold leading-relaxed tracking-wide text-center'>
				{mainText} <span>{subject}</span> &quot;<span className='font-bold'>{subjectName}</span>
				&quot;?
			</p>
		</div>
	);
};

export default TextPopup;
