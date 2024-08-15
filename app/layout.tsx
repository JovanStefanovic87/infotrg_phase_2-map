import React from 'react';
import Main from './components/layout/Main';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Breadcrumb from './components/layout/Breadcrumb';
import { SidebarProvider } from './context/SidebarContext';
import { Providers } from './globalRedux/provider';
import '@/app/globals.css';
import ScrollRestoration from '../utils/helpers/useScrollRestoration';
import ClientSessionProvider from './ClientSessionProvider';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<html lang='en'>
			<head />
			<body className='flex flex-col min-h-screen bg-blueMain'>
				<ClientSessionProvider>
					<SidebarProvider>
						<div className='flex flex-1'>
							<Sidebar />
							<div className='flex-1 flex flex-col'>
								<Providers>
									<Header />
									<Main>
										<Breadcrumb />
										{children}
									</Main>
								</Providers>
							</div>
						</div>
						<Footer />
					</SidebarProvider>
					<ScrollRestoration />
				</ClientSessionProvider>
			</body>
		</html>
	);
};

export default Layout;
