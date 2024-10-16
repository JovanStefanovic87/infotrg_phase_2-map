// components/SubmitButton.tsx

import React from 'react';
import DefaultButton from './DefaultButton';

interface Props {
	children: React.ReactNode;
}

const SubmitButton: React.FC<Props> = ({ children }) => {
	return <DefaultButton type='submit'>{children}</DefaultButton>;
};

export default SubmitButton;
