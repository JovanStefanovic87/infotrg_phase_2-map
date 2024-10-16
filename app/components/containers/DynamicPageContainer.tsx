import React, { ReactNode } from 'react';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import ErrorDisplay from '@/app/components/modals/systemModals/ErrorDisplay';
import SuccessDisplay from '../modals/systemModals/SuccessDisplay';
import H1 from '../text/H1';

interface Props {
	children: ReactNode;
	clearSuccess: () => void;
	successMessage: string | null;
	error: string;
	clearError: () => void;
	loading: boolean;
	title: string;
}

const DynamicPageContainer: React.FC<Props> = ({
	children,
	clearSuccess,
	successMessage,
	error,
	clearError,
	loading,
	title,
}) => {
	return (
		<div className='container mx-auto px-3 pt-0 lg:pt-6 lg:px-6 w-screen'>
			<ErrorDisplay error={error} clearError={clearError} />
			<SuccessDisplay success={successMessage || ''} clearSuccess={clearSuccess} />
			<H1 title={title} pb='0' />
			{children}

			{/* Spinner se prikazuje kao overlay */}
			{loading && <LoadingSpinner />}
		</div>
	);
};

export default DynamicPageContainer;
