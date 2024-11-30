'use client';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const useActiveLanguage = () => {
	const searchParams = useSearchParams();
	const urlLanguage = searchParams?.get('languageCode');

	if (urlLanguage) {
		Cookies.set('languageCode', urlLanguage);
		return urlLanguage;
	}

	const cookieLanguage = Cookies.get('languageCode');
	return cookieLanguage || 'rs';
};

export default useActiveLanguage;
