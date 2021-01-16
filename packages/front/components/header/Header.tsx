import React, { useEffect, useState } from 'react';
import SettingsIcon from '../icons/SettingsIcon';
import { OptionsContext } from '../../context/optionsContext';

const Header = React.memo(() => {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
    }
  }, []);

  const { toggleMenuOpen } = React.useContext(OptionsContext);

  return (
    <header className="py-4">
      <div className="border-b-2 py-2">
        <h1 className="font-mono text-2xl text-center ">Cryptocurrences</h1>
        <button onClick={toggleMenuOpen}>
          <div className="w-7 h-7 absolute top-4 right-4">
            <SettingsIcon />
          </div>
        </button>
        {username && <p>Logged as {username}</p>}
      </div>
    </header>
  );
});

export default Header;
