'use client';
import React, { useRef, useState } from 'react';
import DynamicPageContainer from '../containers/DynamicPageContainer.';
import { CurrentIcon, Icon, Language } from '@/utils/helpers/types';
import RetailStoreList from '../lists/RetailStoreList';

interface Props {
	title: string;
}

const RetailsAdmin: React.FC<Props> = ({ title }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [retails, setRetails] = useState<Location[]>([]);
	const [logos, setLogos] = useState<Icon[]>([]);
	const [logo, setLogo] = useState<File | null>(null);
	const [logoId, setLogoId] = useState<number | null>(null);
	const [currentLogo, setCurrentLogo] = useState<CurrentIcon>({ iconId: null, iconUrl: null });
	const [newLogo, setNewLogo] = useState<File | null>(null);
	const [isLogoPickerOpen, setIsLogoPickerOpen] = useState(false);
	const [languages, setLanguages] = useState<Language[]>([]);
	const [languageId, setLanguageId] = useState<number>(1);
	const [expandedRetails, setExpandedRetails] = useState<Set<number>>(new Set());
	const [manuallyExpandedRetails, setManuallyExpandedRetails] = useState<Set<number>>(new Set());
	const [filteredRetails, setFilteredRetails] = useState<Location[]>([]);
	const [initialExpandedRetails, setInitialExpandedRetails] = useState<Set<number>>(new Set());
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	return (
		<DynamicPageContainer
			clearSuccess={() => setSuccessMessage(null)}
			successMessage={successMessage}
			error={error}
			clearError={() => setError('')}
			loading={loading}
			title={title}>
			<div className='mt-8'>
				<RetailStoreList
					setSuccessMessage={setSuccessMessage}
					setError={setError}
					expandedRetails={expandedRetails}
					setExpandedRetails={setExpandedRetails}
					retails={retails}
					setLogo={setLogo}
					logos={logos}
				/>
			</div>
		</DynamicPageContainer>
	);
};

export default RetailsAdmin;
