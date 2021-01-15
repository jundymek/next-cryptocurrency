import React, { SetStateAction } from 'react';
import SettingsIcon from '../icons/SettingsIcon';

interface HeaderProps {
  setIsOptionsOpen: (value: SetStateAction<boolean>) => void;
  isOptionsOpen: boolean;
}

const Header = React.memo<HeaderProps>(({ setIsOptionsOpen, isOptionsOpen }) => {
  const handleOptionsOpen = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  return (
    <header className="py-4">
      <div className="border-b-2 py-2">
        <h1 className="font-mono text-2xl text-center ">Cryptocurrences</h1>
        <button onClick={handleOptionsOpen}>
          <div className="w-7 h-7 absolute top-4 right-4">
            <SettingsIcon />
          </div>
        </button>
      </div>
    </header>
  );
});

export default Header;
