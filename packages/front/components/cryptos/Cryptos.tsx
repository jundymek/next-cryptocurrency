import React, { useState } from 'react';
import Options from '../options/Options';
import Crypto from './crypto/Crypto';
import useFetchCryptoData from './utils/useFetchCryptoData';

interface CryptosProps {
  isMenuOpen: boolean;
}

export interface Currency {
  symbol: string;
  name: string;
  isVisible: boolean;
}

const Cryptos = React.memo<CryptosProps>(({ isMenuOpen }) => {
  const [listOfCurrences, setListOfCurrences] = useState<Currency[]>([
    { symbol: 'BTC', name: 'Bitcoin', isVisible: true },
    { symbol: 'LTC', name: 'Litecoin', isVisible: true },
    { symbol: 'XRP', name: 'Ripple', isVisible: true },
    { symbol: 'ETH', name: 'Ethereum', isVisible: true },
  ]);
  const { error, cryptos } = useFetchCryptoData();

  const toShow = cryptos?.filter(
    (item) =>
      listOfCurrences.find((el) => el.symbol === item.firstCurrency && el.isVisible) &&
      item.secondCurrency === 'PLN',
  );

  console.log(toShow);
  if (error) return <div>{error}</div>;
  return (
    <>
      <ul className="list-none mt-4 p-2">
        {toShow?.map((item) => (
          <Crypto key={item.name} crypto={item} />
        ))}
      </ul>
      <Options
        isMenuOpen={isMenuOpen}
        listOfCurrences={listOfCurrences}
        setListOfCurrences={setListOfCurrences}
      />
    </>
  );
});

export default Cryptos;
