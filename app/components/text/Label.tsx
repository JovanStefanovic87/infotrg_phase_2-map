import React from 'react';

interface LabelProps {
	htmlFor: string;
	children: React.ReactNode;
	color?: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, color = 'white' }) => {
	return (
		<label htmlFor={htmlFor} className={`block mb-2 font-semibold text-${color}`}>
			{children}
		</label>
	);
};

export default Label;
