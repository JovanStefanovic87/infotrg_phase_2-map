import React from 'react';

interface Props {
	text: string;
	bgColor?: string;
	align?: 'left' | 'center' | 'right';
	textColor?: string;
}

const BlockTitle: React.FC<Props> = ({
	text,
	bgColor = 'yellowLighter',
	align = 'left',
	textColor = 'grayDarkest',
}) => {
	return (
		<div className={`mb-4 bg-${bgColor} p-2 rounded-md`}>
			<h2
				className={`text-lg text-${align} text-${textColor} font-semibold overflow-hidden whitespace-nowrap`}>
				{text}
			</h2>
		</div>
	);
};

export default BlockTitle;
