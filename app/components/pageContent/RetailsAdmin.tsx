'use client';
import React, { useRef, useState } from 'react';
import {
	CurrentIcon,
	Icon,
	Language,
	AdType,
	RetailAdmin,
	RetailLocationData,
	Location,
} from '@/utils/helpers/types';
import { retailLocationInit } from '@/utils/helpers/initialStates';
import DynamicPageContainer from '../containers/DynamicPageContainer';
import RetailStoreList from '../lists/RetailStoreList';
import { ReatilMockData } from '@/utils/mockData/retail';

interface Props {
	title: string;
}

const RetailsAdmin: React.FC<Props> = ({ title }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [locations, setLocations] = useState<Location[]>([]);
	const [retails, setRetails] = useState<RetailAdmin[]>(ReatilMockData); // Mock podaci
	const [languages, setLanguages] = useState<Language[]>([]);
	const [languageId, setLanguageId] = useState<number>(1);
	const [filteredRetails, setFilteredRetails] = useState<Location[]>([]);
	const fileUploadButtonRef = useRef<{ resetFileName?: () => void }>({});

	const [storeName, setStoreName] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [email, setEmail] = useState<string | null>(null);
	const [website, setWebsite] = useState<string | null>(null);
	const [companyId, setCompanyId] = useState<number>(0);
	const [storeTypeId, setStoreTypeId] = useState<number | null>(null);
	const [marketplaceId, setMarketplaceId] = useState<number | null>(null);
	const [viewCount, setViewCount] = useState<number>(0);
	const [isSubscribedForAds, setIsSubscribedForAds] = useState<boolean>(false);
	const [adType, setAdType] = useState<AdType | null>(null);

	const [retailLocationData, setRetailLocationData] =
		useState<RetailLocationData>(retailLocationInit);

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
					retails={retails}
				/>
			</div>
		</DynamicPageContainer>
	);
};

export default RetailsAdmin;
