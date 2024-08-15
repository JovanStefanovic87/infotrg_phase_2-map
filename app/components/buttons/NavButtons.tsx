import React from 'react';
import { usePathname } from 'next/navigation';
import HeaderLinkButton from './HeaderLinkButton';
import { routes } from '../../routes';
import { Route } from '@/utils/helpers/types';

const NavButtons: React.FC = () => {
	const pathname = usePathname();

	return <nav className='flex space-x-4'>{renderButtons(routes, true)}</nav>;

	function renderButtons(routes: Route[], isTopLevel: boolean) {
		return routes.map(route => {
			const hasChildren: boolean = !!(route.subRoutes && route.subRoutes.length > 0);

			return (
				<div key={route.href} className='relative'>
					<HeaderLinkButton
						label={route.label}
						href={route.href}
						hasChildren={hasChildren}
						subRoutes={route.subRoutes}
						isTopLevel={isTopLevel}
					/>
				</div>
			);
		});
	}
};

export default NavButtons;
