import React, { useState } from 'react';
import Options from '../options/Options';
import Crypto from './crypto/Crypto';
import useSWR from 'swr';

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

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR('http://localhost:3001/api/cryptos', fetcher, {
    refreshInterval: 1000,
  });

  const visibleCryptos = data?.filter((item: CryptoData) => {
    return listOfCurrences.find((el) => el.symbol === item.firstCurrency)?.isVisible;
  });

  if (error) return <div>{error}</div>;
  return (
    <>
      <ul className="list-none mt-4 p-2">
        {visibleCryptos?.map((item: CryptoData) => (
          <Crypto key={item.name} crypto={item} />
        ))}
      </ul>
      <Options listOfCurrences={listOfCurrences} setListOfCurrences={setListOfCurrences} />
    </>
  );
});

export default Cryptos;
