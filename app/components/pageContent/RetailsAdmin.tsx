'use client';
import React, { useRef, useState } from 'react';
import {
	CurrentIcon,
	Icon,
	Language,
	AdType,
	RetailLocationData,
	Location,
} from '@/utils/helpers/types';
import { retailLocationInit } from '@/utils/helpers/initialStates';
import DynamicPageContainer from '../containers/DynamicPageContainer.';
import RetailStoreList from '../lists/RetailStoreList';

interface Props {
	title: string;
}

interface RetailAdmin {
	id: number;
	companyId: number;
	name: string;
	phoneNumber: string;
	email: string;
	website: string;
	storeTypeId: number;
	countryId: number;
	cityId: number;
	cityPartId?: number;
	marketplaceId?: number;
	viewCount: number;
	isSubscribedForAds: boolean;
	adType: AdType;
}

interface UpdateRetailAdmin {
	id?: number;
	companyId: number;
	name: string;
	phoneNumber: string;
	email: string;
	website: string;
	storeTypeId: number;
	city: string;
	cityPartId?: number;
	marketplaceId?: number;
	viewCount: number;
	isSubscribedForAds: boolean;
	adType: AdType;
}

const RetailsAdmin: React.FC<Props> = ({ title }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [locations, setLocations] = useState<Location[]>([]);
	const [retails, setRetails] = useState<[]>([]);
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
