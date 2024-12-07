'use client';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

const useActiveLanguage = () => {
	const searchParams = useSearchParams();

	// Provera postojećeg kolačića
	const cookieLanguage = Cookies.get('languageCode');

	// Ako postoji validan kolačić, vratite ga
	if (cookieLanguage) {
		return cookieLanguage;
	}

	// Ako kolačić ne postoji, pokušajte dobiti jezik iz URL parametra
	const urlLanguage = searchParams?.get('languageCode');
	if (urlLanguage) {
		Cookies.set('languageCode', urlLanguage, {
			path: '/',
			maxAge: 31536000, // 1 godina
			sameSite: 'strict',
			secure: true,
		});
		return urlLanguage;
	}

	// Default vrednost ako ništa nije pronađeno
	return 'rs';
};

export default useActiveLanguage;
