import React from 'react';

interface ToggleButtonContainerProps {
	data: { id: string };
	toggleFunction: (id: string) => void;
	text?: string;
	children: React.ReactNode;
}

const ToggleButtonContainer: React.FC<ToggleButtonContainerProps> = ({
	data,
	toggleFunction,
	text = 'Potkategorije',
	children,
}) => {
	return (
		<div
			className='bg-gradient-to-r from-blue to-blueDark text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blueDark hover:to-blueDarker transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4 cursor-pointer'
			onClick={() => toggleFunction(data.id)}>
			<div className='flex justify-between items-center'>
				<span>{text}</span>
				{children}
			</div>
		</div>
	);
};

export default ToggleButtonContainer;
