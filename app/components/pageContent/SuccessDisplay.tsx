import React from 'react';

interface Props {
	success: string;
	clearSuccess: (arg0: string) => void;
}

const SuccessDisplay: React.FC<Props> = ({ success, clearSuccess }) => {
	if (!success) return null;

	return (
		<div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4'>
			<span>{success}</span>
			<button
				onClick={() => clearSuccess(success)}
				className='absolute top-0 bottom-0 right-0 px-4 py-3'>
				<svg
					className='fill-current h-6 w-6 text-green-500'
					role='button'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'>
					<path d='M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.934 2.935a1 1 0 1 1-1.414-1.414l2.935-2.934L5.652 7.934a1 1 0 0 1 1.414-1.414L10 8.586l2.935-2.934a1 1 0 1 1 1.414 1.414l-2.934 2.935 2.934 2.935a1 1 0 0 1 0 1.414z' />
				</svg>
			</button>
		</div>
	);
};

export default SuccessDisplay;
