'use client';

import { useEffect } from 'react';

const useGoogleAnalytics = (trackingId: string) => {
	useEffect(() => {
		if (typeof window !== 'undefined' && trackingId) {
			// Kreirajte gtag funkciju ako već nije definisana
			if (!window.gtag) {
				window.dataLayer = window.dataLayer || [];
				window.gtag = function () {
					window.dataLayer.push(arguments);
				};
			}
			window.gtag('js', new Date());
			window.gtag('config', trackingId);
		}
	}, [trackingId]);
};

const GoogleAnalytics: React.FC<{ trackingId: string }> = ({ trackingId }) => {
	useGoogleAnalytics(trackingId);
	return null; // Ova komponenta ne renderuje ništa, samo inicijalizuje GA
};

export default GoogleAnalytics;
