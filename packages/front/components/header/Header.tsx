import React from 'react';
import LoginLogout from './LoginLogout';
import Link from 'next/link';
import LogoImage from './LogoImage';

const Header = () => {
  return (
    <header className="py-4 sm:py-10 bg-black">
      <div className="container mx-auto py-2 flex justify-between items-center transform relative z-30">
        <Link href="/">
          <a className="p-4 sm:p-0" title="Cryptocurrences portfolio">
            <LogoImage className="w-20 h-20 sm:w-52 sm:h-52" />
          </a>
        </Link>

        <div className="px-2 sm:px-0">
          <div className="hidden sm:block">
            <LoginLogout />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
