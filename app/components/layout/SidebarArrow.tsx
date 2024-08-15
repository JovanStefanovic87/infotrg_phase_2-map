import React from 'react';

interface Props {
	isOpen: boolean;
	onClick: (event: React.MouseEvent) => void;
}

const SidebarArrow: React.FC<Props> = ({ isOpen, onClick }) => {
	return (
		<div
			className='w-8 h-8 flex items-center justify-center transform transition-transform text-white'
			onClick={onClick}>
			<svg
				className={`w-4 h-4 transform duration-150 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
				xmlns='http://www.w3.org/2000/svg'>
				<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
			</svg>
		</div>
	);
};

export default SidebarArrow;
