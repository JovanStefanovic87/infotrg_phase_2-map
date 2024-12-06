import Script from 'next/script';

const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '';

const GoogleAnalytics = () => (
	<>
		{/* Učitavanje Google Analytics skripte samo u produkciji */}
		{process.env.NODE_ENV === 'production' && (
			<>
				<Script
					async
					strategy='afterInteractive'
					src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
				/>
				<Script id='google-analytics' strategy='afterInteractive'>
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${trackingId}');
          `}
				</Script>
			</>
		)}
	</>
);

export default GoogleAnalytics;
