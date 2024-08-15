'use client';
import { useState, useEffect } from 'react';
import { LinkData } from './types';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobileCheck = window.matchMedia('(max-width: 768px)');
      setIsMobile(mobileCheck.matches);
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

import { MutableRefObject } from 'react';

interface HandleMouseLeaveProps {
  event: React.MouseEvent;
  hasChildren: boolean;
  dropdownRef: MutableRefObject<HTMLDivElement | null>;
  setIsOpen: (isOpen: boolean) => void;
  onMouseLeave?: () => void;
}

export const handleMouseLeave = ({
  event,
  hasChildren,
  dropdownRef,
  setIsOpen,
  onMouseLeave,
}: HandleMouseLeaveProps) => {
  const relatedTarget = event.relatedTarget as Node | null;
  if (
    hasChildren &&
    dropdownRef.current &&
    relatedTarget instanceof Node &&
    !dropdownRef.current.contains(relatedTarget)
  ) {
    setIsOpen(false);
    if (onMouseLeave) {
      onMouseLeave();
    }
  }
};

export const isTextHyperlinked = (text: string, hyperlinks: LinkData[]) => {
  const foundLink = hyperlinks.find((link) => link.text === text);
  return foundLink ? foundLink.url : undefined;
};
