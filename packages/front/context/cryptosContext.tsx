import React, { useState } from 'react';
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
  isLoading: boolean;
}

const CryptosStateContext = React.createContext<CryptosStateProps>({
  cryptos: undefined,
  error: undefined,
  isLoading: false,
});

function CryptosProvider({ children }: CryptosProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = async (url: string) => {
    setIsLoading(true);
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
    return res.json();
  };

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/cryptos`, fetcher, {
    refreshInterval: 100000,
  });

  const cryptos = data?.sort((crypto1: CryptoData, crypto2: CryptoData) => {
    return compareCryptos(crypto1, crypto2);
  });

  const state = { cryptos, error, isLoading };

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

const compareCryptos = (crypto1: CryptoData, crypto2: CryptoData) => {
  const obj1 = crypto1['firstCurrency'];
  const obj2 = crypto2['firstCurrency'];
  if (obj1 < obj2) {
    return -1;
  }
  if (obj1 > obj2) {
    return 1;
  }
  return 0;
};
