import * as React from 'react';

interface OptionsProviderProps {
  children: React.ReactNode;
}

export const OptionsContext = React.createContext<any>({});

function OptionsProvider({ children }: OptionsProviderProps) {
  const [isOptionsOpen, setisOptionsOpen] = React.useState(false);

  const toggleMenuOpen = () => {
    setisOptionsOpen(!isOptionsOpen);
  };

  const value = { isOptionsOpen, toggleMenuOpen };

  return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>;
}

export { OptionsProvider };
