import React, { useState } from 'react';
import Options from '../options/Options';
import useSWR from 'swr';
import CryptosAuthUser from './CryptosAuthUser';
import CryptosNotAuthUser from './CryptosNotAuthUser';
import { useAuthState } from '../../context/authContext';
import LoadingSpinner from '../shared/loadingSpinner/LoadingSpinner';

export interface Currency {
  symbol: string;
  name: string;
  isVisible: boolean;
}

export interface CryptoData {
  pair: string;
  firstCurrency: string;
  secondCurrency: string;
  name: string;
  price: string;
}

const Cryptos = React.memo(() => {
  const [listOfCurrences, setListOfCurrences] = useState<Currency[]>([
    { symbol: 'BTC', name: 'Bitcoin', isVisible: true },
    { symbol: 'LTC', name: 'Litecoin', isVisible: true },
    { symbol: 'XRP', name: 'Ripple', isVisible: true },
    { symbol: 'ETH', name: 'Ethereum', isVisible: true },
  ]);

  const { token } = useAuthState();

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR('http://localhost:3001/api/cryptos', fetcher, {
    refreshInterval: 1000,
  });

  const visibleCryptos = data?.filter((item: CryptoData) => {
    return listOfCurrences.find((el) => el.symbol === item.firstCurrency)?.isVisible;
  });

  if (error) return <div>{error}</div>;

  if (!data)
    return (
      <div className="flex w-full justify-center">
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="flex justify-center items-center">
      {token ? (
        <CryptosAuthUser visibleCryptos={visibleCryptos} />
      ) : (
        <CryptosNotAuthUser visibleCryptos={visibleCryptos} />
      )}

      <Options listOfCurrences={listOfCurrences} setListOfCurrences={setListOfCurrences} />
    </div>
  );
});

export default Cryptos;
