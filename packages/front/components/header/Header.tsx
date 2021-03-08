import React from 'react';
import SettingsIcon from '../icons/SettingsIcon';
import { OptionsContext } from '../../context/optionsContext';
import LoginLogout from './LoginLogout';
import Link from 'next/link';
import LogoImage from './LogoImage';

const Header = React.memo(() => {
  const { toggleMenuOpen } = React.useContext(OptionsContext);

  return (
    <header className="py-4 sm:py-10 bg-black">
      <div className="container mx-auto sm:border-b-2 py-2 flex justify-between items-center transform z-10 relative">
        <Link href="/">
          <a className="p-4 md:m-0 cursor-pointer" title="Cryptocurrences portfolio">
            <LogoImage className="w-24 h-24 md:w-40 md:h-40" />
          </a>
        </Link>

        <div className="flex flex-col items-end px-2 sm:px-0 md:self-start">
          <button onClick={toggleMenuOpen} className="absolute top-2 sm:top-0 right-2 sm:right-0">
            <div className="w-7 h-7 absolute sm:relative top-2 sm:top-0 right-2 sm:right-0 text-right">
              <SettingsIcon />
            </div>
          </button>
          <LoginLogout />
        </div>
      </div>
    </header>
  );
});

export default Header;
