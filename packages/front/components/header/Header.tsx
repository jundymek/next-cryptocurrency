import React from 'react';
import LoginLogout from './LoginLogout';
import Link from 'next/link';
import LogoImage from './LogoImage';

const Header = React.memo(() => {
  return (
    <header className="py-4 sm:py-10 bg-black">
      <div className="container mx-auto sm:border-b-2 py-2 flex justify-between items-center transform z-10 relative">
        <Link href="/">
          <a className="p-4 md:m-0 cursor-pointer" title="Cryptocurrences portfolio">
            <LogoImage className="w-24 h-24 md:w-40 md:h-40" />
          </a>
        </Link>

        <div className="flex flex-col items-end px-2 sm:px-0 md:self-start">
          <LoginLogout />
        </div>
      </div>
    </header>
  );
});

export default Header;
