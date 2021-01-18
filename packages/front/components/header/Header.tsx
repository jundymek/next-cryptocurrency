import React from 'react';
import SettingsIcon from '../icons/SettingsIcon';
import { OptionsContext } from '../../context/optionsContext';
import LoginLogout from './LoginLogout';
import Link from 'next/link';

const Header = React.memo(() => {
  const { toggleMenuOpen } = React.useContext(OptionsContext);

  return (
    <header className="py-4">
      <div className="border-b-2 py-2 flex flex-col sm:flex-row justify-between">
        <Link href="/">
          <h1 className="font-mono text-2xl text-center cursor-pointer">Cryptocurrences</h1>
        </Link>
        <div className="flex flex-col items-end px-2 sm:px-0">
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
