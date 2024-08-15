'use client';
import React, { useState, useEffect } from 'react';
import LogoButton from '../buttons/LogoButton';
import NavButtons from '../buttons/NavButtons';

const Header: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHeaderVisible(currentScrollPos <= 0 || currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mediaQuery.matches) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [prevScrollPos]);

  return (
    <header
      className={`bg-main flex justify-between items-center px-4 fixed z-40 h-header shadow-black shadow-md transition-transform duration-700 ease-in-out transform ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      } w-screen`}
    >
      <div className='flex items-center space-x-4'>
        <div className='hidden lg:flex'>
          <NavButtons />
        </div>
      </div>
      <LogoButton />
    </header>
  );
};

export default Header;
