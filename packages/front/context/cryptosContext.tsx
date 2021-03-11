import React from 'react';
import useSWR from 'swr';

interface CryptosProviderProps {
  children: React.ReactNode;
}

interface CryptoData {
  pair: string;
  firstCurrency: string;
  secondCurrency: string;
  name: string;
  price: string;
}

interface CryptosStateProps {
  cryptos: CryptoData[] | undefined;
  error: Error | undefined;
}

const CryptosStateContext = React.createContext<CryptosStateProps>({
  cryptos: undefined,
  error: undefined,
});

function CryptosProvider({ children }: CryptosProviderProps) {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      throw error;
    }
    return res.json();
  };

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/cryptos`, fetcher, {
    refreshInterval: 100000,
  });
  const cryptos = data;

  const state = { cryptos, error };

  return <CryptosStateContext.Provider value={state}>{children}</CryptosStateContext.Provider>;
}

function useCryptosState() {
  const context = React.useContext(CryptosStateContext);
  if (context === undefined) {
    throw new Error('useCryptosState must be used within a CryptosProvider');
  }
  return context;
}

export { CryptosProvider, useCryptosState };
