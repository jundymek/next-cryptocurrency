import React from 'react';
import SettingsIcon from '../icons/SettingsIcon';
import { OptionsContext } from '../../context/optionsContext';
import LoginLogout from './LoginLogout';
import Link from 'next/link';
import LogoImage from './LogoImage';

const Header = React.memo(() => {
  const { toggleMenuOpen } = React.useContext(OptionsContext);

  return (
    <header className="py-4">
      <div className="border-b-2 py-2 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/">
          <div className="flex flex-col md:flex-row items-center p-2  mx-auto md:m-0">
            <LogoImage className="w-full h-full  md:w-40 md:h-40" />
          </div>
        </Link>
        <h1 className="font-mono text-xl my-2 md:text-2xl text-center cursor-pointer font-semibold">
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
