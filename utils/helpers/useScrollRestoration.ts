'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollRestoration: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to the top on route change
    window.scrollTo(0, 0);
  }, [pathname]); // Depend on pathname to trigger on route change

  return null;
};

export default ScrollRestoration;
