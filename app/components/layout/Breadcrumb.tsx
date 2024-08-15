'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BreadcrumbsContainer from '../containers/BreadcrumbsContainer';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const truncateLabel = (label: string, maxLength: number) => {
  if (label.length > maxLength) {
    return `${label.slice(0, maxLength)}...`;
  }
  return label;
};

const Breadcrumb: React.FC = () => {
  const currentPath = usePathname();
  const [breadcrumbPath, setBreadcrumbPath] = useState<{ href: string; label: string }[]>([]);

  useEffect(() => {
    if (currentPath === '/') {
      setBreadcrumbPath([]);
    } else {
      const pathSegments = currentPath.split('/').filter(Boolean);
      const pathArray = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const label = capitalize(segment.replace(/-/g, ' '));
        return { href, label };
      });
      setBreadcrumbPath([{ href: '/', label: 'Početna' }, ...pathArray]);
    }
  }, [currentPath]);

  if (breadcrumbPath.length === 0) {
    return null;
  }

  return (
    <BreadcrumbsContainer>
      {breadcrumbPath.map((route, index) => (
        <React.Fragment key={route.href}>
          {index > 0 && <span className='mx-1'>/</span>}
          {index === breadcrumbPath.length - 1 ? (
            <span className='font-medium text-white'>{truncateLabel(route.label, 10)}</span>
          ) : (
            <Link href={route.href}>
              <span className='text-gray-500 hover:text-blue-600'>
                {truncateLabel(route.label, 10)}
              </span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </BreadcrumbsContainer>
  );
};

export default Breadcrumb;
