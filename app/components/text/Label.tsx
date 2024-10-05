import React from 'react';

interface LabelProps {
	htmlFor: string;
	children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
	return (
		<label htmlFor={htmlFor} className='block mb-2 font-semibold text-black'>
			{children}
		</label>
	);
};

export default Label;
