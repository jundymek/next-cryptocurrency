import React, { useEffect, useState } from 'react';
import Options from '../options/Options';
import useSWR from 'swr';
import CryptosAuthUser from './CryptosAuthUser';
import CryptosNotAuthUser from './CryptosNotAuthUser';
import { useAuthState } from '../../context/authContext';

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

  const [logged, setLogged] = useState(false);

  const { token } = useAuthState();

  async function checkToken() {
    const res = await fetch('http://localhost:3001/api/status', {
      headers: {
        Authorization: token!,
      },
    });
    if (res.status === 200) {
      console.log('logged');
      setLogged(true);
    } else {
      console.log('not logged');
      setLogged(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, [token]);

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR('http://localhost:3001/api/cryptos', fetcher, {
    refreshInterval: 1000,
  });

  const visibleCryptos = data?.filter((item: CryptoData) => {
    return listOfCurrences.find((el) => el.symbol === item.firstCurrency)?.isVisible;
  });

  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center">
      {logged ? (
        <CryptosAuthUser visibleCryptos={visibleCryptos} />
      ) : (
        <CryptosNotAuthUser visibleCryptos={visibleCryptos} />
      )}

      <Options listOfCurrences={listOfCurrences} setListOfCurrences={setListOfCurrences} />
    </div>
  );
});

export default Cryptos;
