import React from 'react';
import { headers } from 'next/headers';
import Script from 'next/script';
import Main from './components/layout/Main';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Breadcrumb from './components/layout/Breadcrumb';
import { SidebarProvider } from './context/SidebarContext';
import { Providers } from './globalRedux/provider';
import '@/app/globals.css';
import ScrollRestoration from '../utils/helpers/useScrollRestoration';
import QueryProvider from './components/providers/queryProvider/QueryProvider';
import SessionProvider from './components/providers/sessionProvider/SessionProvider';
import GoogleAnalytics from './GoogleAnalytics';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const headersList = headers();
	const initialPathname = headersList.get('x-nextjs-url') || '/';
	const trackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '';

	return (
		<html lang='en'>
			<head>
				<Script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
					strategy='afterInteractive'
				/>
				<Script id='google-analytics' strategy='afterInteractive'>
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', ${trackingId});
					`}
				</Script>
			</head>
			<body className='flex flex-col min-h-screen bg-white'>
				<SessionProvider>
					<QueryProvider>
						<SidebarProvider>
							<div className='flex flex-1'>
								<Sidebar />
								<div className='flex-1 flex flex-col'>
									<Providers>
										<GoogleAnalytics />
										<Header />
										<Main>
											<Breadcrumb initialPathname={initialPathname} />
											{children}
										</Main>
									</Providers>
								</div>
							</div>
							<Footer />
						</SidebarProvider>
						<ScrollRestoration />
					</QueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
};

export default Layout;
