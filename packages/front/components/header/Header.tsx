import React from 'react';
import SettingsIcon from '../icons/SettingsIcon';
import { OptionsContext } from '../../context/optionsContext';
import LoginLogout from './LoginLogout';
import Link from 'next/link';
import LogoImage from './LogoImage';

const Header = React.memo(() => {
  const { toggleMenuOpen } = React.useContext(OptionsContext);

  return (
    <header className="py-4 bg-gradient-to-r from-blue-400 sm:h-2/5">
      <div className="container mx-auto border-b-2 py-2 flex flex-col sm:flex-row justify-between items-center transform z-10 relative">
        <Link href="/">
          <a className="p-2 mx-auto md:m-0 cursor-pointer" title="Cryptocurrences portfolio">
            <LogoImage className="w-full h-full md:w-40 md:h-40" />
          </a>
        </Link>
        <h1 className="font-mono text-xl my-2 md:text-2xl text-center font-semibold">
          Cryptocurrences portfolio
        </h1>
        <div className="flex flex-col items-end px-2 sm:px-0 md:self-start">
          <button onClick={toggleMenuOpen}>
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
