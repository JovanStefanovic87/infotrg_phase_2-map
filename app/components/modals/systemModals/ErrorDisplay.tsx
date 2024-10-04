import React from 'react';

interface Props {
	error: string | null;
	clearError: () => void;
}

const ErrorDisplay: React.FC<Props> = ({ error, clearError }) => {
	if (!error) return null;

	return (
		<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
			<strong className='font-bold'>Error: </strong>
			<span>{error}</span>
			<button onClick={clearError} className='absolute top-0 bottom-0 right-0 px-4 py-3'>
				<svg
					className='fill-current h-6 w-6 text-red-500'
					role='button'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'>
					<path d='M14.348 14.849a1 1 0 0 1-1.414 0L10 11.414l-2.934 2.935a1 1 0 1 1-1.414-1.414l2.935-2.934L5.652 7.934a1 1 0 0 1 1.414-1.414L10 8.586l2.935-2.934a1 1 0 1 1 1.414 1.414l-2.934 2.935 2.934 2.935a1 1 0 0 1 0 1.414z' />
				</svg>
			</button>
		</div>
	);
};

export default ErrorDisplay;
